import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const { user } = useAuth();  // Utilisation du contexte Auth pour obtenir l'utilisateur
  
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://annuaire-api-olive.vercel.app/api/employee", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            designation: emp.designation,
            profileImage: <img width={40} className='rounded-full' src={emp.userId.profileImage} />,
            action: (< EmployeeButtons Id={emp._id} />),
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des employés:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error || "Une erreur est survenue");
        }
      } finally {
        setEmpLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
    setFilteredEmployee(records);
  };

  return (
    <div className="p-5">
    <div className="text-center">
      <h3 className="text-2xl font-bold">Liste des contacts</h3>
    </div>
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Recherche par nom"
        className="w-full px-4 py-2 border md:w-auto"
        onChange={handleFilter}
      />
      {user?.role === 'admin' && (
        <Link
          to="/admin-dashboard/add-employee"
          className="w-full px-4 py-2 text-center text-white rounded bg-amber-600 md:w-auto"
        >
          Nouveau Employé
        </Link>
      )}
    </div>
    <div className="mt-6 overflow-x-auto ">
      <DataTable
        columns={columns}
        noDataComponent="Aucune donnée disponible pour le moment."
        data={filteredEmployee}
        fixedHeader
      />
    </div>
  </div>
  
  );
}

export default List;
