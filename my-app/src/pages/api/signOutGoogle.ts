import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: true }>
) {

  
  deleteCookie("google-oauth-example-token", {
    req,
    res,
  });

    // Redirect to the homepagea
    res.writeHead(302, { Location: "/" });
    res.end();
  return res.json({ ok: true });
}
