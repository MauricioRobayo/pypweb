export function percentEncodeParams(params: {
  body: string;
  subject: string;
}): string {
  /*
    Do not use url.searchParams or URLSearchParams

    URLSearchParams turns spaces into '+':
        https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#examples

    For 'mailto' links, URI should be percent encoded.

    Some email clients will render the '+' and not properly replace it with spaces,
    specifically mobile apps.

    We percentEncode the body so it uses %20 instead of spaces and so those are
    not going to be with '+' by searchParams.

    Percent encoding is according to the spec:
        https://datatracker.ietf.org/doc/html/rfc6068#ref-STD66
  */

  const searchParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return searchParams;
}
