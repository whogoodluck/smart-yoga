# Smart Yoga

## Live Demo

You can view the live demo of the project here: [Smart Yoga](https://smartyoga.vercel.app/)

## Project Setup Guide

Follow the steps below to set up the project on your local machine:

### Prerequisite

Ensure you have the following installed:

- **Node.js** (perferably version 20)
- **npm** (Node Package Manager)
- **PostgreSQL** (Database)
- **Git** (Version Control)

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/SunnyKumar107/smart-yoga.git
```

Navigate to the project folder:

```bash
cd smart-yoga
```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file at the root of the project. Use the .env.example file as a reference for required environment variables:

```bash
cp .env.example .env
```

### 4. Run Database Migrations

Apply the database migrations to set up the schema:

```bash
npx prisma migrate deploy
```

To verify that the database is correctly set up, you can use Prisma Studio to view the data:

```bash
npx prisma studio
```

### 5. Run Seed Script (Optional)

You can run a seed script to populate the database with sample data (if provided):

```bash
npm run seed
```

This step is optional and only needed if you want to populate your database with initial data.

### 6. Start Development Server

```bash
npm run dev
```

This will start the server on http://localhost:3000. Open the URL in your browser to view the project.

### 7. Build for Production and Start

To build the project for production and start the server, run the following:

```bash
npm run build
npm start
```

The production build will be available at http://localhost:3000.

### 8. Linting and Formatting (Optional)

To ensure consistent code style, you can run the following commands for linting and formatting:

Linting:

```bash
npm run lint
```

Formatting:

```bash
npm run format
```

## Tech Stack

The project uses the following technologies:

- **React** (JavaScript library for building user interfaces)
- **Next.js** (React framework for building web applications)
- **Tailwind CSS** (Utility-first CSS framework)
- **Shadcn UI** (Component library for React)
- **React Markdown** (For rendering Markdown content)
- **React Hook Form** (Form management library for React)
- **React Quill** (Rich text editor for React)
- **Recharts** (Charting library for React)
- **Zod** (Schema validation library)
- **TypeScript** (Typed superset of JavaScript)
- **Prisma** (ORM for PostgreSQL database)
- **PostgreSQL** (Relational database)
- **NextAuth.js** (Authentication)
- **ESLint** (JavaScript linting)
- **Prettier** (Code formatting)
- **Vercel** (Deployment platform)
- **Git** (Version control)

## Next.js Features Used

- **App Router** – File-based routing and data fetching.
- **React Server Components (RSC)** – Server-side rendering for better performance.
- **Server Actions** – Simplified server-side data fetching and state.
- **Middleware** – Handles routing, authentication, and redirects.
- **Font & Image Optimization** – Automatic optimization for faster loads.
- **Dynamic Routing** – Flexible routes based on data.
- **Custom Error and Loading Pages** – Custom error handling and loading built-in.

## Problems Faced

- **Next.js 15 Issues**: There were some problems with peer dependencies in Next.js 15. I had to use the `--force` flag while running `npm install` to make everything work.
- **Database Relations**: It is sometimes difficult to manage complex database relationships and write the correct queries.
- **Authentication Issues**: Setting up login and access control for users and admins using NextAuth was tricky and needed lots of testing.

## Smart Yoga Features

- User Authentication
- Shopping Cart
- Blog System
- Instagram Feed Integration
- SEO Optimization
- Admin Panel
- Analytics Dashboard
- Product Management
- Social Media Links Management
- Error and Success Alerts

## What's Next

1. **Enhance Loading Experience**

   - Implement **suspense** with `React.Suspense` for data fetching components.
   - Add **skeleton loaders** for key UI sections (e.g., analytics charts, product listings).

2. **Instagram Feed Integration**

   - Use an Instagram API library like `react-instagram-feed` or `instagram-web-api` to display the feed.

3. **Footer Creation**

   - Design a reusable **footer** component with:
     - Navigation links.
     - Contact information.
     - Social media icons.

4. **User Dropdown in Header**

   - Add a **user dropdown** in the header to:
     - Show user details.
     - Move the **sign-out option** into the dropdown.
     - Add navigation to `/admin` for users with admin roles.

5. **Order Table**

   - Create an **Order table** in the database to store:
     - Order details (user ID, product IDs, total price, status, etc.).
     - Add relationships with `User` and `Product` tables.

6. **Place Order Feature**

   - Implement a **place order** functionality:
     - Users can review their cart and confirm the purchase.
     - Orders are saved in the database with an initial status (e.g., "Pending").

7. **Admin File Upload for Images**

   - Update the admin panel to allow admins to:
     - Upload images directly as files instead of using URLs.
     - Save the files to cloud storage (e.g., AWS S3, Cloudinary) or the database.

8. **Add More Social Media Links**

   - Expand the social media feature to include additional platforms:
     - LinkedIn, YouTube, Pinterest, etc.
   - Update the UI to dynamically display added links.

9. **Break Down Large Components**

   - Refactor large components into smaller, reusable components to:
     - Improve readability.
     - Simplify testing and maintenance.

10. **Write Tests**
