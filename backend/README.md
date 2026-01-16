# FreshMart Backend API

FastAPI backend with MongoDB for FreshMart e-commerce platform.

## Setup

1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Check database structure:
```bash
python check_db.py
```

4. Run the server:
```bash
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products (optional: ?category=CategoryName)
- GET `/api/products/{id}` - Get single product
- GET `/api/categories` - Get all categories

## API Documentation
Visit `http://localhost:8000/docs` for interactive API documentation.
