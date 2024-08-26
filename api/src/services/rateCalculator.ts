import {Request,Response} from "express";
import {ParkingModel} from '../models/parkingModel'

//NOT WORKING

export const rateCalculatorService ={
    async billCalculator(req:Request,res:Response){
        const time='05:12:04'
        const time0='050:00:00'
        //const timeDate= new Date(time)

       // console.log(Number(timeDate))

        const [hours, minutes, seconds] = time.split(':').map(Number);
        const [hours0, minutes0, seconds0] = time0.split(':').map(Number);

        const now = new Date();
        const timeDate = new Date(
          now.getFullYear(), 
          now.getMonth(), 
          now.getDate(), 
          hours, 
          minutes, 
          seconds
        );
        const timeDate0 = new Date(
            now.getFullYear(), 
            now.getMonth(), 
            now.getDate(), 
            hours0, 
            minutes0, 
            seconds0
          );
          const tiempo= timeDate0.getTime()
        //const diff0= Math.floor((timeDate.getTime() -timeDate0.getTime()) / 1000);

        return res.send(tiempo)
    }

}





/*
- `VITE_PARKING_RATES: {minutes: [number, number|null], rate: number}[]`,
The applied parking rates for each range of minutes. `minutes[0]` is the lower bound and `minutes[1]`
is the upper bound where the rate is applicable. If `minutes[1]` is null, the rate applies through to the end of
the parking. The value of `rate` is the number of *cents* the user is charged every billing interval.
Defaults to [{"minutes":[0,180],"rate":50},{"minutes":[180,null],"rate":30}]
*/