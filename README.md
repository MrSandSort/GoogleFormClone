# Google Forms Clone

A feature-rich web application built using **Django** for the backend and **React** for the frontend. This app replicates the core functionalities of Google Forms, enabling users to create, share, and analyze forms and surveys effectively.

## Features

- **Customizable Form Creation**:
  - Add question types like multiple-choice, short answers, dropdowns, and checkboxes.
  - Rearrange fields with an intuitive drag-and-drop interface.
- **Real-Time Collaboration**: Allow multiple users to collaborate on forms.
- **Response Management**:
  - View live responses.
  - Export data to formats like CSV or Excel.
- **Secure Sharing**:
  - Share forms via secure links or emails.
  - Restrict access based on user roles.

---

## Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, 
- **Database**: PostgreSQL/MySQL (or your preferred database)
- **Others**:Git for version control

---

## Getting Started

### Prerequisites



Directory structure:
└── MrSandSort-GoogleFormClone/
    ├── frontend/
    │   └── surv-form/
    │       ├── .gitignore
    │       ├── public/
    │       │   ├── manifest.json
    │       │   ├── index.html
    │       │   └── robots.txt
    │       ├── package.json
    │       ├── package-lock.json
    │       ├── README.md
    │       ├── tailwind.config.js
    │       └── src/
    │           ├── setupTests.js
    │           ├── index.css
    │           ├── assets/
    │           ├── components/
    │           │   ├── survey/
    │           │   │   ├── re-sampled.jsx
    │           │   │   └── surveySample.jsx
    │           │   ├── User/
    │           │   │   ├── LoginPage.jsx
    │           │   │   ├── RegisterPage.jsx
    │           │   │   └── userDetails.jsx
    │           │   ├── Questions/
    │           │   │   └── QuestionModal.jsx
    │           │   └── NavigationBar/
    │           │       └── Navbar.jsx
    │           ├── App.js
    │           ├── reportWebVitals.js
    │           ├── pages/
    │           │   ├── Register.jsx
    │           │   ├── Login.jsx
    │           │   ├── Home.jsx
    │           │   ├── ProtectedRoute.jsx
    │           │   ├── surveyPage.jsx
    │           │   ├── Question.jsx
    │           │   └── Dashboard.jsx
    │           ├── App.css
    │           ├── App.test.js
    │           ├── index.js
    │           └── utils/
    │               ├── generatePdf.jsx
    │               └── api.jsx
    ├── googleForm/
    │   ├── api/
    │   │   ├── __init__.py
    │   │   ├── urls.py
    │   │   └── __pycache__/
    │   ├── manage.py
    │   ├── db.sqlite3
    │   ├── googleForm/
    │   │   ├── settings.py
    │   │   ├── __init__.py
    │   │   ├── urls.py
    │   │   ├── __pycache__/
    │   │   ├── asgi.py
    │   │   └── wsgi.py
    │   ├── package-lock.json
    │   └── form/
    │       ├── serializers.py
    │       ├── models.py
    │       ├── __init__.py
    │       ├── tests.py
    │       ├── __pycache__/
    │       ├── apps.py
    │       ├── migrations/
    │       │   ├── __init__.py
    │       │   ├── __pycache__/
    │       │   ├── 0002_customuser_role.py
    │       │   ├── 0003_remove_customuser_name.py
    │       │   └── 0001_initial.py
    │       ├── choices.py
    │       ├── admin.py
    │       ├── views.py
    │       └── utils.py
    └── README.md


Ensure you have the following installed on your system:
- Python 3.9+ and pip
- Node.js (v14+ recommended) and npm/yarn
- PostgreSQL/MySQL (optional for database setup)


