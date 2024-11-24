import ReportModule from "../models/ReportModule.js";

//add a new report
export const addReport = async (req, res) => {
    try{
        const {
             delivery_Date,
             delivery_StartTime,
              delivery_EndTime,
               delivery_Status,
                delivery_Route,
                 driver_Name,
                  vehicel_No } = req.body;

        const report = new ReportModule({ 
            delivery_Date,
             delivery_StartTime,
              delivery_EndTime,
               delivery_Status,
                delivery_Route,
                 driver_Name,
                  vehicel_No 
                });

                
        await report.save();
        //res.status(201).json({message: "Report added successfully", report});
        res.status(201).json({message: "Report added successfully"});
        } catch (error) {
        res.status(500).json({ error: "Internal server error.", error });
    }

}

export const getReportById = async (req, res) => {
    try {
        const report = await ReportModule.findById(req.params.id);
        if (!report) {
            return res.status(404).json({message: "Report not found."});
        }
        res.status(200).json(report);
        } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}

//view all reports
export const listreport = async (req, res) => {
    try {
        const reports = await ReportModule.find();
        res.send(reports);
        console.log(reports)
        } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}


//update a report
export const updateReport = async (req, res) => {
    try {
        const { delivery_Date, delivery_StartTime, delivery_EndTime, delivery_Status, delivery_Route, driver_Name, vehicel_No } = req.body;
        const report = await ReportModule.findById(req.params.id );
        if (!report) {
            return res.status(404).json({message: "Report not found."});
        }
        report.delivery_Date = delivery_Date;
        report.delivery_StartTime = delivery_StartTime;
        report.delivery_EndTime = delivery_EndTime;
        report.delivery_Status = delivery_Status;
        report.delivery_Route = delivery_Route;
        report.driver_Name = driver_Name;
        report.vehicel_No = vehicel_No;
        await report.save();
        res.status(200).json({message: "Report updated successfully", report});
        } catch (error) {
        res.status(500).json({ error: "Internal server error." });
        
    } 
}

//delete a report
export const deleteReport = async (req, res) => {
    try {
        const report = await ReportModule.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({message: "Report not found."});
        }
        res.status(200).json({message: "Report deleted successfully", report});
        } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}

