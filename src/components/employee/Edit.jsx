import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"

const Edit = () => {
  const [employee, setEmployee] = useState({
    name : '',
    designation : '',
    department : '',
    contact : ''
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams()



  useEffect(() => {
    const getDepartments =  async () => {
    const departments = await fetchDepartments();
     setDepartments(departments); 
    };
    getDepartments();
  },[]);

  useEffect(() => {
    const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `https://backend-api-orpin-seven.vercel.app/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.success) {
            const employee = response.data.employee
            setEmployee((prev)=> ({
              ...prev, 
              name: employee.userId.name , 
              designation : employee.designation,
              department : employee.department
            }));
          }
        } catch (error) {
          console.error(
            "Erreur lors de la modification des départements:",
            error
          );
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error || "erreur est survenue");
          }
        }
      };
      fetchEmployee();
  },[]);
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
      setEmployee((prevData) =>({...prevData, [name] : value}))
    };
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put( `http://localhost:3000/api/employee/${id}`,employee, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  return (
    <>{departments && employee ? (
    <div className="max-w-4xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
      <h2 className="mb-6 text-2xl font-bold"> Modification des informations d'un employé</h2>
      <form onSubmit = {handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange = {handleChange}
              placeholder="Entrez le nom"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

        
           {/* designation*/}
           
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Poste occupé
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange = {handleChange}
              placeholder="Poste occupé"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Department*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Département
            </label>
            <select
              name="department"
              onChange = {handleChange}
              value={employee.department}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map(dep =>(
                <option  key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>
         
          {/* phone number*/}
          <div>
           
           <label
             htmlFor=""
             className="block text-sm text-gray-700 font-meduim"
           >
             Contact
           </label>
           <input
             type="text"
             name="contact"
             value={employee.contact}
             onChange = {handleChange}
             placeholder="+241 xx xx xx XX"
             className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
             required
           />
         </div>
        </div>
        <button
        type="submit"
        className="w-full px-4 py-2 mt-6 font-bold text-white rounded bg-amber-600 hover:bg-amber-700"
        >
          Enregistrer employé
        </button>
      </form>
    </div>
    ) :<div> Chargement des données....</div> }</>
  );
};

export default Edit;
