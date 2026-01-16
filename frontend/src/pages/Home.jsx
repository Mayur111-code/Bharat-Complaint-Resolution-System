// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FilePlus, 
//   List, 
//   HelpCircle,
//   AlertTriangle,
//   Clock,
//   CheckCircle
// } from "lucide-react";

// export default function Home() {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-[#003366]">
//           Welcome to SGIMS Portal
//         </h1>
//         <p className="text-gray-700 mt-2 text-lg">
//           Submit, track and manage your public grievances with Government of India
//         </p>
        
//         {/* Indian Flag Stripes */}
//         <div className="flex items-center mt-4">
//           <div className="h-2 flex-1 rounded-full overflow-hidden flex">
//             <div className="flex-1 bg-[#FF9933]"></div>
//             <div className="flex-1 bg-white"></div>
//             <div className="flex-1 bg-[#138808]"></div>
//           </div>
//           <span className="ml-3 text-sm text-gray-600 font-medium">सार्वजनिक शिकायत पोर्टल</span>
//         </div>
//       </div>

//       {/* Main Action Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <div
//           className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
//           onClick={() => navigate("/complaint/new")}

          
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
//               <FilePlus className="w-10 h-10 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700">
//               Submit Complaint
//             </h3>
//             <p className="text-gray-600 mb-4">Raise new public issue or grievance</p>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
//               Start Now
//             </button>
//           </div>
//         </div>

//         <div
//           className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
//           onClick={() => navigate("/my-complaints")}
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
//               <List className="w-10 h-10 text-green-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700">
//               My Complaints
//             </h3>
//             <p className="text-gray-600 mb-4">Track and manage your complaints</p>
//             <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
//               View All
//             </button>
//           </div>
//         </div>

//         <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
//          onClick={() => navigate("/support")}
//         >
//           <div className="flex flex-col items-center text-center">
//             <div className="p-4 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
//               <HelpCircle className="w-10 h-10 text-orange-600" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700">
//               Support
//             </h3>
//             <p className="text-gray-600 mb-4">Need help? Contact support team</p>
//             <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
//               Get Help
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Info Section */}
//       <div className="mt-12 bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-xl p-6 shadow-lg">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0 md:mr-6">
//             <h3 className="text-xl font-bold mb-2">24/7 Government Support</h3>
//             <p className="text-blue-200">
//               Your complaints are handled with priority by concerned government departments
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold">1800-11-7000</div>
//               <div className="text-sm text-blue-200">Helpline</div>
//             </div>
//             <div className="h-10 w-px bg-white/30"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold">24-48 Hrs</div>
//               <div className="text-sm text-blue-200">Initial Response</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Note */}
//       <div className="mt-8 text-center">
//         <p className="text-sm text-gray-500">
//           सार्वजनिक शिकायत पोर्टल • Government of India • Secure & Confidential
//         </p>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FilePlus, 
  List, 
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name") || "Citizen";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Banner / Hero Section */}
      <div className="bg-[#002B5B] text-white pt-12 pb-24 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheck className="text-orange-400 w-6 h-6" />
                <span className="text-xs font-bold tracking-widest uppercase text-blue-200">Official Redressal Portal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                Jai Hind, <span className="text-orange-400">{userName}</span>
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl font-light">
                Submit, track and manage your public grievances directly with the concerned Government departments through the <span className="font-bold">BCRS Portal</span>.
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-bold">System Status</p>
                <p className="text-lg font-bold text-green-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Active
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-blue-200 uppercase font-bold">Avg. Response</p>
                <p className="text-lg font-bold">24-48 Hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-12">
        
        {/* Primary Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: New Complaint */}
          <div 
            onClick={() => navigate("/complaint/new")}
            className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer hover:border-blue-500 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <FilePlus className="text-blue-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">New Grievance</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Facing an issue? Submit a detailed complaint to the relevant department.
            </p>
            <div className="flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
              <span>Raise Issue</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>

          {/* Action 2: Track Status */}
          <div 
            onClick={() => navigate("/my-complaints")}
            className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer hover:border-green-500 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <List className="text-green-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Track Complaints</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Monitor the real-time progress of your submitted grievances and feedback.
            </p>
            <div className="flex items-center text-green-600 font-bold text-sm group-hover:gap-2 transition-all">
              <span>View Dashboard</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>

          {/* Action 3: Support */}
          <div 
            onClick={() => navigate("/support")}
            className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer hover:border-orange-500 transition-all duration-300 hover:shadow-2xl"
          >
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors duration-300">
              <HelpCircle className="text-orange-600 group-hover:text-white transition-colors" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Help & Support</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Browse FAQs or contact our technical team for portal-related assistance.
            </p>
            <div className="flex items-center text-orange-600 font-bold text-sm group-hover:gap-2 transition-all">
              <span>Contact Desk</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>

        {/* Support & Helpline Section */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 flex-1">
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                Support Helpline
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">Need immediate help?</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our dedicated support officers are available 24/7 to guide you through the complaint submission process. Your trust is our priority.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                  <PhoneCall size={20} className="text-blue-600" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Toll Free</p>
                    <p className="text-lg font-bold text-slate-800">1800-11-7000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                  <Clock size={20} className="text-blue-600" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Availability</p>
                    <p className="text-lg font-bold text-slate-800">24 / 7 Service</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 w-full md:w-1/3 p-8 flex flex-col justify-center items-center border-l border-slate-100">
               <div className="space-y-4 w-full">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 shrink-0" size={18} />
                    <span className="text-sm font-medium text-slate-700">ISO Certified Processes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 shrink-0" size={18} />
                    <span className="text-sm font-medium text-slate-700">End-to-End Encryption</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 shrink-0" size={18} />
                    <span className="text-sm font-medium text-slate-700">Direct Officer Escalation</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8">
          <div className="flex justify-center space-x-1 mb-3">
            <div className="h-1 w-8 bg-[#FF9933]"></div>
            <div className="h-1 w-8 bg-[#FFFFFF] border border-slate-200"></div>
            <div className="h-1 w-8 bg-[#138808]"></div>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Bharat Complaint Resolution System • 2026
          </p>
          <p className="text-xs text-slate-500 mt-2">
            This is an official government portal. Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}