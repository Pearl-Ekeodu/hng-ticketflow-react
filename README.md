# TicketFlow - React Version

A modern, responsive ticket management system built with React, TypeScript, and Vite. This is the React implementation of the HNG Stage 2 Multi-Framework Ticket Web App.

## 🚀 Live Demo

**[🎫 TicketFlow React App](https://hng-ticketflow-react-self.vercel.app)** - Live on Vercel

## ✨ Features

### 🎨 **Premium Design**
- **Baby Blue Theme** - Modern gradient color scheme
- **Glassmorphism Effects** - Beautiful translucent elements
- **Decorative Circles** - Animated floating elements
- **Wavy Hero Background** - Custom SVG wave transitions
- **Responsive Design** - Perfect on all devices

### 🔐 **Authentication System**
- **Modal-based Login/Signup** - No page redirects
- **Form Validation** - Real-time validation with Zod
- **Session Management** - localStorage-based authentication
- **Demo Credentials** - Ready-to-test user accounts
- **Protected Routes** - Secure dashboard and ticket pages

### 📊 **Dashboard**
- **Personalized Welcome** - Shows user's first name
- **Statistics Cards** - Total, Open, In Progress, Closed tickets
- **Activity Tab** - Recent tickets with full details
- **Quick Actions** - Create ticket modal, manage tickets
- **Real-time Updates** - Stats refresh after actions

### 🎫 **Ticket Management (Full CRUD)**
- **Create Tickets** - Modal form with validation
- **View Tickets** - Card-based layout with status badges
- **Edit Tickets** - In-place editing with form validation
- **Delete Tickets** - Confirmation modal for safety
- **Status Management** - Open, In Progress, Closed
- **Priority Levels** - Low, Medium, High
- **Search & Filter** - Find tickets quickly

### 🎯 **User Experience**
- **Toast Notifications** - Success/error feedback
- **Loading States** - Smooth loading indicators
- **Empty States** - Helpful messages when no data
- **Smooth Animations** - CSS transitions and hover effects
- **Keyboard Navigation** - Full accessibility support

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### **State Management**
- **React Context API** - Global authentication state
- **Custom Hooks** - Ticket management logic
- **React Hook Form** - Form handling and validation

### **Styling & UI**
- **Custom CSS** - Tailwind-inspired design system
- **CSS Variables** - Consistent design tokens
- **Responsive Grid** - Mobile-first approach
- **CSS Animations** - Smooth transitions

### **Validation & Forms**
- **Zod** - Schema validation
- **React Hook Form** - Form state management
- **Real-time Validation** - Instant feedback

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd react-version

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

### **Demo Credentials**
```
Email: demo@ticketflow.com
Password: demo123
```

### **Getting Started**
1. **Visit Landing Page** - See the beautiful hero section
2. **Click Login** - Opens modal (no page redirect)
3. **Enter Demo Credentials** - Use the credentials above
4. **Explore Dashboard** - View stats and recent activity
5. **Create Tickets** - Use the "Create New Ticket" button
6. **Manage Tickets** - Edit, update, and delete tickets

### **Key Features**
- **Modal Authentication** - Login/Signup without page changes
- **Personalized Dashboard** - Welcome message with your name
- **Activity Tracking** - See recent ticket activity
- **Responsive Design** - Works perfectly on mobile
- **Real-time Updates** - Stats update after actions

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--color-blue-500: #3b82f6
--color-cyan-500: #06b6d4
--color-blue-600: #2563eb

/* Status Colors */
--color-emerald-500: #10b981  /* Open */
--color-amber-500: #f59e0b   /* In Progress */
--color-gray-500: #6b7280    /* Closed */
```

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Hero Title**: 6rem (96px)
- **Page Title**: 3rem (48px)
- **Body Text**: 1rem (16px)

### **Spacing Scale**
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: ≥ 1024px (4-column grid)
- **Tablet**: 768px - 1023px (2-column grid)
- **Mobile**: < 768px (1-column stack)

### **Mobile Features**
- **Touch-friendly buttons** - Larger tap targets
- **Stacked layouts** - Vertical organization
- **Optimized typography** - Readable font sizes
- **Swipe gestures** - Natural mobile interactions

## 🔧 Configuration

### **Environment Variables**
```bash
# No environment variables required
# All configuration is built-in
```

### **Build Configuration**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
```

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard
```

### **Netlify**
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### **Other Platforms**
- **Railway** - Full-stack deployment
- **Heroku** - Container deployment
- **AWS S3** - Static hosting

## 🧪 Testing

### **Manual Testing**
1. **Authentication Flow** - Login/logout functionality
2. **Ticket CRUD** - Create, read, update, delete
3. **Responsive Design** - Test on different screen sizes
4. **Form Validation** - Try invalid inputs
5. **Navigation** - Test all routes and links

### **Browser Support**
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📁 Project Structure

```
react-version/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useTickets.ts
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── TicketsPage.tsx
│   ├── styles/             # Global styles
│   │   └── global.css
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── auth.ts
│   │   ├── tickets.ts
│   │   └── validation.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── shared-assets/          # Shared design assets
│   ├── design-tokens.css
│   └── *.svg
├── package.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Components

### **LandingPage**
- Hero section with wavy background
- Feature cards with animations
- CTA section with gradient background
- Authentication modals

### **DashboardPage**
- Personalized welcome message
- Statistics cards with icons
- Activity tab with recent tickets
- Quick action buttons

### **TicketsPage**
- Ticket grid with card layout
- Create/edit/delete modals
- Status badges and priority indicators
- Empty state handling

## 🔒 Security Features

- **Protected Routes** - Authentication required
- **Session Management** - Secure token handling
- **Input Validation** - XSS protection
- **CSRF Protection** - Built-in safeguards

## ♿ Accessibility

- **Semantic HTML** - Proper element usage
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard access
- **Color Contrast** - WCAG compliant
- **Focus Management** - Visible focus states

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the HNG Stage 2 internship program.

## 🙏 Acknowledgments

- **HNG Internship** - For the amazing learning opportunity
- **React Team** - For the excellent framework
- **Vite Team** - For the fast build tool
- **Design Inspiration** - Modern web design trends

---

**Built with ❤️ for HNG Stage 2**

*React Version - Part of Multi-Framework Ticket Web App*