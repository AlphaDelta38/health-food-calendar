import { Request } from "express";

export type AuthGoogleServiceProps = {
  code: string;
  state: string;
}

export type AuthGoogleServiceReq = Request<{}, {}, {}, AuthGoogleServiceProps>;