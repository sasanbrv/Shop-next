# 🛍️ Shop Next

A modern **Full-Stack E-Commerce application** built with **Next.js** and **Express.js**.

The project includes a complete shopping experience with product browsing, product details, shopping cart, discount codes, authentication, protected routes, and a dashboard.

---

## ✨ Features

### 🛒 Shopping

* Browse available products
* Product cards with essential information
* View detailed information for each product
* Add products to the shopping cart
* Increase or decrease product quantity
* Remove products from the cart
* Calculate the total purchase amount
* Apply discount codes
* Automatically calculate the discount
* Display the final price after applying discounts

### 🔐 Authentication

* User login
* Cookie-based authentication
* HTTP-only session cookie
* Protected dashboard route
* Authentication status checking
* Logout functionality
* Automatic redirect for unauthenticated users

### 📊 Dashboard

* Protected dashboard page
* Only authenticated users can access the dashboard
* Authentication handled through the Express backend and Next.js proxy

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **Cookie Parser**
* **CORS**

---

## 📸 Application Flow

### 🏪 Shop

Users can browse products from the main shop page.

```text
Shop
 ↓
Product Card
 ↓
Product Details
 ↓
Add to Cart
```

### 🛒 Shopping Cart

Users can manage their cart and see the total price.

```text
Products
   ↓
Shopping Cart
   ↓
Quantity
   ↓
Subtotal
   ↓
Discount Code
   ↓
Discount
   ↓
Final Total
```

---

## 🎟️ Discount System

The shopping cart supports discount codes.

Users can enter a valid discount code and the application calculates the discount automatically.

```text
Original Total
      ↓
Discount Code
      ↓
Discount Amount
      ↓
Final Total
```

---

## 🔐 Authentication Flow

The application uses cookie-based authentication.

When a user logs in:

```text
Login Page
    ↓
POST /login
    ↓
Express Backend
    ↓
Validate Credentials
    ↓
Set HTTP-only Cookie
    ↓
Authenticated User
```

The dashboard is protected and requires authentication.

```text
/dashboard
     ↓
Authenticated?
   ↙       ↘
 Yes        No
 ↓           ↓
Dashboard   /login
```

---

## 🚪 Logout

Authenticated users can log out of their account.

```text
Logout Button
      ↓
POST /logout
      ↓
Clear Session Cookie
      ↓
User Logged Out
```

---

## 📁 Project Structure

```text
Shop-next/
│
├── app/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── products/
│   │   └── ...
│   │
│   ├── cart/
│   │   └── ...
│   │
│   └── ...
│
├── backend/
│   └── ...
│
├── public/
│
├── proxy.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sasanbrv/Shop-next.git

cd Shop-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Next.js frontend

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

### 4. Start the backend

Open another terminal and go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Then start the Express server.

The backend will run on:

```text
http://localhost:5000
```

---

## 🔑 Demo Login

For local development, the project currently uses:

```text
Username: admin
Password: 1234
```

> ⚠️ These credentials are for development purposes only and should not be used in production.

---

## 🛡️ Protected Routes

The dashboard is protected using the Next.js proxy.

If a user is not authenticated:

```text
/dashboard
     ↓
Not authenticated
     ↓
/login
```

If the user is authenticated:

```text
/dashboard
     ↓
Dashboard
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates a production build.

### Production Start

```bash
npm run start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Runs ESLint.

---

## ⚠️ Development Note

This project is currently a learning and development project.

The authentication system currently uses a simple session value and demo credentials.

For a production application, authentication should be improved with:

* Secure session management
* Password hashing
* Database-backed users
* Environment variables
* HTTPS
* Secure cookie configuration
* Proper authorization
* Server-side validation

---

## 📌 Future Improvements

* [ ] User registration
* [ ] Database integration
* [ ] Persistent shopping cart
* [ ] Payment integration
* [ ] Order management
* [ ] Product management
* [ ] Admin dashboard
* [ ] Product search
* [ ] Product filtering
* [ ] Product categories
* [ ] User profile
* [ ] Order history
* [ ] Real authentication and authorization

---

## 👨‍💻 Author

**Sasan**

GitHub: [@sasanbrv](https://github.com/sasanbrv)

---

## 📄 License

This project is for learning and development purposes.
