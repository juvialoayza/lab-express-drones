const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model.js")

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((response) => {
      console.log(response)
      res.render("drones/list.hbs", {
        droneList: response
      })
    })
    .catch((error) => {
      next(error)
    })
})

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
})


router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  console.log(req.body) // aqui vendrá todos los datos del formulario

  let droneToAdd = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  }

  Drone.create(droneToAdd)
    .then((response) => {
      res.redirect("/drones")
    })
    .catch((error) => {
      next(error)
    })
})




router.get("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { droneId } = req.params

  // buscar los detalles del libro para pasarle a la vista
  Drone.findById(droneId)
    .then((response) => {
      res.render("drones/update-form.hbs", {
        details: response
      })
    })
    .catch((error) => {
      next(error)
    })

})

router.post("/drones/:droneId/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { droneId } = req.params

  const { name, propellers, maxSpeed } = req.body
  console.log(req.body)

  const droneToUpdate = {
    name,
    propellers,
    maxSpeed
  }

  Drone.findByIdAndUpdate(droneId, droneToUpdate)
    .then(() => {
      res.redirect("/drones")
    })
    .catch((error) => {
      next(error)
    })


})


router.post("/drones/:droneId/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.droneId)
    .then(() => {
      res.redirect("/drones")
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router;
