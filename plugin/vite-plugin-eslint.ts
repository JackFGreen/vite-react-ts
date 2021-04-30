import path from 'path'
import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { ESLint } from 'eslint'
import { ESLintOptions } from 'eslint/lib/eslint/eslint'

export interface Options extends ESLintOptions {
  include: FilterPattern
  exclude?: FilterPattern
  formatter?: any
  fix?: boolean
}

function normalizePath(id: string) {
  return path.relative(process.cwd(), id).split(path.sep).join('/')
}

let isDevServer = false

export default function eslint(options: Options): Plugin {
  const eslint = new ESLint()

  const filter = createFilter(options.include, options.exclude || /node_modules/)

  return {
    name: 'vite-plugin-eslint',

    async transform(_, id) {
      const file = normalizePath(id)

      if (!filter(id) || (await eslint.isPathIgnored(file))) {
        return null
      }

      let formatter = null

      switch (typeof options.formatter) {
        case 'string':
          formatter = await eslint.loadFormatter(options.formatter)
          break
        case 'function':
          ;({ formatter } = options)
          break
        default:
          formatter = await eslint.loadFormatter('stylish')
      }

      const report = await eslint.lintFiles(file)

      const hasWarnings = report.some(result => result.warningCount !== 0)
      const hasErrors = report.some(result => result.errorCount !== 0)

      const result = formatter.format(report)

      if (options.fix && report) {
        ESLint.outputFixes(report)
      }

      if (hasWarnings) {
        // warn: wont stop rollup
        this.warn(result)
      }

      if (hasErrors) {
        if (isDevServer) {
          // error: will stop rollup
          this.error(result)
        } else {
          // avoid duplicate error
          console.log(result)
          this.error('ESLint error')
        }
      }

      return null
    },

    configureServer() {
      isDevServer = true
    }
  }
}
