import axios from "axios";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { CmuOAuthBasicInfo } from "../../../types/CmuOAuthBasicInfo"

type SuccessResponse = {
  ok: true;
};

type ErrorResponse = {
  ok: false;
  message: string;
};



export type SignInResponse = SuccessResponse | ErrorResponse;

async function getOAuthAccessTokenAsync(
  authorizationCode: string
): Promise<string | null> {
  try {

    const response = await axios.post(
      process.env.CMU_OAUTH_GET_TOKEN_URL as string,
      {},
      {
        params: {
          code: authorizationCode,
          redirect_uri: process.env.CMU_OAUTH_REDIRECT_URL,
          client_id: process.env.CMU_OAUTH_CLIENT_ID,
          client_secret: process.env.CMU_OAUTH_CLIENT_SECRET,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (err) {
    return null;
  }
}

async function getCMUBasicInfoAsync(accessToken: string) {
  try {
    const response = await axios.get(
      process.env.CMU_OAUTH_GET_BASIC_INFO as string,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }


    );
    return response.data as CmuOAuthBasicInfo;
  } catch (err) {
    return null;
  }
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse>
) {
  if (req.method !== "POST")
    return res.status(404).json({ ok: false, message: "Invalid HTTP method" });

  //validate authorizationCode
  const authorizationCode = await req.body.authorizationCode;
  if (typeof authorizationCode !== "string")
    return res
      .status(400)
      .json({ ok: false, message: "Invalid authorization code" });

  //get access token
  const accessToken = await getOAuthAccessTokenAsync(authorizationCode);
  if (!accessToken)
    return res
      .status(401)
      .json({ ok: false, message: "loading..." });

  //get basic info
  const cmuBasicInfo = await getCMUBasicInfoAsync(accessToken);
  if (!cmuBasicInfo)
    return res
      .status(400)
      .json({ ok: false, message: "Cannot get cmu basic info" });
      

  return res.json({ ok: true, ...cmuBasicInfo });
}





