'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, Menu, Plus, QrCode, Settings, Users, X, Smartphone, Tablet, Monitor, Check, Clock, Eye, RotateCw, LineChart, Languages, FolderTree, Filter, Search } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement);

// Mock data for demonstration purposes
const mockMenusByRestaurant = {
  'joes-diner': [
    { 
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: "Breakfast Menu", 
      description: "Available daily, 7am-11am",
      image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a8866?w=800&h=400&fit=crop",
      is_listed: true,
      start_time: '07:00',
      end_time: '11:00',
      available_days: [1, 2, 3, 4, 5, 6, 7],
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'Classic Breakfasts',
          description: 'Traditional morning favorites',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174003',
              name: 'Classic American Breakfast',
              description: 'Two eggs any style, bacon or sausage, hash browns, and toast',
              price: '12.99',
              image_url: 'https://images.unsplash.com/photo-1550367363-ea12860cc124?w=300',
              ingredients: ['Eggs', 'Bacon', 'Hash Browns', 'Toast'],
              allergens: ['Eggs', 'Gluten'],
              calories: 850,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    },
    { 
      id: '123e4567-e89b-12d3-a456-426614174005',
      name: "Lunch Special", 
      description: "Available Monday-Friday, 11am-3pm",
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
      is_listed: true,
      start_time: '11:00',
      end_time: '15:00',
      available_days: [1, 2, 3, 4, 5],
      layout: 'list',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Sandwiches',
          description: 'Fresh and hearty sandwiches',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174007',
              name: 'Classic Club Sandwich',
              description: 'Triple-decker with turkey, bacon, lettuce, and tomato',
              price: '14.99',
              image_url: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=300',
              ingredients: ['Turkey', 'Bacon', 'Lettuce', 'Tomato', 'Mayo'],
              allergens: ['Gluten'],
              calories: 750,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    }
  ],
  'pizza-place': [
    {
      id: '123e4567-e89b-12d3-a456-426614174008',
      name: "Pizza Menu",
      description: "Our signature pizzas",
      image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174009',
          name: 'Classic Pizzas',
          description: 'Traditional favorites',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174010',
              name: 'Margherita Pizza',
              description: 'Fresh tomatoes, mozzarella, and basil',
              price: '16.99',
              image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300',
              ingredients: ['Tomato Sauce', 'Mozzarella', 'Fresh Basil'],
              allergens: ['Dairy', 'Gluten'],
              calories: 800,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    }
  ],
  'cafe-bistro': [
    {
      id: '123e4567-e89b-12d3-a456-426614174011',
      name: "All Day Menu",
      description: "Fresh, seasonal cuisine",
      image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174012',
          name: 'Starters',
          description: 'Light bites and appetizers',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174013',
              name: 'French Onion Soup',
              description: 'Classic soup with melted gruyere',
              price: '9.99',
              image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300',
              ingredients: ['Onions', 'Beef Broth', 'Gruyere Cheese', 'Bread'],
              allergens: ['Dairy', 'Gluten'],
              calories: 400,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174014',
      name: "Wine & Dessert",
      description: "Evening indulgences",
      image_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=400&fit=crop",
      is_listed: true,
      start_time: '16:00',
      end_time: '23:00',
      layout: 'list',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174015',
          name: 'Desserts',
          description: 'Sweet endings',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174016',
              name: 'Crème Brûlée',
              description: 'Classic French vanilla custard with caramelized sugar',
              price: '8.99',
              image_url: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300',
              ingredients: ['Cream', 'Vanilla', 'Sugar', 'Eggs'],
              allergens: ['Dairy', 'Eggs'],
              calories: 650,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    }
  ],
  'downtown-pub': [
    {
      id: '123e4567-e89b-12d3-a456-426614174017',
      name: "Bar Menu",
      description: "Classic pub fare and appetizers",
      image_url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174018',
          name: 'Bar Bites',
          description: 'Perfect with your favorite drink',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174019',
              name: 'Loaded Nachos',
              description: 'Tortilla chips topped with melted cheese, jalapeños, guacamole, and sour cream',
              price: '13.99',
              image_url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300',
              ingredients: ['Tortilla Chips', 'Cheese', 'Jalapeños', 'Guacamole', 'Sour Cream'],
              allergens: ['Dairy'],
              calories: 950,
              display_order: 1,
              is_available: true
            },
            {
              id: '123e4567-e89b-12d3-a456-426614174020',
              name: 'Wings Basket',
              description: 'Choose from Buffalo, BBQ, or Garlic Parmesan',
              price: '15.99',
              image_url: 'https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?w=300',
              ingredients: ['Chicken Wings', 'Choice of Sauce', 'Celery', 'Ranch Dressing'],
              allergens: ['Dairy'],
              calories: 850,
              display_order: 2,
              is_available: true
            }
          ]
        }
      ]
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174021',
      name: "Drinks Menu",
      description: "Craft beers, cocktails, and spirits",
      image_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'list',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174022',
          name: 'Craft Cocktails',
          description: 'Handcrafted signature drinks',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174023',
              name: 'Old Fashioned',
              description: 'Bourbon, bitters, sugar, and orange peel',
              price: '12.99',
              image_url: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=300',
              ingredients: ['Bourbon', 'Angostura Bitters', 'Sugar Cube', 'Orange Peel'],
              calories: 180,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    }
  ],

  'family-diner': [
    {
      id: '123e4567-e89b-12d3-a456-426614174024',
      name: "All-Day Breakfast",
      description: "Breakfast served 24/7",
      image_url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174025',
          name: 'Grand Slams',
          description: 'Our famous breakfast combinations',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174026',
              name: 'Original Grand Slam',
              description: 'Two buttermilk pancakes, two eggs, two bacon strips, and two sausage links',
              price: '13.99',
              image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300',
              ingredients: ['Pancakes', 'Eggs', 'Bacon', 'Sausage'],
              allergens: ['Eggs', 'Dairy', 'Gluten'],
              calories: 1050,
              display_order: 1,
              is_available: true
            },
            {
              id: '123e4567-e89b-12d3-a456-426614174027',
              name: 'Fit Slam',
              description: 'Egg whites, turkey bacon, whole wheat toast, and fresh fruit',
              price: '12.99',
              image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300',
              ingredients: ['Egg Whites', 'Turkey Bacon', 'Whole Wheat Toast', 'Fresh Fruit'],
              allergens: ['Eggs', 'Gluten'],
              calories: 450,
              display_order: 2,
              is_available: true
            }
          ]
        }
      ]
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174028',
      name: "Lunch & Dinner",
      description: "Classic American comfort food",
      image_url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174029',
          name: 'Burgers & Melts',
          description: 'Served with crispy fries',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174030',
              name: 'Super Bird',
              description: 'Turkey, Swiss cheese, and tomato on grilled sourdough',
              price: '11.99',
              image_url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=300',
              ingredients: ['Turkey', 'Swiss Cheese', 'Tomato', 'Sourdough Bread'],
              allergens: ['Dairy', 'Gluten'],
              calories: 780,
              display_order: 1,
              is_available: true
            }
          ]
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174031',
          name: 'Value Menu',
          description: 'Great food at great prices',
          display_order: 2,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174032',
              name: '55-Plus Grilled Cheese',
              description: 'Classic grilled cheese with tomato soup',
              price: '8.99',
              image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300',
              ingredients: ['American Cheese', 'White Bread', 'Tomato Soup'],
              allergens: ['Dairy', 'Gluten'],
              calories: 550,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174033',
      name: "Kids Menu",
      description: "For our younger guests",
      image_url: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=400&fit=crop",
      is_listed: true,
      layout: 'grid',
      categories: [
        {
          id: '123e4567-e89b-12d3-a456-426614174034',
          name: 'Jr. Menu',
          description: 'All items come with a small drink',
          display_order: 1,
          items: [
            {
              id: '123e4567-e89b-12d3-a456-426614174035',
              name: 'Jr. Pancakes',
              description: 'Three silver dollar pancakes with syrup',
              price: '6.99',
              image_url: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300',
              ingredients: ['Pancake Batter', 'Syrup', 'Butter'],
              allergens: ['Dairy', 'Gluten'],
              calories: 350,
              display_order: 1,
              is_available: true
            }
          ]
        }
      ]
    }
  ]
}

