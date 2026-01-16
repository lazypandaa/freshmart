# Quick Start Guide

## Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate  # Already set up
uvicorn app.main:app --reload --port 8000
```

Backend will run on: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

## Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5174**

## Test the Application

1. Open http://localhost:5174 in your browser
2. Browse products on the home page
3. Click "Sign up" to create an account
4. Login with your credentials
5. Browse products by categories

## API Testing

Visit http://localhost:8000/docs for interactive API documentation where you can:
- Test all endpoints
- View request/response schemas
- Try authentication flow

## Available API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new user account
- POST `/api/auth/login` - Login and receive JWT token

### Products
- GET `/api/products` - Get all products
- GET `/api/products?department=produce` - Filter by department
- GET `/api/products/{id}` - Get specific product
- GET `/api/departments` - List all departments
- GET `/api/aisles` - List all aisles

## Database Info

- **Database**: FreshMart (MongoDB Atlas)
- **Collections**: products (11 items), users
- **Products**: Fresh groceries with prices, departments, and images

## Troubleshooting

### Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend won't start
```bash
cd frontend
npm install
```

### Can't connect to database
- Check internet connection
- MongoDB URL is already configured in `backend/app/core/database.py`
