import { translateObjectToAttributeValueRecord } from "./dynamoDbClient"

describe("translateObjectToAttributeValueRecord", () => {
  test("{} -> {}", () => {
    const input = {}
    const out = translateObjectToAttributeValueRecord(input)
    expect(out).toStrictEqual({})
  })

  test("strings translate to S: <value>", () => {
    const input = {
      value: "some string",
    }
    const out = translateObjectToAttributeValueRecord(input)
    expect(out).toStrictEqual({
      value: {
        S: "some string",
      },
    })
  })

  test("undefined is omitted", () => {
    const input = {
      a: undefined,
      b: "some other value",
    }
    const out = translateObjectToAttributeValueRecord(input)
    expect(out).toStrictEqual({
      b: {
        S: "some other value",
      },
    })
  })
})
