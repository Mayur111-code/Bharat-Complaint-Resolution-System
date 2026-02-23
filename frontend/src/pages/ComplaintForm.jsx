import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  Camera, 
  MapPin, 
  AlertTriangle,
  FileText,
  Loader2,
  Upload,
  Tag,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle
} from "lucide-react";

export default function ComplaintForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    photos: [],
    location: { type: "Point", coordinates: [] }
  });

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.warning("Maximum 5 photos allowed");
      return;
    }
    setForm({ ...form, photos: files });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm({
          ...form,
          location: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        });
        toast.success("Geo-coordinates captured!");
        setLocationLoading(false);
      },
      (error) => {
        toast.error("Please enable GPS/Location services.");
        setLocationLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.location.coordinates.length === 0) {
      toast.error("Please capture the incident location");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("priority", form.priority);
      data.append("location", JSON.stringify(form.location));

      form.photos.forEach((file) => {
        data.append("photos", file);
      });

      // await API.post("/complaints", data, {
      //   headers: { "Content-Type": "multipart/form-data" }
      // });


      await API.post("/complaints", data);

      toast.success("Grievance filed successfully!");
      setTimeout(() => navigate("/my-complaints"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Mini Header */}
      <div className="bg-[#002B5B] text-white py-10 px-6 mb-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">File New Grievance</h1>
            <p className="text-blue-200 text-sm mt-1 flex items-center">
              <ShieldCheck size={14} className="mr-1" /> BCRS Secure Submission
            </p>
          </div>
          <div className="hidden md:flex space-x-2">
             <div className="w-8 h-1 bg-orange-400 rounded-full"></div>
             <div className="w-8 h-1 bg-white rounded-full"></div>
             <div className="w-8 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        >
          {/* Form Content */}
          <div className="p-6 md:p-10 space-y-8">
            
            {/* Step 1: Basic Info */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Incident Details</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Subject / Title</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Broken Water Pipeline near Main Square"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm"
                    />
                    <FileText className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Detailed Description</label>
                  <textarea
                    name="description"
                    placeholder="Provide specific details to help officers understand the situation..."
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm resize-none"
                    required
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Step 2: Classification */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Classification</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Department/Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl appearance-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select Category</option>
                      <option value="Electricity">Power & Electricity</option>
                      <option value="Water">Water Supply & Sewage</option>
                      <option value="Road">Roads & Infrastructure</option>
                      <option value="Sanitation">Public Health & Sanitation</option>
                      <option value="Other">Miscellaneous</option>
                    </select>
                    <Tag className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Severity / Priority</label>
                  <div className="relative">
                    <select
                      name="priority"
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-xl appearance-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low - General Request</option>
                      <option value="Medium">Medium - Affecting Locality</option>
                      <option value="High">High - Emergency / Dangerous</option>
                    </select>
                    <AlertTriangle className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Evidence & Location */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Evidence & Geo-Tagging</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* File Upload */}
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all"
                  >
                    <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover:text-blue-600" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Attach Photos</span>
                    <span className="text-[10px] text-slate-400 mt-1">{form.photos.length > 0 ? `${form.photos.length} files selected` : "Max 5 images"}</span>
                  </label>
                </div>

                {/* Geo-location */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locationLoading}
                    className={`flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 transition-all ${
                      form.location.coordinates.length > 0
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-400"
                    }`}
                  >
                    {locationLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    ) : form.location.coordinates.length > 0 ? (
                      <CheckCircle size={24} className="mb-2" />
                    ) : (
                      <MapPin size={24} className="mb-2" />
                    )}
                    <span className="text-[11px] font-bold uppercase">
                      {form.location.coordinates.length > 0 ? "Location Verified" : "Tag Location"}
                    </span>
                    <span className="text-[10px] mt-1 opacity-70">Requires GPS Permission</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Form Action Footer */}
          <div className="bg-slate-50 px-6 py-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-slate-500 text-xs italic">
              <Clock size={14} className="mr-2" />
              Initial review expected by {new Date(Date.now() + 172800000).toLocaleDateString()}
            </div>
            
            <button
              disabled={loading}
              type="submit"
              className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 transition-all ${
                loading 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-[#002B5B] hover:bg-blue-900 active:scale-95"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>File Grievance Now</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em]">
          Official Bharat Complaint Resolution System • Section 44(A) Compliant
        </p>
      </div>
    </div>
  );
}