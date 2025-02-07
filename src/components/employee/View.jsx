import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la modification des départements:",
          error
        );
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error || "Une erreur est survenue");
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md">
          <h2 className="mb-8 text-2xl font-bold text-center">Fiche contact</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-64 h-64 p-2 border-2 border-gray-500 shadow-lg">
              <img
                src={`http://localhost:3000/${employee.userId.profileImage}`}
                alt="Profile"
                className="object-cover w-full h-48 rounded-md"
              />
            </div>
            <div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Nom:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Matricule employé:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Poste :</p>
                <p className="font-medium">{employee.designation}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Département :</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Email :</p>
                <p className="font-medium">{employee.userId.email}</p>
              </div>
              <div className="flex mb-5 space-x-3">
                <p className="text-lg font-bold">Contact :</p>
                <p className="font-medium">{employee.contact}</p>
              </div>

              {/* Bouton pour appeler directement */}
              {employee.contact && (
                <a
                  href={`tel:${employee.contact}`}
                  className="block px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  📞 Appeler
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Chargement des données...</div>
      )}
    </>
  );
};

export default View;
