import React from 'react';
import { FileText, Users, Eye, Tag, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ComplaintCard = ({ complaint, onClick, viewType = 'user', layout = 'default' }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderMetaInfo = () => {
    switch (viewType) {
      case 'admin':
        return (
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>User: {complaint.user?.name || "Anonymous"}</span>
          </div>
        );
      case 'officer':
        return (
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>User: {complaint.user?.name || "Anonymous"}</span>
          </div>
        );
      default: // user view
        if (layout === 'detailed') {
          return (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-gray-100 rounded">
                  <Tag className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-700">{complaint.category}</span>
              </div>
              <div className={`flex items-center justify-center space-x-1 px-3 py-1 rounded-full border ${getPriorityColor(complaint.priority)}`}>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="text-sm font-medium capitalize">{complaint.priority} Priority</span>
              </div>
            </div>
          );
        }
        return null;
    }
  };

  const renderFooter = () => {
    switch (viewType) {
      case 'admin':
        return (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              ID: {complaint._id?.slice(-6)}
            </span>
            <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>Admin View</span>
            </div>
          </div>
        );
      case 'officer':
        return (
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              ID: {complaint._id?.slice(-6)}
            </span>
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>Officer View</span>
            </div>
          </div>
        );
      default: // user view
        if (layout === 'detailed') {
          return (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                {complaint.location?.coordinates?.length > 0 && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </div>
            </div>
          );
        }
    }
  };

  if (layout === 'detailed') {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 line-clamp-1">
                {complaint.title}
              </h2>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {complaint.description}
          </p>

          {renderMetaInfo()}

          {renderFooter()}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
    >
      <div className="p-5">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={complaint.status} />
          {complaint.priority === "High" && (
            <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              High Priority
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
          {complaint.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {complaint.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-500">
              <FileText className="w-4 h-4" />
              <span>{complaint.category}</span>
            </div>
            <span className="text-gray-500">
              {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
          </div>

          {renderMetaInfo()}
        </div>

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>
  );
};

export default ComplaintCard;