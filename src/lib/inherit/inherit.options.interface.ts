export interface InheritSchematicOptions {
  name: string
  inheritName: string
  inheritPath: string
  path?: string
  spec?: boolean
  dto?: boolean
  module?: string
  language?: string
  sourceRoot?: string
  skipImport?: boolean
}
