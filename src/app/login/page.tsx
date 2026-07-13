"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    
    const onLogin = async () => {
        if (buttonDisabled || loading) return;

        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success",response.data);
            // Store the token in localStorage or cookies
            localStorage.setItem("token", response.data.token);
            router.push("/profile");
        }catch(error){
            console.log("Login failed", error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Login Page</h1>
                <hr className="border-gray-200" />
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">email</label>
                        <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value={user.email} 
                        onChange={(e)=>setUser({...user,email:e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
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
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg transition transform hover:scale-105 active:scale-95 ${buttonDisabled || loading ? 'opacity-60 cursor-not-allowed hover:from-blue-500 hover:to-blue-600' : ''}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        'Login here'
                    )}
                </button>
                <Link href="/signup" className="block text-center text-blue-600 hover:text-blue-800 font-medium transition">Don't have an account? Signup here</Link>
            </div>
        </div>
    )
}