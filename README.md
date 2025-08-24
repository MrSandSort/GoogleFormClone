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
MrSandSort-GoogleFormClone/
├── frontend/
│   └── surv-form/
│       ├── public/
│       │   ├── index.html
│       │   ├── manifest.json
│       │   └── robots.txt
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   │   ├── NavigationBar/
│       │   │   │   └── Navbar.jsx
│       │   │   ├── Questions/
│       │   │   │   └── QuestionModal.jsx
│       │   │   ├── survey/
│       │   │   │   ├── re-sampled.jsx
│       │   │   │   └── surveySample.jsx
│       │   │   └── User/
│       │   │       ├── LoginPage.jsx
│       │   │       ├── RegisterPage.jsx
│       │   │       └── userDetails.jsx
│       │   ├── pages/
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   ├── Question.jsx
│       │   │   ├── Register.jsx
│       │   │   └── surveyPage.jsx
│       │   ├── utils/
│       │   │   ├── api.jsx
│       │   │   └── generatePdf.jsx
│       │   ├── App.js
│       │   ├── index.js
│       │   └── index.css
│       ├── package.json
│       └── tailwind.config.js
│
├── googleForm/
│   ├── api/
│   │   └── urls.py
│   ├── form/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── choices.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── utils.py
│   │   └── views.py
│   ├── googleForm/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── db.sqlite3
│
└── README.md



Ensure you have the following installed on your system:
- Python 3.9+ and pip
- Node.js (v14+ recommended) and npm/yarn
- PostgreSQL/MySQL (optional for database setup)


