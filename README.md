# 🛍️ Bag Shop - E-Commerce Platform

A full-featured e-commerce backend application built with Node.js and Express for selling bags and accessories. This platform includes user authentication, product management, shopping cart functionality, order processing, and an admin panel for managing the store.

## ✨ Features

### User Features
- 👤 **User Authentication** - Secure registration and login system with JWT
- 🛒 **Shopping Cart** - Add, remove, and manage products with quantity controls
- 📦 **Order Management** - Place orders and track order history
- 👥 **User Profile** - Update profile information and upload profile pictures
- 🏪 **Product Browsing** - Browse products with detailed descriptions and specifications
- 💳 **Checkout System** - Complete order checkout with address management

### Admin/Owner Features
- 🔐 **Admin Dashboard** - Secure admin panel with authentication
- ➕ **Product Management** - Create, edit, and delete products
- 📊 **Order Tracking** - View and manage customer orders
- 🖼️ **Image Upload** - Upload product and profile images
- 👔 **Owner Profile** - Manage owner account details

### Technical Features
- 🔒 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 📸 **File Upload** - Multer integration for image uploads
- 💾 **MongoDB Database** - NoSQL database with Mongoose ODM
- 🎨 **Server-Side Rendering** - EJS templating engine
- ⚡ **Flash Messages** - User feedback with connect-flash
- 🍪 **Session Management** - Express sessions with cookie-parser
- ✅ **Input Validation** - Express-validator for form validation

## 🚀 Tech Stack

**Backend:**
- Node.js
- Express.js 5.2.1
- MongoDB with Mongoose 9.0.2

**Authentication & Security:**
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Express Session

**File Handling:**
- Multer 2.0.2 for file uploads

**Template Engine:**
- EJS 3.1.10

**Validation:**
- Express-validator 7.3.1

**Payment Integration:**
- Razorpay 2.9.6 (integrated)

**Development Tools:**
- Nodemon 3.1.11
- Debug
- dotenv for environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn package manager

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ANTHELIS/BAG_SHOP-_-_-Backend_Project.git
cd Bag_Shop(Backend\ Project)
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Express Session Secret (use a strong random string)
EXPRESS_SESSION_SECRET=your_session_secret_here

# Server Port (optional, defaults to 3000)
PORT=3000

# Node Environment
NODE_ENV=development
```

### 4. Database Setup

The application will automatically create the `baggy` database when you run it. Make sure MongoDB is running:

**For Local MongoDB:**
```bash
mongod
```

**For MongoDB Atlas:**
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and add it to the `.env` file

### 5. Create Admin User

Before you can access the admin panel, you need to create an admin/owner account:

```bash
npm run create-admin
```

Follow the interactive prompts to enter:
- Full Name
- Email
- Password
- Contact Number

## 🏃 Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

Access the application at: `http://localhost:3000`

## 📁 Project Structure

```
Bag_Shop/
├── app.js                      # Main application entry point
├── package.json               # Project dependencies and scripts
│
├── config/                    # Configuration files
│   ├── db.js                 # MongoDB connection setup
│   ├── multerConfig.js       # Multer file upload configuration
│   └── production.json       # Production environment config
│
├── controllers/              # Request handlers
│   ├── adminControllers.js  # Admin panel logic
│   ├── authController.js    # Authentication logic
│   └── pageController.js    # Page rendering logic
│
├── middlewares/             # Custom middlewares
│   ├── isAdmin.js          # Admin authentication middleware
│   ├── isLoggedIn.js       # User authentication middleware
│   ├── profileUpdaterValidation.js  # Profile update validation
│   └── registerValidation.js        # Registration validation
│
├── models/                  # MongoDB schemas
│   ├── orderModel.js       # Order schema
│   ├── ownerModel.js       # Admin/Owner schema
│   ├── productModel.js     # Product schema
│   └── userModel.js        # User schema
│
├── routes/                 # API routes
│   ├── ownersRouter.js    # Owner/Admin routes
│   ├── productsRouter.js  # Product management routes
│   └── usersRouter.js     # User routes
│
├── scripts/               # Utility scripts
│   └── createAdmin.js    # Admin creation script
│
├── utils/                # Helper functions
│   └── generateToken.js # JWT token generation
│
├── views/                # EJS templates
│   ├── partials/        # Reusable components
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── headerOwner.ejs
│   │   ├── headerShop.ejs
│   │   └── ownerFooter.ejs
│   ├── cart.ejs
│   ├── createProducts.ejs
│   ├── editProduct.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── orderCheckout.ejs
│   ├── ownerLogin.ejs
│   ├── ownerMyOrder.ejs
│   ├── ownerProductsPanel.ejs
│   ├── ownerProfile.ejs
│   ├── ownerRegister.ejs
│   ├── productDes.ejs
│   ├── shop.ejs
│   ├── userMyOrders.ejs
│   └── userProfile.ejs
│
└── public/              # Static assets
    ├── images/
    │   ├── profile/    # User profile images
    │   └── webIcon/    # Website icons
    ├── javascripts/    # Client-side scripts
    └── stylesheets/    # CSS files
```

