export const env = {
  AWS_REGION: process.env.AWS_REGION ?? process.env.APP_AWS_REGION ?? "ap-south-1",
  ADMISSIONS_TABLE_NAME: process.env.ADMISSIONS_TABLE_NAME ?? process.env.DDB_TABLE_MAIN ?? "",
  DDB_TABLE_MAIN: process.env.ADMISSIONS_TABLE_NAME ?? process.env.DDB_TABLE_MAIN ?? "",
}
