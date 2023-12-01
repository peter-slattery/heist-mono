import { Html_Extractor_Desc, Vendor_Spec } from "@heist/common/contracts"
import { type PluginInvestData } from "@heist/common/pluginContract"
import { log } from "../common/log"

declare const HEIST_PLUGIN_ENDPOINT: string

let vendor_specs: Vendor_Spec[]
let vendor_spec: Vendor_Spec | null = null
let information_accessor = -1
document.addEventListener("receivedVendorData", (event) => {
  vendor_specs = (event as CustomEvent).detail as Vendor_Spec[]

  const vendor_specs_matching = vendor_specs.filter((vendor) => {
    return window.location.href.includes(vendor.url)
  })

  vendor_spec =
    vendor_specs_matching.length > 0
      ? vendor_specs_matching[0]
      : vendor_specs[0]

  log("Using vendor spec", vendor_spec)
  setTimeout(() => check_and_add_heist_button(vendor_spec!), 500)
})

// Inject Heist Styles into Page
const styles: string = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

  .heist_add_to_cart {
    cursor: pointer;
    width: 100%;
    display: flex;
    background: #FA533A;
    color: #FFC5BC;
    text-align: center;
    font-family: "Archivo Black";
    font-weight: 400;
    font-size: 18px;
    line-height: normal;
    border-radius: 4px;
    margin-top: 4px;
  }

  .heist_h {
    color: #222222;
    border-right: 1px solid #222222;
    min-width: 30px;
    padding: 10px;
  }

  .heist_cta {
    width: 100%;
    text-align: center;
    padding: 10px;
  }
`
const stylesheet: HTMLStyleElement = document.createElement("style")
stylesheet.innerHTML = styles
document.head.appendChild(stylesheet)

function queryAllSelectors<T extends HTMLElement>(
  selectorsArray: string[]
): T[] {
  let result: T[] = []
  for (let i = 0; i < selectorsArray.length; i++) {
    const ri = document.querySelectorAll<T>(selectorsArray[i])
    result = result.concat(...Array.from(ri))
  }
  return result
}

function html_extract(
  extractor: Html_Extractor_Desc,
  index: number
): string | undefined {
  let value: string | null
  switch (extractor.type) {
    case "getAttribute": {
      const instances = document.querySelectorAll(extractor.selector)
      if (index >= instances.length || !instances[index]) return
      value = instances[index].getAttribute(extractor.attribute)
      break
    }

    case "textContent": {
      const instances = document.querySelectorAll(extractor.selector)
      if (index >= instances.length || !instances[index]) return
      value = instances[index].textContent
      break
    }
  }
  return value ?? undefined
}

function heist_on_invest(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()

  if (!vendor_spec) return

  let data: PluginInvestData
  if (vendor_spec.information_accessors) {
    const target = event.target as HTMLElement | null
    const index = target?.getAttribute("data-heist-index")
    const index_value = index ? parseInt(index) : 0
    log("Index", index, event.target)

    const accessor = vendor_spec.information_accessors[information_accessor]
    const price = html_extract(accessor.price, index_value)
    const name = html_extract(accessor.name, index_value)
    const image = html_extract(accessor.image, index_value)

    data = {
      price: price ?? "",
      name: name ?? "",
      imageUrl: image ?? "",
      productUrl: window.location.href,
    }
  } else {
    const prices = queryAllSelectors(vendor_spec.price_id_selectors)
    const names = queryAllSelectors(vendor_spec.name_selectors).map(
      (p) => p.innerText
    )
    const images = queryAllSelectors<HTMLImageElement>(
      vendor_spec.image_selectors
    ).map((p) => p.src || p.srcset.split(" ")[0])

    data = {
      price: prices[0].innerText,
      name: names[0],
      imageUrl: images[0],
      productUrl: window.location.href,
    }
  }

  log("Sending Product Info", { data })

  const queryString = new URLSearchParams(data)
  const base =
    HEIST_PLUGIN_ENDPOINT[HEIST_PLUGIN_ENDPOINT.length - 1] === "/"
      ? HEIST_PLUGIN_ENDPOINT
      : HEIST_PLUGIN_ENDPOINT + "/"
  open(`${base}invest?${queryString.toString()}`, "_blank")
}

function populate_button(parent: Element, index: number = 0) {
  const html = `
  <div class="heist_cta" data-heist-index='${index}'>
    HEIST
  </div>
  `
  const insertion = document.createElement("div")
  insertion.classList.add("heist_add_to_cart")
  insertion.addEventListener("click", heist_on_invest)
  insertion.innerHTML = html
  parent.appendChild(insertion)
}

function populate_from_spec(spec: Vendor_Spec) {
  if (spec.information_accessors) {
    // TODO(PS): iterate thru until success
    information_accessor = 0
    const accessor = spec.information_accessors[information_accessor]
    console.log(`Using accessor: ${accessor.id}`)
    const parents = document.querySelectorAll(accessor.placement)
    for (let i = 0; i < parents.length; i++) {
      if (!parents[i]) continue
      populate_button(parents[i], i)
    }
    return
  }

  for (let j = 0; j < spec.placement.length; j++) {
    const selector = spec.placement[j]
    const parents = document.querySelectorAll(selector)
    for (let i = 0; i < parents.length; i++) {
      if (!parents[i]) continue
      populate_button(parents[i])
      return
    }
  }
}

let checks_count = 0
const CHECKS_MAX = 5
function check_and_add_heist_button(vendor_spec: Vendor_Spec) {
  checks_count += 1
  const button = document.querySelector(".heist_add_to_cart")
  if (!button) {
    populate_from_spec(vendor_spec)
  }

  if (checks_count < CHECKS_MAX) {
    setTimeout(check_and_add_heist_button, 3000)
  }
}
