import express from "express";
import roomRouter from "./routes/rooms.js";
import bookingRouter from "./routes/booking.js";

const port = 8101;

const server = express();

server.use(express.json());

// Mounting roomRouter and bookingRouter to their respective endpoints
server.use("/rooms", roomRouter);
server.use("/bookings", bookingRouter);

server.get("/", (req, res) => {
  const endpoints = [
    {
      path: "/rooms/all",
      method: "GET",
      description: "Show all created rooms",
    },
    { path: "/rooms/add", method: "POST", description: "Add a new room" },

    { path: "/booking/create-new", method: "POST", description: "Book a room" },
    {
      path: "/bookings/all",
      method: "GET",
      description: "List all rooms with booked data",
    },
    {
      path: "/bookings/customers-details",
      method: "GET",
      description: "List all customers with booked data",
    },
    {
      path: "/bookings/booking-details",
      method: "GET",
      description:
        "List how many times a customer has booked the room with detailed information",
    },
  ];

  const endpointListHTML = endpoints
    .map(
      (endpoint) => `
    <li>
      <div style="display: flex; gap: 0.5rem">
        <span style="min-width: fit-content;">${endpoint.path} (${endpoint.method}) - </span>
        <span>${endpoint.description}</span>
      </div>
    </li>
  `
    )
    .join("");

  const htmlResponse = `
    <h1 style="text-align: center">Hall Booking API</h1>
    <p>Try API endpoints:</p>
    <p>Base URL: ${req.protocol}://${req.get("host")}/</p>
    <ol style="display: flex; flex-direction: column; gap: 0.5rem">
      ${endpointListHTML}
    </ol>
  `;

  res.send(htmlResponse);
});

// Start the server
server.listen(port, () => {
  console.log(`${new Date()} : Server started on port: ${port}`);
});
