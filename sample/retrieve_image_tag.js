#!/usr/bin/env node

const Fetch = typeof fetch !== "undefined" ? fetch : require("node-fetch").default;

const util = require('./util')

const BASE_SEARCH_PATH= "https://ai.contentfabric.io/search"



async function getAssetTags(token, iq, assetPath) {  
  const url = `${BASE_SEARCH_PATH}/q/${iq}/image_tags`
  
  const params = new URLSearchParams({
    path: assetPath,
    authorization: token
  });
  
  const response = await Fetch(url + "?" + params.toString(), {})
  console.log(url)
  console.log(response)
  
  if (response.status != 200 || response?.headers?.get("content-type") !== "application/json") return null

  return response.json()
}

async function main() {
  try {
    const client = await util.getConfiguredClient()

    // content object and asset path to fetch
    const iq = "iq__2g4MHjXgoM2r14YJZfyVJzo6cwtW"
    const asset = "assets/19313048.jpg"
    
    // get token
    const token = await util.getFabricToken(client, iq)

    // fetch asset tags
    const tags = await getAssetTags(token, iq, asset)
    console.dir(tags, { depth: null} )

  }
  catch (err) {
    console.error(err)    
    console.error(JSON.stringify(err, null, 2));
  }
  
}


main()