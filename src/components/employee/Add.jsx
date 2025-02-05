import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState ({});
  const navigate = useNavigate()
  useEffect(() => {
    const getDepartments =  async () => {
    const departments = await fetchDepartments();
     setDepartments(departments); 
    };
    getDepartments();
  },[]);
  
  const handleChange = (e) =>{
    const {name,value,files} = e.target
    if(name === "image"){
      setFormData((prevData) =>({...prevData, [name] : files [0]}))
    }else{
      setFormData((prevData) =>({...prevData, [name] : value }))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) =>{
       formDataObj.append(key, formData[key])
    })

    try {
      const response = await axios.post( "http://localhost:3000/api/employee/add",formDataObj, {
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
    <div className="max-w-4xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
      <h2 className="mb-6 text-2xl font-bold"> Nouveau employé</h2>
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
              onChange = {handleChange}
              placeholder="Entrez le nom"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange = {handleChange}
              placeholder="Entrez Email"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Employee ID*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              ID Employé
            </label>
            <input
              type="text"
              name="employeeId"
              onChange = {handleChange}
              placeholder="Identifiant Employé"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}

          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Date de naissance
            </label>
            <input
              type="date"
              name="dob"
              onChange = {handleChange}
              placeholder="date de naissance"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Sexe
            </label>
            <select
              name="gender"
              onChange = {handleChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner le sexe</option>
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
              <option value="other">Autres</option>
            </select>
          </div>
          {/* Marital Status*/}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Situation Matrimoniale
            </label>
            <select
              name="maritalStatus"
              onChange = {handleChange}
              placeholder="Situation Matrimoniale"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner le statut</option>
              <option value="male">Célibataire</option>
              <option value="female">Marié</option>
            </select>
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
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner un département</option>
              {departments.map(dep =>(
                <option  key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange = {handleChange}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Role */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Role
            </label>
            <select
              name="role"
              onChange = {handleChange}
              placeholder="Situation Matrimoniale"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            >
              <option value="">Sélectionner un rôle</option>
              <option value="admin">Admin</option>
              <option value="employee">Employé</option>
            </select>
          </div>
          {/* image Upload */}
          <div>
            <label
              htmlFor=""
              className="block text-sm text-gray-700 font-meduim"
            >
              Image profil
            </label>
            <input
              type="file"
              name="image"
              onChange = {handleChange}
              placeholder="téléverser une image"
              accept="image/*"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          {/* phone numbber*/}
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
  );
};

export default Add;
