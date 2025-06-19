# 🥘 Petuk - Food Management Web Application

**Petuk** is a complete restaurant food management system where users can browse various foods, add them to cart, add their own food items, and manage personal orders. The application features a modern, user-friendly interface with smooth authentication and seamless UI interactions.

---

## 🚀 Features
🌐 Live Demo
🔗 https://petuk-22f6f.web.app/
📫 Contact
For feedback, questions, or support:

✉️ Email: mdhridoy3240@gmail.com
### Homepage
- **Responsive Navigation Bar**:
  - Left: Logo
  - Center: Page Links – Home, All Food, Gallery, Cart
  - Right: Dark/Light mode toggle and User Profile with dropdown (My Order, My Food, Add Food, Logout)
- **Hero Banner Section**:
  - CTA: "Explore Our Food" (redirects to All Food page)
- **Top Selling Food Section**:
  - Shows 6 popular food cards with image, name, price, and "See Details" button
- **Add Your Food CTA**:
  - Button redirects to Add Food page
- **Why Choose Us** section (Quality, Fast Delivery, Affordable Price)
- **Customer Reviews**
- **Upcoming Features / Teasers**
- **Footer** with contact info, social links, and copyright

---

## 🔐 Authentication

- Google-based login using **Firebase Authentication**
- Protected routes (only accessible when logged in)
- Logout from dropdown menu

---

## 📄 Pages and Functionality

### 🧾 Single Food Details Page
- Opens when user clicks **"See Details"** from any food card
- Shows:
  - Full food details: name, category, price, image(s), description
  - Quantity selector (increase/decrease)
  - Live total price update based on quantity
  - **Add to Cart** button with confirmation modal ("Cart updated successfully")
  - Cart icon in navbar updates with superscript badge count

---

### 🖼️ Gallery Page
- Displays all food images in a responsive grid
- Clicking on any image opens a modal with:
  - Enlarged food image
  - Food name

---

### 🛒 Cart Page
- Shows all items added by the user from Single Food Details
- Each item displays:
  - Image, name, quantity, unit price, total price
- Users can:
  - Increase/decrease quantity
  - Remove items from the cart
- Grand total shown
- Option to proceed to checkout

---

### 📦 My Orders Page
- Displays list of all orders placed by the user
- Shows:
  - Order ID (or short reference)
  - Products, quantity, total price, order date
  - Order status (e.g. Placed, Delivered)

---

### 🍳 Add Food Page
- Allows users to add their own food items
- Form fields:
  - Name, Image URL 1 & 2, Category (12 options), Quantity, Price, Description
- Validations:
  - All fields required
  - Price and quantity must be positive numbers
  - Image URLs must be valid
- On submission:
  - Food gets added to All Food / My Foods
  - Success toast notification

---

### 📋 My Foods Page
- Lists all foods added by the logged-in user
- Each item includes:
  - Edit Button → Opens a modal to update any field
  - Delete Button → Confirms and removes item from the list
- Live update on successful edit or delete

---

## 🧑‍💻 Technology Stack

| Technology             | Purpose                      |
|------------------------|------------------------------|
| React.js               | Frontend Framework           |
| Tailwind CSS + DaisyUI | Styling and UI Components    |
| React Router DOM       | Routing                      |
| Firebase Authentication| Google Login/Auth            |
| Axios                  | HTTP Requests                |
| React Hot Toast        | Notification system          |
| SweetAlert2            | Confirm dialogs and alerts   |

---

## 📂 Installation & Setup

1. **Clone the Repository:**
   
