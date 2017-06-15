#!/usr/bin/env node
import * as path from 'path'
import * as yargs from 'yargs'
import zenyatta from './index'

if (require.main === module) {
  yargs(process.argv.slice(2))
    .usage('Usage: zenyatta srcfile srcfile ... --dest dir [options]')
    .env('COPY_ASSETS')
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
      'dest': {
        alias: 'D',
        type: 'string',
        normalize: true,
        demandOption: true,
        describe: 'The destination directory'
      }
    })
    .help()

  const argv = yargs.argv

  if (argv._.length === 0) {
    yargs.showHelp()
  } else {
    /** @type {string} */
    let dest = argv.dest
    // Ensure dest has a trailing slash
    dest = dest.replace(/\/$|\\$/, '').replace(/\/|\\/g, path.sep) + path.sep
    const start = new Date().getTime()
    zenyatta(argv._, dest, { newerOnly: argv.newerOnly })
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
