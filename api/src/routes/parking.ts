import express from "express";
import { parkingHandlerService } from "@/services/parkingHandler";
import { rateCalculatorService } from "@/services/rateCalculator";


const router = express.Router();





//CONFIG PROVIDE
//config

//PARKING HANDLER
router.get('/getSpots',parkingHandlerService.getAllSpots)   //get all spots with all information
router.get('/checkSpots',parkingHandlerService.checkSpots) //show the free spots
router.get('/checkLicensePlate',parkingHandlerService.checkLicensePlate) //show if licensePlate exist
router.get('/isFull',parkingHandlerService.isFull)          //show if it is full

router.get('/isAvaible',parkingHandlerService.isAvaible)    //show is a specific spot is avaible

router.post('/parkCar',parkingHandlerService.parkCar)       //park a new car

router.delete('/exitCar', parkingHandlerService.exitCar)    //exit the car

//RATE CALCULATOR
router.get('/billCalculator',rateCalculatorService.billCalculator) //calculate the bill

export default router