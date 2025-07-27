# Payroll Management System

A comprehensive full-stack web application for managing employee payroll, attendance, and HR operations.

## 🏗️ SYSTEM ARCHITECTURE

### **Frontend (React.js)**
- **Location**: `/client` directory
- **Framework**: React 18 with Material-UI components
- **Architecture**: Single Page Application (SPA) with client-side routing
- **State Management**: React Context API for authentication
- **Styling**: Material-UI (MUI) for professional, responsive design

### **Backend (Node.js/Express)**
- **Location**: `/backend` directory  
- **Framework**: Express.js REST API server
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT tokens with bcrypt password hashing
- **Architecture**: Modular route-based structure

## 📁 PROJECT STRUCTURE EXPLAINED

```
payroll/
├── README.md                    # Project documentation (this file)
├── backend/                     # Node.js/Express API Server
│   ├── index.js                # Main server entry point with middleware setup
│   ├── package.json            # Backend dependencies and scripts
│   ├── DEPENDENCIES.md         # Detailed explanation of backend packages
│   ├── config/
│   │   └── db.js               # PostgreSQL connection pool configuration
│   └── routes/                 # Modular API route handlers
│       ├── attendanceRoutes.js # Employee time tracking endpoints
│       ├── dashboardRoutes.js  # Dashboard analytics and metrics
│       ├── employeeRoutes.js   # Employee CRUD operations
│       ├── leaveRoutes.js      # Leave management system
│       ├── payrollRoutes.js    # Salary calculations and records
│       ├── reportRoutes.js     # Reports and analytics
│       └── userRoutes.js       # Authentication (login/register)
└── client/                     # React.js Frontend Application
    ├── package.json            # Frontend dependencies and build scripts
    ├── DEPENDENCIES.md         # Detailed explanation of frontend packages
    ├── public/                 # Static assets and HTML template
    ├── build/                  # Production build output (auto-generated)
    └── src/                    # React source code
        ├── index.js            # React application entry point with providers
        ├── App.js              # Main component with routing configuration
        ├── App.css             # Global application styles
        ├── components/         # Reusable React components
        │   ├── Navbar.jsx                    # Main navigation bar
        │   ├── ProtectedRoute.jsx            # Authentication guard component
        │   ├── Authentication/               # Login and registration forms
        │   │   ├── Login.jsx                # User login interface
        │   │   └── Register.jsx             # User registration form
        │   ├── Dashboard/                   # Main dashboard with metrics
        │   │   └── Dashboard.jsx            # Overview charts and statistics
        │   ├── Employees/                   # Employee management interfaces
        │   │   ├── EmployeeList.jsx         # Employee data table with actions
        │   │   ├── AddEmployee.jsx          # New employee creation form
        │   │   └── EditEmployee.jsx         # Employee information editing
        │   ├── Payroll/                     # Payroll processing interfaces
        │   │   ├── PayrollList.jsx          # Payroll records display
        │   │   └── AddPayroll.jsx           # Payroll calculation form
        │   ├── Attendance/                  # Time tracking interfaces
        │   │   └── Attendance.jsx           # Check-in/check-out system
        │   ├── Leave/                       # Leave management interfaces
        │   │   └── LeaveManagement.jsx      # Leave requests and approvals
        │   └── Reports/                     # Analytics and reporting
        │       └── Reports.jsx              # Data visualization and exports
        ├── context/                         # React Context for global state
        │   └── AuthContext.jsx              # Authentication state management
        └── services/                        # External service integrations
            └── api.js                       # Centralized HTTP client with interceptors
```

## 🚀 KEY FEATURES

### **Employee Management**
- Complete CRUD operations for employee records
- Employee profile management with personal and job details
- Role-based access control (Admin, HR, Employee)

### **Payroll Processing**
- Automated salary calculations with tax deductions
- Monthly/bi-weekly payroll generation
- Payroll history and records management

### **Attendance Tracking**
- Daily check-in/check-out functionality
- Attendance rate calculations and monitoring
- Late arrival and absence tracking

### **Leave Management**
- Leave request submission and approval workflow
- Leave balance tracking and management
- Different leave types (vacation, sick, personal)

### **Dashboard & Analytics**
- Real-time dashboard with key metrics
- Interactive charts using Chart.js
- Employee statistics and payroll summaries

### **Reports & Analytics**
- Comprehensive reporting system
- Data export functionality
- Performance metrics and insights

## 💻 TECHNOLOGY STACK

### **Frontend Technologies**
- **React 18**: Modern React with hooks and functional components
- **Material-UI**: Professional component library with Material Design
- **React Router**: Client-side routing for SPA navigation
- **Chart.js**: Interactive data visualization and charts
- **Axios**: HTTP client with request/response interceptors
- **Context API**: Global state management for authentication

### **Backend Technologies**
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Fast, minimalist web framework
- **PostgreSQL**: Robust relational database management
- **bcrypt**: Secure password hashing and authentication
- **JWT**: Token-based authentication system
- **CORS**: Cross-origin resource sharing for API access

## 🔧 DEVELOPMENT SETUP

### **Prerequisites**
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### **Backend Setup**
```bash
cd backend
npm install                    # Install dependencies
# Configure .env file with database credentials
npm run dev                    # Start development server with nodemon
```

### **Frontend Setup**
```bash
cd client
npm install                    # Install dependencies
npm start                      # Start React development server
```

## 🔒 SECURITY FEATURES

- **Password Security**: bcrypt hashing with salt rounds
- **Authentication**: JWT token-based authentication
- **SQL Injection Prevention**: Parameterized queries with pg library
- **CORS Protection**: Configured cross-origin resource sharing
- **Environment Variables**: Secure configuration management

## 📊 DATABASE DESIGN

The application uses PostgreSQL with the following main tables:
- **employees**: Employee personal and job information
- **users**: Authentication and user account data
- **payroll**: Salary calculations and payment records
- **attendance**: Daily check-in/check-out tracking
- **leaves**: Leave requests and approval status
- **DashboardView**: Aggregated view for dashboard metrics

