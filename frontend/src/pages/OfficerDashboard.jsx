import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { FileText } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ComplaintGrid from "../components/ComplaintGrid";

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAssignedComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get("/officer/complaints");
      setComplaints(res.data);
    } catch {
      toast.error("Failed to load assigned complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  const handleComplaintClick = (complaintId) => {
    navigate(`/officer/complaint/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader
          title="Officer Dashboard"
          subtitle="Manage assigned complaints and track resolution progress"
          showFlag={true}
        />

        {loading ? (
          <LoadingState message="Loading assigned complaints..." />
        ) : complaints.length === 0 ? (
          <EmptyState
            title="No complaints assigned"
            message="You haven't been assigned any complaints yet."
          />
        ) : (
          <ComplaintGrid
            complaints={complaints}
            onComplaintClick={handleComplaintClick}
            viewType="officer"
          />
        )}

        {/* Footer Note */}
        {complaints.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} • Officer Dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
}