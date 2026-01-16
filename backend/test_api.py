import asyncio
import httpx

BASE_URL = "http://localhost:8000"

async def test_api():
    async with httpx.AsyncClient() as client:
        print("=== Testing FreshMart API ===\n")
        
        # Test root endpoint
        print("1. Testing root endpoint...")
        response = await client.get(f"{BASE_URL}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}\n")
        
        # Test products endpoint
        print("2. Testing products endpoint...")
        response = await client.get(f"{BASE_URL}/api/products")
        products = response.json()
        print(f"   Status: {response.status_code}")
        print(f"   Products count: {len(products)}")
        if products:
            print(f"   Sample product: {products[0]['name']}\n")
        
        # Test departments endpoint
        print("3. Testing departments endpoint...")
        response = await client.get(f"{BASE_URL}/api/departments")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}\n")
        
        # Test signup
        print("4. Testing signup endpoint...")
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "password": "testpass123"
        }
        response = await client.post(f"{BASE_URL}/api/auth/signup", json=user_data)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            print(f"   User created: {response.json()['email']}\n")
        else:
            print(f"   Response: {response.json()}\n")
        
        # Test login
        print("5. Testing login endpoint...")
        login_data = {
            "email": "test@example.com",
            "password": "testpass123"
        }
        response = await client.post(f"{BASE_URL}/api/auth/login", json=login_data)
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            token = response.json()['access_token']
            print(f"   Token received: {token[:20]}...\n")
        else:
            print(f"   Response: {response.json()}\n")

if __name__ == "__main__":
    print("Make sure the server is running on http://localhost:8000\n")
    asyncio.run(test_api())