## 🛣️ Available Routes

### User Routes (`/`)
- `GET /` - User registration page
- `GET /login` - User login page
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /shop` - Browse products (protected)
- `GET /cart` - View shopping cart (protected)
- `GET /addtocart/:product_id` - Add product to cart (protected)
- `GET /deletecartitem/:product_id` - Remove item from cart (protected)
- `GET /addquantity/:product_id` - Increase quantity (protected)
- `GET /decquantity/:product_id` - Decrease quantity (protected)
- `GET /checkout` - Order checkout page (protected)
- `POST /placeorder` - Place an order (protected)
- `GET /myorder` - View order history (protected)
- `GET /profile` - User profile page (protected)
- `POST /profile/edit` - Update user profile (protected)
- `GET /product/:product_id` - Product details page (protected)

### Owner/Admin Routes (`/owners`)
- `GET /owners/admin` - Admin dashboard (admin only)
- `GET /owners/login` - Admin login page
- `POST /owners/login` - Admin login
- `GET /owners/logout` - Admin logout
- `GET /owners/register` - Admin registration page (dev mode)
- `POST /owners/register` - Register admin (dev mode)
- `GET /owners/admin/products` - Product management panel (admin only)
- `GET /owners/admin/orders` - View all orders (admin only)
- `GET /owners/profile` - Owner profile (admin only)
- `POST /owners/profile/edit` - Update owner profile (admin only)

### Product Routes (`/products`)
- `POST /products/create` - Create new product (admin only)
- `GET /products/edit/:product_id` - Edit product page (admin only)
- `POST /products/edit/:product_id` - Update product (admin only)
- `GET /products/delete/:product_id` - Delete product (admin only)

## 📜 Available Scripts

```json
{
  "start": "node app.js",           // Start production server
  "dev": "npx nodemon app.js",      // Start development server
  "create-admin": "node scripts/createAdmin.js"  // Create admin user
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure session handling with express-session
- **Input Validation**: Server-side validation using express-validator
- **Environment Variables**: Sensitive data stored in environment variables

## 🗄️ Database Models

### User Model
- Full name, email, password
- Shopping cart (array of products with quantities)
- Order history
- Profile image
- Address details (flat, area, city, state, pincode, contact)

### Product Model
- Product image
- Name, price, discount
- Color scheme (background, panel, text colors)
- Highlights (up to 6 points)
- Warranty period
- Description
- Specifications (model, color, material, category, capacity)

### Owner Model
- Full name, email, password
- Products (array of product references)
- Profile picture
- Contact information

### Order Model
- User reference
- Products with quantities
- Shipping address
- Payment status
- Order status
- Total amount

## 🎨 Customization

### Adding New Features
1. Create new routes in the `routes/` directory
2. Implement controller logic in `controllers/`
3. Add necessary models in `models/`
4. Create views in `views/`

### Styling
- Update CSS files in `public/stylesheets/`
- Modify EJS templates in `views/`

## 🐛 Debugging

The application uses the `debug` package for development debugging:

```bash
# Enable debug logs
DEBUG=development:* npm run dev
```

## 🚧 Known Limitations

- Payment integration with Razorpay is included but may need configuration
- No email verification system
- Limited order status tracking
- No product reviews or ratings system

## 🔜 Future Enhancements

- Email notifications for orders
- Product review and rating system
- Advanced search and filtering
- Wishlist functionality
- Multiple payment gateway options
- Order tracking system
- Admin analytics dashboard
- Product inventory management


**Happy Coding! 🎉**
