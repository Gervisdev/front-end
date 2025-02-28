import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaUsers } from "react-icons/fa";
import axios from 'axios'

const AdminSummary = () => {
  const [summary, setSummary] = useState();

  useEffect(() => {
    const fetchSummary = async () => {
      try{
        const summary = await axios.get('https://annuaire-api-olive.vercel.app/api/dashboard/summary',{
          headers:{
           " Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(summary)
        setSummary(summary.data)
      }catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary();
  },[]);

  if(!summary){
    return <div>Chargement des données ...</div>
  }
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Vue d'ensemble tableau de bord</h3>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
        <SummaryCard
          icon={<FaUsers />}
          text="Total employés "
          number={summary.totalEmployees}
          color="bg-amber-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Départements "
          number={summary.totalDepartments}
          color="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
