#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
// CJS entry per package.json main field
const distCjsEntry = resolve(root, 'dist-cjs', 'index.js')

if (existsSync(distCjsEntry)) {
  console.log('[tailwind-theme] dist already present, skipping build')
  process.exit(0)
}

console.log('[tailwind-theme] dist missing, running build via yarn script')
const result = spawnSync('yarn', ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
})

if (result.status !== 0) {
  console.error('[tailwind-theme] build failed')
  process.exit(result.status || 1)
}
