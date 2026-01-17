import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  RefreshCw, 
  Search, 
  PlusCircle, 
  LayoutDashboard, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import StatsSummary from "../components/StatsSummary";
import ComplaintGrid from "../components/ComplaintGrid";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get("/complaints/user/me/list");
      setComplaints(res.data);
    } catch (error) {
      toast.error("Unable to sync with BCRS servers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleComplaintClick = (complaintId) => {
    navigate(`/complaint/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Dashboard Header */}
      <div className="bg-[#002B5B] text-white pt-10 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2 text-blue-200">
              <LayoutDashboard size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Citizen Workspace</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Personal Grievance <span className="text-orange-400">Ledger</span></h1>
            <p className="text-blue-100/70 text-sm mt-1">Audit and track the lifecycle of your filed complaints.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchComplaints}
              disabled={loading}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 rounded-xl font-bold text-sm transition-all backdrop-blur-md"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? "Syncing..." : "Sync Ledger"}</span>
            </button>
            <button
              onClick={() => navigate("/complaint/new")}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 transition-all active:scale-95"
            >
              <PlusCircle size={18} />
              <span>New Filing</span>
            </button>
          </div>
        </div>
        
        {/* Tricolor Accent Stripe */}
        <div className="absolute bottom-0 left-0 w-full flex h-1.5">
           <div className="flex-1 bg-[#FF9933]"></div>
           <div className="flex-1 bg-white"></div>
           <div className="flex-1 bg-[#138808]"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        {/* Stats Section */}
        {!loading && complaints.length > 0 && (
          <div className="mb-8">
            <StatsSummary complaints={complaints} />
          </div>
        )}

        {/* Content Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <LoadingState message="Connecting to National Database..." />
            </div>
          ) : complaints.length === 0 ? (
            <div className="flex items-center justify-center h-[400px]">
              <EmptyState
                title="No Records Found"
                message="Your grievance ledger is currently empty. Every citizen's voice matters in nation-building."
                button={
                  <button
                    onClick={() => navigate("/complaint/new")}
                    className="flex items-center space-x-2 bg-[#002B5B] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg"
                  >
                    <span>Initiate First Complaint</span>
                    <ChevronRight size={18} />
                  </button>
                }
              />
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                 <h2 className="font-black text-slate-800 flex items-center gap-2">
                   <ShieldCheck className="text-blue-600" size={20} />
                   Active Recordset
                 </h2>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   Status: Verified Logs
                 </div>
              </div>
              
              <ComplaintGrid
                complaints={complaints}
                onComplaintClick={handleComplaintClick}
                viewType="user"
                layout="detailed"
                gridCols="grid-cols-1 lg:grid-cols-2"
              />

              {/* Pagination/Footer Note */}
              <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-medium">
                  Showing <span className="text-slate-900 font-bold">{complaints.length}</span> official entries in your profile.
                </p>
                <div className="flex items-center text-[10px] font-bold text-blue-600/60 uppercase tracking-widest">
                  Secure Data Access Policy • BCRS 2026
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}