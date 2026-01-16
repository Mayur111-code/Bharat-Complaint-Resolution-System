import React from 'react';

const DashboardHeader = ({ icon: Icon, title, subtitle, showFlag = false }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        {Icon && (
          <div className="p-3 bg-blue-100 rounded-xl">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-[#003366]">
            {title}
          </h1>
          <p className="text-gray-600 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      {showFlag && (
        <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
      )}
    </div>
  );
};

export default DashboardHeader;