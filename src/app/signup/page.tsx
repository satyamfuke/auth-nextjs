"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    
    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success",response.data);
            toast.success("Signup successful! Redirecting to login page...");
            router.push("/login");
        }catch(error : any){
            console.log("Signup page failed:", error.message);
            toast.error("Error signing up. Please try again.");
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Signup Page</h1>
                <hr className="border-gray-200" />
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={user.username} 
                        onChange={(e)=>setUser({...user,username:e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">email</label>
                        <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value={user.email} 
                        onChange={(e)=>setUser({...user,email:e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={user.password} 
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>
                </div>

                <button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition transform hover:scale-105 active:scale-95 ${buttonDisabled ? 'opacity-50 cursor-not-allowed hover:from-blue-500 hover:to-blue-600' : ''}`}
                >
                    Signup here
                </button>
                <Link href="/login" className="block text-center text-blue-600 hover:text-blue-800 font-medium transition">Already have an account? Login here</Link>
            </div>
        </div>
    )
}