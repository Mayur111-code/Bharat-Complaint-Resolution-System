# Bharat Complaint Resolution System (BCRS)

A comprehensive full-stack web application designed for efficient complaint management in Bharat (India). The system supports three user roles: Users (citizens), Officers (complaint handlers), and Admins (system administrators), providing a streamlined process for filing, tracking, and resolving complaints.

## Features

### User Features
- **User Registration and Login**: Secure authentication using JWT tokens
- **File Complaints**: Submit detailed complaints with descriptions, categories, and optional image uploads
- **Track Complaints**: Real-time status tracking with unique complaint IDs
- **View Complaint History**: Access all personal complaints and their statuses
- **Profile Management**: Update personal information and view account details

### Officer Features
- **Dashboard Overview**: View assigned complaints and statistics
- **Complaint Management**: Update complaint statuses, add remarks, and resolve issues
- **Profile Management**: Maintain officer profiles and credentials

### Admin Features
- **System Administration**: Oversee all complaints and users
- **User Management**: Manage user accounts and roles
- **Complaint Oversight**: Monitor all complaints across the system
- **Analytics Dashboard**: View system-wide statistics and reports

### General Features
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Image Uploads**: Cloudinary integration for complaint evidence uploads
- **Real-time Notifications**: Toast notifications for user feedback
- **Secure Authentication**: Role-based access control and secure API endpoints

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud storage for image uploads
- **bcryptjs** - Password hashing
- **multer** - File upload handling

### Frontend
- **React** - UI library with hooks
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system
- **Lucide React** - Icon library

## Installation

### Prerequisites
- Node.js (version 20.x or higher)
- MongoDB database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:5173` (default Vite port)

## Usage

1. **Start the Backend**: Ensure the backend server is running on port 5000
2. **Start the Frontend**: Launch the frontend development server
3. **Access the Application**: Open your browser and navigate to `http://localhost:5173`
4. **Register/Login**: Create an account or login with existing credentials
5. **File Complaints**: Use the complaint form to submit issues
6. **Track Progress**: Monitor complaint status using the tracking feature

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/officer/login` - Officer login

### Complaints
- `GET /api/complaints` - Get user complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/:id` - Get complaint details
- `PUT /api/complaints/:id` - Update complaint status (officer/admin)

### Admin
- `GET /api/admin/complaints` - Get all complaints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/complaints/:id` - Admin complaint management

### Officer
- `GET /api/officer/complaints` - Get assigned complaints
- `PUT /api/officer/complaints/:id` - Update complaint status

## Project Structure

```
BCRS/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── complaint.controller.js
│   │   ├── admin.controller.js
│   │   └── officer.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── admin.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── complaint.routes.js
│   │   ├── admin.routes.js
│   │   └── officer.routes.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ComplaintCard.jsx
    │   │   ├── ComplaintGrid.jsx
    │   │   ├── DashboardHeader.jsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Home.jsx
    │   │   └── ...
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── README.md
```

