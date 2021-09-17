# Kidzie
Database Table:
CREATE TABLE admins (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	country VARCHAR ( 50 ) NOT NULL,
	first_name VARCHAR ( 50 ) NOT NULL,
	last_name VARCHAR ( 50 ) NOT NULL,
	gender VARCHAR ( 50 ) NOT NULL,
	phone_number VARCHAR ( 50 ) UNIQUE NOT NULL
);

Endpoints:
/POST SIGN UP: http://localhost:3000/api/auth/sign-up
body example {
    "firstName": "Abdallah",
    "username": "abdallahdak",
    "lastName": "Daknache",
    "email": "abdallah.daknache@gmail.com",
    "phoneNumber": "+96170302397",
    "password": "password",
    "gender": "male",
    "country": "Lebanon"
}

/POST SIGN IN: http://localhost:3000/api/auth/sign-in
body example {
    "email": "abdallah.daknache@gmail.com",
    "password": "password"
}

/PUT EDIT PROFILE: http://localhost:3000/api/profile/edit/5
body example body example {
    "username": "abdallahdak",
    "email": "abdallah.daknache@gmail.com"
    "firstName": "Abdallah",
    "lastName": "Daknache",
    "phoneNumber": "+96170302397",
    "password": "password",
    "gender": "male",
    "country": "Lebanon"
}
