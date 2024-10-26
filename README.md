# MenuQR - Digital Menu Management System

MenuQR is a modern, full-stack digital menu management system built with Next.js 14. It enables restaurants to create, manage, and share digital menus through QR codes, providing a seamless contactless dining experience.

## 🚀 Features

### Menu Management
- **Digital Menu Creation**
  - Create and customize multiple menus
  - Add items with descriptions, prices, and images
  - Organize items by categories
  - Set menu availability schedules
  - Add allergen information and nutritional data
  - Support for multiple menu layouts (Grid, List, Compact)
  - Menu visibility controls (Listed/Unlisted)

### QR Code System
- **Dynamic QR Generation**
  - Unique QR codes for each menu
  - Instant updates without regenerating codes
  - Download QR codes in multiple formats
  - Track QR code scans and analytics
  - Custom subdomain support for each restaurant

### Analytics Dashboard
- **Comprehensive Insights**
  - Real-time view tracking
  - Device usage breakdown (Mobile, Tablet, Desktop)
  - Popular items analysis
  - Peak hours monitoring
  - Customer engagement metrics
  - Language preferences tracking
  - Menu category performance
  - Dietary filter usage
  - Search behavior analysis

### Customer Experience
- **Mobile-Optimized Viewing**
  - Responsive design for all devices
  - Fast loading times
  - Intuitive navigation
  - Detailed item views with images
  - Allergen and nutritional information
  - Multiple language support
  - Dietary preference filters

### Business Tools
- **Restaurant Management**
  - Multi-location support
  - Custom subdomain for each restaurant
  - Business hours management
  - Staff access control
  - Menu scheduling
  - Customizable branding options
  - Widget customization (Enterprise tier)

### Customization Options
- **Brand Identity**
  - Custom logo and favicon
  - Brand color scheme
  - Font selection
  - Custom CSS support
  - Page layout customization
  - Menu display preferences
  - Social media integration

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Framer Motion
- Lucide React Icons
- Chart.js
- React Chart.js 2

### Development
- ESLint
- Prettier
- TypeScript
- Git

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dustinwloring1988/menuqr.git
   cd menuqr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. **Configure Local Development with Subdomains**

   To test restaurant-specific subdomains locally, you'll need to modify your hosts file:

   **On Windows:**
   1. Open Notepad as Administrator
   2. Open `C:\Windows\System32\drivers\etc\hosts`
   3. Add the following lines:
      ```
      127.0.0.1 menuqr.local
      127.0.0.1 joes-diner.menuqr.local
      127.0.0.1 pizza-place.menuqr.local
      127.0.0.1 cafe-bistro.menuqr.local
      127.0.0.1 downtown-pub.menuqr.local
      127.0.0.1 family-diner.menuqr.local
      ```

   **On Mac/Linux:**
   1. Open Terminal
   2. Edit hosts file with: `sudo nano /etc/hosts`
   3. Add the same lines as above
   4. Save with Ctrl+O, exit with Ctrl+X

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

6. **Access the application**
   - Main application: [http://menuqr.local:3000](http://menuqr.local:3000)
   - Restaurant menus: 
     - [http://joes-diner.menuqr.local:3000](http://joes-diner.menuqr.local:3000)
     - [http://pizza-place.menuqr.local:3000](http://pizza-place.menuqr.local:3000)
     - etc.

## 🌐 Deployment

### Prerequisites
- Node.js 18.x or later
- npm/yarn/pnpm
- Git

### Production Build
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://docs.menuqr.com)
- [Demo](https://demo.menuqr.com)
- [Support](https://support.menuqr.com)

## 📧 Support

For support, email support@menuqr.com or join our [Discord community](https://discord.gg/menuqr).

## ⭐ Star Us!

If you find this project helpful, please consider giving it a star to show your support!

## 🧪 Testing

### Demo Accounts

You can use these demo accounts to test different subscription tiers:

1. **Joe's Diner (Professional)**
   - Email: joe@joes-diner.com
   - Password: Password123!
   - Features: Multiple menus, advanced analytics

2. **Pizza Place (Starter)**
   - Email: owner@pizza-place.com
   - Password: Password123!
   - Features: Basic menu management

3. **Café Bistro (Professional)**
   - Email: manager@cafe-bistro.com
   - Password: Password123!
   - Features: Multiple menus, analytics

4. **Downtown Pub (Professional)**
   - Email: pub@downtown-pub.com
   - Password: Password123!
   - Features: Multiple menus, analytics

5. **Family Diner (Enterprise)**
   - Email: admin@family-diner.com
   - Password: Password123!
   - Features: Full access to all features

Each account demonstrates different subscription tier features and limitations.
