# Capital H – Conversational AI Chatbot Website

Capital H is a minimal, user-friendly conversational AI chatbot website built with Next.js. It enables users to interact naturally with a smart assistant, while ensuring safe and relevant responses through a guiderail system. The project is designed for marketing and SEO, with a clean landing page and support for user authentication.

## Features

- Conversational AI integration (like ChatGPT)
- Controlled guiderail system for safe and relevant responses
- Minimal, user-friendly landing page
- User authentication system
- SEO-friendly metadata and Open Graph support

## Environment Variables

Create the following files in the project root:

- `.env.development` — for development environment
- `.env.production` — for production environment

Example contents:

```
# .env.development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

**Note:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

Do not commit your real `.env.*` files with secrets to version control. The `.gitignore` is already set up to ignore them.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## SEO & Social Sharing

- All metadata, Open Graph, and Twitter card tags are set in `app/layout.tsx` for optimal SEO and sharing.
- Update `NEXT_PUBLIC_SITE_URL` in your environment files to match your deployment domain.
- Place your favicon and Open Graph image (`/public/og-image.png`) in the `public` directory.

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform. For more, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

For more information, see the [Next.js Documentation](https://nextjs.org/docs) or [Learn Next.js](https://nextjs.org/learn).
