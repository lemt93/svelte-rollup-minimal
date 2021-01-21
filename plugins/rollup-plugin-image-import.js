import fs from 'fs'
import path from 'path'

export default function rollupPluginImageImport() {
  // Only support JPG
  
  return {
    resolveId(source, importer) {
      if (source.endsWith('.jpg')) {
        return path.resolve(path.dirname(importer), source);
      }
    },
    load(id) {
      if (id.endsWith('.jpg')) {
        const referenceId = this.emitFile({
          type: 'asset',
          name: path.basename(id) ,
          source: fs.readFileSync(id)
        })
        
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
      }
    }
  }
}
