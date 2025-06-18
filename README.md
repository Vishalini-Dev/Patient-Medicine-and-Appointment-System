#   Patient Medicine and Appointment System– Documentation

## 1. Setup & Run Instructions

### Requirements
- Java 17+
- Maven 3.8+
- Spring Boot 3.x

### Steps

git clone https://github.com/your-repo/Patient Medicine and Appointment System
cd Patient Medicine and Appointment System
./mvnw spring-boot:run

2. API Endpoints

Method	| Endpoint	              |  Description
--------------------------------------------------------------
GET	| /api/patients	              |  Get all patients
POST	| /api/patients/register      |  Register new patient
GET	| /api/appointments/doctors   |  List all doctors
POST	| /api/appointments/book      |  Book appointment
GET	| /api/medications	      |  List all medications
POST	| /api/medications/add	      |  Add new medication
PUT	| /api/medications/edit/{id}  |	Update medication
DELETE	| /api/medications/delete/{id}|	Delete medication
--------------------------------------------------------------

3. Request & Response Format
i) Register Patient – POST /api/patients/register
ii) Book Appointment – POST /api/appointments/book

5. Swagger Integration

Maven Dependency:

xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
Access Swagger UI:

http://localhost:8080/swagger-ui/index.html

6. Database Schema
Patients Table:

CREATE TABLE patient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    medical_history TEXT
);
Doctors Table:

CREATE TABLE doctor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    specialization VARCHAR(255)
);

7. Frontend Setup
Open index.html in browser

Recommended to use VS Code Live Server extension
