import express from "express";
import { rooms, roomBookings } from "../data.js"; // Importing rooms and roomBookings data

const bookingRouter = express.Router();

// Endpoint to create a new booking
bookingRouter.post("/create-new", (req, res) => {
  const { customer_name, book_date, start_time, end_time, room_id } = req.body;

  // Validate the input fields
  if (!customer_name || !book_date || !start_time || !end_time || !room_id) {
    return res.status(400).send("Please input all fields");
  }

  // Check if the room exists
  const roomExists = rooms.some((room) => room.id === room_id);
  if (!roomExists) {
    return res.status(400).send("Invalid Room ID");
  }

  // Check for overlapping bookings
  const isOverlapping = roomBookings.some(
    (booking) =>
      booking.room_id === room_id &&
      booking.book_date === book_date &&
      ((start_time >= booking.start_time && start_time < booking.end_time) ||
        (end_time > booking.start_time && end_time <= booking.end_time) ||
        (start_time <= booking.start_time && end_time >= booking.end_time))
  );

  if (isOverlapping) {
    return res
      .status(400)
      .send("Room is already booked for the specified time slot");
  }

  // Create a new booking object
  const newBooking = {
    id: `book_0${roomBookings.length + 1}`,
    customer_name,
    book_date,
    start_time,
    end_time,
    room_id,
  };

  // Add the new booking to the roomBookings array
  roomBookings.push(newBooking);

  return res.json({
    message: "Successfully booked a room",
    data: newBooking,
  });
});

// Endpoint to get the list of all rooms with booking status
bookingRouter.get("/all", (req, res) => {
  if (rooms.length === 0 || roomBookings.length === 0) {
    return res.send({
      message: "No Rooms found or No customers have booked the room",
    });
  }

  const bookedRooms = [];

  rooms.forEach((room) => {
    const filteredBookings = roomBookings.filter(
      (booking) => booking.room_id === room.id
    );
    const bookingsData = filteredBookings.map((booking) => {
      return {
        "Room Name": room.name,
        "Booking Status": "Booked",
        "Customer Name": booking.customer_name,
        Date: booking.book_date,
        "Start Time": booking.start_time,
        "End Time": booking.end_time,
      };
    });

    if (bookingsData.length > 0) {
      bookedRooms.push(bookingsData);
    } else {
      bookedRooms.push({
        "Room Name": room.name,
        "Booking Status": "Available",
        "Customer Name": "N/A",
        Date: "N/A",
        "Start Time": "N/A",
        "End Time": "N/A",
      });
    }
  });

  return res.json({
    message: "Successfully listed, all Rooms with Booked Data",
    data: bookedRooms,
  });
});

// Endpoint to list all customers with booked data
bookingRouter.get("/customers-details", (req, res) => {
  if (roomBookings.length === 0) {
    return res.send({ message: "No customers have booked the room." });
  }

  const customersDetails = roomBookings.map((booking) => {
    const room = rooms.find((room) => room.id === booking.room_id);
    return {
      "Customer Name": booking.customer_name,
      "Room Name": room.name,
      Date: booking.book_date,
      "Start Time": booking.start_time,
      "End Time": booking.end_time,
    };
  });

  return res.json({
    message: "Successfully listed all customers with booked data",
    data: customersDetails,
  });
});

// Endpoint to list how many times a customer has booked the room with detailed information
bookingRouter.get("/booking-details", (req, res) => {
  if (roomBookings.length === 0) {
    return res.send({ message: "No customers have booked the rooms." });
  }

  const customerBookings = roomBookings.reduce((acc, booking) => {
    const room = rooms.find((room) => room.id === booking.room_id);
    if (room) {
      const customerBookingDetails = {
        "Booking Id": booking.id,
        "Customer Name": booking.customer_name,
        "Room Name": room.name,
        Date: booking.book_date,
        "Start Time": booking.start_time,
        "End Time": booking.end_time,
        "Booking Status": "Booked",
      };
      if (!acc[booking.customer_name]) {
        acc[booking.customer_name] = [];
      }
      acc[booking.customer_name].push(customerBookingDetails);
    }
    return acc;
  }, {});

  const detailedCustomerBookings = Object.keys(customerBookings).map(
    (customerName) => {
      return {
        customer_name: customerName,
        bookings: customerBookings[customerName],
        total_bookings: customerBookings[customerName].length,
      };
    }
  );

  return res.json({
    message: "Successfully listed all customers with detailed booking data",
    data: detailedCustomerBookings,
  });
});

export default bookingRouter;
