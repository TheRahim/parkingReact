import {model,Schema} from 'mongoose';

const parkingSchema = new Schema({
    spot:{
        type:Number,
        unique:true,
        required:true
    },
    licensePlate:{
        type:String,
        unique:true,
        required:true
    },
    entryTime:{
        type:String,

    },
    exitTime: {
        type:String,
        default:"NULL"
    }
    
});

export const ParkingModel = model('parking', parkingSchema);
