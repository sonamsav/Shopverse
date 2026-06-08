# 🛒 ShopVerse - Full Stack Ecommerce Application

ShopVerse is a full-stack ecommerce application built using the MERN stack. It provides a complete online shopping experience with user authentication, email verification, product management, cart functionality, order management, and payment integration.

The project was developed as part of my full-stack development learning journey to gain hands-on experience with modern web technologies and real-world application architecture.

---

## 🚀 Features

### 👤 Authentication & User Management

* User Registration
* User Login & Logout
* JWT Authentication
* Protected Routes
* Email Verification using OTP
* Resend Verification OTP
* Forgot Password Functionality
* Reset Password via OTP
* Change Password
* User Profile Management

### 🛍️ Ecommerce Features

* Browse Products
* View Product Details
* Product Search
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Order Placement
* Order Success Page

### 💳 Payment Integration

* Razorpay Payment Gateway Integration
* Payment Order Creation
* Test Mode Payment Implementation

### 📦 Product Management

* Add New Products
* Upload Product Images
* Cloudinary Image Storage
* Update Products
* Delete Products
* Product Listing Management

### 👨‍💼 Admin Features

* Admin Dashboard
* Manage Products
* Manage Users
* View Customer Orders
* Sales Overview
* Order Monitoring

### 📧 Email Services

* Email Verification OTP
* Resend Verification OTP
* Password Reset OTP
* Nodemailer Integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* ShadCN UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### Cloud Services

* Cloudinary

### Payment Gateway

* Razorpay

### Email Service

* Nodemailer

---

## 📂 Project Structure

```text
ShopVerse
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── backend
│   ├── controller
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── database
│   ├── utils
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/shopverse.git
cd shopverse
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder and configure:

```env
PORT=
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=
```

---

## 📸 Screenshots

Add screenshots here:

* Home Page
* Product Listing Page
* Product Details Page
* Cart Page
* User Profile Page
* Admin Dashboard
* Product Management Page
* Order Management Page

---

## 📚 Learning Outcomes

This project helped me gain practical experience with:

* Building REST APIs using Express.js
* MongoDB Database Design
* Authentication & Authorization
* Redux Toolkit State Management
* File Uploads with Multer
* Cloudinary Image Storage
* Email Verification Workflows
* Password Recovery Systems
* Payment Gateway Integration
* Full Stack Application Architecture


### 🔍 API Testing

* Tested REST APIs using Postman
* Verified authentication and authorization flows
* Tested product, cart, order, and user management endpoints
* Validated request and response handling
* Performed CRUD operation testing for backend APIs
<img width="1920" height="1020" alt="frontend - Google Chrome 08-06-2026 07_08_43" src="https://github.com/user-attachments/assets/da1e6302-97ba-4834-a4fd-0eff430d1992" />

---

## 📌 Project Status

* Completed for learning and portfolio purposes
* Razorpay integrated using Test Mode credentials
* Source code available on GitHub
* Deployment planned for future updates

---

## 🙏 Acknowledgements

This project was developed while learning full-stack web development through educational resources, tutorials, documentation, and hands-on implementation. The goal was to understand how modern ecommerce applications are built and deployed using the MERN stack.

---

## 👨‍💻 Author

**Sonam**

Software Engineer | MERN Stack Developer

GitHub: https://github.com/your-github-username
