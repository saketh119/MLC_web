This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Vaani – MLC AI Chatbot

Vaani is an interactive AI chatbot integrated into this website for the Machine Learning Club (MLC) at VIT-AP.

You can start editing the chatbot by modifying src/app/components/chatData.js to add new questions, answers, or keywords. The chat interface will update automatically as you make changes.

*Features*
WhatsApp-style rounded chat bubbles with smooth animations
Typing indicator while Vaani “thinks”
Auto-scroll to the latest message
Keyword-based responses from chatData.js
Optional Hugging Face AI responses (with 3-second timeout & fallback)
Responsive and mobile-friendly

*Usage*
Click the 💬 chat button, type a message, and Vaani will reply. If AI takes too long, it falls back to pre-defined answers or displays:
"Sorry, Vaani is taking too long to respond. Try again!"

*Tech Stack*

Next.js 13, Tailwind CSS + Tailwind Animate, React Hooks, Hugging Face Inference API


<!-- Admin UI removed -->
