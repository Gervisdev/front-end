import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const columns = [
 

  {
      name: "Nom",
      selector: (row) => row.name,
      width: "180px",
      
  },
  {
    name: "Poste",
    selector: (row) => row.designation,
     width: "160px"
  },
 
  {
    name: "Département",
    selector: (row) => row.dep_name,
    width: "160px"
},

  {
      name: "Action",
      cell: (row) => row.action,
      center :"true",
       width: "260px"
  },
];



 export const fetchDepartments = async () => {
    let departments 
    try {
      const response = await axios.get( "https://backend-api-orpin-seven.vercel.app/api/department", {
          headers: {
            "Authorization":`Bearer ${localStorage.getItem("token")}`,  
          },
        }
      );
      
      if (response.data.success) {
         departments = response.data.departments
      
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des départements:", error); 
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error||"erreur est survenue");
      }
    }
    return departments
  };

  export const EmployeeButtons = ({Id}) =>{
    const Navigate = useNavigate()
    const {user} = useAuth()

    
    const isAdmin = user?.role==="admin"

    const handleDelete = async () => {
      if (!window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
          return;
      }
  
      try {
          await axios.delete(`https://backend-api-orpin-seven.vercel.app/api/employee/${Id}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
  
          alert("Employé supprimé avec succès !");
          window.location.reload(); 
      } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          alert(error.response?.data?.error || "Une erreur est survenue lors de la suppression.");
      }
  };
    

    return  (
        <div className="flex space-x-3">
          {/* Bouton "voir" accessible à tout le monde*/}
            <button className="px-3 py-1 text-white bg-blue-400" 
            onClick={() => {
              if(isAdmin){
                Navigate(`/admin-dashboard/employees/${Id}`);
              }else{
                Navigate(`/employee-dashboard/employees/${Id}`);
              }
            }}
            >Voir
            </button>
            {/* Boutons "modifier" et "supprimer" accessible uniquement aux administrateurs*/}
            {
              isAdmin && (
                <>
                <button className="px-3 py-1 text-white bg-amber-600"
                onClick={() => Navigate(`/admin-dashboard/employees/edit/${Id}`)}
                >
                Modifier
                </button>
                
                <button className="px-3 py-1 text-white bg-red-600"
                onClick={handleDelete}
                >Supprimer
                </button>
                </>
              )
            }

        </div>
    )
};
  