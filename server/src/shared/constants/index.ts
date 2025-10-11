const PORT = 5000;
const GOOGLE_QAUTH__CLIENT_ID = "526945870433-ri1h0denci3ht0l06nunaes5mk10018c.apps.googleusercontent.com"
const CLIENT_SECRET = process.env.GOOGLE_QAUTH__CLIENT_SECRET ?? "" // without auntification the app, only with secret key

export {
  GOOGLE_QAUTH__CLIENT_ID,
  CLIENT_SECRET,
  PORT,
}
