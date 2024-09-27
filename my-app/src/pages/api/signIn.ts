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

  setCookie("test-token", 'value')

  if (typeof process.env.JWT_SECRET !== "string")
    throw "Please assign jwt secret in .env!";

  try {

    const token = jwt.sign(
      {

        cmuAccount: cmuBasicInfo.cmuitaccount,
        firstName: cmuBasicInfo.firstname_EN,
        lastName: cmuBasicInfo.lastname_EN,
        studentId: cmuBasicInfo.student_id, //Note that not everyone has this. Teachers and CMU Staffs don't have student id!
        organization_name_EN: cmuBasicInfo.organization_name_EN,
        itaccounttype_EN: cmuBasicInfo.itaccounttype_EN,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );


    setCookie("cmu-oauth-example-token", token, {
      maxAge: 3600 * 24,
      secure: true,
      sameSite: 'none',
  
    });


  } catch (error) {
    console.error('JWT Signing Error:', error);
  }


  // const token = jwt.sign(
  //   {
  //     cmuAccount: cmuBasicInfo.cmuitaccount,
  //     firstName: cmuBasicInfo.firstname_EN,
  //     lastName: cmuBasicInfo.lastname_EN,
  //     studentId: cmuBasicInfo.student_id, //Note that not everyone has this. Teachers and CMU Staffs don't have student id!
  //     organization_name_EN: cmuBasicInfo.organization_name_EN,
  //     itaccounttype_EN: cmuBasicInfo.itaccounttype_EN,
  //   },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "24h", // Token will last for one hour only
  //   }
  // );

  // setCookie("test-token", 'test')

  //Write token in cookie storage of client's browser
  //Note that this is server side code. We can write client cookie from the server. This is normal.
  //You can view cookie in the browser devtools (F12). Open tab "Application" -> "Cookies"
  


  return res.json({ ok: true });
}





