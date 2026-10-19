# Veere Rooh — Next.js perfume storefront

A responsive frontend demo with product filtering, product detail drawer, cart, gift quiz, and a styled checkout drawer that prepares an order message for WhatsApp.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
1. Extract this ZIP.
2. Open the extracted `veere-rooh` folder in VS Code or PowerShell.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Checkout note
The checkout form opens WhatsApp with the entered delivery details and cart summary. It does not store orders in a database or collect online payments. The WhatsApp destination is configured in `app/page.js` on the `OrderDrawer` component.

## Main files
- `app/page.js` — homepage, product list, cart, quiz and product details
- `app/globals.css` — responsive site and drawer styling
- `components/OrderDrawer.js` — checkout form and WhatsApp handoff
- `lib/products.js` — demo product catalogue
