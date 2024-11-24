import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    driver_Name:{
        type:String,
        required:true
    },
    vehicel_No:{
        type:String,
        required:true
    },
    delivery_Route:{
        type:String,
        required:true
    },
    delivery_Date:{
        type:String,
        required:true
    },
    delivery_StartTime:{
        type:String,
        required:true
    },
    delivery_EndTime:{
        type:String,
        required:true
    },
    delivery_Status:{
        type:String,
        required:true,
        enum : ["Pending",
             "Inprogress",
              "Delivered",
               "Cancelled",
                "Failed",
                 "Completed"],
                  default: "Pending"
    }
});

export default mongoose.model("report", reportSchema);
