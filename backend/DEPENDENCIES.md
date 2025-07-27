/**
 * BACKEND DEPENDENCIES DOCUMENTATION
 * This file explains all the npm packages used in the backend server
 * 
 * PACKAGE.JSON DEPENDENCIES BREAKDOWN:
 * 
 * AUTHENTICATION & SECURITY:
 * - bcrypt (^5.1.1): Password hashing and verification library for secure user authentication
 *   - Used in userRoutes.js for password hashing during registration
 *   - Provides salt-based hashing to prevent rainbow table attacks
 * 
 * SERVER FRAMEWORK:
 * - express (^4.21.0): Fast, minimalist web framework for Node.js
 *   - Core framework for building the REST API
 *   - Handles routing, middleware, and HTTP request/response management
 * 
 * - cors (^2.8.5): Cross-Origin Resource Sharing middleware
 *   - Enables frontend (React) to communicate with backend API
 *   - Handles preflight requests and CORS headers
 * 
 * - body-parser (^1.20.3): HTTP request body parsing middleware
 *   - Parses incoming request bodies in JSON format
 *   - Note: Now built into Express as express.json()
 * 
 * ENVIRONMENT & CONFIGURATION:
 * - dotenv (^16.4.5): Environment variables loader
 *   - Loads configuration from .env file
 *   - Manages sensitive data like database credentials securely
 * 
 * DATABASE:
 * - pg (^8.13.0): PostgreSQL client for Node.js
 *   - Provides connection pooling for efficient database operations
 *   - Supports parameterized queries to prevent SQL injection
 *   - Used in config/db.js for database connection setup
 * 
 * DEVELOPMENT TOOLS:
 * - nodemon (^3.1.7): Development server auto-restart tool
 *   - Automatically restarts server when files change during development
 *   - Improves developer experience and productivity
 * 
 * ARCHITECTURE NOTES:
 * - RESTful API design with modular route structure
 * - Environment-based configuration for different deployment stages
 * - Secure password handling with bcrypt hashing
 * - PostgreSQL for robust relational data management
 * - Connection pooling for scalable database operations
 * - Middleware-based request processing pipeline
 */
