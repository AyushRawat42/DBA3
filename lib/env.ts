export const env = {
  APP_AWS_REGION: process.env.APP_AWS_REGION ?? "",
  APP_AWS_ACCESS_KEY_ID: process.env.APP_AWS_ACCESS_KEY_ID ?? "",
  APP_AWS_SECRET_ACCESS_KEY: process.env.APP_AWS_SECRET_ACCESS_KEY ?? "",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? "",
  DDB_TABLE_MAIN: process.env.DDB_TABLE_MAIN ?? "",
  DDB_TABLE_QUEUE: process.env.DDB_TABLE_QUEUE ?? "",
  DDB_TABLE_EVENTS: process.env.DDB_TABLE_EVENTS ?? "",
}
