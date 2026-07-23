# PaySmart-AI

An AI-powered Personal Finance Management System that helps users track income, expenses, analyze financial data, and manage their finances securely through an interactive dashboard.

---

## Features

### Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Change Password

### Income Management
- Add Income
- Edit Income
- Delete Income
- View Income History

### Expense Management
- Add Expense
- Edit Expense
- Delete Expense
- Search Expenses
- Advanced Filters

### Dashboard
- Total Income
- Total Expense
- Current Balance
- Total Transactions
- Recent Income
- Recent Expenses

### Analytics
- Income vs Expense Bar Chart
- Expense Category Pie Chart
- Monthly Trend Analysis
- Financial Summary Cards

### User Profile
- Update Profile
- Change Password
- Secure User Management

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- Alembic
- JWT Authentication
- Pydantic

## Database
- PostgreSQL

---

# Project Structure

```
PaySmart-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/chouhansaurabh81-spec/PaySmart-AI.git

cd PaySmart-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run Backend

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# API Modules

- Authentication
- Dashboard
- Income
- Expense
- Analytics
- Profile

---

# Future Enhancements

- Dark Mode
- Export PDF Reports
- CSV Export
- Email Notifications
- Budget Planning
- AI Financial Insights
- Savings Goal Tracker
- Mobile Responsive Enhancements

---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# Author

**Saurabh Chouhan**

- LinkedIn: *((https://www.linkedin.com/in/saurabh-chouhan-b78043261/))*
- GitHub: *((https://github.com/chouhansaurabh81-spec))*

---

# Support

If you found this project helpful, please consider giving it a STAR on GitHub.