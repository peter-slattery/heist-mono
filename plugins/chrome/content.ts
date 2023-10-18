declare const HEIST_PLUGIN_ENDPOINT: string

// Inject our callback code
const script = document.createElement("script")
script.src = chrome.runtime.getURL("main.js")
;(document.head || document.documentElement).appendChild(script)

chrome.runtime.sendMessage(
  {
    type: "pluginDataGet",
  },
  (response) => {
    const event = new CustomEvent("receivedVendorData", {
      detail: response,
    })
    document.dispatchEvent(event)
  }
)
