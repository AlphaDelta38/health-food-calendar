import { CLIENT_SECRET, GOOGLE_QAUTH__CLIENT_ID, PORT } from "@/shared/constants/index.js";
import { generateAuthUrl, generateCodeChallenge, generateCodeVerifier, generateSessionId } from "@google/utils/index.js";
import { AuthGoogleServiceProps } from "@google/types/services.js";
import { CustomError } from "@/shared/utils/error-handler.js";
import { GOOGLE_TOKEN_URL } from "@/shared/constants/api-url.js";
import { writeFile } from "@/shared/utils/file.js";
import axios from "axios";

const CLIENT_ID = GOOGLE_QAUTH__CLIENT_ID;
const REDIRECT_URI = `http://localhost:${PORT}/google-disk/auth/callback`;
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const codeVerifierMap: Record<string, string> = {};

async function authGoogleDiskService(): Promise<string> {
  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);

  const sessionId = generateSessionId();
  codeVerifierMap[sessionId] = verifier;

  const authUrl = generateAuthUrl(
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES,
    challenge,
    sessionId
  )

  return authUrl;
}

async function authGoogleDiskCallbackService({ code, state }: AuthGoogleServiceProps): Promise<void> {
  const verifier = codeVerifierMap[state];

  if (!code || !state || !verifier) {
    throw new CustomError("Missing code or invalid session", {
      status: 400,
    });
  }

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    code_verifier: verifier,
    redirect_uri: REDIRECT_URI
  });

  const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  
  const { access_token, refresh_token } = tokenResponse.data;

  if (!access_token || !refresh_token) {
    throw new CustomError("Missing access or refresh token", {
      status: 400,
    });
  }

  writeFile("google-disk-token", {
    access_token,
    refresh_token,
  });

}


export {
  authGoogleDiskService,
  authGoogleDiskCallbackService,
}
