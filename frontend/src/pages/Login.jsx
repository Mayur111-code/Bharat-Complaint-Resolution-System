import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Building2,
  Shield,
  User,
  ChevronRight
} from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);

      if (!res?.data?.token || !res?.data?.user) {
        toast.error("Invalid server response");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name || "");

      toast.success("Welcome to BCRS Portal!");

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "department") navigate("/officer/dashboard");
      else navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
        
        {/* LEFT SIDE - BCRS BRANDING */}
        <div className="md:w-5/12 bg-[#002B5B] text-white p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <div className="w-10 h-10 flex flex-col justify-between p-1">
                   <div className="h-2.5 w-full bg-[#FF9933] rounded-sm"></div>
                   <div className="h-2.5 w-full bg-white flex items-center justify-center">
                      <div className="w-2 h-2 border border-blue-800 rounded-full animate-pulse"></div>
                   </div>
                   <div className="h-2.5 w-full bg-[#138808] rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none text-white">BCRS</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-blue-200 font-bold">Bharat Resolution</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Official Grievance <br/><span className="text-orange-400">Redressal Portal</span>
            </h2>

            {/* Features list optimized for Govt look */}
            <div className="space-y-5">
              {[
                { icon: <Shield size={18}/>, title: "Highly Secure", desc: "End-to-end encrypted data" },
                { icon: <Building2 size={18}/>, title: "Govt Verified", desc: "Direct access to authorities" },
                { icon: <User size={18}/>, title: "Transparent", desc: "Real-time status updates" }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 group cursor-default">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-blue-200/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
             <div className="flex space-x-1 mb-2">
                <div className="h-1 w-8 bg-[#FF9933]"></div>
                <div className="h-1 w-8 bg-white"></div>
                <div className="h-1 w-8 bg-[#138808]"></div>
             </div>
             <p className="text-[10px] text-blue-200 font-medium italic">
               Digitizing India's Trust • 2026 BCRS Official
             </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="md:w-7/12 bg-white p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10">
              <h3 className="text-2xl font-extrabold text-slate-900">Portal Login</h3>
              <p className="text-slate-500 text-sm mt-1">Please enter your credentials to proceed.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Official ID</label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all"
                  />
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Access Key</label>
                  <button type="button" onClick={() => navigate("/forgot-password")} className="text-xs font-semibold text-blue-600 hover:underline">Reset?</button>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all"
                  />
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-[#002B5B] hover:bg-[#001d3d] hover:translate-y-[-2px] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Authenticate Access</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>

              {/* Registration Link */}
              <div className="text-center mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600">
                  New citizen user?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}