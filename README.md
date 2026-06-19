# Job Application Tracker

A modern full-stack web application designed to track and organize job applications in one central dashboard. Users can easily record applications, modify statuses, record notes, search and filter entries, and navigate through records with seamless API-level pagination.

---

## Tech Stack Used

### Frontend
- **React** (TypeScript)
- **Vite** (Build Tool)
- **React Router Dom** (Routing)
- **React Toastify** (Notifications)
- **Vanilla CSS** (Custom Styling and Animations)

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (Database)
- **Zod** (Validation)

---

## Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js** (v18.x or higher)
- **NPM** (v9.x or higher)
- **PostgreSQL** (v14 or higher)

---

## Required Environment Variables

Create a `.env` file inside the `backend` directory using the following keys:

- `PORT`: The port number the Express backend will listen on (default is `5000`).
- `DATABASE_URL`: The Prisma-compatible PostgreSQL database connection string.

Example:
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/job_tracker?schema=public"
```

---

## Installation Steps

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd job-application-tracker
   ```

2. **Set up the Database**:
   - Create a PostgreSQL database named `job_tracker`.
   - Update `backend/.env` with your correct database credentials.

3. **Install Dependencies**:
   - For the Backend:
     ```bash
     cd backend
     npm install
     ```
   - For the Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Run Database Migrations**:
   Run the Prisma migration tool inside the `backend` directory to initialize the database tables:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

---

## How to Run in Development Mode

To start both the client and server applications in hot-reload development mode, open two terminal windows:

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:5000`.

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
The client app will launch at `http://localhost:5173`.

---

## API Documentation

### Base URL
`http://localhost:5000`

### Endpoints

#### 1. Get All Applications (Paginated & Filtered)
- **Method**: `GET`
- **Path**: `/applications`
- **Query Parameters**:
  - `page` (optional, default: `1`): The page number.
  - `limit` (optional, default: `10`): Number of applications per page.
  - `status` (optional): Filter applications by status (`Applied`, `Interviewing`, `Offer`, `Rejected`).
  - `search` (optional): Query keyword to filter by company name or job title.
- **Success Response (200 OK)**:
  ```json
  {
    "data": [
      {
        "id": "c88f117c-b63c-4b57-a169-d6e5a6f23554",
        "company_name": "Google",
        "job_title": "Software Engineer",
        "job_type": "Full-time",
        "status": "Applied",
        "applied_date": "2026-06-18T00:00:00.000Z",
        "notes": "Referred by John.",
        "createdAt": "2026-06-18T06:40:00.000Z",
        "updatedAt": "2026-06-18T06:40:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
  ```

#### 2. Get Application by ID
- **Method**: `GET`
- **Path**: `/applications/:id`
- **Success Response (200 OK)**:
  ```json
  {
    "id": "c88f117c-b63c-4b57-a169-d6e5a6f23554",
    "company_name": "Google",
    "job_title": "Software Engineer",
    "job_type": "Full-time",
    "status": "Applied",
    "applied_date": "2026-06-18T00:00:00.000Z",
    "notes": "Referred by John."
  }
  ```

#### 3. Create Application
- **Method**: `POST`
- **Path**: `/applications`
- **Request Body**:
  ```json
  {
    "company_name": "Google",
    "job_title": "Software Engineer",
    "job_type": "Full-time",
    "status": "Applied",
    "applied_date": "2026-06-18T00:00:00.000Z",
    "notes": "Optional notes string"
  }
  ```
- **Success Response (201 Created)**:
  Returns the created application object.

#### 4. Update Application
- **Method**: `PATCH`
- **Path**: `/applications/:id`
- **Request Body**:
  Any selection of the fields listed in the `POST` payload.
- **Success Response (200 OK)**:
  Returns the updated application object.

#### 5. Delete Application
- **Method**: `DELETE`
- **Path**: `/applications/:id`
- **Success Response (204 No Content)**:
  No response body.

---

## Screenshots

### 1. Applications Dashboard
![Applications Listing](./screenshots/applications_listing.png)

### 2. Creating New Applications
#### Add Application Form
![Add Application Form](./screenshots/add_form.png)

#### Creation Success Notification
![Application Success Toast](./screenshots/application_success.png)

### 3. Editing Existing Applications
#### Edit Application Form
![Edit Application Form](./screenshots/edit_form.png)

#### Edition Success Notification
![Edit Success Toast](./screenshots/edit_success.png)

### 4. Search and Filters
#### Filtering by Status
![Filter by Status](./screenshots/filter_by_status.png)

#### Searching by Company/Title
![Search by Company/Title](./screenshots/filter_by_title_name.png)

### 5. Pagination Control Flow
#### Page 1 View
![Pagination Page 1](./screenshots/pagination_1.png)

#### Page 2 View
![Pagination Page 2](./screenshots/pagination_2.png)

### 6. Delete Confirmation Flow
#### Custom Delete Confirmation Modal
![Delete Confirmation Modal](./screenshots/delete_confirmation.png)

#### Deletion Success Notification
![Delete Success Toast](./screenshots/delete_success.png)