const mockQRCodes = [
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    menu_id: '123e4567-e89b-12d3-a456-426614174000',
    created_at: '2024-03-01T12:00:00Z',
    last_regenerated_at: '2024-03-01T12:00:00Z',
    menu: { // Join with menus table
      name: "Lunch Special",
      organization: { // Join with organizations table
        subdomain: "joes-diner"
      }
    },
    views: 45 // Calculated from menu_views table
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174008',
    menu_id: '123e4567-e89b-12d3-a456-426614174005',
    created_at: '2024-03-01T12:00:00Z',
    last_regenerated_at: '2024-03-01T12:00:00Z',
    menu: { // Join with menus table
      name: "Dinner Menu",
      organization: { // Join with organizations table
        subdomain: "joes-diner"
      }
    },
    views: 102 // Calculated from menu_views table
  },
]

interface DeviceDataEntry {
  name: string;
  value: number;
}

interface ChartDataEntry {
  name: string;
  views: number;
}

interface MostViewedItem {
  name: string;
  views: number;
  totalTime: string;
}

const timeRangeData = {
  '7d': { views: 1234, avgViewTime: '2m 15s' },
  '30d': { views: 5678, avgViewTime: '2m 30s' },
  '90d': { views: 15000, avgViewTime: '2m 45s' },
}

const getDeviceData = (timeRange: string): DeviceDataEntry[] => {
  const data = {
    '7d': [
      { name: 'Mobile', value: 60 },
      { name: 'Tablet', value: 15 },
      { name: 'Desktop', value: 25 },
    ],
    '30d': [
      { name: 'Mobile', value: 55 },
      { name: 'Tablet', value: 20 },
      { name: 'Desktop', value: 25 },
    ],
    '90d': [
      { name: 'Mobile', value: 50 },
      { name: 'Tablet', value: 25 },
      { name: 'Desktop', value: 25 },
    ],
  }
  return data[timeRange as keyof typeof data] || data['7d']
}

const getChartData = (timeRange: string): ChartDataEntry[] => {
  const data = {
    '7d': [
      { name: 'Mon', views: 4000 },
      { name: 'Tue', views: 3000 },
      { name: 'Wed', views: 2000 },
      { name: 'Thu', views: 2780 },
      { name: 'Fri', views: 1890 },
      { name: 'Sat', views: 2390 },
      { name: 'Sun', views: 3490 },
    ],
    '30d': Array.from({ length: 30 }, (_, i) => ({
      name: `Day ${i + 1}`,
      views: Math.floor(Math.random() * 5000) + 1000,
    })),
    '90d': Array.from({ length: 90 }, (_, i) => ({
      name: `Day ${i + 1}`,
      views: Math.floor(Math.random() * 5000) + 1000,
    })),
  }
  return data[timeRange as keyof typeof data] || data['7d']
}

