#!/usr/bin/env node

const Fetch = typeof fetch !== "undefined" ? fetch : require("node-fetch").default;

const util = require('./util')
const BASE_SEARCH_PATH = util.BASE_SEARCH_PATH

async function getVideoTags(token, iq, startTime, endTime) {
  const url = `${BASE_SEARCH_PATH}/q/${iq}/tags`

  const params = new URLSearchParams({
    start_time: startTime,
    end_time: endTime,
    authorization: token
  });

  const response = await Fetch(url + "?" + params.toString(), {})

  if (response.status != 200 || response?.headers?.get("content-type") !== "application/json") return null

  return response.json()
}

async function main() {
  try {
    // video content object
    const iq = "iq__EXYa2f2BpdJe1FAeWxzoQrjh8wK"

    // get client
    console.debug("Getting client...")
    const client = await util.getConfiguredClient()

    // get token
    console.debug("Getting token...")
    const token = await util.getFabricToken(client, iq)

    // fetch video tags
    console.debug("Fetching asset tags...")
    const tags = await getVideoTags(token, iq, 172010, 202839)
    console.log(JSON.stringify(tags, null, 2))
  }
  catch (err) {
    console.error(err)
    console.error(JSON.stringify(err, null, 2));
  }
}

main()
