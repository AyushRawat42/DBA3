export async function GET() {
  return Response.json({
    APP_AWS_REGION: process.env.APP_AWS_REGION ?? "MISSING",
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? "MISSING",
    DDB_TABLE_MAIN: process.env.DDB_TABLE_MAIN ?? "MISSING",
    hasKey: !!process.env.APP_AWS_ACCESS_KEY_ID,
    hasSecret: !!process.env.APP_AWS_SECRET_ACCESS_KEY,
  })
}
