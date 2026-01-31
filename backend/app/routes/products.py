from fastapi import APIRouter, HTTPException
from app.schemas.schemas import ProductResponse
from app.core.database import get_database
from typing import List

router = APIRouter()

@router.get("/productsnew", response_model=List[ProductResponse])
async def get_products(department: str = None, aisle: str = None, search: str = None, limit: int = 100):
    db = get_database()
    
    query = {}
    if department:
        query["department"] = department
    if aisle:
        query["aisle"] = aisle
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    
    cursor = db.productsnew.find(query).limit(limit)
    products = await cursor.to_list(length=limit)
    
    # Convert MongoDB _id to id
    for product in products:
        product["id"] = str(product.pop("_id"))
    
    return products

@router.get("/productsnew/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    db = get_database()
    from bson import ObjectId
    
    try:
        product = await db.productsnew.find_one({"_id": ObjectId(product_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product["id"] = str(product.pop("_id"))
    return product

@router.get("/departments")
async def get_departments():
    db = get_database()
    departments = await db.productsnew.distinct("department")
    return {"departments": departments}

@router.get("/aisles")
async def get_aisles():
    db = get_database()
    aisles = await db.productsnew.distinct("aisle")
    return {"aisles": aisles}
