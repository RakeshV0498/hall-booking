import express from "express";

const port = 8101;

const server = express();

server.use(express.json());

let rooms = [];

server.get("/rooms/all", (req, res) => {
  res.send(`No of available rooms ${rooms.length}`);
});

server.post("/rooms/add", (req, res) => {
  const requestBody = req.body;
  // To check if all the fields are filled.
  console.log(req.body);
  res.send(req.body);
});

server.listen(port, () => {
  console.log(`Server started in port : ${port}
listening in http://localhost:${port}`);
});
