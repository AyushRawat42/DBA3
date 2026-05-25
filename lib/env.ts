export const env = {
  ADMISSIONS_TABLE_NAME: process.env.ADMISSIONS_TABLE_NAME ?? process.env.DDB_TABLE_MAIN ?? "",
  DDB_TABLE_MAIN: process.env.ADMISSIONS_TABLE_NAME ?? process.env.DDB_TABLE_MAIN ?? "",
}
