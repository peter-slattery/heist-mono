export const authenticatedFetch = (
  jwt: string | null,
  input: RequestInfo,
  init?: RequestInit
) => {
  if (!jwt) {
    throw new Error(
      "Attempting to call authenticatedFetch before the user is logged in"
    )
  }
  const Authorization = `Bearer ${jwt}`
  if (!init) {
    init = {
      headers: {
        Authorization,
      },
    }
  } else if (!init.headers) {
    init.headers = {
      Authorization,
    }
  } else {
    throw new Error("init already had an Authorization header")
  }
  return fetch(input, init)
}
