Certainly! Here's a sample README for your project:

````markdown
# Hall Booking API

This is a Hall Booking API built with Node.js and Express. It allows users to create rooms, book rooms, and manage bookings.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage rooms
- Book rooms for specific times
- View all rooms and their booking status
- View customer booking details
- Count how many times a customer has booked a room

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hall-booking-api.git
   cd hall-booking-api
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:8101`.

## Usage

### Base URL

The base URL for all endpoints is `http://localhost:8101`.

### Endpoints

#### List All Endpoints

```http
GET /
```

Displays all available API endpoints.

#### Show All Rooms

```http
GET /rooms/all
```

#### Add a New Room

```http
POST /rooms/add
```

- Request Body:
  ```json
  {
    "name": "Room Name",
    "seats": 100,
    "amenities": ["WiFi", "Projector", "Whiteboard"],
    "price": 200
  }
  ```

#### Edit a Room

```http
PUT /rooms/edit/:id
```

- Request Body:
  ```json
  {
    "name": "Updated Room Name",
    "seats": 120,
    "amenities": ["WiFi", "Projector"],
    "price": 250
  }
  ```

#### Delete a Room

```http
DELETE /rooms/delete/:id
```

#### Book a Room

```http
POST /bookings/create-new
```

- Request Body:
  ```json
  {
    "customer_name": "John Doe",
    "book_date": "2024-05-01",
    "start_time": "10:00",
    "end_time": "12:00",
    "room_id": 1
  }
  ```

#### List All Rooms with Booking Data

```http
GET /bookings/all
```

#### List All Customers with Booked Data

```http
GET /bookings/customers-details
```

#### List Customer Booking Count and Details

```http
GET /bookings/booking-details
```

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
