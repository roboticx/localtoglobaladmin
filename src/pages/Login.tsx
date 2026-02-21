import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
} from 'lucide-react';
import {POST } from '../utils/apiUtils';
import { useSelector } from 'react-redux';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
const[logindata,setLoginData]=useState({
  email:"",
  password:""
})
 const theme = useSelector((state: any) => state.theme.theme);
const handleLogin=async()=>{
  try {
    const res= await POST({
      url:"/auth/user/login",
      data:logindata,
      toast:true,
    })
    localStorage.setItem("token", res.token );
    localStorage.setItem("role", res.user.role);
    localStorage.setItem("name", res.user.name);
    localStorage.setItem("mode", theme);
    window.location.href="/"
    
  } catch (error) {
      console.log(error)
  }
  
}
  return (
    <div className="flex min-h-screen w-full bg-[#0f172a]">
      <div className="relative hidden w-1/2 lg:flex items-center justify-center overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20" />
        <div className="absolute h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] -top-24 -left-24" />
        <div className="relative z-10 p-12 text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <ShieldCheck className="text-indigo-400" size={48} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter text-white mb-4">
              Welcome back to <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Local-to-global
            </span>
          </h1>          
        </div>    
      </div>
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-slate-400">Please enter your details to sign in.</p>
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  value={logindata.email}
                  onChange={(e) => setLoginData({...logindata,email:e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  value={logindata.password}
                  onChange={(e) => setLoginData({...logindata,password:e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 accent-indigo-500" />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98]" 
              onClick={handleLogin}>
              Sign In
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <p className="text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="font-semibold text-white hover:underline">Sign up for free</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;