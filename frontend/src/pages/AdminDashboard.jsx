import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { Shield } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ComplaintGrid from "../components/ComplaintGrid";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/complaints");
      setComplaints(res.data);
    } catch {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleComplaintClick = (complaintId) => {
    navigate(`/admin/complaint/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader
          icon={Shield}
          title="Admin Dashboard"
          subtitle="Manage all complaints and system administration"
          showFlag={true}
        />

        {loading ? (
          <LoadingState message="Loading all complaints..." />
        ) : complaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            message="There are no complaints in the system yet."
          />
        ) : (
          <ComplaintGrid
            complaints={complaints}
            onComplaintClick={handleComplaintClick}
            viewType="admin"
          />
        )}

        {/* Footer Note */}
        {complaints.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} • Admin Portal
            </p>
          </div>
        )}
      </div>
    </div>
  );
}