import React from 'react';
import { FileText } from 'lucide-react';

const EmptyState = ({ title = "No complaints found", message = "There are no complaints to display.", button }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 mb-6">
        {message}
      </p>
      {button}
    </div>
  );
};

export default EmptyState;