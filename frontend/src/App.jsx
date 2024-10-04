import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
i//mport LeaveRequestForm from './leaveReqForm/LeaveForm';
//import SalaryMang from './SalaryMangment/SalaryMang';
//import AttendanceTrackingForm from './AttendanceT/Attencance';
//import HRManagementInterface from './HRManagementInterface/HRInterface';
//import SalaryRet from './SalaryDetailsRet/SalaryRet';
//import HRManagementReport from './HRreport/HRreport';
//import ARet from './ATrackingRet/ARet';
//import LeaveRet from './LeaveRetrive/LeaveRet';
//import Addemp from './AddEmp/Addemp';
import EmpRet from './AddEmpRet/empRet';
 //Added import for EmpRet

const App = () => {
  return (
  <div>
        <EmpRet/> 
      
  </div>
    

<<<<<<< HEAD
  );
};
=======
        <Routes>
          <Route path="/" element={<HRManagementInterface />} />
          <Route path="/leaveform" element={<LeaveRequestForm />} />
          <Route path="/salarymang" element={<SalaryMang />} />
          <Route path="/attendancetrack" element={<AttendanceTrackingForm />} />
          <Route path="/hr-report" element={<HRManagementReport />} />
          <Route path="/addemp" element={<Addemp />} />
        </Routes>
      </div>
    </Router>

)};
>>>>>>> 20cfdcc728f0996c8b7e7e2970a12e146c86d822

export default App;

