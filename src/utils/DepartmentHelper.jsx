import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const columns = [
  {
    name: "Nom département",
    selector: (row) => row.dep_name,
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center:"true",
    width:"260px"
  },
];

export const DepartmentButtons = ({ DepId, OnDepartmentDelete }) => {
  const Navigate = useNavigate();
  const { user } = useAuth(); //récupération de l'utilisateur depuis le contexte//
  const isAdmin = user?.role === "admin"; //vérification si l'utilisateur est un admin//


  const handleDelete = async (id) => {
    const confirm = window.confirm("Etes vous sure de votre choix ?");
    if (confirm) {
    }

    try {
      const response = await axios.delete(
        `https://annuaire-api-olive.vercel.app/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        OnDepartmentDelete(id);
      }
    } catch (error) {
      console.error("Erreur lors de la modification des départements:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error || "erreur est survenue");
      }
    }
  };
  return (
    <div className="flex space-x-3">
      {/* Boutons "modifier" et "supprimer" accessible uniquement aux administrateurs*/}

      {isAdmin && (
        <>
          <button
            className="px-3 py-1 text-white bg-blue-400"
            onClick={() => Navigate(`/admin-dashboard/department/${DepId}`)}
          >
            Modifier
          </button>
          <button
            className="px-3 py-1 text-white bg-amber-600"
            onClick={() => handleDelete(DepId)}
          >
            Supprimer
          </button>
        </>
      )}
    </div>
  );
};
