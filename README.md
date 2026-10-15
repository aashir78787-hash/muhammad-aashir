# Muhammad Aashir - Professional Portfolio Website

A fully responsive, highly-polished, one-page portfolio website showcasing web development and digital marketing projects. Built with Vite, React, and Tailwind CSS.

## Features

- **Dynamic Interactive Work Rail**: Horizontal drag-to-scroll carousel featuring live production websites with 3D tilt effects, synchronized progress indicators, and a carousel counter.
- **Micro-interactions & Smooth Scrolling**: Custom cursor glow trailing effect, header scroll states, and smooth anchor navigation between `#about`, `#skills`, `#projects`, and `#contact`.
- **Offline-ready Assets**: Fully embedded SVG representations of project mockups and local assets to ensure maximum loading speeds and no reliance on third-party image CDNs.
- **Secure Contact Form**: Seamless contact form integrated with client-side validation and environment-configurable endpoints.

---

## Getting Started Locally

### 1. Installation

Install all required npm dependencies:
```bash
npm install
```

### 2. Environment Configuration

Copy the `.env.example` file to create your local `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your Formspree endpoint or any custom POST API route:
```env
VITE_CONTACT_FORM_ENDPOINT="https://formspree.io/f/YOUR_FORM_ID"
```

### 3. Start Development Server

Run the local development server:
```bash
npm run dev
```
The app will be active at `http://localhost:3000`.

---

## Deploying to Vercel

### Method 1: Via Vercel CLI (Zero Configuration)

Ensure you have the Vercel CLI installed globally (`npm install -g vercel`). Then run:

```bash
# Login to your Vercel account
vercel login

# Deploy draft version
vercel

# Deploy to production
vercel --prod
```

### Method 2: Via GitHub Integration

1. Push your project code to a GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** → **Project**.
3. Import your GitHub repository.
4. Set the following Build & Development Settings (Vercel automatically detects these as standard Vite presets):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. In the **Environment Variables** accordion, add:
   - **Name**: `VITE_CONTACT_FORM_ENDPOINT`
   - **Value**: `https://formspree.io/f/your_form_id` (Replace with your actual Formspree ID)
6. Click **Deploy**.

---

## License

Created by Muhammad Aashir. All rights reserved.
