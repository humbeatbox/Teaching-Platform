# Teaching Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for online course management. This platform enables instructors to create and manage courses while allowing students to enroll in and access educational content.

## 🚀 Features

### For Students

- User authentication and registration
- Course browsing and search functionality
- Course enrollment system
- Personal dashboard to track enrolled courses
- Real-time course updates

### For Instructors

- Course creation and management
- Student enrollment tracking
- Course content management
- Course analytics dashboard
- Update and delete course functionality

## 🛠️ Technology Stack

### Frontend

- **React.js** - UI components and state management
- **React Router** - Application routing
- **Axios** - HTTP client for API requests
- **Bootstrap** - Responsive styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **Passport.js** - Authentication middleware
- **Bcrypt** - Password hashing

### DevOps & Deployment

- **Docker** - Containerization
- **AWS ECR** - Container registry
- **AWS EC2** - Cloud hosting
- **Nginx** - Reverse proxy and load balancing
- **PM2** - Process manager
- **GitHub Actions** - CI/CD pipeline

## 🏗️ Architecture

The application follows a microservices architecture with:

- Separated frontend and backend services
- RESTful API design
- JWT-based authentication
- Containerized deployment
- Load-balanced server configuration

## 🔒 Security Features

- Password hashing with Bcrypt
- JWT authentication
- Request rate limiting
- Security headers with Nginx
- CORS protection
- Environment variable protection

## 💻 Local Development Setup

1. Clone the repository:

```bash
git clone [repository-url]
cd teaching-platform
```

2. Install dependencies:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables:
   Create `.env` files in both server and client directories with necessary configurations:

```
MONGODB_CONNECTION=your_mongodb_uri
PASSPORT_SECRET=your_secret
API_URL=your_api_url
```

4. Start the development servers:

```bash
# Start backend server
cd server
npm start

# Start frontend development server
cd client
npm start
```

## 🚀 Deployment

The application is configured for deployment using:

- Docker containers
- GitHub Actions for CI/CD
- AWS EC2 for hosting
- Nginx for reverse proxy

### Deployment Process

1. Push to master branch triggers GitHub Actions
2. Docker image is built and pushed to AWS ECR
3. EC2 instance pulls and runs the new image
4. Nginx handles traffic routing and load balancing

## 📝 API Documentation

### Authentication Endpoints

- POST `/api/user/register` - User registration
- POST `/api/user/login` - User login

### Course Endpoints

- GET `/api/courses` - Get all courses
- POST `/api/courses` - Create new course
- GET `/api/courses/:id` - Get course by ID
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course
- POST `/api/courses/enroll/:id` - Enroll in course

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📧 Contact

Your Name - Gary Chang
