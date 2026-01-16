import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">FreshMart</span>
          </Link>
          <nav className="hidden lg:flex gap-8">
            <Link to="/" className="text-sm font-medium hover:text-black transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-black transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-black transition-colors relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/deals" className="text-sm font-medium hover:text-black transition-colors relative group">
              Deals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center border-2 border-gray-200 rounded-full px-4 py-2.5 w-80 focus-within:border-black transition-colors">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search for fresh products..."
              className="ml-3 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-full p-3">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          
          <Link to={isLoggedIn ? '/profile' : '/login'}>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full p-3">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium hover:text-black transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-medium hover:text-black transition-colors">Products</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-black transition-colors">Categories</Link>
            <Link to="/deals" className="text-sm font-medium hover:text-black transition-colors">Deals</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
