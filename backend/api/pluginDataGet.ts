import { makeHandler } from "../functionHandler"

import { vendor_specs } from "./data/vendorSpec.ts"

export const handler = makeHandler(async (_event, _context) => {
  return JSON.stringify(vendor_specs)
})
