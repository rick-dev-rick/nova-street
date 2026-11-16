import { lazy, useState } from 'react'
import { getProductPage, loadProductPage } from '../lib/product-route.js'

const LazyProductPage = lazy(loadProductPage)

export default function ProductRoute(props) {
  const [Page] = useState(() => getProductPage() ?? LazyProductPage)
  return <Page {...props} />
}
