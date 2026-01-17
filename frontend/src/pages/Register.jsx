import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  ArrowLeft,
  Building2,
  BadgeCheck,
  UserPlus
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      toast.success("Welcome to BCRS! Registration Successful.");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
        
        {/* LEFT SIDE - BCRS BRANDING */}
        <div className="md:w-5/12 bg-[#002B5B] text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 text-blue-200 hover:text-orange-400 mb-10 transition-colors font-medium text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to Authentication</span>
            </button>

            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white p-1.5 rounded-lg shadow-lg">
                <div className="w-8 h-8 flex flex-col justify-between p-1">
                   <div className="h-2 w-full bg-[#FF9933] rounded-sm"></div>
                   <div className="h-2 w-full bg-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 border border-blue-800 rounded-full"></div>
                   </div>
                   <div className="h-2 w-full bg-[#138808] rounded-sm"></div>
                </div>
              </div>
              <h1 className="text-xl font-black tracking-tight leading-none">BCRS <span className="text-blue-300 font-light">REGISTRATION</span></h1>
            </div>

            <h2 className="text-2xl font-bold mb-8 leading-tight">
              Join the Digital <br/><span className="text-orange-400 tracking-wide">Citizen Network</span>
            </h2>

            <div className="space-y-6">
              {[
                { icon: <Shield size={18}/>, title: "Data Privacy", desc: "Your identity is 100% secured" },
                { icon: <BadgeCheck size={18}/>, title: "Official Token", desc: "Get unique ID for every complaint" },
                { icon: <Building2 size={18}/>, title: "Direct Connect", desc: "Bypass middlemen, reach officers" }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-blue-200/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
             <div className="flex space-x-1 mb-2">
                <div className="h-1 w-6 bg-[#FF9933]"></div>
                <div className="h-1 w-6 bg-white"></div>
                <div className="h-1 w-6 bg-[#138808]"></div>
             </div>
             <p className="text-[10px] text-blue-200 font-medium">
               An Initiative for Transparent Governance
             </p>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTRATION FORM */}
        <div className="md:w-7/12 bg-white p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900">Create Account</h3>
              <p className="text-slate-500 text-sm mt-1">Register to access official grievance services.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Legal Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                  />
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                    />
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit Mob"
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                    />
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Create Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 6 characters"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                  />
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-blue-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm Access Key</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-type password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                  />
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-blue-600">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 py-2">
                <input type="checkbox" id="terms" required className="mt-1 accent-blue-600 h-4 w-4" />
                <label htmlFor="terms" className="text-[11px] text-slate-500 leading-relaxed italic">
                  I certify that the information provided is accurate and I agree to the <span className="text-blue-600 font-bold underline cursor-pointer">Official Service Terms</span>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-[#002B5B] hover:bg-blue-900 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Official Account</span>
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-slate-600 font-medium">
                  Already have an account?{" "}
                  <button type="button" onClick={() => navigate("/login")} className="text-blue-600 font-bold hover:underline">Sign In</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}