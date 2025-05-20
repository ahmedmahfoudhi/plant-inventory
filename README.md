# Plant Inventory

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://plant-inventory-seven.vercel.app/)

A **plant inventory management** application built with **Next.js 15** and modern UI libraries. This project was created for learning purposes to refresh my knowledge of Next.js and related technologies.

## 🚀 Live Demo

Access the deployed app on Vercel: [https://plant-inventory-seven.vercel.app/](https://plant-inventory-seven.vercel.app/)

## 🔧 Tech Stack & Tools

<p align="center">
  <!-- Core framework -->
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-black?logo=next.js" alt="Next.js" />
  </a>
  <!-- Language -->
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript" alt="TypeScript" />
  </a>
  <!-- ORM & DB -->
  <a href="https://prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-2F2E82?logo=prisma" alt="Prisma" />
  </a>
  <a href="https://neon.tech/">
    <img src="https://img.shields.io/badge/Neon-14B8A6?logo=neon" alt="Neon" />
  </a>
  <a href="https://postgresql.org/">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql" alt="PostgreSQL" />
  </a>
  <!-- UI -->
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css" alt="Tailwind CSS" />
  </a>
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/Shadcn_UI-F6E05E?logo=shadcn" alt="Shadcn UI" />
  </a>
  <!-- Forms & validation -->
  <a href="https://react-hook-form.com/">
    <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform" alt="React Hook Form" />
  </a>
  <a href="https://zod.dev/">
    <img src="https://img.shields.io/badge/Zod-000000?logo=zod" alt="Zod" />
  </a>
  <!-- File uploads -->
  <a href="https://uploadthing.com/">
    <img src="https://img.shields.io/badge/UploadThing-007FFF?logo=uploadthing" alt="UploadThing" />
  </a>
  <!-- Auth -->
  <a href="https://stackauth.com/">
    <img src="https://img.shields.io/badge/Stack_Auth-FF6B6B?logo=stackexchange" alt="Stack Auth" />
  </a>

</p>

## 🚀 Features

* **List & Search Plants**: View all plants with server-side data fetching and real-time search filtering.
* **Add / Edit Plants**: Manage plant records via modal dialogs and Next.js Server Actions.
* **Image Upload**: Upload and manage plant photos using UploadThing.
* **Form Validation**: Client-side form schemas and runtime validation with Zod & React Hook Form.
* **Authentication**: User sign-in and session handling with Stack Auth.
* **Responsive UI**: Built with Shadcn UI components on top of Tailwind CSS for a sleek, responsive design.

## 📦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmedmahfoudhi/plant-inventory.git
   cd plant-inventory
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**

   * Copy `.env.example` to `.env.local` and set:

     ```bash
    NEXT_PUBLIC_STACK_PROJECT_ID=''
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=''
    STACK_SECRET_SERVER_KEY=''


    DATABASE_URL=''
    UPLOADTHING_TOKEN=''
    NEXT_PUBLIC_UPLOADTHING_APP_ID=''
     ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Learn More

* Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
* Prisma ORM: [https://www.prisma.io/](https://www.prisma.io/)
* Neon Cloud Database: [https://neon.tech/](https://neon.tech/)
* Tailwind CSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* Shadcn UI: [https://ui.shadcn.com/](https://ui.shadcn.com/)
* React Hook Form: [https://react-hook-form.com/](https://react-hook-form.com/)
* Zod: [https://zod.dev/](https://zod.dev/)
* UploadThing Docs: [https://docs.uploadthing.com/](https://docs.uploadthing.com/)
* Stack Auth Docs: [https://stackauth.com/docs](https://stackauth.com/docs)
* Sonner Toasts: [https://sonner.vercel.app/](https://sonner.vercel.app/)

---

*Built as part of my journey to refresh my Next.js and UI library skills.*
