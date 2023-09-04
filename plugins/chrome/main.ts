import { type PluginInvestData } from "@heist/common/pluginContract"
import { log } from "../common/log"

declare const HEIST_PLUGIN_ENDPOINT: string

// Inject Heist Styles into Page
const styles: string = `
  .heist_add_to_cart {
    cursor: pointer;
    width: 100%;
    display: flex;
    background: #FA533A;
    color: #f7f7f7;
    text-align: center;
    font-family: "Impact";
    font-weight: 800;
    font-size: 18pt;
    line-height: 100%;
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

// Inject Heist Buttons into Page
type Vendor_Spec = {
  vendor: string
  url: string
  placement: string
  price_id_selectors: string[]
  image_selectors: string[]
  name_selectors: string[]
}

const vendor_specs: Vendor_Spec[] = [
  {
    vendor: "Amazon",
    url: "amazon.com",
    placement: ".add-to-cart-data",
    price_id_selectors: [".a-price .a-offscreen"],
    image_selectors: [],
    name_selectors: [],
  },
  {
    vendor: "West Elm",
    url: "westelm.com",
    placement: ".add-to-cart-container > div > .atc-container",
    price_id_selectors: [".purchasing-container .product-price .amount"],
    image_selectors: ["#hero-0"],
    name_selectors: [".product-info .heading-title-pip"],
  },
  {
    vendor: "Anthropologie Living",
    url: "anthropologie.com/anthroliving/shop",
    placement: ".u-pwa-form-field.o-pwa-primary-actions",
    price_id_selectors: [
      ".c-pwa-product-price__current.s-pwa-product-price__current",
    ],
    image_selectors: [".o-pwa-image__img.c-pwa-image-viewer__img"],
    name_selectors: [".c-pwa-product-meta-heading"],
  },
  {
    vendor: "Home Depot",
    url: "homedepot.com/p/",
    placement: ".buybox__actions--atc",
    price_id_selectors: [
      ".price-format__large.price-format__main-price :nth-child(2)",
    ],
    image_selectors: [".mediagallery__mainimage--clickable img"],
    name_selectors: [".product-details__badge-title--wrapper h1"],
  },
]
const vendor_specs_matching = vendor_specs.filter((vendor) => {
  return window.location.href.includes(vendor.url)
})
const vendor_spec: Vendor_Spec =
  vendor_specs_matching.length > 0 ? vendor_specs_matching[0] : vendor_specs[0]

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

function heist_on_invest(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()

  const prices = queryAllSelectors(vendor_spec.price_id_selectors)
  const names = queryAllSelectors(vendor_spec.name_selectors).map(
    (p) => p.innerText
  )
  const images = queryAllSelectors<HTMLImageElement>(
    vendor_spec.image_selectors
  ).map((p) => p.src)

  log(prices[0].innerText, names[0], images[0])
  const data: PluginInvestData = {
    price: prices[0].innerText,
    name: names[0],
    image: images[0],
    origin: window.location.href,
  }
  const queryString = new URLSearchParams(data)
  open(`${HEIST_PLUGIN_ENDPOINT}?${queryString.toString()}`, "_blank")
}

function populate_from_spec(spec: Vendor_Spec) {
  const parents = document.querySelectorAll(spec.placement)
  for (let i = 0; i < parents.length; i++) {
    const button = parents[i]
    if (!button) continue

    const html = `
<div class="heist_h">
  H
</div>
<div class="heist_cta">
  INVEST
</div>
`
    const insertion = document.createElement("div")
    insertion.classList.add("heist_add_to_cart")
    insertion.addEventListener("click", heist_on_invest)
    insertion.innerHTML = html
    button.appendChild(insertion)
  }
}

let checks_count = 0
const CHECKS_MAX = 5
function check_and_add_heist_button() {
  checks_count += 1
  const button = document.querySelector(".heist_add_to_cart")
  if (!button) {
    populate_from_spec(vendor_spec)
  }

  if (checks_count < CHECKS_MAX) {
    setTimeout(check_and_add_heist_button, 3000)
  }
}

log("Using vendor spec", vendor_spec)
setTimeout(check_and_add_heist_button, 500)