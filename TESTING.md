# Testing Guide

## ✅ What's Working Now:

### Backend (Port 8000)
- ✅ Connected to MongoDB Atlas
- ✅ Products collection (11 items)
- ✅ Users collection for authentication
- ✅ All API endpoints functional

### Frontend (Port 5174)
- ✅ Products page fetches from database
- ✅ Signup creates user in database
- ✅ Login authenticates with JWT
- ✅ Department filtering works

## 🚀 How to Test:

### 1. Start Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```

### 3. Test Flow:

**A. View Products:**
1. Go to http://localhost:5174
2. Click "Products" in navigation
3. See all 11 products from database
4. Click department filters (Produce, Dairy, etc.)
5. Products filter by department

**B. Create Account:**
1. Click "Sign up" or go to /signup
2. Fill in:
   - Name: Test User
   - Email: test@freshmart.com
   - Phone: +1234567890
   - Password: password123
   - Confirm Password: password123
3. Check "I agree to terms"
4. Click "Create Account"
5. Redirects to login page

**C. Login:**
1. Go to /login
2. Enter:
   - Email: test@freshmart.com
   - Password: password123
3. Click "Sign In"
4. Redirects to home page
5. Token saved in localStorage

**D. Verify in Database:**
```bash
cd backend
source venv/bin/activate
python check_db.py
```
You should see user count increased!

## 📊 Database Collections:

### products (11 items)
```json
{
  "product_id": 1,
  "name": "Organic Bananas",
  "price": 0.69,
  "department": "Produce",
  "aisle": "Fruit",
  "image_url": "https://..."
}
```

### users
```json
{
  "name": "Test User",
  "email": "test@freshmart.com",
  "phone": "+1234567890",
  "password": "hashed_password",
  "created_at": "2024-01-16T..."
}
```

## 🔍 API Endpoints:

### Test in Browser:
- http://localhost:8000/api/products
- http://localhost:8000/api/departments
- http://localhost:8000/api/aisles

### Test with Swagger:
- http://localhost:8000/docs

## ✨ Features Working:

✅ Product listing from MongoDB
✅ Department filtering
✅ User registration (saves to users collection)
✅ User login (JWT authentication)
✅ Password hashing with bcrypt
✅ Real product images from Unsplash
✅ Responsive design
✅ Error handling

## 🎯 Next Steps:

- Add shopping cart functionality
- Add product search
- Add user profile page
- Add order management
- Add payment integration
