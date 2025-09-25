// portable_fetch.js
let _fetch = globalThis.fetch;

async function ensureFetch() {
  if (_fetch) return _fetch;
  // fallback for Node < 18
  const { default: nodeFetch } = await import("node-fetch");
  _fetch = nodeFetch;
  return _fetch;
}

const BASE_URL = "https://ai.contentfabric.io/tagstore";
const AUTH_TOKEN = process.env.FABRIC_AUTH ? `Bearer ${process.env.FABRIC_AUTH}` : "";
const qid = "iq__5UkLrg9mLp2EgVQokPbtuqrmeFL";

function prettyPrint(data, maxChars = 4000) {
  let text = JSON.stringify(data, null, 2);
  if (text.length > maxChars) {
    text = "... (truncated) ...\n" + text.slice(-maxChars);
  }
  console.log(text);
}

async function runQuery(name, url, params = null) {
  console.log(`\n=== ${name} ===`);
  console.log(AUTH_TOKEN)
  const query = params ? "?" + new URLSearchParams(params).toString() : "";

  const fetchImpl = await ensureFetch();
  const resp = await fetchImpl(url + query, {
    headers: { Authorization: AUTH_TOKEN },
  });

  console.log(`Request: ${resp.url}`);
  console.log(`Status: ${resp.status}`);

  try {
    const data = await resp.json();
    prettyPrint(data);
  } catch {
    console.log("Non-JSON response:", await resp.text());
  }
}

async function main() {
  await runQuery("query all tags", `${BASE_URL}/${qid}/tags`);
  await runQuery("with custom pagination",
    `${BASE_URL}/${qid}/tags`,
    { start: 10, limit: 10 });
  await runQuery("list jobs to discover tracks",
    `${BASE_URL}/${qid}/jobs`);
  await runQuery("query by track (toprocks)",
    `${BASE_URL}/${qid}/tags`,
    { track: "toprocks" });
  await runQuery("query tags containing substring (Lilybreeze)",
    `${BASE_URL}/${qid}/tags`,
    { text_contains: "Lilybreeze" });
  await runQuery("query tags start between 3-5 minutes",
    `${BASE_URL}/${qid}/tags`,
    { start_time_gte: 180000, start_time_lte: 300000 });
  await runQuery("query tags start+end between 3-5 minutes",
    `${BASE_URL}/${qid}/tags`,
    {
      start_time_gte: 180000, start_time_lte: 300000,
      end_time_gte: 180000, end_time_lte: 300000,
    });
  await runQuery("Get frame level tags (example_track_with_frametags)",
    `${BASE_URL}/${qid}/tags`,
    { track: "example_track_with_frametags" });
}

main().catch(err => console.error(err));
