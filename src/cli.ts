#!/usr/bin/env node
import * as path from 'path'
import * as yargs from 'yargs'
import zenyatta from './index'

if (require.main === module) {
  yargs(process.argv.slice(2))
    .usage('Usage: zenyatta src[:dest] src[:dest] ... [options]')
    .env('ZENYATTA')
    .config()
    .options({
      'verbose': {
        alias: 'V',
        type: 'boolean',
        describe: 'Determines if elapsed time is logged'
      },
      'neweronly': {
        alias: 'N',
        type: 'boolean',
        default: false,
        describe: 'Only copy new files'
      },
      'nodot': {
        type: 'boolean',
        default: true,
        describe: 'Do not copy files starting with "."'
      },
      'dest': {
        alias: 'D',
        type: 'string',
        normalize: true,
        default: '.',
        describe: 'The default destination directory'
      }
    })
    .help()

  const argv = yargs.argv

  if (argv._.length === 0) {
    yargs.showHelp()
  } else {
    /** @type {string} */
    let {
      dest: defaultDest,
      _: sources,
      neweronly: newerOnly,
      nodot: noDot
    } = argv
    // Ensure dest has a trailing slash
    defaultDest = defaultDest
      .replace(/\/$|\\$/, '')
      .replace(/\/|\\/g, path.sep) + path.sep

    sources = sources.map(x => {
      const [ src, dest = defaultDest ] = x.split(':')
      return { src, dest }
    })

    const start = new Date().getTime()
    zenyatta(sources, { newerOnly, noDot })
      .then(() => new Date().getTime() - start)
      .then(elapsed => {
        if (argv.verbose) {
          console.log(
            'Zenyatta complete!', (elapsed / 1000).toFixed(2), 'seconds'
          )
        }
      })
      .catch(error => console.error(error))
  }
} else {
  throw new Error(
    'zenyatta/cli is only meant to be run at the command line'
  )
}
