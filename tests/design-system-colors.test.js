import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const css = readFileSync(new URL('../src/design-system/tokens.css', import.meta.url), 'utf8')
const declarations = selector => {
  const block = css.slice(css.indexOf(selector)).split('{')[1].split('}')[0]
  return Object.fromEntries([...block.matchAll(/(--nova-[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]))
}

const light = declarations(':root')
const dark = { ...light, ...declarations('[data-nova-theme="dark"]') }

function rgb(tokens, role) {
  let value = tokens[`--nova-color-${role}`]
  while (value?.startsWith('var(')) value = tokens[value.slice(4, -1)]
  assert.match(value ?? '', /^#[\da-f]{6}$/i, `Unresolved color role: ${role}`)
  return value.slice(1).match(/../g).map(channel => parseInt(channel, 16))
}

function luminance(channels) {
  const [red, green, blue] = channels.map(channel => {
    const srgb = channel / 255
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
  })
  return red * 0.2126 + green * 0.7152 + blue * 0.0722
}

function checkContrast(tokens, foreground, background, minimum) {
  const fg = luminance(rgb(tokens, foreground))
  const bg = luminance(rgb(tokens, background))
  const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05)
  assert.ok(ratio >= minimum, `${foreground}/${background}: ${ratio.toFixed(2)}:1 (minimum ${minimum}:1)`)
}

for (const [theme, tokens] of Object.entries({ light, dark })) {
  test(`${theme} theme: text, brand accent and feedback meet 4.5:1`, () => {
    for (const background of ['bg', 'surface']) {
      for (const foreground of ['text', 'text-muted', 'accent', 'success', 'warning', 'error', 'info']) {
        checkContrast(tokens, foreground, background, 4.5)
      }
    }
    for (const status of ['success', 'warning', 'error', 'info']) {
      checkContrast(tokens, status, `${status}-surface`, 4.5)
    }
    for (const background of ['action', 'action-hover']) {
      checkContrast(tokens, 'on-action', background, 4.5)
    }
    checkContrast(tokens, 'on-inverse', 'inverse', 4.5)
    checkContrast(tokens, 'on-disabled', 'disabled', 4.5)
  })

  test(`${theme} theme: controls and focus indicators meet 3:1`, () => {
    for (const background of ['bg', 'surface', 'field']) {
      for (const foreground of ['control-border', 'focus', 'error']) {
        checkContrast(tokens, foreground, background, 3)
      }
    }
    for (const background of ['bg', 'surface']) {
      for (const foreground of ['action', 'action-hover']) {
        checkContrast(tokens, foreground, background, 3)
      }
    }
    checkContrast(tokens, 'text', 'field', 4.5)
    checkContrast(tokens, 'text-muted', 'field', 4.5)
  })
}
