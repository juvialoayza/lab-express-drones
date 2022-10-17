// Iteration #1
const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  require("../db")

  const Drone = require("../models/Drone.model.js")
  const mongoose = require("mongoose")

  Drone
  .insertMany(drones)
  .then(()=>{
    console.log("drones agregados")
  })
  .catch((err)=>{
    console.log(err)
  })
  
  mongoose.connection.close();