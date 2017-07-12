import { cp } from '@gradealabs/fs-utils'

/**
 * Copies any source to a destination.
 *
 * The copy source can be a file or a directory. If the copy source is a
 * directory (ending with '/' or '\') then the contents of the directory will be
 * copied and not the directory itself. Otherwise if the source is a directory
 * then the entire directory will be copied.
 *
 * The copy destination can be a file or a directory.
 * If the copy destination is a directory or a path ending with '/' or '\' then
 * the basename of the source will be suffixed by the directory path. Any
 * directories that do not exist in the copy destination path will be created
 * during the copy.
 *
 * Options:
 * newerOnly  Only newer files will be copied (if the destination alredy exists)
 * noDot  Determines if dot files should be ignored
 */
export default function zenyatta (sources: {src:string, dest:string}[], { newerOnly = true, noDot = true } = {}) {
  return Promise.all(
    sources.map(x => cp(x.src, x.dest, { newerOnly, noDot }))
  )
}