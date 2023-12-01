import { makeHandler } from "../functionHandler"

import { vendor_specs_json } from "./data/vendorSpec.ts"

export const handler = makeHandler(async (_event, _context) => {
  return vendor_specs_json
})
