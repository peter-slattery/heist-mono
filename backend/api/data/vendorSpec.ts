import { Vendor_Spec } from "@heist/common/contracts"

export const vendor_specs: Vendor_Spec[] = [
  {
    vendor: "A NEW VENDOR",
    url: "www.peter-slattery.com",
    placement: [],
    image_selectors: [],
    name_selectors: [],
    price_id_selectors: [],
  },
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

export const vendor_specs_json = JSON.stringify(vendor_specs)