const getMostViewedItems = (timeRange: string): MostViewedItem[] => {
  const data = {
    '7d': [
      { name: 'Cheeseburger', views: 450, totalTime: '2h 15m' },
      { name: 'Caesar Salad', views: 380, totalTime: '1h 45m' },
      { name: 'Margherita Pizza', views: 320, totalTime: '1h 30m' },
      { name: 'Chicken Wings', views: 290, totalTime: '1h 20m' },
      { name: 'Fish and Chips', views: 250, totalTime: '1h 10m' },
    ],
    '30d': [
      { name: 'Cheeseburger', views: 1850, totalTime: '8h 30m' },
      { name: 'Caesar Salad', views: 1580, totalTime: '7h 15m' },
      { name: 'Margherita Pizza', views: 1320, totalTime: '6h 45m' },
      { name: 'Chicken Wings', views: 1190, totalTime: '5h 30m' },
      { name: 'Fish and Chips', views: 1050, totalTime: '5h 00m' },
    ],
    '90d': [
      { name: 'Cheeseburger', views: 5250, totalTime: '24h 45m' },
      { name: 'Caesar Salad', views: 4580, totalTime: '21h 30m' },
      { name: 'Margherita Pizza', views: 4320, totalTime: '20h 15m' },
      { name: 'Chicken Wings', views: 3990, totalTime: '18h 45m' },
      { name: 'Fish and Chips', views: 3750, totalTime: '17h 30m' },
    ],
  }
  return data[timeRange as keyof typeof data] || data['7d']
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const mockMenuViewStats = [
  {
    menuName: 'Lunch Menu',
    topItems: [
      { name: 'Burger', views: 245, avgTime: '45s' },
      { name: 'Caesar Salad', views: 190, avgTime: '38s' },
      { name: 'Fish & Chips', views: 170, avgTime: '42s' },
      { name: 'Club Sandwich', views: 155, avgTime: '35s' },
      { name: 'Pasta', views: 140, avgTime: '40s' }
    ]
  },
  {
    menuName: 'Dinner Menu',
    topItems: [
      { name: 'Steak', views: 320, avgTime: '55s' },
      { name: 'Salmon', views: 280, avgTime: '48s' },
      { name: 'Chicken', views: 260, avgTime: '45s' },
      { name: 'Risotto', views: 220, avgTime: '42s' },
      { name: 'Pasta', views: 200, avgTime: '40s' }
    ]
  }
]

const mockMenuViews = [
  {
    menu_id: '123e4567-e89b-12d3-a456-426614174000',
    menu: {
      name: 'Lunch Menu'
    },
    view_count: 2450,
    percentage: 45,
    created_at: '2024-03-01T12:00:00Z'
  },
  {
    menu_id: '123e4567-e89b-12d3-a456-426614174005',
    menu: {
      name: 'Dinner Menu'
    },
    view_count: 1840,
    percentage: 34,
    created_at: '2024-03-01T12:00:00Z'
  },
  {
    menu_id: '123e4567-e89b-12d3-a456-426614174009',
    menu: {
      name: 'Weekend Brunch'
    },
    view_count: 1150,
    percentage: 21,
    created_at: '2024-03-01T12:00:00Z'
  },
]

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

function TermsOfServiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Last updated: March 2024
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">1. Acceptance of Terms</h3>
          <p>
            By accessing and using Menu QRs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>

          <h3 className="font-semibold">2. Service Description</h3>
          <p>
            Menu QRs provides digital menu management and QR code generation services for restaurants and food service businesses.
          </p>

          <h3 className="font-semibold">3. User Accounts</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>

          <h3 className="font-semibold">4. Payment Terms</h3>
          <p>
            Subscription fees are billed in advance on a monthly basis. All payments are non-refundable unless otherwise required by law.
          </p>

          {/* Add more terms sections as needed */}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: March 2024
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">1. Information We Collect</h3>
          <p>
            We collect information that you provide directly to us, including your name, email address, and business information.
          </p>

          <h3 className="font-semibold">2. How We Use Your Information</h3>
          <p>
            We use the information we collect to provide and improve our services, communicate with you, and ensure security of our platform.
          </p>

          <h3 className="font-semibold">3. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
          </p>

          <h3 className="font-semibold">4. Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>

          {/* Add more privacy policy sections as needed */}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ForgotPasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Here you would typically send a request to your API to handle password reset
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStatus('success')
      setMessage('If an account exists with this email, you will receive password reset instructions.')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you instructions to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
            />
          </div>
          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              disabled={status === 'loading'}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Instructions'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Add this function near the top of the file with other utility functions
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 56 // This accounts for the fixed header height (h-14 = 56px)
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
  }
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Here you would typically send the contact form data to your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setStatus('success')
      setTimeout(() => {
        onClose()
        setFormData({ name: '', email: '', company: '', employees: '', message: '' })
        setStatus('idle')
      }, 2000)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Company Inc."
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Locations</Label>
              <Select 
                value={formData.employees} 
                onValueChange={(value: string) => setFormData(prev => ({ ...prev, employees: value }))}
                disabled={status === 'loading' || status === 'success'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 locations</SelectItem>
                  <SelectItem value="6-20">6-20 locations</SelectItem>
                  <SelectItem value="21-50">21-50 locations</SelectItem>
                  <SelectItem value="51+">51+ locations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your needs..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="min-h-[100px]"
              required
              disabled={status === 'loading' || status === 'success'}
            />
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
          {status === 'success' && (
            <p className="text-sm text-green-500">
              Thanks for reaching out! We'll be in touch soon.
            </p>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              disabled={status === 'loading'}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Add these new components near the other modal components

function PublicTermsOfServiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service - Menu Viewing</DialogTitle>
          <DialogDescription>
            Last updated: March 2024
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">1. Acceptance of Terms</h3>
          <p>
            By accessing and viewing this digital menu, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this service.
          </p>

          <h3 className="font-semibold">2. Menu Information</h3>
          <p>
            While we strive to maintain accurate and up-to-date menu information, prices, availability, and menu items may vary from what is displayed. The restaurant reserves the right to modify menu items and prices without notice.
          </p>

          <h3 className="font-semibold">3. Allergen Information</h3>
          <p>
            Allergen information is provided as a guide only. If you have food allergies or specific dietary requirements, please contact the restaurant staff directly for the most current and accurate information.
          </p>

          <h3 className="font-semibold">4. Image Usage</h3>
          <p>
            The images displayed on this menu are for illustrative purposes only. Actual dishes may vary in appearance from the images shown.
          </p>

          <h3 className="font-semibold">5. Intellectual Property</h3>
          <p>
            All content on this digital menu, including but not limited to images, descriptions, and design elements, is protected by copyright and other intellectual property rights.
          </p>

          <h3 className="font-semibold">6. Limitation of Liability</h3>
          <p>
            We are not responsible for any adverse reactions or experiences related to the consumption of items ordered from this menu. Please use your best judgment when making food choices.
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PublicPrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: March 2024
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <h3 className="font-semibold">1. Information We Collect</h3>
          <p>
            We collect information that you provide directly to us, including your name, email address, and business information.
          </p>

          <h3 className="font-semibold">2. How We Use Your Information</h3>
          <p>
            We use the information we collect to provide and improve our services, communicate with you, and ensure security of our platform.
          </p>

          <h3 className="font-semibold">3. Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
          </p>

          <h3 className="font-semibold">4. Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>

          {/* Add more privacy policy sections as needed */}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// First, add this interface near the top of the file with other interfaces
interface DashboardWidget {
  id: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
}

// Add this constant with the widget definitions
const DASHBOARD_WIDGETS: DashboardWidget[] = [
  {
    id: 'total-menus',
    name: 'Total Menus',
    description: 'Shows the total number of menus and recent changes',
    defaultEnabled: true,
  },
  {
    id: 'active-qr-codes',
    name: 'Active QR Codes',
    description: 'Displays the number of active QR codes',
    defaultEnabled: true,
  },
  {
    id: 'total-views',
    name: 'Total Views',
    description: 'Shows total menu views and average view time',
    defaultEnabled: true,
  },
  {
    id: 'revenue',
    name: 'Revenue',
    description: 'Displays revenue statistics',
    defaultEnabled: true,
  },
  {
    id: 'avg-time',
    name: 'Average Time on Menu',
    description: 'Shows how long customers spend viewing menus',
    defaultEnabled: true,
  },
  {
    id: 'menu-item-views',
    name: 'Menu Item Views',
    description: 'Tracks individual menu item popularity',
    defaultEnabled: true,
  },
  {
    id: 'return-visitors',
    name: 'Return Visitors',
    description: 'Shows percentage of returning customers',
    defaultEnabled: true,
  },
  {
    id: 'peak-hours',
    name: 'Peak Hours',
    description: 'Displays busiest hours based on menu views',
    defaultEnabled: true,
  },
  {
    id: 'language-preferences',
    name: 'Language Preferences',
    description: 'Shows menu language usage statistics',
    defaultEnabled: true,
  },
  {
    id: 'menu-categories',
    name: 'Menu Categories',
    description: 'Tracks performance of menu categories',
    defaultEnabled: true,
  },
  {
    id: 'dietary-filters',
    name: 'Dietary Filters',
    description: 'Monitors dietary preference trends',
    defaultEnabled: true,
  },
  {
    id: 'search-usage',
    name: 'Search Usage',
    description: 'Shows how customers use menu search',
    defaultEnabled: true,
  },
  {
    id: 'views-chart',
    name: 'Views Over Time Chart',
    description: 'Displays view trends over time',
    defaultEnabled: true,
  },
  {
    id: 'device-usage',
    name: 'Device Usage Chart',
    description: 'Shows breakdown of device types used',
    defaultEnabled: true,
  },
  {
    id: 'menu-views-distribution',
    name: 'Menu Views Distribution',
    description: 'Shows the distribution of views across different menus',
    defaultEnabled: true,
  },
]


function LandingPage() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
          <Link className="flex items-center justify-center" to="/">
            <QrCode className="h-6 w-6 mr-2" />
            <span className="font-bold">Menu QRs</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <button 
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button 
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </button>
            {/* Add this new link */}
            <Link 
              to="/business" 
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Restaurants
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
              Login
            </Link>
          </nav>
        </header>
        {/* Add a spacer div to account for the fixed header */}
        <div className="h-14"></div>
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Transform Your Menu Experience
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Create beautiful digital menus with instant QR codes. Help your customers order with ease while you manage everything from one dashboard.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button size="lg" asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="#demo">View Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full py-12 md:py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Menu QRs?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Instant QR Generation</h3>
                  <p className="text-gray-500">Create and update QR codes instantly. Changes to your menu are reflected immediately.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Mobile-Optimized</h3>
                  <p className="text-gray-500">Beautiful, responsive menus that work perfectly on any device.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Settings className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Easy Management</h3>
                  <p className="text-gray-500">Update prices, add items, and manage multiple menus from one dashboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="w-full py-12 md:py-24 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle>Starter</CardTitle>
                      <CardDescription>Perfect for small businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">$19/mo</div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          1 Menu
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Unlimited QR Codes
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Basic Analytics
                        </li>
                      </ul>
                    </CardContent>
                  </div>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link to="/signup">Start Free Trial</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="flex flex-col justify-between border-primary">
                  <div>
                    <CardHeader>
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>For growing restaurants</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">$49/mo</div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Up to 5 Menus
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Advanced Analytics
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Custom Branding
                        </li>
                      </ul>
                    </CardContent>
                  </div>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link to="/signup">Start Free Trial</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For restaurant chains</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-4">Custom</div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Unlimited Menus
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Priority Support
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Custom Integration
                        </li>
                      </ul>
                    </CardContent>
                  </div>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      onClick={() => setIsContactOpen(true)}
                    >
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Add this new section before the footer */}
          <section className="w-full py-12 md:py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Discover Restaurants
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Browse our directory of restaurants using digital menus. Find new places to eat and explore their menus before you visit.
                  </p>
                </div>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/business">View Restaurant Directory</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Menu QRs. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsTermsOpen(true)}
            >
              Terms of Service
            </button>
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsPrivacyOpen(true)}
            >
              Privacy
            </button>
          </nav>
        </footer>

        <TermsOfServiceModal 
          isOpen={isTermsOpen} 
          onClose={() => setIsTermsOpen(false)} 
        />
        <PrivacyPolicyModal 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </div>
    </AnimatedPage>
  )
}

