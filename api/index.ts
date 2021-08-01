import { VercelRequest, VercelResponse } from "@vercel/node";
import got from "got";
import validUrl from "valid-url";

export default async (request: VercelRequest, response: VercelResponse) => {
  const { url = null } = request.query;
  if (url === null) {
    response.status(400).json({ error: `Missing url parameter.` });
    return;
  }
  if (typeof url !== "string") {
    response.status(400).json({ error: `url parameter must be string.` });
    return;
  }

  const fetchedResponse = await got(url).text();

  if (!validUrl.isWebUri(fetchedResponse)) {
    response.status(400).json({ error: `response is not web uri.` });
    return;
  }

  response.redirect(302, fetchedResponse);
};
