# Capital H – Conversational AI Chatbot Website

Capital H is a minimal, user-friendly conversational AI chatbot website built with Next.js. It enables users to interact naturally with a smart assistant, while ensuring safe and relevant responses through a guiderail system. The project is designed for marketing and SEO, with a clean landing page and support for user authentication.

## 🚀 Live Demo

**[View Live Demo →](https://capital-h.vercel.app)**

Experience the conversational AI chatbot in action at: https://capital-h.vercel.app

## ✨ Features

- 🤖 Conversational AI integration (like ChatGPT)
- 🛡️ Controlled guiderail system for safe and relevant responses
- 🎨 Minimal, user-friendly landing page with dark/light theme support
- 🔐 User authentication system
- 📱 Responsive design with mobile-first approach
- 🎯 SEO-friendly metadata and Open Graph support
- ⚡ Built with Next.js 15 and TypeScript
- 🐳 Docker support for development and production
- 🎨 Tailwind CSS for styling with custom themes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom themes
- **UI Components**: shadcn/ui
- **Runtime**: Bun (development)
- **Deployment**: Vercel
- **Containerization**: Docker (optional)

## 📋 Environment Variables

Create the following files in the project root:

- `.env.development` — for development environment
- `.env.production` — for production environment

Example contents:

```bash
# .env.development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env.production
NEXT_PUBLIC_SITE_URL=https://capital-h.vercel.app
```

**Note:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

Do not commit your real `.env.*` files with secrets to version control. The `.gitignore` is already set up to ignore them.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/capital_h.git
   cd capital_h
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.development
   # Edit .env.development with your settings
   ```

### Development

Run the development server:

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

### Docker Development (Optional)

For containerized development:

```bash
# Build and start development container
docker-compose up --build

# Or use the development script
chmod +x docker-dev-start.sh
./docker-dev-start.sh
```

## 🎨 Customization

### Theme Configuration

The project supports light and dark themes with custom colors:

- Edit theme colors in `app/globals.css`
- Customize component styles using Tailwind classes
- Theme toggle component available in the header

### Adding New Features

1. Create components in the `components/` directory
2. Add new pages in the `app/` directory
3. Update TypeScript types in the `types/` directory

## 📱 SEO & Social Sharing

- All metadata, Open Graph, and Twitter card tags are set in `app/layout.tsx` for optimal SEO and sharing
- Update `NEXT_PUBLIC_SITE_URL` in your environment files to match your deployment domain
- Place your favicon and Open Graph image (`/public/og-image.png`) in the `public` directory

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel:**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Set environment variables** in your Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`

### Other Platforms

Deploy easily on any platform that supports Next.js. For more details, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## 📁 Project Structure

```
capital_h/
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Home page group
│   ├── about/             # About page
│   ├── globals.css        # Global styles and theme variables
│   └── layout.tsx         # Root layout with metadata
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Custom components
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── docker-compose.yml    # Docker configuration
└── README.md            # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
