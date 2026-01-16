// import React from 'react';
// import ComplaintCard from './ComplaintCard';

// const ComplaintGrid = ({ complaints, onComplaintClick, viewType = 'user', layout = 'default', gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' }) => {
//   return (
//     <div className={`grid ${gridCols} gap-6`}>
//       {complaints.map((complaint) => (
//         <ComplaintCard
//           key={complaint._id}
//           complaint={complaint}
//           onClick={() => onComplaintClick(complaint._id)}
//           viewType={viewType}
//           layout={layout}
//         />
//       ))}
//     </div>
//   );
// };

// export default ComplaintGrid;



import React from 'react';
import ComplaintCard from './ComplaintCard';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintGrid = ({ 
  complaints, 
  onComplaintClick, 
  viewType = 'user', 
  layout = 'default', 
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
}) => {
  const navigate = useNavigate();

  // Handle Empty State
  if (!complaints || complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
          <ClipboardList size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#002B5B]">No Grievances Found</h3>
        <p className="text-slate-500 text-sm text-center max-w-xs mt-1 mb-6">
          {viewType === 'admin' 
            ? "There are currently no complaints assigned to this department." 
            : "You haven't filed any complaints yet. Your filed grievances will appear here."}
        </p>
        
        {viewType === 'user' && (
          <button 
            onClick={() => navigate('/new-complaint')}
            className="flex items-center gap-2 bg-[#002B5B] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-900 transition-all shadow-lg shadow-blue-100"
          >
            <PlusCircle size={18} />
            FILE NEW COMPLAINT
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Grid Header Info (Optional) */}
      <div className="flex items-center justify-between mb-2 px-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Showing {complaints.length} Records
        </span>
      </div>

      <div className={`grid ${gridCols} gap-6 auto-rows-fr`}>
        {complaints.map((complaint) => (
          <div 
            key={complaint._id} 
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <ComplaintCard
              complaint={complaint}
              onClick={() => onComplaintClick(complaint._id)}
              viewType={viewType}
              layout={layout}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintGrid;