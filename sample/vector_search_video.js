#!/usr/bin/env node

const Fetch = typeof fetch !== "undefined" ? fetch : require("node-fetch").default;

const util = require('./util')
const BASE_SEARCH_PATH = util.BASE_SEARCH_PATH

async function doVectorSearch(token, index, query, maxClipDuration = 55, start = 0, limit = 10, maxTotal = 40) {
  const url = `${BASE_SEARCH_PATH}/q/${index}/rep/search`

  const params = new URLSearchParams({
    terms: query,
    start: start,
    limit: limit,
    max_total: maxTotal,
    select: "/public/asset_metadata/title,/public/name,public/asset_metadata/display_title",
    clips: (maxClipDuration > 0),
    authorization: token
  });

  const response = await Fetch(url + "?" + params.toString(), {})

  if (response.status != 200 || response?.headers?.get("content-type") !== "application/json") return null

  return response.json()
}

async function main() {
  try {
    // this is the index object to search
    const index = "iq__2PshyLfW63visjkrXFZmYwLYAAZ5"

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
      let query_result = await doVectorSearch(token, index, "life on campus", 55, start, 40, 40)

      // determine max score for each result (max of score of all sources)
      for (const content of query_result.contents) {
        content.score = content.sources.sort( (a,b) => b.score - a.score )[0].score
      }

      //sort by max score
      query_result.contents.sort( (a, b) => b.score - a.score )

      // print out results
      for (const content of query_result.contents) {

        title = content?.meta?.public?.asset_metadata?.title || content?.meta?.public?.name

        console.log(`iq: ${content.id} title: ${title}`)
        console.log(`    ${content.start} - ${content.end}`)
        console.log(`    score: ${content.score}`)
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
