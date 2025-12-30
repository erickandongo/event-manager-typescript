## 1. Project Presentation

This project is a mini web application developed in TypeScript that allows users to create, view, filter, and manage events.  
It also allows participants to register for events while enforcing capacity limits and preventing duplicate registrations.

The goal of this project is to demonstrate the use of TypeScript, object-oriented programming, modular architecture, and in-memory data management in a real web application.

**Technologies used:** TypeScript, HTML, CSS

## 2. Implemented Features

| Feature | Status |
|------|------|
| Create events | OK |
| Display full event list | OK |
| Filter events | OK |
| Event detail view | OK |
| User registration | OK |
| Duplicate registration protection | OK |
| Capacity control | OK |
| Responsive layout (bonus) | OK |

## 3. Project Structure

event-app/
│── index.html  
│── styles/  
│   └── main.css  
│── dist/  
│── src/  
│   ├── models/  
│   │   ├── Event.ts  
│   │   ├── User.ts  
│   │   └── Registration.ts  
│   └── main.ts  
│── tsconfig.json  
│── package.json  
│── .gitignore  
└── README.md

## 4. Installation & Execution

1. Install dependencies (in bash):
npm install

2. Compile TypeScript:
npm run build

3. Open index.html using Live Server.


📌 Simple. Correct. Complete.

---

### 5. How to Use the Application

- Use the "Create Event" form to add a new event.
- Events appear immediately in the event list.
- Use the category filter to display specific events.
- Click "View Details" on an event to see full information.
- Fill in the registration form to register a participant.
- Registration is refused if:
  - The event is full
  - The event date has passed
  - The user is already registered

## 6. Screenshots

- Home page showing the event list
![Event List](screenshot/EventHome%20page.png)

- Event detail view with registration form
![Event List](screenshot/detail-page.png)

- Successful and failed registration messages
![Event List](screenshot/message.png)

## 7. Conclusion & Limitations

This project successfully demonstrates the use of TypeScript and object-oriented programming to build a functional event management system.  
The main challenges were managing application state using arrays and enforcing registration validation rules.

Possible improvements include persistent storage using a backend, advanced filtering options, and user authentication.

## 8. Author Information

- **Full Name:** Ericka Ndongo  
- **Student ID:** 2425L097 
- **Email:** ericka.ndongo@institutsaintjean.org
