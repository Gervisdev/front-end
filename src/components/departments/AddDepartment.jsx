import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( "https://backend-api-orpin-seven.vercel.app/api/department/add",department, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/department");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="max-w-3xl p-8 mx-auto mt-10 bg-white rounded-md shadow-md w-96">
      <h2 className="mb-6 text-2xl font-bold">Nouveau département</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm text-gray-700 font-meduim"
          >
            Nom département
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Entrez le nom département"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm text-gray-700 font-meduim"
          >
            Description
          </label>
          <textarea
            name="description"
            id="Description"
            placeholder="Mission du département"
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded mt-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-6 font-bold text-white rounded bg-amber-600 hover:bg-amber-700"
        >
          Enregister département
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
