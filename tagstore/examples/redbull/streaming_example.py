import requests
import json
import sys
import threading
import time
import os
from sseclient import SSEClient

BASE_URL = "https://ai.contentfabric.io/tagstore"
AUTH_TOKEN = os.getenv('FABRIC_AUTH')
qid = "iq__5UkLrg9mLp2EgVQokPbtuqrmeFL"

created_batch_id = None
stop_posting = threading.Event()

def pretty_print(data, max_chars=800):
    text = json.dumps(data, indent=2)
    if len(text) > max_chars:
        text = text[:max_chars] + "\n... (truncated) ..."
    print(text)

def create_batch():
    global created_batch_id
    
    url = f"{BASE_URL}/{qid}/batches"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AUTH_TOKEN}"
    }
    
    data = {
        "author": "streaming_example",
        "track": "video"
    }
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
    created_batch_id = result["batch_id"]
    print(f"Created batch: {created_batch_id}\n")
    return created_batch_id

def post_tag(batch_id, tag_number):
    url = f"{BASE_URL}/{qid}/tags"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AUTH_TOKEN}"
    }
    
    start_time = tag_number * 1000
    end_time = start_time + 500
    
    data = {
        "batch_id": batch_id,
        "tags": [{
            "start_time": start_time,
            "end_time": end_time,
            "tag": f"streaming_test_tag_{tag_number}",
            "source": "streaming_example"
        }]
    }
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    print(f"[POSTED] Tag #{tag_number} at time {start_time}-{end_time}")

def tag_posting_thread(batch_id):
    """Background thread that posts tags every second"""
    tag_number = 1
    
    while not stop_posting.is_set():
        try:
            post_tag(batch_id, tag_number)
            tag_number += 1
            time.sleep(1)
        except Exception as e:
            print(f"[ERROR] Failed to post tag: {e}")
            break

def cleanup():
    """Delete all created tags and batch"""
    print("\n\n=== Cleaning up ===")
    
    # Delete batch
    if created_batch_id:
        try:
            url = f"{BASE_URL}/{qid}/batches/{created_batch_id}?authorization={AUTH_TOKEN}"
            response = requests.delete(url)
            if response.status_code in [200, 204]:
                print(f"Deleted batch: {created_batch_id}")
        except Exception as e:
            print(f"Failed to delete batch {created_batch_id}: {e}")
    
    print("Cleanup complete\n")

def listen_to_stream():
    url = f"{BASE_URL}/{qid}/tags/stream?authorization={AUTH_TOKEN}"

    print(f"\n=== Listening to SSE stream ===")
    print(f"URL: {url}")
    print("Waiting for events... (Press Ctrl+C to stop)\n")
    
    try:
        # Create batch for tags
        batch_id = create_batch()
        
        # Start background thread to post tags
        poster_thread = threading.Thread(target=tag_posting_thread, args=(batch_id,), daemon=True)
        poster_thread.start()

        client = SSEClient(url)
        
        for event in client:
            print("=" * 60)
            print(f"[RECEIVED] Event Type: {event.event}")
            
            tag_data = json.loads(event.data)
            pretty_print(tag_data)
            
            print("=" * 60)
            print()
                
    except requests.exceptions.RequestException as e:
        print(f"Connection error: {e}")
    except KeyboardInterrupt:
        print("\n\nStopping...")
    finally:
        # Stop the posting thread
        stop_posting.set()
        
        # Cleanup
        cleanup()
        
        sys.exit(0)

if __name__ == "__main__":
    listen_to_stream()
