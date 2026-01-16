import React from 'react';
import { Settings, Construction, Hammer, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrackComplaint = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
            <Construction className="w-12 h-12 text-orange-600" />
          </div>
          
          {/* Rotating Cog Gears */}
          <Settings 
            className="absolute top-0 right-1/3 w-8 h-8 text-[#002B5B] animate-spin" 
            style={{ animationDuration: '3s' }} 
          />
          <Settings 
            className="absolute bottom-2 left-1/3 w-6 h-6 text-slate-400 animate-spin" 
            style={{ animationDuration: '5s', animationDirection: 'reverse' }} 
          />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-black text-[#002B5B] uppercase tracking-tight mb-3">
          Feature Under <span className="text-orange-500">Development</span>
        </h2>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
        We are currently building the "Live Tracking" module to provide you with real-time updates on your grievances. This feature will be live soon!
        </p>

        {/* Status Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <Hammer size={14} className="text-blue-600" />
            <span className="text-[10px] font-bold text-blue-700 uppercase">Coding in Progress</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
            <Clock size={14} className="text-green-600" />
            <span className="text-[10px] font-bold text-green-700 uppercase">Coming Soon</span>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center justify-center gap-2 mx-auto text-[#002B5B] font-bold text-sm hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          GO BACK TO DASHBOARD
        </button>

        {/* Progress Bar Mockup */}
        <div className="mt-12 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-[65%] animate-shimmer"></div>
        </div>
        <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Development Progress: 65%
        </p>
      </div>
    </div>
  );
};

export default TrackComplaint;