# PayEase

The PayEase System is designed to efficiently manage employee payroll, allowances, deductions, and departmental data. Built using **Spring Boot** on the backend and **React** on the frontend, this project leverages RESTful APIs for seamless interaction between the backend and frontend, providing a structured way to handle payroll processing for an organization.

## Features

- **Employee Management**: Add, update, and remove employee data including personal and employment details.
- **Payroll Processing**: Generate payrolls based on employee type, base salary, and allowances and deductions.
- **Allowances & Deductions**: Manage different types of allowances and deductions that apply to employees.
- **Department Management**: Maintain department records with an automatic employee count update when employees are added or removed.
- **Reports & Payslips**: Generate detailed payroll reports for each month, including PDF payslip generation for employees.

## Tech Stack

- **Frontend**: React, Material-UI, Tailwind CSS, Axios
- **Backend**: Spring Boot, Spring Data JPA, MySQL
- **Database**: MySQL
- **Other Libraries**: Formik (for form handling), Redux (for state management)

## Setup Instructions

### Prerequisites

- Java (11 or later)
- Node.js and npm
- MySQL

### Backend Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone <repository-url>
   cd backend

## Configure MySQL Database:
### Open application.properties in src/main/resources.
Update the following properties:
  spring.datasource.url=jdbc:mysql://localhost:3306/payroll
  spring.datasource.username=<your-mysql-username>
  spring.datasource.password=<your-mysql-password>

### Run the backend application:
./mvnw spring-boot:run

## Frontend Setup
  cd frontend
  npm install
  npm start
  
