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