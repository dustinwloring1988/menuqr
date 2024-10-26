'use client'

import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bell, ChevronDown, Menu, Plus, QrCode, Settings, Users, X, Smartphone, Tablet, Monitor } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration purposes
const mockMenus = [
  { id: 1, name: "Lunch Special", items: 12, lastUpdated: "2 days ago" },
  { id: 2, name: "Dinner Menu", items: 20, lastUpdated: "1 week ago" },
]

const mockQRCodes = [
  { id: 1, menu: "Lunch Special", restaurant: "joes-diner", created: "3 days ago", scans: 45 },
  { id: 2, menu: "Dinner Menu", restaurant: "joes-diner", created: "1 week ago", scans: 102 },
]

const deviceData = [
  { name: 'Mobile', value: 60 },
  { name: 'Tablet', value: 15 },
  { name: 'Desktop', value: 25 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

function LandingPage() {
  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" to="/">
            <QrCode className="h-6 w-6 mr-2" />
            <span className="font-bold">MenuQR</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
              Login
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Create Online Menus & QR Codes
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Easily create and manage digital menus for your business. Generate QR codes and track analytics.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 MenuQR. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" to="/">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" to="/">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </AnimatedPage>
  )
}

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to create a new user
    // For this example, we'll just simulate a successful sign-up
    console.log('Sign up with', email, password)
    navigate('/dashboard')
  }

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
            <CardDescription>Enter your email and password to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link className="underline" to="/login">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to authenticate the user
    // For this example, we'll just simulate a successful login
    console.log('Login with', email, password)
    navigate('/dashboard')
  }

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link className="underline" to="/signup">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}

function CreateMenuModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [menuName, setMenuName] = useState('')
  const [menuDescription, setMenuDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to create a new menu
    console.log('Creating menu:', { name: menuName, description: menuDescription, startTime, endTime, days })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Menu</DialogTitle>
          <DialogDescription>
            Enter the details for your new menu. You can add items after creating the menu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="menu-name">Menu Name</Label>
            <Input
              id="menu-name"
              placeholder="e.g., Lunch Special"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-description">Description</Label>
            <Textarea
              id="menu-description"
              placeholder="Describe your menu..."
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Available Days</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(days).map(([day, checked]) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={checked}
                    onCheckedChange={(checked) => setDays(prev => ({ ...prev, [day]: checked }))}
                  />
                  <Label htmlFor={day} className="capitalize">{day}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create Menu</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function QRCodeModal({ isOpen, onClose, qrCode, setQrCodes }: { 
  isOpen: boolean; 
  onClose: () => void; 
  qrCode: any;
  setQrCodes: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  useEffect(() => {
    // Generate QR code with subdomain URL format
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://${qrCode.restaurant}.menuqr.com/${qrCode.menu.toLowerCase().replace(/\s+/g, '-')}`)
  }, [qrCode])

  const handleDownload = () => {
    // In a real application, you would implement the download functionality here
    console.log('Downloading QR code:', qrCodeUrl)
  }

  const handleRegenerate = () => {
    // In a real application, you would regenerate the QR code here
    console.log('Regenerating QR code for:', qrCode.menu)
    // Update the QR code in the state
    setQrCodes(prevQrCodes => prevQrCodes.map(qr => qr.id === qrCode.id ? { ...qr, created: 'Just now' } : qr))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR  Code for {qrCode.menu}</DialogTitle>
          <DialogDescription>
            Scan this QR code to view your menu or share it with your customers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <img src={qrCodeUrl} alt={`QR Code for ${qrCode.menu}`} className="w-48 h-48" />
          <div className="flex space-x-2">
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={handleRegenerate}>Regenerate</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const location = useLocation()

  const isActive = (path: string): boolean => location.pathname === path

  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:relative ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      initial={false}
      animate={{ x: isSidebarOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-2xl font-semibold">MenuQR</span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 space-y-2 p-2">
          <Button variant={isActive('/dashboard') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
            <Link to="/dashboard">
              <Users className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant={isActive('/dashboard/menus') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
            <Link to="/dashboard/menus">
              <Menu className="mr-2 h-4 w-4" />
              Menus
            </Link>
          </Button>
          <Button variant={isActive('/dashboard/qr-codes') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
            <Link to="/dashboard/qr-codes">
              <QrCode className="mr-2 h-4 w-4" />
              QR Codes
            </Link>
          </Button>
          <Button variant={isActive('/dashboard/settings') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
            <Link to="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </nav>
      </div>
    </motion.aside>
  )
}

function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (open: boolean) => void }) {
  const navigate = useNavigate()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
      <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </Button>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">View notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none  text-muted-foreground">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function DashboardContent() {
  const [isCreateMenuModalOpen, setIsCreateMenuModalOpen] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')

  const timeRangeData = {
    '7d': { views: 1234, avgViewTime: '2m 15s' },
    '30d': { views: 5678, avgViewTime: '2m 30s' },
    '90d': { views: 15000, avgViewTime: '2m 45s' },
  }

  const mostViewedItems = [
    { name: 'Cheeseburger', views: 450 },
    { name: 'Caesar Salad', views: 380 },
    { name: 'Margherita Pizza', views: 320 },
    { name: 'Chicken Wings', views: 290 },
    { name: 'Fish and Chips', views: 250 },
  ]

  const chartData = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 2000 },
    { name: 'Thu', views: 2780 },
    { name: 'Fri', views: 1890 },
    { name: 'Sat', views: 2390 },
    { name: 'Sun', views: 3490 },
  ]

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button onClick={() => setIsCreateMenuModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Menu
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
              <Menu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active QR Codes</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timeRangeData[selectedTimeRange as keyof typeof timeRangeData].views}</div>
              <p className="text-xs text-muted-foreground">
                Avg. view time: {timeRangeData[selectedTimeRange as keyof typeof timeRangeData].avgViewTime}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$573.00</div>
              <p className="text-xs text-muted-foreground">+201 since last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Views Over Time</CardTitle>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Bar dataKey="views" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <div className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4" />
                  <span>Mobile: {deviceData[0].value}%</span>
                </div>
                <div className="flex items-center">
                  <Tablet className="mr-2 h-4 w-4" />
                  <span>Tablet: {deviceData[1].value}%</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="mr-2  h-4 w-4" />
                  <span>Desktop: {deviceData[2].value}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Most Viewed Items</CardTitle>
            <CardDescription>Top 5 items across all menus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mostViewedItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CreateMenuModal isOpen={isCreateMenuModalOpen} onClose={() => setIsCreateMenuModalOpen(false)} />
      </div>
    </AnimatedPage>
  )
}

function MenusContent() {
  const [menus, setMenus] = useState(mockMenus)
  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    setMenus(menus.filter(menu => menu.id !== id))
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Menus</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Menus</CardTitle>
            <CardDescription>Manage and edit your restaurant menus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map(menu => (
                  <TableRow key={menu.id}>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>{menu.items}</TableCell>
                    <TableCell>{menu.lastUpdated}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => navigate(`/dashboard/menus/${menu.id}`)}>View</Button>
                      <Button variant="ghost" onClick={() => navigate(`/dashboard/menus/${menu.id}/edit`)}>Edit</Button>
                      <Button variant="ghost" onClick={() => handleDelete(menu.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}

function EditMenuContent() {
  const [menuName, setMenuName] = useState('Lunch Special')
  const [menuDescription, setMenuDescription] = useState('Our delicious lunch offerings')
  const [startTime, setStartTime] = useState('11:00')
  const [endTime, setEndTime] = useState('14:00')
  const [days, setDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to update the menu
    console.log('Updating menu:', { name: menuName, description: menuDescription, startTime, endTime, days })
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Edit Menu</h1>
        <Card>
          <CardHeader>
            <CardTitle>Menu Details</CardTitle>
            <CardDescription>Update your menu information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="menu-name">Menu Name</Label>
                <Input
                  id="menu-name"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-description">Description</Label>
                <Textarea
                  id="menu-description"
                  value={menuDescription}
                  onChange={(e) => setMenuDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Available Days</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(days).map(([day, checked]) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={checked}
                        onCheckedChange={(checked) => setDays(prev => ({ ...prev, [day]: checked as boolean }))}
                      />
                      <Label htmlFor={day} className="capitalize">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit">Update Menu</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}

function QRCodesContent() {
  const [qrCodes, setQrCodes] = useState(mockQRCodes)
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null)
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false)

  interface QRCode {
    id: number;
    menu: string;
    restaurant: string;
    created: string;
    scans: number;
  }

  const handleView = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode)
    setIsQRCodeModalOpen(true)
  }

  const handleDownload = (qrCode: QRCode) => {
    // In a real application, you would implement the download functionality here
    console.log('Downloading QR code for:', qrCode.menu)
  }

  const handleRegenerate = (qrCode: QRCode) => {
    // In a real application, you would regenerate the QR code here
    console.log('Regenerating QR code for:', qrCode.menu)
    // Update the QR code in the state
    setQrCodes(qrCodes.map(qr => qr.id === qrCode.id ? { ...qr, created: 'Just now' } : qr))
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">QR Codes</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your QR Codes</CardTitle>
            <CardDescription>Manage and generate QR codes for your menus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodes.map(qrCode => (
                  <TableRow key={qrCode.id}>
                    <TableCell>{qrCode.menu}</TableCell>
                    <TableCell>{qrCode.created}</TableCell>
                    <TableCell>{qrCode.scans}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => handleView(qrCode)}>View</Button>
                      <Button variant="ghost" onClick={() => handleDownload(qrCode)}>Download</Button>
                      <Button variant="ghost" onClick={() => handleRegenerate(qrCode)}>Regenerate</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {selectedQRCode && (
          <QRCodeModal
            isOpen={isQRCodeModalOpen}
            onClose={() => setIsQRCodeModalOpen(false)}
            qrCode={selectedQRCode}
            setQrCodes={setQrCodes}  // Add this prop
          />
        )}
      </div>
    </AnimatedPage>
  )
}

function SettingsContent() {
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button>Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AnimatedPage>
  )
}

interface MenuItem {
  name: string;
  price: string;
  description: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  image?: string;
}

function PublicMenuView({ restaurantSubdomain }: { restaurantSubdomain: string | null }) {
  const { menuName } = useParams()
  const [menuData, setMenuData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        console.log(`Fetching menu data for restaurant: ${restaurantSubdomain}, menu: ${menuName}`)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (!menuName) {
          // If no menu is specified, show available menus
          setMenuData({
            restaurantName: restaurantSubdomain?.replace(/-/g, ' '),
            availableMenus: [
              {
                name: 'Lunch Special',
                description: 'Available Monday-Friday, 11am-3pm',
                path: 'lunch-special'
              },
              {
                name: 'Dinner Menu',
                description: 'Available Daily, 5pm-10pm',
                path: 'dinner-menu'
              },
              {
                name: 'Weekend Brunch',
                description: 'Available Weekends, 9am-2pm',
                path: 'weekend-brunch'
              }
            ]
          })
        } else {
          // Show specific menu items as before
          setMenuData({
            restaurantName: restaurantSubdomain?.replace(/-/g, ' '),
            menuName: menuName?.replace(/-/g, ' '),
            items: [
              {
                name: 'Classic Cheeseburger',
                price: '$12.99',
                description: 'Hand-pressed beef patty with melted cheddar',
                ingredients: ['Beef patty', 'Cheddar cheese', 'Lettuce', 'Tomato', 'Onion', 'Brioche bun'],
                allergens: ['Dairy', 'Gluten'],
                calories: 850,
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300'
              },
              {
                name: 'Caesar Salad',
                price: '$10.99',
                description: 'Crisp romaine lettuce with classic Caesar dressing',
                ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
                allergens: ['Dairy', 'Gluten', 'Eggs'],
                calories: 450,
                image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300'
              },
            ]
          })
        }
        setLoading(false)
      } catch (err) {
        setError('Failed to load menu data')
        setLoading(false)
      }
    }

    fetchMenuData()
  }, [restaurantSubdomain, menuName])

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsItemModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading menu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  // If no specific menu is selected, show available menus
  if (!menuName && menuData?.availableMenus) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">{menuData.restaurantName}</h1>
          <h2 className="text-xl text-gray-600 mb-6">Available Menus</h2>
          <div className="grid gap-6">
            {menuData.availableMenus.map((menu: any, index: number) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/${menu.path}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{menu.name}</h3>
                  </div>
                  <p className="text-gray-600">{menu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">{menuData?.restaurantName}</h1>
        <h2 className="text-xl text-gray-600 mb-6 capitalize">{menuData?.menuName}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {menuData?.items?.map((item: MenuItem, index: number) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              onClick={() => handleItemClick(item)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {item.image ? (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md flex-shrink-0">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className="text-lg">{item.price}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {menuData?.items?.length === 0 && (
            <div className="text-center text-gray-500 col-span-2">
              No items available in this menu
            </div>
          )}
        </div>

        <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex justify-between items-center">
                    {selectedItem.name}
                    <span className="text-xl font-bold">{selectedItem.price}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  {selectedItem.image && (
                    <div className="w-full h-48 relative">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                  {selectedItem.ingredients && (
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients</h4>
                      <p className="text-gray-600">{selectedItem.ingredients.join(', ')}</p>
                    </div>
                  )}
                  {selectedItem.allergens && (
                    <div>
                      <h4 className="font-semibold mb-2">Allergens</h4>
                      <div className="flex gap-2">
                        {selectedItem.allergens.map((allergen, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedItem.calories && (
                    <div>
                      <h4 className="font-semibold mb-2">Nutritional Information</h4>
                      <p className="text-gray-600">{selectedItem.calories} calories</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  )
}

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/menus" element={<MenusContent />} />
              <Route path="/menus/:id" element={<PublicMenuView restaurantSubdomain={null} />} />
              <Route path="/menus/:id/edit" element={<EditMenuContent />} />
              <Route path="/qr-codes" element={<QRCodesContent />} />
              <Route path="/settings" element={<SettingsContent />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get the current hostname
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isSubdomain = hostname.split('.').length > 2
  const restaurantSubdomain = isSubdomain ? hostname.split('.')[0] : null

  if (!isClient) {
    return null
  }

  // If accessing via subdomain, show the menu view
  if (isSubdomain) {
    return (
      <BrowserRouter>
        <Routes>
          <Route 
            path="/:menuName" 
            element={
              <PublicMenuView 
                restaurantSubdomain={restaurantSubdomain} 
              />
            } 
          />
          <Route 
            path="/" 
            element={
              <PublicMenuView 
                restaurantSubdomain={restaurantSubdomain} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    )
  }

  // Regular routing for the main application
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}
