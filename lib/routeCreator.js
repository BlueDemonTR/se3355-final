import assert from 'assert'
import fs from 'fs/promises'

function isCorrectFile(fileName, fileType) {
  return fileName.endsWith(fileType)
}

function normalizeFileName(fileName, fileType) {
  return fileName
    .replace(fileType, '')
    .split('\\')
    .filter(x => x)
    .reduce(
      (prev, curr) => prev + '/' + curr,
      ''
    )
}

async function getConnectionObject(directoryName, fileType = '.js', getPaths = false) {
  const ret = new Map()
  const files = []
  const folders = []

  const _search = await fs.readdir(directoryName)

  for (const fileName of _search) {
    const _path = `${directoryName}\\${fileName}`

    const stat = await fs.stat(_path)

    if (stat.isDirectory()) {
      folders.push(_path)
    } else if (isCorrectFile(_path, fileType)) {
      files.push(_path)
    }
  }

  do {
    const fold = folders.pop()

    if(!fold) break

    assert(typeof fold === 'string')

    const _search = await fs.readdir(fold)

    for (const fileName of _search) {
      const _path = `${fold}\\${fileName}`

      const stat = await fs.stat(_path)

      if (stat.isDirectory()) {
        folders.push(_path)
      } else if (isCorrectFile(_path, fileType)) {
        files.push(_path)
      }
    }
  } while (folders.length > 0)

  for (const path of files) {
    if (path.endsWith('index.js')) continue

    const normalized = normalizeFileName(path.replace(directoryName, ''), fileType)

    ret.set(normalized, getPaths 
      ? path
      : require(path).default
    )
  }

  return ret
}

export default getConnectionObject
