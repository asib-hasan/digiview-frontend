import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serverDir = path.resolve(__dirname, '../.output/server')
const serverPackageJsonPath = path.join(serverDir, 'package.json')
const serverNpmrcPath = path.join(serverDir, '.npmrc')

if (fs.existsSync(serverPackageJsonPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(serverPackageJsonPath, 'utf8'))
    
    pkg.scripts = {
      build: "node -e \"console.log('Build completed successfully')\"",
      start: "node index.mjs"
    }

    // Remove overrides in server package.json to prevent EOVERRIDE conflicts
    delete pkg.overrides

    fs.writeFileSync(serverPackageJsonPath, JSON.stringify(pkg, null, 2), 'utf8')
    // Set legacy-peer-deps=true so npm install runs smoothly without peer conflict
    fs.writeFileSync(serverNpmrcPath, 'legacy-peer-deps=true\n', 'utf8')
    console.log('✔ Successfully patched .output/server/package.json & .npmrc for Hostinger deployment!')
  } catch (err) {
    console.error('Failed to patch .output/server/package.json:', err)
  }
}
