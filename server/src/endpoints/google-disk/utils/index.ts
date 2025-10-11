import crypto from "crypto";

const base64URLEncode = (str: Buffer) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}

function generateCodeChallenge(verifier: string) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64URLEncode(hash);
}

function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

function generateAuthUrl(clientId: string, redirectUri: string, scopes: string, codeChallenge: string, sessionId: string) {
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256&` +
    `state=${sessionId}&` +
    `access_type=offline&` +
    `prompt=consent`;
}

export {
  base64URLEncode,
  generateCodeVerifier,
  generateCodeChallenge,
  generateSessionId,
  generateAuthUrl,
}