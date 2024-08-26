import {Request,Response} from "express";
import {ParkingModel} from '../models/parkingModel'

//GET'S
export const parkingHandlerService ={
    async getAllSpots(req:Request,res:Response){
        try{
            const spots= await ParkingModel.find()
            return res.json(spots);
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message
            })
        }
    },

    //  {"licensePlate":"CAR001"}
    async checkLicensePlate(req:Request,res:Response){
        const { licensePlate } = req.query;
        const existingPlate = await ParkingModel.findOne({ licensePlate });
        try{
            if(existingPlate){
                //return res.status(200).json({ message: "License already in" });
                return res.status(200).json(true);
            }
            else{
               // return res.status(200).json({ message: "License avaible" });
                return res.status(200).json(false);
            }
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message
            })
        }
    },
    async checkSpots(req:Request,res:Response){
        const spots= await ParkingModel.find({}, 'spot')
        const spotVar = (spots.map(spot => spot.spot).sort());
        

        try {
            const spots = await ParkingModel.find({}, 'spot');
            const spotVar = spots.map(spot => spot.spot).sort();
            
            const freeSpots: number[] = [];
            
            for (let i = 1; i <= (import.meta.env.VITE_PARKING_CAPACITY); i++) {
                if (!spotVar.includes(i)) {
                    freeSpots.push(i);
                }
            }

            return res.json(freeSpots);
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message
            })
        }
    },

    async isFull(req:Request,res:Response){
        try{
            const spots= await ParkingModel.find({}, 'spot')
            const spotVar =(spots.map(spot => spot.spot).sort());
            
            if(spotVar.length>= import.meta.env.VITE_PARKING_CAPACITY){
                //console.log(spotVar.length);
                return res.status(200).json(true); 
            }
            else{
                return res.status(200).json(false);
            }
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message
            })
        }
    },
//{"spot":5}
    async isAvaible(req:Request,res:Response){
        const existingSpot = await ParkingModel.findOne({ spot: req.body.spot });
        try{
            if(req.body.spot > import.meta.env.VITE_PARKING_CAPACITY){
                return res.status(400).json({ message: "Spot out of limit!" });
            }
            if(existingSpot){
                //return res.status(200).json({ message: "Spot not avaible" });
                return res.status(200).json(false);
            }
            else{
               // return res.status(200).json({ message: "Spot avaible" });
                return res.status(200).json(true);
            }
        }
        catch(error:any){
            return res.status(400).json({
                message:error.message
            })
        }
    },


//POST
/*
   -- eg body for parkCar-- 
    {
        "spot":5,
        "licensePlate": "CAR09",
        "entryTime": "03:00:01"
    }
*/  
    async parkCar(req:Request,res:Response){
        try{
            const existingSpot = await ParkingModel.findOne({ spot: req.body.spot });
            if(req.body.spot > import.meta.env.VITE_PARKING_CAPACITY){
                return res.status(400).json({ message: "Spot out of limit!" });
            }
            if(existingSpot) {
                return res.status(400).json({ message: "Spot already taken" });
            }
            const existingPlate = await ParkingModel.findOne({ licensePlate: req.body.licensePlate });
            if(existingPlate) {
                return res.status(400).json({ message: "License Plate already registered" });
            }
            
            const data= await ParkingModel.create(req.body);
            return res.json(data);
        }
        catch(error:any){
            return res.status(400).json({   
                message:error.message
            })
        }
    },
    
//DELETE
async exitCar(req:Request,res:Response){
    try{
        const {licensePlate}= req.body;
        if (!licensePlate) {
            return res.status(400).json({ message: 'License Plate is required' });
        }
        if (licensePlate != (await ParkingModel.findOne({licensePlate}))?.licensePlate){
            return res.status(400).json({ message: 'Valid License Plate is required' });
        }
        const data= await ParkingModel.findOneAndDelete({licensePlate});

        return res.json(data);
    }
    catch(error:any){
        return res.status(400).json({   
            message:error.message
        })
    }
}

};



