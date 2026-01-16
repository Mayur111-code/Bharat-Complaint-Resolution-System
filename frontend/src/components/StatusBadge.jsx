import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in progress':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'rejected':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

export default StatusBadge;