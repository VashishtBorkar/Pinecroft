
# Pincecroft
A social media platform for commercial investors to discuss, share, and track market insights all in one place.


## Table of Contents
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Screenshots](#screenshots)

---

## Demo

<a href="https://youtu.be/tnJSi7Vvhak" target="_blank">Link to demo video</a>


---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Realtime/Data:** Financial Modeling Prep API   

---

## Features

- User authentication with JWT
- Social feed with posts, comments, and upvotes
- Join and interact within company-specific communities
- Real-time stock data
- Infinite scroll and pagination on feeds
- Full-text search for users
- Responsive UI optimized for desktop

---

## Installation

```bash
# Clone the repository
git clone https://github.com/VashishtBorkar/pinecroft.git
cd pinecroft

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Environment Variables 
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
FMP_KEY=your_financial_api_key
CLIENT_URL=http://localhost:3000
```

## Running Locally

```bash
# 1. Start the backend server
cd server
npm start

# 2. In a separate terminal, start the React client
cd client 
npm start
```

## Screenshots

<p align="center">
  <img src="./assets/screenshot1.png" alt="Feed Page" width="600" />
</p>

<p align="center">
  <img src="./assets/screenshot2.png" alt="Community Page" width="600" />
</p>
