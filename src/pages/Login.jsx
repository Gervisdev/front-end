import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      
        e.preventDefault();
       
        try{
            const response = await axios.post(
                "https://annuaire-api-olive.vercel.app/api/auth/login",
                {email,password}
            );
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role ==="admin"){
                    navigate('/admin-dashboard')
                } else {
                  navigate("/employee-dashboard")
                }
            }
        }catch(error){
            if(error.response && !error.response.data.success){
               setError(error.response.data.error)
            }else{
              setError("Erreur serveur ")
            }
        }
    };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-custom-blue "
     >
      <h2 className="text-3xl text-white font-garamond">Société de Patrimoine</h2>
   
        <div className="p-6 bg-white border shadow w-80">
          <h2 className="mb-4 text-2xl font-bold">Connexion</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700"> Email</label>
            <input 
             type="email"
             className="w-full px-3 py-2 border"
             placeholder="Entrez votre adresse mail"
             onChange={(e) => setEmail(e.target.value)}
             required
             />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700"> Mot de passe</label>
            <input
             type="password" 
             className="w-full px-3 py-2 border"
             placeholder="*******"
             onChange={(e) => setPassword(e.target.value)}
             required
              />
          </div>
          <div className="mb-4">
          <button
          type="submit"
          className="w-full py-2 text-white bg-blue-400"
          >
            Se Connecter
            </button>
          </div>
          
          </form>
        </div>
    
    </div>
  );
};
export default Login;
