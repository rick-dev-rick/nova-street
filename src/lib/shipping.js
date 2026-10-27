export function getShippingQuote(cep, subtotal) {
  if (typeof cep !== 'string' || !/^\d{5}-?\d{3}$/.test(cep.trim())) return null
  const digits = cep.replace('-', '').trim()
  if (/^(\d)\1{7}$/.test(digits) || !Number.isFinite(subtotal) || subtotal <= 0) return null
  const cents = Math.round(subtotal * 100)
  const cost = cents >= 29900 ? 0 : 19.9
  return { cep: digits, cost, total: (cents + Math.round(cost * 100)) / 100, estimatedDays: '5 a 8 dias úteis' }
}
