import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { JWTPayload } from "../../types/JWTPayload";

type SuccessResponse = {
  ok: true;
  cmuAccount: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  itaccounttype_id: string;
  itaccounttype_EN: string;
  organization_code: string;
  organization_name_EN: string;
  // role_name: string;
  // MAJOR_NAME_TH: string;
};

type ErrorResponse = {
  ok: false;
  message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WhoAmIResponse>
) {
  if (req.method !== "GET")
    return res.status(404).json({ ok: false, message: "Invalid HTTP method" });

  const token = getCookie("cmu-oauth-example-token", { req, res });

  //validate token
  if (typeof token !== "string")
    return res.status(401).json({ ok: false, message: "Invalid token" });
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    return res.json({
      ok: true,
      cmuAccount: decoded.cmuAccount,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      studentId: decoded.studentId,
      itaccounttype_id: decoded.itaccounttype_id,
      itaccounttype_EN: decoded.itaccounttype_EN,
      organization_code: decoded.organization_code,
      organization_name_EN: decoded.organization_name_EN,
      // role_name: decoded.role_name,
      // MAJOR_NAME_TH: decoded.MAJOR_NAME_TH,
    });
  } catch (error) {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
}
