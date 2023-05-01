export interface MongooseSchematicOptions {
  name: string
  path?: string
  spec?: boolean
  dto?: boolean
  module?: string
  language?: string
  sourceRoot?: string
  skipImport?: boolean
}
