#!/usr/bin/env node

const Fetch = typeof fetch !== "undefined" ? fetch : require("node-fetch").default;

const util = require('./util')
const BASE_SUMMARY_PATH = util.BASE_SUMMARY_PATH

async function getAssetSummary(token, iq, assetPath) {
  const url = `${BASE_SUMMARY_PATH}/q/${iq}/rep/image_summarize`

  const params = new URLSearchParams({
    path: assetPath,
    authorization: token
  });

  const response = await Fetch(url + "?" + params.toString(), {})

  if (response.status != 200 || response?.headers?.get("content-type") !== "application/json") return null

  return response.json()
}

async function main() {
  try {
    // content object and asset path to fetch
    const iq = "iq__2g4MHjXgoM2r14YJZfyVJzo6cwtW"
    const asset = "/assets/19313048.jpg"

    // get client
    console.debug("Getting client...")
    const client = await util.getConfiguredClient()

    // get token
    console.debug("Getting token...")
    const token = await util.getFabricToken(client, iq)

    // fetch asset tags
    console.debug("Generating summary...")
    const tags = await getAssetSummary(token, iq, asset)
    console.dir(tags, { depth: null} )
  }
  catch (err) {
    console.error(err)
    console.error(JSON.stringify(err, null, 2));
  }

}

main()
