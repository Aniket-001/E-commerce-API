# Ecommerce API with Node.js

This project is an implementation of an Ecommerce API using Node.js. The API provides endpoints for various e-commerce operations such as product and category listing, product details, cart management, order processing, user authentication using JSON Web Tokens (JWT), and more.

## Table of Contents

- [Requirements](#requirements)
- [API Endpoints](#api-endpoints)
- [Database Integration](#database-integration)
- [User Authentication](#user-authentication)
- [Error Handling](#error-handling)
- [Documentation](#documentation)
- [Rate Limiting (Optional)](#rate-limiting-optional)

## Requirements

To run this project, you need to have Node.js and a SQL database, preferably Postgres, installed on your system.

## API Endpoints

### Category Listing

- **Endpoint:** `/api/v1/categorylisting`
- **Description:** Retrieve a list of categories.

### Product Listing

- **Endpoint:** `/api/v1/category/:Id`
- **Description:** Retrieve a list of products with essential details such as title, price, description, and availability based on category ID.

### Product Details

- **Endpoint:** `/api/v1/product/:productId`
- **Description:** Fetch detailed information of a specific product by its ID.

### Cart Management

- **Endpoints:**
  - Add Product to Cart: `/api/cart/add`
  - View Cart: `/api/cart/view`
  - Update Cart: `/api/cart/update`
  - Remove Item from Cart: `/api/cart/remove`
  
### Order Placement

- **Endpoint:** `/api/orders/place`
- **Description:** Handle order placement, allowing users to place an order with products from their cart.

### Order History

- **Endpoint:** `/api/orders/history`
- **Description:** Fetch the order history for authenticated users.

### Order Details

- **Endpoint:** `/api/orders/:orderId`
- **Description:** Retrieve detailed information of a specific order by its ID.

### User Authentication

- **Endpoints:**
  - Register: `/api/auth/register`
  - Login: `/api/auth/login`

### Database Integration

The API interacts with a SQL database, preferably Postgres, to perform CRUD operations on products, cart items, and orders.

### User Authentication

- Implement user authentication using JSON Web Tokens (JWT).
- Users can register, log in, and obtain a token to authenticate API requests.
- Implement authentication middleware to secure sensitive API endpoints.

### Error Handling

Ensure appropriate error handling is in place. The API should return meaningful error messages and status codes when necessary.

### Documentation

Create documentation for the API endpoints, including details about their functionality, expected input, and output. A Swagger doc is preferred.


## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure the database connection in `.env` file.
4. Run the server: `npm start`


