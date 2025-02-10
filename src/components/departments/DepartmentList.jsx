import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([])
  
  const OnDepartmentDelete = async (id) => {
    const data =  departments.filter(dep => dep._id !==id)
    setDepartments(data)
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get( "https://backend-api-orpin-seven.vercel.app/api/department", {
            headers: {
              "Authorization":`Bearer ${localStorage.getItem("token")}`,  
            },
          }
        );
        
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons DepId={dep._id} OnDepartmentDelete={OnDepartmentDelete}/>),
          }));
          setDepartments(data);
          setFilteredDepartments(data)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des départements:", error); 
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error||"erreur est survenue");
        }
      }finally{
        setDepLoading(false)
      }
    };
    
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
   const records =  departments.filter((dep) =>
  dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))

   setFilteredDepartments(records)
  }

  return (
    <>{depLoading ? <div>Veuillez patienter... </div> : 
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Gestion de département</h3>
      </div>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder=" Nom département"
          className="px-4 py-0.5 border"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 text-white rounded bg-amber-600"
        >
          Nouveau département
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <DataTable
         columns={columns}
        data={filteredDepartments} 
        fixedHeader
         />
      </div>
    </div>
   } </>
  );
};

export default DepartmentList;
