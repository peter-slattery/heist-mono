import { Vendor_Spec } from "@heist/common/contracts"

let cache_time: number = 0
let cached_vendor_spec: Vendor_Spec[] = []

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.type === "pluginDataGet") {
    const time_since_cache = Date.now() - cache_time
    const should_refresh = time_since_cache / (1000 * 60 * 60) > 1
    console.log(time_since_cache / (1000 * 60 * 60), should_refresh)
    if (false && !should_refresh) {
      console.log("Using Cached")
      senderResponse(cached_vendor_spec)
    } else {
      fetch(`${HEIST_PLUGIN_ENDPOINT}.netlify/functions/pluginDataGet`, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          cache_time = Date.now()
          cached_vendor_spec = JSON.parse(res)
          senderResponse(cached_vendor_spec)
        })
    }
  }
  return true
})
