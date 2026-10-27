# Storefront Completion Implementation Plan

> Execute directly using superpowers:executing-plans; user authorized automatic implementation.

**Goal:** Complete the remaining NØVA STREET requirements before moving to the rick_dev Freelancer portfolio.
**Architecture:** Reuse React/Vite/CSS, existing product data, cart and favorites. Add small components and pure shipping utilities. Publish through the existing GitHub Pages workflow.
**Spec:** Current user brief: frontend-only demo store, organized components, quantity selection, visual freight calculation, Home best sellers/lifestyle/final CTA; no backend or payment.

## Global Constraints
- Preserve current GitHub Pages hash routing and /nova-street/ assets.
- No backend, carrier lookup, real payment or invented live Instagram feed.
- Demo shipping: R$19.90 below R$299; free at/above R$299. Format-only CEP validation; reject repeated digits.
- Cart quantity remains 1..99; one shared normalization function.
- Small components; no monolithic App.

## Review Focus
- Changing cart subtotal recalculates free/paid shipping.
- Invalid or empty CEP cannot produce a shipping quote or completed checkout.
- Selected quantity reaches the correct size variant.
- New Home cards retain favorites and valid links.
- GitHub Pages routes and reload keep working.

### Task 1: Product quantity
- Add normalizeQuantity to cart.js and reuse it in a QuantitySelector component and Product.
- Existing quantity boundary tests must remain green; add coverage for numeric strings/fractions and selected-quantity cart increments.
- Verify: npm test.

### Task 2: Shipping simulation
- Write shipping.test.js first: valid formatted CEP; malformed/repeated CEP rejection; 298.99 paid; 299 free; subtotal change reflects quote.
- Create shipping.js pure utilities, ShippingCalculator.jsx and shared App CEP state.
- Cart and Checkout consume the same derived quote; show subtotal, demo shipping and total. Checkout requires a valid quote and snapshots confirmation totals.
- Drawer displays consistent shipping status and partial/total amount.
- Verify: npm test; manual paid/free/invalid quote and checkout.

### Task 3: Home completion
- Create BestSellers, Lifestyle and FinalCTA components. Curated bestseller data identified as illustrative; editorial photos are illustrative and link to catalog.
- Hero image grayscale, preserve black/white/red identity and existing categories/new arrivals.
- Verify: production build and browser layout/navigation.

### Task 4: Review and publish
- Run full tests and GitHub Pages build; review independently.
- Push reviewed files using GitHub plugin with expected-head guard.
- Confirm GitHub Actions success and live product/cart/checkout/Home behavior.
