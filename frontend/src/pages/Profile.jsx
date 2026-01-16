import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { User, Mail, Phone, LogOut, MapPin, Calendar, ShoppingBag, Package } from 'lucide-react'

export function Profile() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const email = localStorage.getItem('user_email')
    const name = localStorage.getItem('user_name') || 'User'
    const phone = localStorage.getItem('user_phone') || ''
    const address = localStorage.getItem('user_address') || ''
    const city = localStorage.getItem('user_city') || ''
    const zipCode = localStorage.getItem('user_zipCode') || ''

    setFormData({ name, email, phone, address, city, zipCode })
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    localStorage.setItem('user_name', formData.name)
    localStorage.setItem('user_phone', formData.phone)
    localStorage.setItem('user_address', formData.address)
    localStorage.setItem('user_city', formData.city)
    localStorage.setItem('user_zipCode', formData.zipCode)
    setEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_phone')
    localStorage.removeItem('user_address')
    localStorage.removeItem('user_city')
    localStorage.removeItem('user_zipCode')
    navigate('/login')
  }

  const memberSince = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">{formData.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{formData.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards */}
          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="text-3xl font-bold mb-1">0</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="text-3xl font-bold mb-1">$0.00</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="text-3xl font-bold mb-1">Active</p>
              <p className="text-sm text-gray-600">Account Status</p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </span>
              {!editing && (
                <Button variant="outline" onClick={() => setEditing(true)} className="border-2">
                  Edit Profile
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="email"
                    value={formData.email}
                    disabled
                    className="pl-11 h-12 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="+1 (555) 000-0000"
                    className="pl-11 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="New York"
                    className="pl-11 h-12"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Street Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="123 Main Street"
                  className="pl-11 h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">ZIP Code</label>
                <Input
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="10001"
                  className="h-12"
                />
              </div>
            </div>

            {editing && (
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditing(false)}
                  className="flex-1 border-2"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="border-2 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-4">No orders yet</p>
              <Button onClick={() => navigate('/products')}>Start Shopping</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="flex-1 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-2"
                onClick={() => navigate('/products')}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
