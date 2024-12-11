#!/usr/bin/env node

const Fetch = typeof fetch !== "undefined" ? fetch : require("node-fetch").default;

const util = require('./util')
const BASE_SEARCH_PATH = util.BASE_SEARCH_PATH

async function doVectorSearch(token, index, query, start = 0, limit = 10, max_total = 40) {
  const url = `${BASE_SEARCH_PATH}/q/${index}/rep/search`

  const params = new URLSearchParams({
    terms: query,
    start: start,
    limit: limit,
    max_total: max_total,
    authorization: token
  });

  const response = await Fetch(url + "?" + params.toString(), {})

  if (response.status != 200 || response?.headers?.get("content-type") !== "application/json") return null

  return response.json()
}

async function main() {
  try {
    // this is the index object to search
    const index = "iq__32smADhYjsZUHhieTQ7nmbL8dqYg"

    // get client
    console.debug("Getting client...")
    const client = await util.getConfiguredClient()

    // get token
    console.debug("Getting token...")
    const token = await util.getFabricToken(client, index)

    console.debug("Running search...")
    
    let start = 0

    while (true) {
      // note there is a bug in pagination at the moment, so fetch all results
      let query_result = await doVectorSearch(token, index, "Madison White", start, 40, 40)

      // print out content object and asset name
      for (const result of query_result.results) {
        console.log(`${result.id} ${result.prefix} score: ${result.score}`)
      }

      // fetch next page if needed
      if (!query_result.pagination) break

      start = query_result.pagination.start + query_result.pagination.limit
      if (start >= query_result.pagination.total) break

      console.log("--- next page")
    }
  }
  catch (err) {
    console.error(err)
    console.error(JSON.stringify(err, null, 2));
  }

}


main()
