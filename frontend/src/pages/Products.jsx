import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { API_BASE_URL } from '../config/api'

export function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [departments, setDepartments] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetchDepartments()
  }, [])

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      fetchProducts('all', searchQuery)
      setSelectedDepartment('all')
    } else {
      fetchProducts(selectedDepartment)
    }
  }, [selectedDepartment, searchParams])

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/departments`)
      const data = await response.json()
      const deptNames = Array.isArray(data.departments) ? data.departments.map(d => d.name || d) : []
      setDepartments(deptNames)
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const fetchProducts = async (department = 'all', search = null) => {
    try {
      setLoading(true)
      let url = `${API_BASE_URL}/api/products?`
      
      if (search) {
        url += `search=${encodeURIComponent(search)}`
      } else if (department !== 'all') {
        url += `department=${department}`
      }
      
      const response = await fetch(url)
      const data = await response.json()
      setProducts(Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'Our Products'}
          </h1>
          <p className="text-gray-600 text-lg">Fresh groceries delivered to your doorstep</p>
        </div>

        {/* Department Filter */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <Button
            variant={selectedDepartment === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedDepartment('all')}
            className="whitespace-nowrap"
          >
            All Products
          </Button>
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment(dept)}
              className="whitespace-nowrap"
            >
              {dept}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 border-2 hover:border-black overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-gray-100 h-64 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.department}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2">{product.aisle}</p>
                    <h3 className="font-bold mb-3 text-lg">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">4.5</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full group-hover:bg-black transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
