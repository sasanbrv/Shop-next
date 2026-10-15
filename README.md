# Sasy Shop 🛍️

Sasy Shop is a full-stack online store built with Next.js, React, TypeScript, and PostgreSQL. I built this project to create a simple, modern shopping experience where users can explore products, manage their cart, and create an account.

The project also includes a dashboard for adding products and a database powered by Prisma and Neon.

🔗 **Live Demo:** [https://shop-next-sand.vercel.app/](https://shop-next-sand.vercel.app/)

## ✨ What Can You Do?

- Browse products and view their prices, images, descriptions, and ratings.
- Open a product page to see more details.
- Create an account, log in, and log out.
- Add products to your shopping cart.
- Use available discount codes.
- Access a protected dashboard to add new products.
- Store product, user, and discount data in a PostgreSQL database.
- Use the store on desktop and mobile devices.

## 🧰 Built With

Here are the main technologies used in this project:

- **Next.js** — Application framework and routing
- **React** — Building the user interface
- **TypeScript** — Writing more reliable code
- **Tailwind CSS** — Styling the application
- **Prisma** — Working with the database
- **PostgreSQL** — Storing application data
- **Neon** — Hosting the PostgreSQL database
- **Axios** — Making HTTP requests
- **bcryptjs** — Hashing passwords
- **jose** — Creating and verifying session tokens
- **Vercel** — Deploying the application

## 📂 Project Structure

```text
shop-next/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── me/
│   │   │   └── register/
│   │   ├── discounts/
│   │   └── products/
│   ├── cart/
│   ├── components/
│   ├── context/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── store/
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── prisma7.config.ts
├── package.json
└── README.md
```

## 🚀 Run It Locally

Want to run Sasy Shop on your own machine? Follow these steps.

### Requirements

- Node.js (LTS recommended)
- npm
- A PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd shop-next
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="YOUR_POSTGRESQL_CONNECTION_STRING"
AUTH_SECRET="YOUR_RANDOM_SECRET_AT_LEAST_32_CHARACTERS_LONG"
```

`DATABASE_URL` should point to your PostgreSQL database. You can use Neon to create a hosted database.

`AUTH_SECRET` is used to sign session tokens. Use a strong, randomly generated secret and keep it private.

**Never commit your `.env` file or database credentials to GitHub.**

### 4. Prepare the Database

Generate the Prisma Client:

```bash
npx prisma generate
```

If you're setting up a database that hasn't been migrated yet, apply the existing migrations:

```bash
npx prisma migrate deploy
```

Make sure your database connection is configured correctly before running migrations.

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open the application.

## 📜 Available Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Generates Prisma Client and builds the app |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint |

## 🔒 Authentication and Security

Sasy Shop uses `bcryptjs` to hash passwords and `jose` to sign and verify session tokens. Session cookies are configured as HTTP-only, helping prevent client-side JavaScript from reading them.

The dashboard also checks the user's session before allowing access. Keep all secrets and database credentials in environment variables.

## 🌐 Deployment

The live version is hosted on Vercel, with Neon providing the PostgreSQL database.

To deploy your own version:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `DATABASE_URL` and `AUTH_SECRET` to the project's environment variables.
4. Make sure the production database has the required migrations.
5. Deploy the project.

## 💡 Ideas for the Future

There are plenty of ways to build on this project, including:

- Search, filtering, and sorting
- A wishlist for favorite products
- Order management and checkout
- Editing and deleting products
- Automated tests
- Pagination for larger product catalogs

## 🤝 Feedback and Contributions

Found a bug or have an idea for an improvement? Feel free to open an issue or submit a pull request.

## 📄 License

No license has been added yet. If you plan to share or distribute this project, choose a suitable license and add it to the repository.

---

Made with ❤️ using Next.js, TypeScript, and PostgreSQL.
