import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  ArrowLeft, MapPin, Camera, AlertTriangle, Calendar,
  Clock, Tag, User, CheckCircle, Loader2, Shield,
  FileText, Navigation, ExternalLink, MoreVertical, Search
} from "lucide-react";

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      toast.error("Official record could not be retrieved");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaint(); }, [id]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved': return 'bg-green-500 text-white shadow-green-200';
      case 'pending': return 'bg-orange-500 text-white shadow-orange-200';
      case 'in progress': return 'bg-blue-600 text-white shadow-blue-200';
      default: return 'bg-slate-500 text-white shadow-slate-200';
    }
  };

  const hasLocation = complaint?.location?.coordinates?.length === 2;
  const [lng, lat] = hasLocation ? complaint.location.coordinates : [null, null];

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-[#002B5B] animate-spin mx-auto mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Validating Credentials...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center text-slate-600 hover:text-blue-700 font-bold text-sm transition-colors">
            <ArrowLeft className="mr-2" size={18} /> BACK TO LIST
          </button>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">BCRS Verified Record</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-black uppercase">Ref: {id?.slice(-8)}</span>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-lg ${getStatusStyle(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">{complaint.title}</h1>
            <p className="text-slate-500 flex items-center gap-2 mt-1">
              <User size={14} /> Submitted by {complaint.user?.name || "Citizen"} • <Tag size={14} /> {complaint.category}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"><MoreVertical size={20}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Case Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description Block */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <FileText size={16} /> Incident Description
                </h3>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">{complaint.priority} PRIORITY</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                {complaint.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Filing Date</p>
                  <p className="font-bold text-slate-800">{new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Last Sync</p>
                  <p className="font-bold text-slate-800">{new Date(complaint.updatedAt).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="p-6 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <MapPin size={16} /> Geo-Location (तक्रार ठिकाण)
                </h3>
                {hasLocation && (
                  <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noreferrer" 
                     className="text-blue-600 hover:underline text-xs font-bold flex items-center gap-1">
                    Direct Link <ExternalLink size={12}/>
                  </a>
                )}
              </div>
              <div className="h-[350px] bg-slate-100 relative">
                {hasLocation ? (
                  <iframe
                    title="complaint-map"
                    width="100%" height="100%"
                    src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                    className="filter grayscale-[20%] contrast-[1.1]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Navigation size={48} className="mb-2 opacity-20" />
                    <p className="text-xs font-bold uppercase">Map Data Unavailable</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Progress & Evidence */}
          <div className="space-y-6">
            
            {/* Status Timeline Progress */}
            <div className="bg-[#002B5B] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-8">Resolution Lifecycle</h3>
              
              <div className="space-y-8 relative">
                {/* Visual Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-blue-800"></div>

                {/* Step 1: Submission */}
                <div className="relative flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-[#002B5B] z-10 flex items-center justify-center">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Grievance Filed</p>
                    <p className="text-[10px] text-blue-300 uppercase">Received by Portal</p>
                  </div>
                </div>

                {/* Step 2: Under Review */}
                <div className="relative flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 border-[#002B5B] ${complaint.status !== 'pending' ? 'bg-blue-500' : 'bg-slate-700 animate-pulse'}`}>
                    <Search size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Officer Assigned</p>
                    <p className="text-[10px] text-blue-300 uppercase">Current Stage: Processing</p>
                  </div>
                </div>

                {/* Step 3: Final Resolution */}
                <div className="relative flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full z-10 flex items-center justify-center border-4 border-[#002B5B] ${complaint.status === 'resolved' ? 'bg-green-500' : 'bg-slate-700'}`}>
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400">Case Resolved</p>
                    <p className="text-[10px] text-blue-300 uppercase">Final Documentation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Photos */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Camera size={16} /> Attached Evidence ({complaint.photos?.length || 0})
              </h3>
              {complaint.photos?.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {complaint.photos.map((url, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 hover:scale-105 transition-transform cursor-pointer">
                      <img src={url} alt="Evidence" className="w-full h-full object-cover" onClick={() => window.open(url, '_blank')} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-2xl p-8 text-center border-2 border-dashed border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase italic">No Visual Evidence Provided</p>
                </div>
              )}
            </div>

            {/* Help/Escalation */}
            <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
              <p className="text-[10px] font-black text-orange-800 uppercase mb-2">Notice to Citizen</p>
              <p className="text-xs text-orange-900/70 mb-4 leading-relaxed">If you feel this grievance is not being addressed correctly, you may escalate to the Nodal Officer.</p>
              <button onClick={() => navigate("/support")} className="w-full py-3 bg-white border border-orange-200 rounded-xl text-orange-700 text-xs font-bold hover:bg-orange-100 transition-colors uppercase">
                Escalate Matter
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Bharat Complaint Resolution System • 2026</p>
        </div>
      </div>
    </div>
  );
}