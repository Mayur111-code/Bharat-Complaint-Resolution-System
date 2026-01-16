import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow border">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingState;