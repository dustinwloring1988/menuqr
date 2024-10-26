# MenuQR - Digital Menu Management System

MenuQR is a comprehensive digital menu management system that allows restaurant owners to create, manage, and share their menus through QR codes. This project aims to streamline the menu management process and provide a contactless menu solution for restaurants.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login)
- Dashboard with analytics:
  - Total menus and active QR codes
  - View statistics and trends
  - Device usage breakdown
  - Revenue tracking
- Menu Management:
  - Create and edit menus
  - Set menu availability schedules
  - Manage menu items with prices
  - Add item descriptions, ingredients, and allergens
- QR Code Generation:
  - Generate unique QR codes for each menu
  - Track QR code scans
  - Download and regenerate QR codes
- Public Menu View:
  - Responsive design for all devices
  - Clean, intuitive interface for customers
  - Detailed item views with images and information
  - Subdomain support for restaurants

## Technologies Used

- **Framework:**
  - Next.js 14 with App Router
  - React 18
  - TypeScript

- **Styling & UI:**
  - Tailwind CSS
  - Shadcn/ui components
  - Framer Motion for animations
  - Lucide React icons

- **Data Visualization:**
  - Recharts for analytics
  - Interactive charts and graphs

- **Routing & Navigation:**
  - React Router DOM
  - Dynamic subdomain routing

- **Development:**
  - ESLint for code quality
  - Prettier for code formatting
  - TypeScript for type safety

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dustinwloring1988/menuqr.git
   ```

2. Navigate to the project directory:
   ```bash
   cd menuqr
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   # Add other necessary environment variables
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Restaurant Owner:**
   - Sign up for an account or log in
   - Create and customize menus
   - Generate QR codes for menus
   - Monitor analytics and performance
   - Manage menu availability and items

2. **Customers:**
   - Scan QR code to access menu
   - Browse menu items with details
   - View item descriptions, allergens, and prices
   - Access menus through restaurant-specific subdomains

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
