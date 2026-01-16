// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Building2, 
//   Shield,
//   Save,
//   Loader2
// } from "lucide-react";

// export default function ProfileForm({ role }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     department: ""
//   });
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/auth/me");
//       setForm(res.data);
//     } catch {
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async () => {
//     try {
//       setUpdating(true);
//       await API.put("/auth/update", form);
//       toast.success("Profile updated successfully!");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-lg mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="flex justify-center mb-4">
//             <div className="p-4 bg-blue-100 rounded-2xl">
//               <User className="w-10 h-10 text-blue-600" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-[#003366]">
//             {role} Profile
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Update your personal information
//           </p>
//           <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full mx-auto mt-3"></div>
//         </div>

//         {/* Profile Form */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//           {/* Name Field */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <User className="w-4 h-4 mr-2" />
//               Full Name
//             </label>
//             <input
//               name="name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               placeholder="Enter your full name"
//               value={form.name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Email Field (Read-only) */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <Mail className="w-4 h-4 mr-2" />
//               Email Address
//             </label>
//             <input
//               name="email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
//               value={form.email}
//               readOnly
//             />
//             <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//           </div>

//           {/* Phone Field */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <Phone className="w-4 h-4 mr-2" />
//               Phone Number
//             </label>
//             <input
//               name="phone"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               placeholder="Enter your phone number"
//               value={form.phone}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Department Field (Only for Officers) */}
//           {role === "Officer" && (
//             <div className="mb-8">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 <Building2 className="w-4 h-4 mr-2" />
//                 Department
//               </label>
//               <input
//                 name="department"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 placeholder="Enter your department"
//                 value={form.department}
//                 onChange={handleChange}
//               />
//             </div>
//           )}

//           {/* Role Badge */}
//           <div className="mb-8">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <Shield className="w-4 h-4 mr-2" />
//               Role
//             </label>
//             <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <span className="font-semibold text-blue-700 capitalize">{role}</span>
//             </div>
//           </div>

//           {/* Update Button */}
//           <button
//             onClick={updateProfile}
//             disabled={updating}
//             className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
//               updating
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
//             }`}
//           >
//             {updating ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                 <span>Saving...</span>
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 <span>Update Profile</span>
//               </>
//             )}
//           </button>

//           {/* Info Note */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               सार्वजनिक शिकायत पोर्टल • Government of India
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  User, Mail, Phone, Building2, Shield, Save, Loader2, BadgeCheck, Lock
} from "lucide-react";

export default function ProfileForm({ role }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/me");
      setForm(res.data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      await API.put("/auth/update", form);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#002B5B] animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching Credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-slate-200">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center text-[#002B5B] border-4 border-white shadow-xl">
            <User size={40} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white">
            <BadgeCheck size={16} />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight">Account <span className="text-orange-500">Settings</span></h1>
          <p className="text-slate-500 text-sm">Manage your BCRS identity and contact preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input name="name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" value={form.name} onChange={handleChange} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Mail size={14} /> Registered Email
                </label>
                <div className="relative">
                  <input className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed" value={form.email} readOnly />
                  <Lock size={14} className="absolute right-4 top-3.5 text-slate-400" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Phone size={14} /> Contact Number
                </label>
                <input name="phone" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={form.phone} onChange={handleChange} />
              </div>

              {/* Role Display */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Shield size={14} /> Access Level
                </label>
                <div className="w-full bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-sm font-bold text-orange-700 uppercase tracking-wider">
                  {role}
                </div>
              </div>
            </div>

            {role === "Officer" && (
              <div className="mt-6 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Building2 size={14} /> Assigned Department
                </label>
                <input name="department" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={form.department} onChange={handleChange} />
              </div>
            )}

            <button onClick={updateProfile} disabled={updating} className="mt-10 w-full bg-[#002B5B] hover:bg-[#003d82] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-100 active:scale-[0.98] disabled:opacity-50">
              {updating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              UPDATE PROFILE
            </button>
          </div>
        </div>

        {/* Right Column: Information/Security */}
        <div className="space-y-6">
          <div className="bg-[#002B5B] rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-300 mb-4 flex items-center gap-2">
              <Lock size={16} /> Security Note
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Your profile information is linked to your official Government identity. Any changes to the registered mobile number will require re-verification.
            </p>
            <div className="p-3 bg-white/10 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase font-black text-orange-400 mb-1">Last Updated</p>
              <p className="text-xs font-mono">2026-01-14 14:30 IST</p>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50">
             <p className="text-[10px] font-black text-slate-400 uppercase text-center">Bharat Complaint Resolution System• <br />BCRS India</p>
          </div>
        </div>
      </div>
    </div>
  );
}