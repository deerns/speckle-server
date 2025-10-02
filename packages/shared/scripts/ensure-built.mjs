#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const distEntry = resolve(root, 'dist', 'commonjs', 'index.js')

if (existsSync(distEntry)) {
  console.log('[shared] dist already present, skipping build')
  process.exit(0)
}

console.log('[shared] dist missing, running build via yarn script')
// Use Yarn to run the declared build script so it works under PnP (no node_modules/.bin)
const result = spawnSync('yarn', ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
})

if (result.status !== 0) {
  console.error('[shared] build failed')
  process.exit(result.status || 1)
}
