const { ElvClient } = require("@eluvio/elv-client-js");

async function getConfiguredClient() {

  client = await ElvClient.FromNetworkName({
    networkName: process.env.ELV_NETWORK_NAME || "main", // (or "demo" or "test")
    ethereumContractTimeout: 80
  })

  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("PRIVATE_KEY must be set to a valid eluvio private key")
  }

  const wallet = client.GenerateWallet();
  const signer = wallet.AddAccount({
    privateKey: privateKey,
  });
  client.SetSigner({ signer });

  var httpLogging = process.env.ELV_HTTP_LOGGING
  if (httpLogging != null) {
    if (httpLogging === "true") {
      client.ToggleLogging(true)
    }
    else {
      httpLogging = parseInt(httpLogging)
      if (!isNaN(httpLogging)) {
        client.ToggleLogging(httpLogging)
      }
    }
  }

  return client;
}


async function getFabricToken(client, iq) {
  return await client.GenerateStateChannelToken({ objectId: iq })
}

const BASE_SEARCH_PATH = "https://ai.contentfabric.io/search"

module.exports = {
  getConfiguredClient,
  getFabricToken,
  BASE_SEARCH_PATH
}
