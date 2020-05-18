export class FetchError extends Error {
  constructor(message = 'There was an error fetching data.') {
    super(message)
    this.name = 'Fetch Error'
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }
  }
}
