export const DEMO_SHIPPING_CEP = '12345678'

export function normalizeShippingCep(value) {
  if (typeof value !== 'string' || !/^\d{5}-?\d{3}$/.test(value.trim())) return null
  const digits = value.trim().replace('-', '')
  return /^(\d)\1{7}$/.test(digits) ? null : digits
}

export function formatShippingCep(digits) {
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export function getShippingQuote(cep, subtotal) {
  const digits = normalizeShippingCep(cep)
  if (!digits || !Number.isFinite(subtotal) || subtotal <= 0) return null
  const cents = Math.round(subtotal * 100)
  const cost = cents >= 29900 ? 0 : 19.9
  return { cep: digits, cost, total: (cents + Math.round(cost * 100)) / 100, estimatedDays: '5 a 8 dias úteis' }
}
