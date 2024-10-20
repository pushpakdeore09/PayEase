import "./App.css";
import SignInForm from "./pages/auth/Login";
import RegisterForm from "./pages/auth/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/home/Homepage";
import Department from "./components/Department/Department";
import Sidebar from "./components/Sidebar/Sidebar";
import EmployeeManagement from "./components/EmployeeManagement/EmployeeManagement";
import AddEmployee from "./components/EmployeeManagement/AddEmployee";
import AddPayrollMonth from "./components/PayrollMonth/AddPayrollMonth";
import EditEmployee from "./components/EmployeeManagement/EditEmployee";
import Payroll from "./components/Payroll/Payroll";
import PayrollMonth from "./components/PayrollMonth/PayrollMonth";
import AddPayroll from "./components/Payroll/AddPayroll";
import Allowances from "./components/Allowances/Allowances";
import AddAllowances from "./components/Allowances/AddAllowances";
import Deductions from "./components/Deductions/Deductions";
import Tax from "./components/Tax/Tax";
import AddTax from "./components/Tax/AddTax";
import AddDeductions from "./components/Deductions/AddDeductions";
import UpdateAllowance from "./components/Allowances/UpdateAllowance";
import UpdateTax from "./components/Tax/UpdateTax";
import UpdateDeduction from "./components/Deductions/UpdateDeduction";

function AppContent() {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/employee/:employeeId" element={<EditEmployee />} />
          <Route path="/addPayrollMonth" element={<AddPayrollMonth />} />
          <Route path="/payrollMonth" element={<PayrollMonth />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/addPayroll" element={<AddPayroll />} />
          <Route path="/allowances" element={<Allowances />} />
          <Route path="/addAllowance" element={<AddAllowances />} />
          <Route path="/deductions" element={<Deductions />} />
          <Route path="/addDeductions" element={<AddDeductions />} />
          <Route path="/tax" element={<Tax />} />
          <Route path="/addTax" element={<AddTax />} />
          <Route
            path="/allowance/:allowanceId/:employeeId"
            element={<UpdateAllowance />}
          />
          <Route path="/tax/:taxId/:employeeId" element={<UpdateTax />} />
          <Route
            path="/deduction/:deductionId/:employeeId"
            element={<UpdateDeduction />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
