# Employee Management System

This is a **Full-Stack Employee Management System** built using **Laravel 12 (Backend)** and **React.js with TypeScript & Inertia.js (Frontend)**. The application follows **CRUD principles** with authentication and guest access.

## 📌 Features
- User Authentication (Login & Registration)
- Employee Management (Add, Edit, View, Delete Employees)
- API Integration using Laravel API routes
- Modern UI with React.js and Inertia.js

---

## 🛠 Backend (Laravel 12) Setup

### 2️⃣ **Install Laravel Dependencies**
Make sure you have **PHP (>=8.1)** and **Composer** installed.
```sh
composer install
```

### 3️⃣ **Configure Environment Variables**
Copy `.env.example` to `.env` and update database details:
```sh
cp .env.example .env
```
Update the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

### 4️⃣ **Generate Application Key**
```sh
php artisan key:generate
```

### 5️⃣ **Run Migrations & Seed Database**
```sh
php artisan migrate --seed
```
> This will create necessary tables and seed default data.

### 6️⃣ **Run Laravel Development Server**
```sh
php artisan serve
```
Your Laravel API will be available at `http://127.0.0.1:8000`

---

## 🌐 Frontend (React + TypeScript) Setup

### 7️⃣ **Navigate to Frontend Directory**
```sh
cd resources/js
```

### 8️⃣ **Install Frontend Dependencies**
Make sure you have **Node.js (>=16)** and **npm/yarn** installed.
```sh
npm install  # or yarn install
```

### 9️⃣ **Run React Development Server**
```sh
npm run dev  # or yarn dev
```
Your frontend will be available at `http://127.0.0.1:5173`

---

✅ Running the Project
Start the Laravel backend: php artisan serve
Start the React frontend: npm run dev
Open http://127.0.0.1:8000 in your browser.

---

## 🏗 Technologies Used
- Laravel 12 (PHP Framework)
- MySQL (Database)
- React.js (Frontend)
- TypeScript
- Inertia.js (For Laravel + React Integration)
- Tailwind CSS (Styling)

---


