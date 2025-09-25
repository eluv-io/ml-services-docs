import requests
import json
import os

BASE_URL = "https://ai.contentfabric.io/tagstore"
AUTH_TOKEN = f"Bearer {os.getenv('FABRIC_AUTH')}"
qid = "iq__5UkLrg9mLp2EgVQokPbtuqrmeFL"

def pretty_print(data, max_chars=4000):
    text = json.dumps(data, indent=2)
    if len(text) > max_chars:
        text = "... (truncated) ...\n" + text[-max_chars:]
    print(text)

def run_query(name, url, params=None):
    print(f"\n=== {name} ===")
    resp = requests.get(url, params=params, headers={"Authorization": AUTH_TOKEN})
    print(f"Request: {resp.request.url}")
    print(f"Status: {resp.status_code}")
    pretty_print(resp.json())

def main():
    run_query("query all tags",
              f"{BASE_URL}/{qid}/tags")

    run_query("with custom pagination",
              f"{BASE_URL}/{qid}/tags",
              params={"start": 10, "limit": 10})

    run_query("list jobs to discover tracks",
              f"{BASE_URL}/{qid}/jobs")

    run_query("query by track (toprocks)",
              f"{BASE_URL}/{qid}/tags",
              params={"track": "toprocks"})

    run_query("query tags containing substring (Lilybreeze)",
              f"{BASE_URL}/{qid}/tags",
              params={"text_contains": "Lilybreeze"})

    run_query("query tags start between 3-5 minutes",
              f"{BASE_URL}/{qid}/tags",
              params={"start_time_gte": 180000, "start_time_lte": 300000})

    run_query("query tags start+end between 3-5 minutes",
              f"{BASE_URL}/{qid}/tags",
              params={
                  "start_time_gte": 180000, "start_time_lte": 300000,
                  "end_time_gte": 180000, "end_time_lte": 300000
              })

    run_query("Get frame level tags (example_track_with_frametags)",
              f"{BASE_URL}/{qid}/tags",
              params={"track": "example_track_with_frametags"})

if __name__ == "__main__":
    main()