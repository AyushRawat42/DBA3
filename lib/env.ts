export const env = {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? "",
  DDB_TABLE_MAIN: process.env.DDB_TABLE_MAIN ?? "",
  DDB_TABLE_QUEUE: process.env.DDB_TABLE_QUEUE ?? "",
  DDB_TABLE_EVENTS: process.env.DDB_TABLE_EVENTS ?? "",
}
