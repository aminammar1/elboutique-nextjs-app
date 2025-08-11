# 🛍️ ElBoutique E-commerce Website

<div align="center">
  <img src="/client/public/assets/images/screenshot.png" alt="ElBoutique Logo" width="1200"/>
  <p><i>Modern e-commerce platform for fashion enthusiasts</i></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-11+-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Docker Setup](#-docker-setup)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

ElBoutique is a modern, full-featured e-commerce platform built with Next.js for the frontend and NestJS for the backend. The application offers a comprehensive shopping experience with user authentication, product browsing, cart management, checkout with Stripe integration, and order tracking.

The platform is designed with both customer experience and admin functionality in mind, featuring a responsive UI built with TailwindCSS and enhanced with Framer Motion animations for a smooth, engaging user experience.

## ✨ Features

### Customer Features

- **User Authentication** - Secure signup, login, and account management
- **Product Browsing** - Browse products by categories and subcategories
- **Search Functionality** - Search products with autocomplete
- **Product Details** - View detailed product information, images, and related products
- **Shopping Cart** - Add, update, and remove items from cart
- **Wishlist** - Save products for later
- **Checkout Process** - Secure checkout with Stripe integration
- **Order Management** - View order history and track current orders
- **Address Management** - Save and manage multiple shipping addresses
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Chatbot Assistant (highlight)

- Built-in shopping assistant available at /chatbot
- Uses OpenRouter with model: openai/gpt-oss-20b:free via a Next.js API route
- Server-side only key usage (OPENROUTER_API_KEY) to keep secrets secure

### Admin Features

- **Dashboard** - Overview of orders, products, and customers
- **Product Management** - Add, edit, and delete products
- **Category Management** - Manage product categories and subcategories
- **Order Management** - Process and update order status
- **Coupon Creation** - Create and manage discount coupons
- **User Management** - View and manage user accounts

## 🛠 Tech Stack

### Frontend

- **Next.js** - React framework for server-rendered applications
- **Redux Toolkit** - State management
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Headless UI components
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **Stripe** - Payment processing
- **Firebase** - Authentication and storage
- **Swiper** - Touch slider
- **Date-fns** - Date utility library

### Backend

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport** - Authentication middleware
- **JWT** - Token-based authentication
- **Stripe API** - Payment processing
- **Multer** - File uploading
- **Nodemailer** - Email sending

## 📁 Project Structure

The project is organized into two main directories:

### Client (Frontend)

```
client/
├── actions/         # API integration functions
├── app/             # Next.js app directory
│   ├── (auth)/      # Authentication pages
│   ├── (pages)/     # Main application pages
│   └── api/         # API routes
├── components/      # UI components
│   ├── custom/      # Reusable UI components
│   └── modules/     # Feature-specific components
├── constants/       # Application constants
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── providers/       # Context providers
├── public/          # Static assets
└── store/           # Redux store
```

### Backend (API)

```
backend/
├── src/
│   ├── address/     # Address management module
│   ├── auth/        # Authentication module
│   ├── cart/        # Shopping cart module
│   ├── categories/  # Categories management
│   ├── common/      # Shared utilities
│   ├── config/      # Application configuration
│   ├── coupons/     # Coupon management
│   ├── guards/      # Authentication guards
│   ├── order/       # Order management
│   ├── products/    # Product management
│   ├── services/    # Shared services
│   ├── subcategories/ # Subcategories management
│   ├── types/       # TypeScript type definitions
│   ├── upload/      # File upload handling
│   ├── user/        # User management
│   ├── app.module.ts # Main application module
│   ├── main.ts      # Application entry point
│   └── exception.filter.ts # Global exception handler
└── test/            # End-to-end tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 LTS recommended)
- npm or yarn
- MongoDB
- Stripe account (for payment processing)
- Firebase account (for Google AUTH )
- Cloudinary account (for images storage)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ElBoutique-Website.git
cd ElBoutique-Website
```

2. Install client dependencies

```bash
cd client
npm install
```

3. Install backend dependencies

```bash
cd ../backend
npm install
```

4. Set up environment variables (see below)

5. Start the development servers

For the client:

```bash
cd client
npm run dev
```

For the backend:

```bash
cd backend
npm run start:dev
```

### Environment Variables

#### Client (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

#### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:3000
PORT=4000
OPENROUTER_API_KEY=your_openrouter_api_key # used by Next.js route on the client app server
```

## 🐳 Docker Setup

Docker and Docker Compose configs are included.

Quick start:

```bash
docker compose up -d --build
```

Services:

- client: Next.js app on http://localhost:3000
- backend: NestJS API on http://localhost:4000
- mongo: MongoDB 6 on port 27017

Environment notes:

- Backend expects MONGO_URI, JWT_SECRET, FRONTEND_URL
- Client uses NEXT_PUBLIC_API_URL to call backend
- Chatbot route requires OPENROUTER_API_KEY (server-side only). You can set it when running compose: `OPENROUTER_API_KEY=sk-... docker compose up`.

## 📚 API Documentation

The backend API is documented using Swagger. After starting the backend server, you can access the API documentation at:

```
http://localhost:4000/api/docs
```

This interactive documentation allows you to explore and test all available API endpoints.

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy the application

### Backend Deployment (AWS, Heroku, etc.)

Follow the deployment guidelines in the [NestJS documentation](https://docs.nestjs.com/deployment).

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/aminammar1">Mohamed Amine Ammar</a></p>
  <p>© Mohamed Amine Ammar. All rights reserved.</p>
</div>
