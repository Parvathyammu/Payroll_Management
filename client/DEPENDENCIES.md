/**
 * FRONTEND DEPENDENCIES DOCUMENTATION
 * This file explains all the npm packages used in the React frontend
 * 
 * PACKAGE.JSON DEPENDENCIES BREAKDOWN:
 * 
 * CORE REACT FRAMEWORK:
 * - react (^18.3.1): The main React library for building user interfaces
 *   - Component-based architecture with hooks and context API
 *   - Used throughout all components for state management and UI rendering
 * 
 * - react-dom (^18.3.1): React DOM rendering library
 *   - Provides the bridge between React components and the DOM
 *   - Used in index.js for mounting the application
 * 
 * - react-scripts (5.0.1): Create React App build configuration
 *   - Provides build tools, webpack configuration, and development server
 *   - Handles transpilation, bundling, and optimization
 * 
 * ROUTING & NAVIGATION:
 * - react-router-dom (^6.26.2): Client-side routing for single-page applications
 *   - Used in App.js for defining routes and navigation
 *   - Enables protected routes and programmatic navigation
 *   - Components: BrowserRouter, Routes, Route, Link, useNavigate
 * 
 * HTTP CLIENT:
 * - axios (^1.7.7): Promise-based HTTP client for API requests
 *   - Used in services/api.js for centralized API communication
 *   - Features: interceptors, request/response transformation, error handling
 *   - Replaces fetch API with better error handling and request configuration
 * 
 * UI FRAMEWORK & STYLING:
 * - @mui/material (^6.1.1): Material-UI React component library
 *   - Provides professional, Google Material Design components
 *   - Used for: buttons, forms, tables, navigation, layouts, cards
 *   - Components: Container, Typography, Table, Button, TextField, etc.
 * 
 * - @mui/icons-material (^6.1.1): Material-UI icon library
 *   - Provides consistent iconography for the application
 *   - Used for: edit icons, delete icons, navigation icons
 *   - Icons: EditIcon, DeleteIcon, etc.
 * 
 * - @emotion/react (^11.13.3): CSS-in-JS library for styling
 *   - Required peer dependency for Material-UI
 *   - Provides runtime CSS generation and theming capabilities
 * 
 * - @emotion/styled (^11.13.0): Styled components for Emotion
 *   - Enables component-level styling with emotion
 *   - Used by Material-UI for component theming
 * 
 * DATA VISUALIZATION:
 * - chart.js (^4.4.5): Powerful charting library for data visualization
 *   - Core charting engine for creating interactive charts
 *   - Supports: bar charts, line charts, pie charts, etc.
 * 
 * - react-chartjs-2 (^5.2.0): React wrapper for Chart.js
 *   - Used in Dashboard.jsx for attendance overview charts
 *   - Provides React components for Chart.js integration
 *   - Components: Bar, Line, Pie, Doughnut charts
 * 
 * TESTING FRAMEWORK:
 * - @testing-library/react (^13.4.0): React testing utilities
 *   - Provides tools for testing React components
 *   - Focus on testing user interactions and behavior
 * 
 * - @testing-library/jest-dom (^5.17.0): Custom Jest matchers for DOM testing
 *   - Extends Jest with DOM-specific assertions
 *   - Improves test readability and debugging
 * 
 * - @testing-library/user-event (^13.5.0): User interaction simulation
 *   - Simulates real user events for testing
 *   - More realistic than fireEvent for user interactions
 * 
 * PERFORMANCE MONITORING:
 * - web-vitals (^2.1.4): Web performance metrics library
 *   - Measures Core Web Vitals for performance optimization
 *   - Used in reportWebVitals.js for performance monitoring
 * 
 * SCRIPTS EXPLANATION:
 * - start: Runs development server with hot reloading
 * - build: Creates optimized production build
 * - test: Runs Jest testing framework
 * - eject: Exposes webpack configuration (irreversible)
 * 
 * BROWSER SUPPORT:
 * - Production: Modern browsers with >0.2% market share
 * - Development: Latest Chrome, Firefox, and Safari versions
 * 
 * ARCHITECTURE NOTES:
 * - Single Page Application (SPA) architecture
 * - Component-based design with reusable UI elements
 * - Global state management with React Context API
 * - Material Design for consistent user experience
 * - Responsive design for mobile and desktop compatibility
 * - Modern React patterns with hooks and functional components
 */