function SignUp() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info (Step 1)
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Business Info (Step 2)
    businessName: '',
    businessPhone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    
    // Business Hours (Step 3)
    is24_7: false,
    businessDomain: '',
    hours: {
      monday: { open: '09:00', close: '17:00', isOpen: true },
      tuesday: { open: '09:00', close: '17:00', isOpen: true },
      wednesday: { open: '09:00', close: '17:00', isOpen: true },
      thursday: { open: '09:00', close: '17:00', isOpen: true },
      friday: { open: '09:00', close: '17:00', isOpen: true },
      saturday: { open: '09:00', close: '17:00', isOpen: true },
      sunday: { open: '09:00', close: '17:00', isOpen: true },
    }
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      setError('')
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Final submission
      console.log('Sign up with', formData)
      navigate('/dashboard')
    }
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                step === num
                  ? 'bg-primary text-white'
                  : step > num
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {step > num ? '✓' : num}
            </div>
            {num < 3 && (
              <div
                className={`w-8 h-0.5 ${
                  step > num ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <CardDescription>Tell us about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              required
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 555-5555"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          <Button className="w-full" type="submit">
            Next
          </Button>
        </form>
      </CardContent>
    </>
  )

  const renderStep2 = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Business Information</CardTitle>
        <CardDescription>Tell us about your business</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Joe's Restaurant"
              required
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessPhone">Business Phone</Label>
            <Input
              id="businessPhone"
              type="tel"
              placeholder="(555) 555-5555"
              required
              value={formData.businessPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                required
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipcode">Zipcode</Label>
            <Input
              id="zipcode"
              required
              value={formData.zipcode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipcode: e.target.value }))}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  )

  const renderStep3 = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Business Hours</CardTitle>
        <CardDescription>Set your hours of operation</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="24-7"
                checked={formData.is24_7}
                onCheckedChange={(checked) => {
                  setFormData(prev => ({ ...prev, is24_7: checked as boolean }))
                }}
              />
              <Label htmlFor="24-7">Open 24/7</Label>
            </div>
            
            {!formData.is24_7 && (
              <div className="space-y-4">
                {Object.entries(formData.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24 capitalize">{day}</div>
                    <Checkbox
                      id={`${day}-open`}
                      checked={hours.isOpen}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          hours: {
                            ...prev.hours,
                            [day]: { ...hours, isOpen: checked as boolean }
                          }
                        }))
                      }}
                    />
                    <Label htmlFor={`${day}-open`}>Open</Label>
                    {hours.isOpen && (
                      <>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              hours: {
                                ...prev.hours,
                                [day]: { ...hours, open: e.target.value }
                              }
                            }))
                          }}
                          className="w-32"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              hours: {
                                ...prev.hours,
                                [day]: { ...hours, close: e.target.value }
                              }
                            }))
                          }}
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessDomain">Custom Domain</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="businessDomain"
                placeholder="yourrestaurant"
                value={formData.businessDomain}
                onChange={(e) => setFormData(prev => ({ ...prev, businessDomain: e.target.value }))}
                required
              />
              <span>.menuqrs.com</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button type="submit">
              Complete Signup
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  )

  return (
    <AnimatedPage>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
        <Card className="w-full max-w-md">
          {renderStepIndicator()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </Card>
      </div>
    </AnimatedPage>
  )
}

// Add this interface and mock data near the top with other interfaces/mock data
interface Restaurant {
  subdomain: string;
  name: string;
  credentials: {
    email: string;
    password: string;
  };
  businessInfo: {
    phone: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    hours: {
      [key: string]: {
        open: string;
        close: string;
        isOpen: boolean;
      };
    };
  };
  tier: 'starter' | 'professional' | 'enterprise';
  enabledWidgets: string[];
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    subdomain: 'joes-diner',
    name: "Joe's Diner",
    credentials: {
      email: 'joe@joes-diner.com',
      password: 'Password123!'
    },
    businessInfo: {
      phone: '(555) 123-4567',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      hours: {
        monday: { open: '06:00', close: '22:00', isOpen: true },
        tuesday: { open: '06:00', close: '22:00', isOpen: true },
        wednesday: { open: '06:00', close: '22:00', isOpen: true },
        thursday: { open: '06:00', close: '22:00', isOpen: true },
        friday: { open: '06:00', close: '23:00', isOpen: true },
        saturday: { open: '07:00', close: '23:00', isOpen: true },
        sunday: { open: '07:00', close: '22:00', isOpen: true },
      }
    },
    tier: 'professional',
    enabledWidgets: [
      'total-menus',
      'active-qr-codes',
      'total-views',
      'revenue',
      'avg-time',
      'menu-item-views',
      'return-visitors',
      'peak-hours',
      'language-preferences',
      'menu-categories',
      'dietary-filters',
      'search-usage',
      'views-chart',
      'device-usage',
      'menu-views-distribution'
    ]
  },
  {
    subdomain: 'pizza-place',
    name: "Pizza Place",
    credentials: {
      email: 'owner@pizza-place.com',
      password: 'Password123!'
    },
    businessInfo: {
      phone: '(555) 234-5678',
      address: '456 Oak Avenue',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60601',
      hours: {
        monday: { open: '11:00', close: '23:00', isOpen: true },
        tuesday: { open: '11:00', close: '23:00', isOpen: true },
        wednesday: { open: '11:00', close: '23:00', isOpen: true },
        thursday: { open: '11:00', close: '23:00', isOpen: true },
        friday: { open: '11:00', close: '00:00', isOpen: true },
        saturday: { open: '11:00', close: '00:00', isOpen: true },
        sunday: { open: '12:00', close: '22:00', isOpen: true },
      }
    },
    tier: 'starter',
    enabledWidgets: [
      'total-menus',
      'active-qr-codes',
      'total-views',
      'menu-item-views',
      'views-chart'
    ]
  },
  {
    subdomain: 'cafe-bistro',
    name: "Café Bistro",
    credentials: {
      email: 'manager@cafe-bistro.com',
      password: 'Password123!'
    },
    businessInfo: {
      phone: '(555) 345-6789',
      address: '789 Elm Street',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94105',
      hours: {
        monday: { open: '08:00', close: '21:00', isOpen: true },
        tuesday: { open: '08:00', close: '21:00', isOpen: true },
        wednesday: { open: '08:00', close: '21:00', isOpen: true },
        thursday: { open: '08:00', close: '21:00', isOpen: true },
        friday: { open: '08:00', close: '22:00', isOpen: true },
        saturday: { open: '09:00', close: '22:00', isOpen: true },
        sunday: { open: '09:00', close: '20:00', isOpen: true },
      }
    },
    tier: 'professional',
    enabledWidgets: [
      'total-menus',
      'active-qr-codes',
      'total-views',
      'menu-item-views',
      'peak-hours',
      'views-chart',
      'device-usage'
    ]
  },
  {
    subdomain: 'downtown-pub',
    name: "Downtown Pub",
    credentials: {
      email: 'pub@downtown-pub.com',
      password: 'Password123!'
    },
    businessInfo: {
      phone: '(555) 456-7890',
      address: '321 Pine Street',
      city: 'Boston',
      state: 'MA',
      zipcode: '02108',
      hours: {
        monday: { open: '16:00', close: '02:00', isOpen: true },
        tuesday: { open: '16:00', close: '02:00', isOpen: true },
        wednesday: { open: '16:00', close: '02:00', isOpen: true },
        thursday: { open: '16:00', close: '02:00', isOpen: true },
        friday: { open: '16:00', close: '03:00', isOpen: true },
        saturday: { open: '16:00', close: '03:00', isOpen: true },
        sunday: { open: '16:00', close: '02:00', isOpen: true },
      }
    },
    tier: 'professional',
    enabledWidgets: [
      'total-menus',
      'active-qr-codes',
      'total-views',
      'revenue',
      'avg-time',
      'menu-item-views',
      'peak-hours',
      'views-chart',
      'device-usage'
    ]
  },
  {
    subdomain: 'family-diner',
    name: "Family Diner",
    credentials: {
      email: 'admin@family-diner.com',
      password: 'Password123!'
    },
    businessInfo: {
      phone: '(555) 567-8901',
      address: '567 Maple Drive',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      hours: {
        monday: { open: '00:00', close: '23:59', isOpen: true },
        tuesday: { open: '00:00', close: '23:59', isOpen: true },
        wednesday: { open: '00:00', close: '23:59', isOpen: true },
        thursday: { open: '00:00', close: '23:59', isOpen: true },
        friday: { open: '00:00', close: '23:59', isOpen: true },
        saturday: { open: '00:00', close: '23:59', isOpen: true },
        sunday: { open: '00:00', close: '23:59', isOpen: true },
      }
    },
    tier: 'enterprise',
    enabledWidgets: DASHBOARD_WIDGETS.map(widget => widget.id)
  }
];

// Update the Login component to use these credentials
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Find matching restaurant credentials
    const restaurant = MOCK_RESTAURANTS.find(
      r => r.credentials.email === email && r.credentials.password === password
    )

    if (restaurant) {
      // Store login info in localStorage or sessionStorage
      localStorage.setItem('currentRestaurant', JSON.stringify({
        subdomain: restaurant.subdomain,
        name: restaurant.name,
        email: email,
        businessInfo: restaurant.businessInfo
      }))
      
      // Redirect to dashboard
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
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
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <div>
                Don't have an account?{' '}
                <Link className="text-primary hover:underline" to="/signup">
                  Sign Up
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="text-sm text-primary hover:underline"
                >
                  {showDemoCredentials ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
                </button>
              </div>
              {showDemoCredentials && (
                <div className="mt-4 text-left text-sm border rounded-md p-4">
                  <h4 className="font-semibold mb-2">Demo Accounts:</h4>
                  {MOCK_RESTAURANTS.map((restaurant) => (
                    <div key={restaurant.subdomain} className="mb-2">
                      <p className="font-medium">{restaurant.name}:</p>
                      <p>Email: {restaurant.credentials.email}</p>
                      <p>Password: {restaurant.credentials.password}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />
      </div>
    </AnimatedPage>
  )
}

function CreateMenuModal({ isOpen, onClose, onSubmit }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit?: (newMenu: any) => void;  // Add this prop definition
}) {
  const [menuName, setMenuName] = useState('')
  const [menuDescription, setMenuDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [menuImage, setMenuImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [days, setDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMenuImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (onSubmit) {
        onSubmit({ /* your menu data */ })
      }
      onClose()
    } catch (error) {
      // Handle error
    }
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
            <Label htmlFor="menu-image">Menu Image</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview && (
                <div className="relative w-full h-48">
                  <img
                    src={imagePreview}
                    alt="Menu preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setMenuImage(null)
                      setImagePreview(null)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Input
                id="menu-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={imagePreview ? 'hidden' : ''}
              />
            </div>
          </div>
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


function Sidebar({ isSidebarOpen, setIsSidebarOpen, userInfo }: { isSidebarOpen: boolean; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; userInfo: { name: string; email: string } }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string): boolean => location.pathname === path

  return (
    <motion.aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:relative ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      initial={false}
      animate={{ 
        x: isSidebarOpen ? 0 : '-100%'
      }}
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
        </nav>
        <div className="p-4 border-t hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{userInfo.name}</span>
                  <span className="text-xs text-muted-foreground">{userInfo.email}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.aside>
  )
}

function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (open: boolean) => void }) {
  const navigate = useNavigate()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </div>
      <div className="flex items-center space-x-4 lg:hidden">
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
                <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
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
  const [deviceData, setDeviceData] = useState(getDeviceData(selectedTimeRange))
  const [chartData, setChartData] = useState(getChartData(selectedTimeRange))
  const [mostViewedItems, setMostViewedItems] = useState(getMostViewedItems(selectedTimeRange))
  
  // Get current restaurant from localStorage
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(() => {
    const stored = localStorage.getItem('currentRestaurant')
    if (stored) {
      const parsed = JSON.parse(stored)
      return MOCK_RESTAURANTS.find(r => r.subdomain === parsed.subdomain) || null
    }
    return null
  })

  // Use restaurant-specific enabled widgets
  const enabledWidgets = currentRestaurant?.enabledWidgets || []

  const isWidgetEnabled = (widgetId: string) => enabledWidgets.includes(widgetId)

  useEffect(() => {
    setDeviceData(getDeviceData(selectedTimeRange))
    setChartData(getChartData(selectedTimeRange))
    setMostViewedItems(getMostViewedItems(selectedTimeRange))
  }, [selectedTimeRange])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex gap-4 items-center">
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
            <Button onClick={() => setIsCreateMenuModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create New Menu
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isWidgetEnabled('total-menus') && (
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
          )}
          {isWidgetEnabled('active-qr-codes') && (
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
          )}
          {isWidgetEnabled('total-views') && (
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
          )}
          {isWidgetEnabled('revenue') && (
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
          )}

          {/* New stats */}
          {isWidgetEnabled('avg-time') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Avg. Time on Menu</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3m 24s</div>
                <p className="text-xs text-muted-foreground">+12s from last week</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('menu-item-views') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Menu Item Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">+15% vs last period</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('return-visitors') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Return Visitors</CardTitle>
                <RotateCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('peak-hours') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12pm - 2pm</div>
                <p className="text-xs text-muted-foreground">Based on menu views</p>
              </CardContent>
            </Card>
          )}

          {isWidgetEnabled('language-preferences') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Language Preferences</CardTitle>
                <Languages className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Languages</div>
                <p className="text-xs text-muted-foreground">English, Spanish, French</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('menu-categories') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Menu Categories</CardTitle>
                <FolderTree className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Most viewed: Entrees</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('dietary-filters') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Dietary Filters</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Dietary preference searches</p>
              </CardContent>
            </Card>
          )}
          {isWidgetEnabled('search-usage') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Search Usage</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24%</div>
                <p className="text-xs text-muted-foreground">Of visitors use search</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {isWidgetEnabled('views-chart') && (
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <Bar
                    data={{
                      labels: chartData.map(d => d.name),
                      datasets: [{
                        label: 'Views',
                        data: chartData.map(d => d.views),
                        backgroundColor: '#adfa1d',
                        borderRadius: 4,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          {isWidgetEnabled('device-usage') && (
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <Pie
                    data={{
                      labels: deviceData.map(d => d.name),
                      datasets: [{
                        data: deviceData.map(d => d.value),
                        backgroundColor: COLORS,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
                <div className="mt-4">
                  {deviceData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center mt-2">
                      <div 
                        className="w-3 h-3 mr-2 rounded-sm" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add this new section for menu views distribution */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {isWidgetEnabled('menu-views-distribution') && (
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Menu Views Distribution</CardTitle>
                <CardDescription>
                  Percentage of views per menu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <div className="h-[250px] w-[250px]">
                    <Pie
                      data={{
                        labels: mockMenuViews.map(menu => menu.menu.name),
                        datasets: [{
                          data: mockMenuViews.map(menu => menu.view_count),
                          backgroundColor: COLORS,
                          borderWidth: 0,
                        }],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {mockMenuViews.map((menu, index) => (
                    <div key={menu.menu_id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 mr-2 rounded-sm" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{menu.menu.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {menu.view_count.toLocaleString()} views ({menu.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* You can add another complementary widget here in the remaining 4 columns if needed */}
        </div>

        <Card>
              <CardHeader>
            <div>
              <CardTitle>Most Viewed Items</CardTitle>
              <CardDescription>Top 5 items across all menus</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Total Time Viewed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mostViewedItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.views}</TableCell>
                    <TableCell>{item.totalTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add this new section after your existing stats and charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {mockMenuViewStats.map((menuStat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {menuStat.menuName}
                  <span className="text-sm font-normal text-muted-foreground">
                    Top 5 Items
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Avg. Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuStat.topItems.map((item, itemIndex) => (
                      <TableRow key={itemIndex}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.views}</TableCell>
                        <TableCell className="text-right">{item.avgTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>

        <CreateMenuModal isOpen={isCreateMenuModalOpen} onClose={() => setIsCreateMenuModalOpen(false)} />
      </div>
    </AnimatedPage>
  )
}

function MenusContent() {
  // Get current restaurant from localStorage
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(() => {
    const stored = localStorage.getItem('currentRestaurant')
    if (stored) {
      const parsed = JSON.parse(stored)
      return MOCK_RESTAURANTS.find(r => r.subdomain === parsed.subdomain) || null
    }
    return null
  })
  // Get menus for current restaurant
  const [menus, setMenus] = useState<Menu[]>(() => {
    if (currentRestaurant) {
      // Add missing required properties to each menu object
      return (mockMenusByRestaurant[currentRestaurant.subdomain as keyof typeof mockMenusByRestaurant] || [])
        .map((menu): Menu => ({
          ...menu,
          available_days: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          organization_id: '123e4567-e89b-12d3-a456-426614174000',
          layout: menu.layout as "grid" | "list" | "compact",
          categories: menu.categories.map(category => ({
            ...category,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            items: category.items.map(item => ({
              ...item,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }))
          }))
        }));
    }
    return [];
  })

  const [isCreateMenuModalOpen, setIsCreateMenuModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
    setMenus(menus.filter(menu => menu.id !== id))
  }

  const handleCreateMenu = (newMenu: Partial<Menu>) => {
    setMenus(prevMenus => [...prevMenus, {
      id: crypto.randomUUID(),
      ...newMenu,
      categories: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      organization_id: '123e4567-e89b-12d3-a456-426614174001',
      is_listed: true,
      available_days: [],
      layout: 'grid'
    } as Menu])
  }

  const toggleMenuListing = (id: string) => {
    setMenus(prevMenus => prevMenus.map(menu => 
      menu.id === id ? { ...menu, is_listed: !menu.is_listed } : menu
    ))
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Menus</h1>
          <Button onClick={() => setIsCreateMenuModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Menu
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menus.map(menu => (
            <Card key={menu.id} className={`overflow-hidden ${!menu.is_listed ? 'opacity-75' : ''}`}>
              <div className="relative h-48 w-full">
                <img
                  src={menu.image_url}
                  alt={menu.name}
                  className="w-full h-full object-cover"
                />
                {!menu.is_listed && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-gray-900/75 text-white px-2 py-1 rounded-md text-sm">
                      Unlisted
                    </span>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{menu.name}</CardTitle>
                    <CardDescription>{menu.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/menus/${menu.id}`)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/dashboard/menus/${menu.id}/edit`)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleMenuListing(menu.id)}>
                        {menu.is_listed ? 'Unlist Menu' : 'List Menu'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(menu.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>{menu.categories.reduce((total, category) => total + category.items.length, 0)} items</div>
                  <div>Updated {new Date(menu.updated_at).toLocaleString()}</div>
                </div>
                {!menu.is_listed && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    This menu is not visible to customers
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <CreateMenuModal 
          isOpen={isCreateMenuModalOpen} 
          onClose={() => setIsCreateMenuModalOpen(false)}
          onSubmit={handleCreateMenu}
        />
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
    id: string;
    menu_id: string;
    created_at: string;
    last_regenerated_at: string;
    menu: {
      name: string;
      organization: {
        subdomain: string;
      };
    };
    views: number;
  }

  const handleView = (qrCode: QRCode) => {
    setSelectedQRCode(qrCode)
    setIsQRCodeModalOpen(true)
  }

  const handleDownload = async (qrCode: QRCode) => {
    // Generate QR code URL
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://${qrCode.menu.organization.subdomain}.menuqr.com/${qrCode.menu.name.toLowerCase().replace(/\s+/g, '-')}`
    
    try {
      // Fetch the QR code image
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${qrCode.menu.name.toLowerCase().replace(/\s+/g, '-')}-qr-code.png`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  const handleRegenerate = (qrCode: QRCode) => {
    // Update the QR code's created timestamp
    setQrCodes(prevQrCodes => 
      prevQrCodes.map(qr => 
        qr.id === qrCode.id 
          ? { ...qr, created_at: new Date().toISOString() }
          : qr
      )
    )
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
                    <TableCell>{qrCode.menu.name}</TableCell>
                    <TableCell>{new Date(qrCode.created_at).toLocaleString()}</TableCell>
                    <TableCell>{qrCode.views}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="ghost" onClick={() => handleView(qrCode)}>
                        View
                      </Button>
                      <Button variant="ghost" onClick={() => handleDownload(qrCode)}>
                        Download
                      </Button>
                      <Button variant="ghost" onClick={() => handleRegenerate(qrCode)}>
                        Regenerate
                      </Button>
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
            setQrCodes={setQrCodes}
          />
        )}
      </div>
    </AnimatedPage>
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
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://${qrCode.menu.organization.subdomain}.menuqr.com/${qrCode.menu.name.toLowerCase().replace(/\s+/g, '-')}`)
  }, [qrCode])

  const handleDownload = async () => {
    try {
      // Fetch the QR code image
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${qrCode.menu.name.toLowerCase().replace(/\s+/g, '-')}-qr-code.png`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code for {qrCode.menu.name}</DialogTitle>
          <DialogDescription>
            Scan this QR code to view your menu or share it with your customers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <img src={qrCodeUrl} alt={`QR Code for ${qrCode.menu.name}`} className="w-48 h-48" />
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface BrandingSettings {
  primaryColor: string;
  logo: File | null;
  logoPreview: string | null;
  favicon: File | null;
  faviconPreview: string | null;
  fontFamily: string;
  customCss: string;
  businessPage: {
    heroImages: Array<{
      url: string;
      title: string;
    }>;
    backgroundColor: string;
    textColor: string;
    showSocialLinks: boolean;
  };
  menuSelection: {
    layout: 'grid' | 'list';
    showDescriptions: boolean;
    showImages: boolean;
    backgroundColor: string;
  };
  menuPage: {
    layout: 'grid' | 'compact';
    showImages: boolean;
    showDescriptions: boolean;
    showAllergies: boolean;
    showNutrition: boolean;
    backgroundColor: string;
  };
}

const getBackgroundColor = (tab: string, settings: BrandingSettings) => {
  switch (tab) {
    case 'business':
      return settings.businessPage.backgroundColor;
    case 'menu-selection':
      return settings.menuSelection.backgroundColor;
    case 'menu':
      return settings.menuPage.backgroundColor;
    default:
      return '#ffffff';
  }
}

function SettingsContent() {
  const [activeTab, setActiveTab] = useState('account')
  const [brandingSubTab, setBrandingSubTab] = useState('identity')
  const [phone, setPhone] = useState('(555) 555-5555')
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '17:00', isOpen: true },
    tuesday: { open: '09:00', close: '17:00', isOpen: true },
    wednesday: { open: '09:00', close: '17:00', isOpen: true },
    thursday: { open: '09:00', close: '17:00', isOpen: true },
    friday: { open: '09:00', close: '17:00', isOpen: true },
    saturday: { open: '09:00', close: '17:00', isOpen: true },
    sunday: { open: '09:00', close: '17:00', isOpen: true },
  })
  const [businessInfo, setBusinessInfo] = useState({
    phone: '(555) 555-5555',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
  })

  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(() => {
    const stored = localStorage.getItem('currentRestaurant')
    if (stored) {
      const parsed = JSON.parse(stored)
      return MOCK_RESTAURANTS.find(r => r.subdomain === parsed.subdomain) || null
    }
    return null
  })

  const canManageWidgets = currentRestaurant?.tier === 'enterprise'
  const [enabledWidgets, setEnabledWidgets] = useState<string[]>(
    currentRestaurant?.enabledWidgets || []
  )

  const toggleWidget = (widgetId: string) => {
    if (!canManageWidgets) return // Only enterprise tier can manage widgets

    setEnabledWidgets(prev => {
      const newWidgets = prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
      localStorage.setItem('enabledWidgets', JSON.stringify(newWidgets))
      return newWidgets
    })
  }

  const handleSavePhone = () => {
    // Here you would typically send a request to your API to update the phone number
    console.log('Saving phone number:', phone)
  }

  const handleSaveBusinessInfo = () => {
    // Here you would typically send a request to your API to update business info
    console.log('Saving business info:', businessInfo)
  }

  const handleSaveBusinessHours = () => {
    // Here you would typically send a request to your API to update business hours
    console.log('Saving business hours:', businessHours)
  }

  const handleCancelSubscription = () => {
    // Here you would typically send a request to your API to cancel the subscription
    console.log('Canceling subscription')
  }

  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    primaryColor: '#adfa1d',
    logo: null,
    logoPreview: null,
    favicon: null,
    faviconPreview: null,
    fontFamily: 'Inter',
    customCss: '',
    businessPage: {
      heroImages: [],
      backgroundColor: '#ffffff',
      textColor: '#000000',
      showSocialLinks: true,
    },
    menuSelection: {
      layout: 'grid',
      showDescriptions: true,
      showImages: true,
      backgroundColor: '#ffffff',
    },
    menuPage: {
      layout: 'grid',
      showImages: true,
      showDescriptions: true,
      showAllergies: true,
      showNutrition: true,
      backgroundColor: '#ffffff',
    },
  })

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    type: 'logo' | 'favicon'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBrandingSettings(prev => ({
          ...prev,
          [type]: file,
          [`${type}Preview`]: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // In the tab buttons section, add the new Branding tab:
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        
        <div className="flex space-x-4 border-b">
          {['Account', 'Business', 'Payment', 'Branding', 'Widgets'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-2 px-1 ${
                activeTab === tab.toLowerCase()
                  ? 'border-b-2 border-primary font-semibold'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'account' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value="John Doe" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value="john@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button onClick={handleSavePhone}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsChangePasswordOpen(true)}>
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive"
                  onClick={() => setIsDeleteAccountOpen(true)}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>Set your hours of operation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24 capitalize">{day}</div>
                    <Checkbox
                      checked={hours.isOpen}
                      onCheckedChange={(checked) => {
                        setBusinessHours(prev => ({
                          ...prev,
                          [day]: { ...hours, isOpen: checked as boolean }
                        }))
                      }}
                    />
                    <Label>Open</Label>
                    {hours.isOpen && (
                      <>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => {
                            setBusinessHours(prev => ({
                              ...prev,
                              [day]: { ...hours, open: e.target.value }
                            }))
                          }}
                          className="w-32"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => {
                            setBusinessHours(prev => ({
                              ...prev,
                              [day]: { ...hours, close: e.target.value }
                            }))
                          }}
                          className="w-32"
                        />
                      </>
                    )}
                  </div>
                ))}
                <Button onClick={handleSaveBusinessHours}>Save Hours</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Business Phone</Label>
                  <Input
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Input
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      value={businessInfo.city}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input
                      value={businessInfo.state}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input
                      value={businessInfo.zipcode}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, zipcode: e.target.value }))}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveBusinessInfo}>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Professional Plan</h3>
                    <p className="text-sm text-gray-500">$49/month</p>
                  </div>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Your next billing date is April 1, 2024
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="flex space-x-4 border-b">
              {[
                { id: 'identity', label: 'Brand Identity' },
                { id: 'business', label: 'Business Page' },
                { id: 'menu-selection', label: 'Menu Selection' },
                { id: 'menu', label: 'Menu Page' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setBrandingSubTab(tab.id)}
                  className={`pb-2 px-1 ${
                    brandingSubTab === tab.id
                      ? 'border-b-2 border-primary font-semibold'
                      : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {brandingSubTab === 'identity' && (
              <Card>
                <CardHeader>
                  <CardTitle>Brand Identity</CardTitle>
                  <CardDescription>
                    Customize your menu's look and feel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Brand Color</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings(prev => ({
                          ...prev,
                          primaryColor: e.target.value
                        }))}
                        className="w-20 h-10"
                      />
                      <Input
                        type="text"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings(prev => ({
                          ...prev,
                          primaryColor: e.target.value
                        }))}
                        className="w-32"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex flex-col gap-4">
                      {brandingSettings.logoPreview && (
                        <div className="relative w-48 h-24">
                          <img
                            src={brandingSettings.logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => setBrandingSettings(prev => ({
                              ...prev,
                              logo: null,
                              logoPreview: null
                            }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'logo')}
                        className={brandingSettings.logoPreview ? 'hidden' : ''}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 400x200px. Max file size: 2MB
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex flex-col gap-4">
                      {brandingSettings.faviconPreview && (
                        <div className="relative w-16 h-16">
                          <img
                            src={brandingSettings.faviconPreview}
                            alt="Favicon preview"
                            className="w-full h-full object-contain"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2"
                            onClick={() => setBrandingSettings(prev => ({
                              ...prev,
                              favicon: null,
                              faviconPreview: null
                            }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'favicon')}
                        className={brandingSettings.faviconPreview ? 'hidden' : ''}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 32x32px. Max file size: 1MB
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select
                      value={brandingSettings.fontFamily}
                      onValueChange={(value: string) => setBrandingSettings(prev => ({
                        ...prev,
                        fontFamily: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom CSS</Label>
                    <Textarea
                      value={brandingSettings.customCss}
                      onChange={(e) => setBrandingSettings(prev => ({
                        ...prev,
                        customCss: e.target.value
                      }))}
                      placeholder=".menu-item { ... }"
                      className="font-mono h-32"
                    />
                    <p className="text-sm text-muted-foreground">
                      Advanced: Add custom CSS to further customize your menu's appearance
                    </p>
                  </div>

                  <Button onClick={() => console.log('Saving branding settings:', brandingSettings)}>
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {brandingSubTab === 'business' && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Page</CardTitle>
                  <CardDescription>
                    Customize how your business page appears
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Hero Images (up to 3)</Label>
                      <div className="grid gap-4 mt-2">
                        {brandingSettings.businessPage.heroImages.map((image, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <Input
                              value={image.url}
                              onChange={(e) => {
                                const newImages = [...brandingSettings.businessPage.heroImages]
                                newImages[index].url = e.target.value
                                setBrandingSettings(prev => ({
                                  ...prev,
                                  businessPage: {
                                    ...prev.businessPage,
                                    heroImages: newImages
                                  }
                                }))
                              }}
                              placeholder="Image URL"
                            />
                            <Input
                              value={image.title}
                              onChange={(e) => {
                                const newImages = [...brandingSettings.businessPage.heroImages]
                                newImages[index].title = e.target.value
                                setBrandingSettings(prev => ({
                                  ...prev,
                                  businessPage: {
                                    ...prev.businessPage,
                                    heroImages: newImages
                                  }
                                }))
                              }}
                              placeholder="Image Title"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                const newImages = brandingSettings.businessPage.heroImages.filter((_, i) => i !== index)
                                setBrandingSettings(prev => ({
                                  ...prev,
                                  businessPage: {
                                    ...prev.businessPage,
                                    heroImages: newImages
                                  }
                                }))
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {brandingSettings.businessPage.heroImages.length < 3 && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setBrandingSettings(prev => ({
                                ...prev,
                                businessPage: {
                                  ...prev.businessPage,
                                  heroImages: [
                                    ...prev.businessPage.heroImages,
                                    { url: '', title: '' }
                                  ]
                                }
                              }))
                            }}
                          >
                            Add Image
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="color"
                          value={brandingSettings.businessPage.backgroundColor}
                          onChange={(e) => setBrandingSettings(prev => ({
                            ...prev,
                            businessPage: {
                              ...prev.businessPage,
                              backgroundColor: e.target.value
                            }
                          }))}
                          className="w-20 h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="color"
                          value={brandingSettings.businessPage.textColor}
                          onChange={(e) => setBrandingSettings(prev => ({
                            ...prev,
                            businessPage: {
                              ...prev.businessPage,
                              textColor: e.target.value
                            }
                          }))}
                          className="w-20 h-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-social"
                        checked={brandingSettings.businessPage.showSocialLinks}
                        onCheckedChange={(checked) => setBrandingSettings(prev => ({
                          ...prev,
                          businessPage: {
                            ...prev.businessPage,
                            showSocialLinks: checked as boolean
                          }
                        }))}
                      />
                      <Label htmlFor="show-social">Show Social Media Links</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {brandingSubTab === 'menu-selection' && (
              <Card>
                <CardHeader>
                  <CardTitle>Menu Selection Page</CardTitle>
                  <CardDescription>
                    Customize how your menu selection page appears
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Layout</Label>
                      <Select
                        value={brandingSettings.menuSelection.layout}
                        onValueChange={(value: 'grid' | 'list') => setBrandingSettings(prev => ({
                          ...prev,
                          menuSelection: {
                            ...prev.menuSelection,
                            layout: value
                          }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-menu-descriptions"
                        checked={brandingSettings.menuSelection.showDescriptions}
                        onCheckedChange={(checked) => setBrandingSettings(prev => ({
                          ...prev,
                          menuSelection: {
                            ...prev.menuSelection,
                            showDescriptions: checked as boolean
                          }
                        }))}
                      />
                      <Label htmlFor="show-menu-descriptions">Show Menu Descriptions</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-menu-images"
                        checked={brandingSettings.menuSelection.showImages}
                        onCheckedChange={(checked) => setBrandingSettings(prev => ({
                          ...prev,
                          menuSelection: {
                            ...prev.menuSelection,
                            showImages: checked as boolean
                          }
                        }))}
                      />
                      <Label htmlFor="show-menu-images">Show Menu Images</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="color"
                          value={brandingSettings.menuSelection.backgroundColor}
                          onChange={(e) => setBrandingSettings(prev => ({
                            ...prev,
                            menuSelection: {
                              ...prev.menuSelection,
                              backgroundColor: e.target.value
                            }
                          }))}
                          className="w-20 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {brandingSubTab === 'menu' && (
              <Card>
                <CardHeader>
                  <CardTitle>Menu Page</CardTitle>
                  <CardDescription>
                    Customize how your menu pages appear
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Layout</Label>
                      <Select
                        value={brandingSettings.menuPage.layout}
                        onValueChange={(value: 'grid' | 'compact') => setBrandingSettings(prev => ({
                          ...prev,
                          menuPage: {
                            ...prev.menuPage,
                            layout: value
                          }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Display Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="show-item-images"
                            checked={brandingSettings.menuPage.showImages}
                            onCheckedChange={(checked) => setBrandingSettings(prev => ({
                              ...prev,
                              menuPage: {
                                ...prev.menuPage,
                                showImages: checked as boolean
                              }
                            }))}
                          />
                          <Label htmlFor="show-item-images">Show Item Images</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="show-item-descriptions"
                            checked={brandingSettings.menuPage.showDescriptions}
                            onCheckedChange={(checked) => setBrandingSettings(prev => ({
                              ...prev,
                              menuPage: {
                                ...prev.menuPage,
                                showDescriptions: checked as boolean
                              }
                            }))}
                          />
                          <Label htmlFor="show-item-descriptions">Show Item Descriptions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="show-allergies"
                            checked={brandingSettings.menuPage.showAllergies}
                            onCheckedChange={(checked) => setBrandingSettings(prev => ({
                              ...prev,
                              menuPage: {
                                ...prev.menuPage,
                                showAllergies: checked as boolean
                              }
                            }))}
                          />
                          <Label htmlFor="show-allergies">Show Allergy Information</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="show-nutrition"
                            checked={brandingSettings.menuPage.showNutrition}
                            onCheckedChange={(checked) => setBrandingSettings(prev => ({
                              ...prev,
                              menuPage: {
                                ...prev.menuPage,
                                showNutrition: checked as boolean
                              }
                            }))}
                          />
                          <Label htmlFor="show-nutrition">Show Nutritional Information</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="color"
                          value={brandingSettings.menuPage.backgroundColor}
                          onChange={(e) => setBrandingSettings(prev => ({
                            ...prev,
                            menuPage: {
                              ...prev.menuPage,
                              backgroundColor: e.target.value
                            }
                          }))}
                          className="w-20 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your branding changes will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border rounded-lg p-4"
                  style={{
                    fontFamily: brandingSettings.fontFamily,
                    backgroundColor: getBackgroundColor(brandingSubTab, brandingSettings),
                    color: brandingSettings.businessPage.textColor
                  }}
                >
                  {brandingSubTab === 'identity' && (
                    <>
                      <div className="flex items-center gap-4 mb-4">
                        {brandingSettings.logoPreview && (
                          <img
                            src={brandingSettings.logoPreview}
                            alt="Logo"
                            className="h-8 object-contain"
                          />
                        )}
                        <h3 className="text-lg font-semibold">Sample Menu Item</h3>
                      </div>
                      <p className="text-gray-600 mb-2">
                        This is how your menu items will appear to customers
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: brandingSettings.primaryColor }}>
                          $12.99
                        </span>
                        <Button size="sm" style={{ backgroundColor: brandingSettings.primaryColor }}>
                          View Details
                        </Button>
                      </div>
                    </>
                  )}
                  {brandingSubTab === 'business' && (
                    <>
                      {/* Render business page preview */}
                    </>
                  )}
                  {brandingSubTab === 'menu-selection' && (
                    <>
                      {/* Render menu selection page preview */}
                    </>
                  )}
                  {brandingSubTab === 'menu' && (
                    <>
                      {/* Render menu page preview */}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Widgets</CardTitle>
                <CardDescription>
                  {canManageWidgets 
                    ? 'Customize which widgets appear on your dashboard'
                    : `${currentRestaurant?.tier.charAt(0).toUpperCase()}${currentRestaurant?.tier.slice(1)} tier includes the following widgets:`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {DASHBOARD_WIDGETS.map((widget) => (
                    <div
                      key={widget.id}
                      className={`flex items-center space-x-4 p-4 border rounded-lg ${
                        !enabledWidgets.includes(widget.id) ? 'opacity-50' : ''
                      }`}
                    >
                      {canManageWidgets ? (
                        <Checkbox
                          id={widget.id}
                          checked={enabledWidgets.includes(widget.id)}
                          onCheckedChange={() => toggleWidget(widget.id)}
                        />
                      ) : (
                        <div className={`w-4 h-4 rounded-sm border ${
                          enabledWidgets.includes(widget.id) ? 'bg-primary' : 'bg-gray-200'
                        }`} />
                      )}
                      <div className="flex-1 space-y-1">
                        <Label
                          htmlFor={widget.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {widget.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {widget.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {!canManageWidgets && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Upgrade to Enterprise tier to customize your dashboard widgets.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Change Password Modal */}
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Change Password</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Account Modal */}
        <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Please type "DELETE" to confirm</Label>
                <Input />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteAccountOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AnimatedPage>
  )
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url?: string;
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  display_order: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  items: MenuItem[];
  created_at: string;
  updated_at: string;
}

interface Menu {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  is_listed: boolean;
  start_time?: string;
  end_time?: string;
  available_days: number[];
  layout: 'grid' | 'list' | 'compact';
  categories: Category[];
  created_at: string;
  updated_at: string;
  organization_id: string;
}

function PublicMenuView({ restaurantSubdomain }: { restaurantSubdomain: string | null }) {
  const { menuName } = useParams()
  const [menuData, setMenuData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        console.log(`Fetching menu data for restaurant: ${restaurantSubdomain}, menu: ${menuName}`)
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Get the restaurant's menus
        const restaurantMenus = mockMenusByRestaurant[restaurantSubdomain as keyof typeof mockMenusByRestaurant]
        
        if (!restaurantMenus) {
          setError('Restaurant not found')
          return
        }

        if (!menuName) {
          // If no menu is specified, show only listed menus for this restaurant
          const listedMenus = restaurantMenus
            .filter(menu => menu.is_listed)
            .map(menu => ({
              name: menu.name,
              description: menu.description,
              path: menu.name.toLowerCase().replace(/\s+/g, '-'),
              image: menu.image_url,
              isListed: menu.is_listed
            }))

          setMenuData({
            restaurantName: restaurantSubdomain?.replace(/-/g, ' '),
            availableMenus: listedMenus
          })
        } else {
          // Show specific menu if it exists and is listed
          const menu = restaurantMenus.find(m => 
            m.name.toLowerCase().replace(/\s+/g, '-') === menuName
          )
          
          if (!menu || !menu.is_listed) {
            setError('Menu not found')
            return
          }

          setMenuData({
            restaurantName: restaurantSubdomain?.replace(/-/g, ' '),
            menuName: menuName?.replace(/-/g, ' '),
            items: menu.categories.flatMap(category => 
              category.items.map(item => ({
                ...item,
                price: item.price
              }))
            )
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

  // Update the menu selection view to include footer
  if (!menuName && menuData?.availableMenus) {
    return (
      <AnimatedPage>
        <div className="flex flex-col min-h-screen">
          <div className="container mx-auto px-4 py-8 flex-grow">
            <h1 className="text-3xl font-bold mb-2 capitalize">{menuData.restaurantName}</h1>
            <h2 className="text-xl text-gray-600 mb-6">Available Menus</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {menuData.availableMenus.map((menu: any, index: number) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => navigate(`/${menu.path}`)}
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-gray-500">© 2024 Menu QRs. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <button
                className="text-xs hover:underline underline-offset-4 text-gray-500"
                onClick={() => setIsTermsOpen(true)}
              >
                Terms of Service
              </button>
              <button
                className="text-xs hover:underline underline-offset-4 text-gray-500"
                onClick={() => setIsPrivacyOpen(true)}
              >
                Privacy
              </button>
            </nav>
          </footer>
        </div>

        <PublicTermsOfServiceModal 
          isOpen={isTermsOpen} 
          onClose={() => setIsTermsOpen(false)} 
        />
        <PublicPrivacyPolicyModal 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-8 flex-grow">
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
                    {item.image_url ? (
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image_url}
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
                    {selectedItem.image_url && (
                      <div className="w-full h-48 relative">
                        <img
                          src={selectedItem.image_url}
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

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">© 2024 Menu QRs. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsTermsOpen(true)}
            >
              Terms of Service
            </button>
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsPrivacyOpen(true)}
            >
              Privacy
            </button>
          </nav>
        </footer>

        <PublicTermsOfServiceModal 
          isOpen={isTermsOpen} 
          onClose={() => setIsTermsOpen(false)} 
        />
        <PublicPrivacyPolicyModal 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </div>
    </AnimatedPage>
  )
}

// Add this new component after the LandingPage component
function BusinessDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all')
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  // Get all restaurants from the mock data
  const restaurants = MOCK_RESTAURANTS.map(restaurant => ({
    name: restaurant.name,
    subdomain: restaurant.subdomain,
    address: restaurant.businessInfo.address,
    city: restaurant.businessInfo.city,
    state: restaurant.businessInfo.state,
    zipcode: restaurant.businessInfo.zipcode,
    menuCount: mockMenusByRestaurant[restaurant.subdomain as keyof typeof mockMenusByRestaurant]?.length || 0,
    // You could add more fields like cuisine type, rating, etc.
  }))

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.state.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedCuisine === 'all') return matchesSearch
    // Add cuisine type filtering when you have that data
    return matchesSearch
  })

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white">
          <Link className="flex items-center justify-center" to="/">
            <QrCode className="h-6 w-6 mr-2" />
            <span className="font-bold">Menu QRs</span>
          </Link>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Restaurant Directory</h1>
              <p className="text-gray-500">
                Discover restaurants using digital menus
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search restaurants or locations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={selectedCuisine}
                onValueChange={setSelectedCuisine}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Cuisine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.subdomain}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipcode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {restaurant.menuCount} {restaurant.menuCount === 1 ? 'menu' : 'menus'} available
                        </p>
                      </div>
                      <Button asChild>
                        <Link to={`http://${restaurant.subdomain}.menuqrs.com:3000`} target="_blank">
                          View Menus
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredRestaurants.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  No restaurants found matching your search criteria
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">© 2024 Menu QRs. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsTermsOpen(true)}
            >
              Terms of Service
            </button>
            <button
              className="text-xs hover:underline underline-offset-4 text-gray-500"
              onClick={() => setIsPrivacyOpen(true)}
            >
              Privacy
            </button>
          </nav>
        </footer>

        <TermsOfServiceModal 
          isOpen={isTermsOpen} 
          onClose={() => setIsTermsOpen(false)} 
        />
        <PrivacyPolicyModal 
          isOpen={isPrivacyOpen} 
          onClose={() => setIsPrivacyOpen(false)} 
        />
      </div>
    </AnimatedPage>
  )
}

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Initialize sidebar as open if screen is larger than mobile
    return window.innerWidth >= 1024
  })

  // Add userInfo state
  const [userInfo] = useState({
    name: "John Doe",
    email: "john@example.com"
  })

  // Add event listener to handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        userInfo={userInfo} // Add the userInfo prop here
      />

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
          {/* Add this new route */}
          <Route path="/business" element={<BusinessDirectory />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}
