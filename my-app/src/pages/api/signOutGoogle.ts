import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: true }>
) {

  
  deleteCookie("google-oauth-example-token", {
    req,
    res,
    path: "/",
    // change to your hostname in production
    domain: "project491x492.vercel.app",
  });
  deleteCookie('google-oauth-example-token', { req, res });


  return res.json({ ok: true });
}
