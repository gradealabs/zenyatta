# Zenyatta

Copies any file or directory to a destination directory

## Quick Start

    npm install @launchfort/zenyatta -S

To use the API:

    import zenyatta from '@launchfort/zenyatta'

    zenyatta([ 'src/', 'static' ], 'dest/')
      .then(() => console.log('step into the iris'))
      .catch(error => console.error(error))

To use the CLI:

    {
      "scripts": {
        "copy:assets": "zenyatta static/ --dest dest/public/ -V -N"
      }
    }

## CLI

    Usage: zenyatta srcfile srcfile ... --dest dir [options]

    Options:
      --config         Path to JSON config file
      --verbose, -V    Determines if elapsed time is logged                [boolean]
      --neweronly, -N  Only copy new files                [boolean] [default: false]
      --dest, -D       The destination directory                 [string] [required]
      --help           Show help                                           [boolean]

Example:

    node ./node_modules/.bin/zenyatta static/ --dest dest/public/ -V -N

Or in a `package.json` (installed locally):

    {
      "scripts": {
        "copy:assets": "zenyatta static/ --dest dest/public/ -V -N"
      }
    }

## API

**zenyatta(files, dest, options)**

Copies files and/or directories to a destination location.

Supported options:

- `newerOnly` {default: false} Only copy the file if newer than destination file
- `noDot` {default: true} Ignore files that start with '.'

*Copying Directories*

Directories are copied in their entirety, that is the entire directory itself.
However, if you only want the contents of a directory copied then suffix the
source directory path with `'/'` or `'\'`.

*Copying To Directories*

To copy to a directory *and* create it if doesn't exist then suffix the
destination directory path with `'/'` or `'\'`.

Example:

    import zenyatta from '@launchfort/zenyatta'

    // Copy all files in src into dest, where dest will be created if it doesn't
    // exist already. Also, copy the entire static directory to dest.
    // Ends up with something like: dest/index.js, dest/jquery.min.js
    zenyatta([ 'src/', 'static' ], 'dest/')
      .then(() => console.log('step into the iris'))
      .catch(error => console.error(error))

## Building

To build the source

    npm run build
    npm run build:node

To clean all generated folders

    npm run clean

## Testing

Unit tests are expected to be colocated next to the module/file they are testing
and have the following suffix `.test.js`.

To run unit tests through [istanbul](https://istanbul.js.org/) and
[mocha](http://mochajs.org/)

    npm test

## Maintainence

To check what modules in `node_modules` is outdated

    npm run audit

To update outdated modules while respecting the semver rules in the package.json

    npm update

To update a module to the latest major version (replacing what you have)

    npm install themodule@latest -S (if to save in dependencies)
    npm install themodule@latest -D (if to save in devDependencies)
