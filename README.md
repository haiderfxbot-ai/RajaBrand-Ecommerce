# Raja Brand — E-Commerce Mobile-First Web App

A fully functional, production-grade mobile-first e-commerce web application built with pure HTML, CSS, and JavaScript. No frameworks, no backend — just static files that work everywhere.

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Tailwind CSS CDN + custom styles
- **JavaScript** — Vanilla JS (ES6+)
- **Storage** — LocalStorage (cart, orders, users, sessions)
- **Icons** — Material Symbols (Rounded)
- **Fonts** — Plus Jakarta Sans + DM Sans (Google Fonts)
- **Animations** — LottieFiles (loading/empty states)
- **Design** — Material Design 3 (M3) principles

## Features

### User Features
- Product browsing with category filtering, search, and sorting
- Product detail page with image gallery, reviews, and variants
- Shopping cart with quantity control and coupon system
- Checkout (COD only) with address management
- Order tracking with live progress stages
- User authentication (login/signup)
- Wishlist management
- Search with recent/trending searches
- Notifications center
- Support page with FAQ, ticket system, and policies

### Admin Panel
- Login (credentials: `admin` / `admin123`)
- Dashboard with stats, revenue chart, and order status donut
- Product management (CRUD)
- Category management (CRUD)
- Order management with status updates
- User management
- Store settings

### Design Highlights
- Mobile-first, touch-optimized
- Glassmorphism header and bottom navigation
- Smooth animations (60fps transitions)
- Skeleton loading states
- Toast notifications
- Bottom sheet modals
- Floating action buttons
- Safe area insets for mobile devices
- Scroll-based header hide/show

## Project Structure

```
raja-brand/
├── index.html              # Homepage
├── product.html            # Product listing
├── product-detail.html     # Product detail
├── cart.html               # Shopping cart
├── checkout.html           # Checkout
├── orders.html             # My orders
├── order-track.html        # Order tracker
├── login.html              # Login & signup
├── profile.html            # User profile
├── wishlist.html           # Wishlist
├── search.html             # Search
├── about.html              # About us
├── support.html            # Support / FAQ
├── notifications.html      # Notifications
├── admin/
│   ├── login.html          # Admin login
│   ├── dashboard.html      # Admin dashboard
│   ├── products.html       # Product manager
│   ├── categories.html     # Category manager
│   ├── orders.html         # Order list
│   ├── order-detail.html   # Order detail
│   ├── users.html          # User manager
│   └── settings.html       # Store settings
└── README.md
```

## Setup

1. Clone the repository
2. Open `index.html` in your browser — **no build step required**

### Deploy to GitHub Pages

1. Push the `raja-brand/` folder to a GitHub repository
2. Go to **Settings > Pages**
3. Select the branch and root folder
4. Your app is live at `https://<username>.github.io/<repo>/`

## Usage

- **Customers**: Browse products, add to cart, place orders (COD)
- **Admin**: Login at `/admin/login.html` with `admin` / `admin123`

## Demo

[Live Demo](https://yourusername.github.io/raja-brand)

## Screenshots

(Add screenshots here)

## License

MIT
