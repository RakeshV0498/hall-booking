import express from "express";
import { rooms } from "../data.js"; // Importing rooms data

const roomRouter = express.Router();

// Endpoint to list all rooms
roomRouter.get("/all", (req, res) => {
  try {
    // Check if there are rooms available
    if (rooms.length === 0) {
      return res.json({
        message: "No rooms to list, please add a room",
      });
    }

    // Return all rooms in JSON format
    return res.json({
      message: "Successfully listed all Rooms",
      data: rooms,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error listing rooms:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Endpoint to add a new room
roomRouter.post("/add", (req, res) => {
  try {
    const roomEntries = req.body;

    // Check if the entry is an array or object
    const newRooms = Array.isArray(roomEntries) ? roomEntries : [roomEntries];

    // Validate each room entry
    for (const room of newRooms) {
      // Check if all the fields are filled
      const { name, seats, amenities, price } = room;
      if (!name || !seats || !amenities || !price) {
        return res
          .status(400)
          .send("Please input all fields: Seats, Amenities, Price");
      }
    }

    // Create a new room object with a unique ID
    newRooms.forEach((room) => {
      const newRoom = {
        id: rooms.length + 1, // Generate a unique ID
        ...room,
      };
      // Add the new room to the rooms array
      rooms.push(newRoom);
    });

    // Send a success response
    return res.json({
      message: "Successfully added rooms",
      data: rooms,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error adding rooms:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

export default roomRouter;
