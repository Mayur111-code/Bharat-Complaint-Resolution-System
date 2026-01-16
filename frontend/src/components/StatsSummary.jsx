import React from 'react';

const StatsSummary = ({ complaints }) => {
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status?.toLowerCase() === 'resolved').length;
  const pending = complaints.filter(c => c.status?.toLowerCase() === 'pending').length;
  const inProgress = complaints.filter(c => c.status?.toLowerCase() === 'in progress').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500">
        <p className="text-sm text-gray-600">Total</p>
        <p className="text-2xl font-bold text-gray-800">{total}</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
        <p className="text-sm text-gray-600">Resolved</p>
        <p className="text-2xl font-bold text-gray-800">{resolved}</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 border-l-4 border-yellow-500">
        <p className="text-sm text-gray-600">Pending</p>
        <p className="text-2xl font-bold text-gray-800">{pending}</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-400">
        <p className="text-sm text-gray-600">In Progress</p>
        <p className="text-2xl font-bold text-gray-800">{inProgress}</p>
      </div>
    </div>
  );
};

export default StatsSummary;