# 🌾 KisanKart - Agricultural E-commerce Platform

**"FEEDING THE FUTURE"** - A comprehensive e-commerce platform designed specifically for agricultural products, connecting farmers, sellers, and buyers in the agricultural ecosystem.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [KrishiKalyan AI Integration](#krishikalyan-ai-integration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

KisanKart is a full-stack web application that serves as a marketplace for agricultural products. It provides a platform where farmers and agricultural product sellers can list their products, and buyers can browse, search, and purchase agricultural items including seeds, fertilizers, pesticides, and farming equipment.

## ✨ Features

### 🛒 E-commerce Features

- **Product Catalog**: Browse and search agricultural products
- **Shopping Cart**: Add products to cart and manage quantities
- **User Authentication**: Secure login/signup with Google OAuth integration
- **Product Management**: Admin panel for product CRUD operations
- **Responsive Design**: Mobile-friendly interface

### 👥 User Management

- **User Registration/Login**: Local and Google OAuth authentication
- **Profile Management**: User profiles with delivery addresses
- **Seller Registration**: Farmers and sellers can join the platform
- **Admin Dashboard**: Comprehensive admin panel for platform management

### 🤖 AI Integration (KrishiKalyan)

- **AI-Powered Crop Assessment**: Intelligent crop analysis and recommendations
- **Irrigation Insights**: Smart irrigation suggestions for better farming
- **Agricultural Guidance**: AI-driven farming advice and tips

### 🎨 Modern UI/UX

- **Consistent Design**: Professional and clean interface
- **Animated Elements**: Smooth animations and transitions
- **Responsive Layout**: Works seamlessly across all devices
- **Accessibility**: User-friendly navigation and design

## 🛠 Tech Stack

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport.js**: Authentication middleware
- **Handlebars**: Templating engine

### Frontend

- **HTML5/CSS3**: Structure and styling
- **JavaScript**: Client-side functionality
- **Bootstrap**: CSS framework (partial)
- **Font Awesome**: Icons
- **AOS (Animate On Scroll)**: Scroll animations

### Authentication & Security

- **Passport.js**: Authentication strategies
- **Google OAuth 2.0**: Social login
- **bcrypt**: Password hashing
- **Express Session**: Session management

### AI Integration

- **Google Generative AI**: AI-powered agricultural insights

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials
- Google AI API key

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd KisanKart-1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/KisanCart
   SESSION_SECRET=your_session_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   API_KEY=your_google_ai_api_key
   ```

4. **Start the application**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## ⚙️ Configuration

### MongoDB Setup

- Ensure MongoDB is running on your system
- The application will connect to `KisanCart` database
- Collections will be created automatically

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/auth/google/callback`

### Google AI Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the API key to your `.env` file

## 📁 Project Structure

```
KisanKart-1/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── Procfile              # Heroku deployment config
├── authentication/       # Authentication logic
│   └── passport.js       # Passport configuration
├── controllers/          # Route controllers
│   ├── admin.js         # Admin operations
│   ├── home.js          # Home page logic
│   ├── krishi.js        # AI integration
│   └── user.js          # User operations
├── middleware/           # Custom middleware
│   ├── isadmin.js       # Admin authorization
│   └── isloggedin.js    # Authentication check
├── models/              # Database models
│   ├── cart.js          # Shopping cart model
│   ├── google_user.js   # Google user model
│   ├── kisan.js         # User model
│   ├── products.js      # Product model
│   └── seller.js        # Seller model
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   │   ├── admin.css   # Admin panel styles
│   │   ├── krishikalyan.css # AI banner styles
│   │   ├── style.css   # Main styles
│   │   └── mediaqueries.css # Responsive styles
│   ├── images/         # Image assets
│   └── js/             # JavaScript files
├── routes/              # Route definitions
│   ├── admin.js        # Admin routes
│   ├── home.js         # Home routes
│   ├── krishi.js       # AI routes
│   └── user.js         # User routes
├── utils/               # Utility functions
│   └── sortCategory.js # Category sorting
└── views/               # Handlebars templates
    ├── admin/          # Admin templates
    ├── users/          # User templates
    └── partials/       # Reusable components
        ├── krishikalyan.hbs # AI banner partial
        ├── navbar.hbs  # Navigation partial
        └── usernavbar.hbs # User navbar partial
```

## 🔗 API Endpoints

### User Routes (`/user`)

- `GET /` - User dashboard
- `GET /login` - Login page
- `POST /login` - User login
- `GET /signup` - Registration page
- `POST /signup` - User registration
- `GET /logout` - User logout
- `GET /products/all` - All products
- `POST /search/product` - Search products
- `GET /products/:id` - Product details
- `POST /cart/add` - Add to cart
- `GET /cart/show` - View cart
- `POST /cart/remove` - Remove from cart

### Admin Routes (`/admin`)

- `GET /` - Admin dashboard
- `GET /addproduct` - Add product form
- `POST /addproduct` - Create product
- `GET /products/all` - All products (admin view)
- `GET /products/updateproduct/:id` - Update product form
- `POST /products/updateproduct` - Update product
- `GET /products/deleteproduct/:id` - Delete product

### KrishiKalyan Routes (`/krishi`)

- `GET /crop` - AI crop assessment page
- `POST /crop` - Process crop analysis

## 🗄️ Database Models

### User Model (`kisan.js`)

```javascript
{
  name: String,
  email: String,
  password: String,
  address: String,
  username: String
}
```

### Product Model (`products.js`)

```javascript
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  seller: String,
  date: Date
}
```

### Cart Model (`cart.js`)

```javascript
{
  userId: String,
  products: [{
    productId: String,
    quantity: Number
  }]
}
```

## 🔐 Authentication

The application supports multiple authentication methods:

### Local Authentication

- Username/password registration and login
- Password hashing with bcrypt
- Session-based authentication

### Google OAuth

- One-click Google sign-in
- Automatic user profile creation
- Seamless integration with existing features

### Session Management

- Express sessions with configurable secrets
- Automatic session expiration
- Secure session storage

## 🤖 KrishiKalyan AI Integration

The KrishiKalyan feature provides AI-powered agricultural insights:

### Features

- **Crop Assessment**: Analyze crop health and growth
- **Irrigation Recommendations**: Smart watering suggestions
- **Farming Tips**: AI-generated agricultural advice
- **Seasonal Guidance**: Time-based farming recommendations

### Implementation

- Google Generative AI integration
- Natural language processing for user queries
- Contextual agricultural responses
- User-friendly interface with animated banner

## 💻 Usage

### For Users

1. **Browse Products**: Visit the homepage to see featured products
2. **Search**: Use the search bar to find specific items
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Review your cart and proceed to purchase
5. **AI Assistance**: Click the KrishiKalyan banner for farming insights

### For Sellers

1. **Register**: Sign up as a seller
2. **List Products**: Add your agricultural products
3. **Manage Inventory**: Update product details and availability
4. **Track Sales**: Monitor your product performance

### For Admins

1. **Dashboard**: Access comprehensive admin panel
2. **Product Management**: Add, edit, or remove products
3. **User Management**: Monitor user activity
4. **Analytics**: View platform statistics

## 🎨 UI Components

### KrishiKalyan Banner

- Animated scrolling text
- AI-powered agricultural insights
- Consistent across all user pages
- Responsive design

### Navigation

- Light green theme
- User-friendly layout
- Search functionality
- Cart integration

### Product Cards

- Clean, modern design
- Responsive grid layout
- Hover effects
- Quick add-to-cart functionality

## 🚀 Deployment

### Heroku Deployment

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy using the Procfile

### Environment Variables for Production

```env
PORT=3000
MONGODB_URI=your_production_mongodb_uri
SESSION_SECRET=your_secure_session_secret
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret
API_KEY=your_production_google_ai_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-tanushk2004@gmail.com or create an issue in the repository.

## 🙏 Acknowledgments

- Google for OAuth and AI services
- MongoDB for database services
- Express.js community for excellent documentation
- All contributors who helped build this platform

---

**Made with ❤️ for the agricultural community**

_"Empowering farmers with technology, one click at a time."_
