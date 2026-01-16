// import { useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";
// import { 
//   Camera, 
//   MapPin, 
//   AlertTriangle,
//   FileText,
//   Loader2,
//   Upload,
//   Tag,
//   Clock
// } from "lucide-react";

// export default function ComplaintForm() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     priority: "",
//     photos: [],
//     location: { type: "Point", coordinates: [] }
//   });

//   const [loading, setLoading] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     setForm({
//       ...form,
//       photos: files
//     });
//   };

//   const detectLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Location access not supported");
//       return;
//     }

//     setLocationLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm({
//           ...form,
//           location: {
//             type: "Point",
//             coordinates: [longitude, latitude]
//           }
//         });
//         toast.success("Location captured successfully!");
//         setLocationLoading(false);
//       },
//       (error) => {
//         toast.error("Failed to get location. Please enable location services.");
//         setLocationLoading(false);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = new FormData();
//       data.append("title", form.title);
//       data.append("description", form.description);
//       data.append("category", form.category);
//       data.append("priority", form.priority);
//       data.append("location", JSON.stringify(form.location));

//       form.photos.forEach((file) => {
//         data.append("photos", file);
//       });

//       const res = await API.post("/complaints", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       toast.success("Complaint submitted successfully!");

//       setTimeout(() => {
//         window.location.href = "/my-complaints";
//       }, 1200);

//     } catch (error) {
//       toast.error("Failed to submit complaint");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-[#003366]">
//             Submit Complaint
//           </h1>
//           <p className="text-gray-600 mt-2">
//             File a public grievance with Government of India
//           </p>
//           <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto mt-3 rounded-full"></div>
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8"
//         >
//           {/* Title Field */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//               <FileText className="w-4 h-4 mr-2" />
//               Complaint Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter complaint title (e.g., No Electricity)"
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             />
//           </div>

//           {/* Description Field */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//               <FileText className="w-4 h-4 mr-2" />
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Describe your issue in detail"
//               onChange={handleChange}
//               rows="4"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
//               required
//             ></textarea>
//           </div>

//           {/* Category and Priority Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Category */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                 <Tag className="w-4 h-4 mr-2" />
//                 Category
//               </label>
//               <select
//                 name="category"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 required
//               >
//                 <option value="">Select category</option>
//                 <option value="Electricity">Electricity</option>
//                 <option value="Water">Water Supply</option>
//                 <option value="Road">Road & Transport</option>
//                 <option value="Drainage">Drainage</option>
//                 <option value="Sanitation">Sanitation</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Priority */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                 <AlertTriangle className="w-4 h-4 mr-2" />
//                 Priority Level
//               </label>
//               <select
//                 name="priority"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 required
//               >
//                 <option value="">Select priority</option>
//                 <option value="Low" className="text-green-600">Low</option>
//                 <option value="Medium" className="text-yellow-600">Medium</option>
//                 <option value="High" className="text-red-600">High</option>
//               </select>
//             </div>
//           </div>

//           {/* Photo Upload */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//               <Camera className="w-4 h-4 mr-2" />
//               Upload Photos (Optional)
//             </label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//               <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors inline-block"
//               >
//                 Choose Files
//               </label>
//               <p className="text-sm text-gray-500 mt-2">
//                 {form.photos.length > 0 
//                   ? `${form.photos.length} file(s) selected` 
//                   : "Upload images of the issue (Max 5 files)"}
//               </p>
//             </div>
//           </div>

//           {/* Location Capture */}
//           <div className="mb-8">
//             <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//               <MapPin className="w-4 h-4 mr-2" />
//               Location
//             </label>
//             <button
//               type="button"
//               onClick={detectLocation}
//               disabled={locationLoading}
//               className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
//                 locationLoading
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
//               }`}
//             >
//               {locationLoading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span>Capturing Location...</span>
//                 </>
//               ) : (
//                 <>
//                   <MapPin className="w-5 h-5" />
//                   <span>Capture Current Location</span>
//                 </>
//               )}
//             </button>
//             {form.location.coordinates.length > 0 && (
//               <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
//                 ✓ Location captured successfully
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             disabled={loading}
//             type="submit"
//             className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
//               loading
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 <span>Submitting...</span>
//               </>
//             ) : (
//               <>
//                 <FileText className="w-5 h-5" />
//                 <span>Submit Complaint</span>
//               </>
//             )}
//           </button>

//           {/* Help Text */}
//           <div className="mt-6 text-center text-sm text-gray-500">
//             <Clock className="w-4 h-4 inline-block mr-1" />
//             Your complaint will be reviewed within 24-48 hours
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }










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

      await API.post("/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

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