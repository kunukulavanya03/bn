# bn

Backend API for bn

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI + SQLAlchemy
- **Frontend Source**: GitHub ([Repository](https://github.com/HimaShankarReddyEguturi/Hotelbookinguidesign))

## Project Structure

```
bn/
├── frontend/          # Frontend application
├── backend/           # Backend API
├── README.md          # This file
└── docker-compose.yml # Docker configuration (if applicable)
```

## Getting Started

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for Python backends)
- Docker (optional, for containerized setup)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
# Follow backend-specific setup instructions in backend/README.md
```

## Features

- user authentication
- data management

## API Endpoints

- `POST /api/register` - Create a new user account.
- `POST /api/login` - Log in to an existing user account.
- `POST /api/password_reset` - Reset a user's password.
- `GET /api/data` - Get a list of all user data.
- `POST /api/data` - Create new user data.
- `PUT /api/data/{id}` - Update existing user data.
- `DELETE /api/data/{id}` - Delete user data.

## License

MIT
