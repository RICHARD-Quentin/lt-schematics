import {
  Rule,
  apply,
  mergeWith,
  move,
  url,
  branchAndMerge,
  template,
  MergeStrategy,
  chain,
  filter,
} from '@angular-devkit/schematics'
import { strings } from '@angular-devkit/core'
import { Tree } from '@angular-devkit/schematics/src/tree/interface'
import 'reflect-metadata'
import { ModuleFinder, ModuleDeclarator } from '../../utils'
import { InheritSchematicOptions } from './inherit.options.interface'
export function inheritSchematic(options: InheritSchematicOptions): Rule {
  return () => {
    const getDtoFiles = options.dto
    const getSpecFiles = options.spec
    options.inheritPath = `${options.inheritPath}/${options.inheritName}`
    const sourceTemplates = url('./files')
    const templateSource = apply(sourceTemplates, [
      filter((path) => {
        if (path.endsWith('.spec.ts')) {
          return getSpecFiles
        }
        if (path.endsWith('.dto.ts')) {
          return getDtoFiles
        }
        return true
      }),
      template({
        ...strings,
        ...options,
      }),
      move(`${options.path}/${options.name}`),
    ])

    return branchAndMerge(
      chain([
        mergeWith(templateSource, MergeStrategy.Overwrite),
        addDeclarationToModule(options),
      ]),
    )
  }
}

function addDeclarationToModule(options: any) {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path,
    })
    if (!options.module) {
      return tree
    }
    const contentBuffer = tree.read(options.module)
    if (!contentBuffer) {
      return tree
    }
    const content = contentBuffer.toString()
    const declarator = new ModuleDeclarator()
    tree.overwrite(
      options.module,
      declarator.declare(content, {
        ...options,
        metadata: 'imports',
        path: `${options.path}/${options.name}`,
        type: 'module',
      }),
    )
    return tree
  }
}
