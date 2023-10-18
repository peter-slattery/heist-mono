import { Vendor_Spec } from "@heist/common/contracts"
import { type PluginInvestData } from "@heist/common/pluginContract"
import { log } from "../common/log"

declare const HEIST_PLUGIN_ENDPOINT: string

let vendor_specs: Vendor_Spec[]
let vendor_spec: Vendor_Spec | null = null
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

/*
const vendor_specs: Vendor_Spec[] = [
  {
    vendor: "Amazon",
    url: "amazon.com",
    placement: [".add-to-cart-data", "#partialStateBuybox"],
    price_id_selectors: [".a-price .a-offscreen", '[data-a-color="price"]'],
    image_selectors: ['[data-a-image-name="landingImage"]'],
    name_selectors: ["#productTitle"],
  },
  {
    vendor: "West Elm",
    url: "westelm.com",
    placement: [".add-to-cart-container > div > .atc-container"],
    price_id_selectors: [".purchasing-container .product-price .amount"],
    image_selectors: ["#hero-0"],
    name_selectors: [".product-info .heading-title-pip"],
  },
  {
    vendor: "Anthropologie",
    url: "anthropologie.com/shop/",
    placement: [
      ".c-pwa-product-info-supplemental .u-pwa-form-field.o-pwa-primary-actions",
    ],
    price_id_selectors: [
      ".c-pwa-product-container .c-pwa-product-price__current.s-pwa-product-price__current",
    ],
    image_selectors: [".c-pwa-product-container source"],
    name_selectors: [".c-pwa-product-container h1"],
  },
  {
    vendor: "Anthropologie Living",
    url: "anthropologie.com/anthroliving/shop",
    placement: [".u-pwa-form-field.o-pwa-primary-actions"],
    price_id_selectors: [
      ".c-pwa-product-price__current.s-pwa-product-price__current",
    ],
    image_selectors: [".o-pwa-image__img.c-pwa-image-viewer__img"],
    name_selectors: [".c-pwa-product-meta-heading"],
  },
  {
    vendor: "Home Depot",
    url: "homedepot.com/p/",
    placement: [".buybox__actions--atc"],
    price_id_selectors: [
      ".price-format__large.price-format__main-price :nth-child(2)",
    ],
    image_selectors: [".mediagallery__mainimage--clickable img"],
    name_selectors: [".product-details__badge-title--wrapper h1"],
  },
  {
    vendor: "Lowes",
    url: "lowes.com/pd/",
    placement: [".atc-buy-box"],
    price_id_selectors: [".main-price"],
    image_selectors: ["#imgCont0 img"],
    name_selectors: ["#stickyNav-container #pdp-lpd h1"],
  },
  {
    vendor: "Target",
    url: "target.com/p/",
    placement: [".styles__ThreeUpButtonWrapper-sc-11rka0i-0"],
    price_id_selectors: ['[data-test="product-price"]'],
    image_selectors: ['[data-test="image-gallery-item-0"] img'],
    name_selectors: ['[data-test="product-title"]'],
  },
  {
    vendor: "Wayfair",
    url: "wayfair.com/",
    placement: [".CallToActionGrid-addToCartButton"],
    price_id_selectors: ['[data-enzyme-id="PdpLayout-infoBlock"] .SFPrice'],
    image_selectors: ['[data-enzyme-id="InitialImage"]'],
    name_selectors: [
      '[data-enzyme-id="PdpLayout-infoBlock"] .ProductDetailInfoBlock-header [data-hb-id="Heading"]',
    ],
  },
  {
    vendor: "Etsy",
    url: "etsy.com/listing",
    placement: ['.add-to-cart-form [data-selector="add-to-cart-button"]'],
    price_id_selectors: [
      '#listing-page-cart [data-selector="price-only"] > p:first-child',
    ],
    image_selectors: ['[data-perf-group="main-product-image"]'],
    name_selectors: ["h1"],
  },
]
const vendor_specs_matching = vendor_specs.filter((vendor) => {
  return window.location.href.includes(vendor.url)
})

const vendor_spec: Vendor_Spec =
  vendor_specs_matching.length > 0 ? vendor_specs_matching[0] : vendor_specs[0]
*/

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

  if (!vendor_spec) return

  const prices = queryAllSelectors(vendor_spec.price_id_selectors)
  const names = queryAllSelectors(vendor_spec.name_selectors).map(
    (p) => p.innerText
  )
  const images = queryAllSelectors<HTMLImageElement>(
    vendor_spec.image_selectors
  ).map((p) => p.src || p.srcset.split(" ")[0])

  log(prices[0].innerText, names[0], images[0])
  const data: PluginInvestData = {
    price: prices[0].innerText,
    name: names[0],
    imageUrl: images[0],
    productUrl: window.location.href,
  }
  const queryString = new URLSearchParams(data)
  open(`${HEIST_PLUGIN_ENDPOINT}/invest?${queryString.toString()}`, "_blank")
}

function populate_from_spec(spec: Vendor_Spec) {
  for (let j = 0; j < spec.placement.length; j++) {
    const selector = spec.placement[j]
    const parents = document.querySelectorAll(selector)
    for (let i = 0; i < parents.length; i++) {
      const button = parents[i]
      if (!button) continue

      const html = `
  <div class="heist_cta">
    HEIST
  </div>
  `
      const insertion = document.createElement("div")
      insertion.classList.add("heist_add_to_cart")
      insertion.addEventListener("click", heist_on_invest)
      insertion.innerHTML = html
      button.appendChild(insertion)

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
