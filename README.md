# CampusNest - Student Accommodation System

**Project 2 - T3 Database System Development**
**Live Demo:** https://projectassignment764-collab.github.io/Project-2-Assignment/

## 1. System Overview
CampusNest helps students find accommodation near Cape Town campuses. Roles: Student (search, book), Admin (manage properties), Landlord (list properties).

## 2. Database Design
**ERD:** users(1) -> bookings(M) -> rooms(M) -> properties(1)
**Tables (5, 3NF Normalized):**
- users(user_id, full_name, email, phone)
- properties(property_id, property_name, city, address, price_per_month, available_rooms)
- rooms(room_id, property_id FK, room_type, price)
- bookings(booking_id, user_id FK, room_id FK, booking_date, status)
- reviews(review_id, user_id FK, property_id FK, rating, comment)

Sample Data: 5 properties (Cape Town, JHB, Pretoria, Bellville, Parow) minimum 5 records per table.
SQL Export: campusnest.sql in root folder

## 3. User Interface Design
- Login: index.html + App.jsx login form
- Search: City filter (Cape Town, Johannesburg etc) + Room Type
- Report: Bookings list with Delete
- Screenshots in /evidence folder

## 4. Coding Evidence
**Database Connection (db.php):**
```php
$conn = new mysqli("localhost","root","","campusnest");
