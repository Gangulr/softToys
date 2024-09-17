import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeaveRequestForm from './leaveReqForm/LeaveForm';
import SalaryMang from './SalaryMangment/SalaryMang';
import AttendanceTrackingForm from './AttendanceT/Attencance';
import HRManagementInterface from './HRManagementInterface/HRInterface';
import SalaryRet from './SalaryDetailsRet/SalaryRet';
import HRManagementReport from './HRreport/HRreport';
import ARet from './ATrackingRet/ARet';
import LeaveRet from './LeaveRetrive/LeaveRet';
// import Addemp from './AddEmp/Addemp';
// import EmpRet from './AddEmpRet/empRet';

const App = () => {
  return (
    <Router>
      <div>
        {/* Render standalone components here if needed */}
        <SalaryRet />
        <ARet />
        <LeaveRet />
        {/* <Addemp /> */}
        {/* <EmpRet /> */}

        <Routes>
          <Route path="/" element={<HRManagementInterface />} />
          <Route path="/leaveform" element={<LeaveRequestForm />} />
          <Route path="/salarymang" element={<SalaryMang />} />
          <Route path="/attendancetrack" element={<AttendanceTrackingForm />} />
          <Route path="/hr-report" element={<HRManagementReport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
