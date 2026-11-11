export function validateCheckout(fields, emailInvalid) {
  const errors = {}
  if (!fields.name?.trim()) errors.name = 'Informe um nome fictício.'
  if (!fields.email?.trim()) errors.email = 'Informe um e-mail fictício.'
  else if (emailInvalid) errors.email = 'Informe um e-mail válido.'
  if (!fields.phone?.trim()) errors.phone = 'Informe um telefone fictício.'
  if (!fields.address?.trim()) errors.address = 'Informe um endereço fictício.'
  return errors
}
