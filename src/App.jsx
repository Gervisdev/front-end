import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from './pages/EmployeeDashboard';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from "./components/employee/List"
import Add from "./components/employee/Add"
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Summary from './components/EmployeeDashboard/Summary';


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Navigate to ="/admin-dashboard"/>}> </Route>
      <Route path ="/login" element={<Login/>}> </Route>
      <Route path ="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin"]}>
          <AdminDashboard/>
          </RoleBaseRoutes>
        </PrivateRoutes>
       


        }>
          <Route index element={<AdminSummary/>}></Route>

          <Route path="/admin-dashboard/department" element={<DepartmentList/>}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>

          <Route path="/admin-dashboard/employees" element={<List/>}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
          <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
        </Route>

      <Route
       path ="/employee-dashboard"
      element=
      {
      <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["admin","employee"]}>
       <EmployeeDashboard/>
       </RoleBaseRoutes>
      </PrivateRoutes>
      }>
        <Route index element={<Summary/>}></Route>
        <Route path="/employee-dashboard/employees" element={<List/>}></Route>
        <Route path="/employee-dashboard/employees/:id" element={<View/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
