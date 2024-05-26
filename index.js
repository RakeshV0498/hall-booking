import express from "express";
import roomRouter from "./routes/rooms.js";
import bookingRouter from "./routes/booking.js";

const port = 8101;

const server = express();

server.use(express.json());

// Mounting roomRouter and bookingRouter to their respective endpoints
server.use("/rooms", roomRouter);
server.use("/bookings", bookingRouter);

// Start the server
server.listen(port, () => {
  console.log(`${new Date()} : Server started on port: ${port}`);
});
