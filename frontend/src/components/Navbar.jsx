import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  FilePlus,
  List,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Building2,
  Settings,
  HelpCircle,
  UserCircle,
  BarChart3,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ------------------ NAVIGATION ITEMS ------------------
  const getNavItems = () => {
    const commonItems = [
      { label: "Home", path: "/", icon: <Home size={18} /> },
    ];

    if (role === "user") {
      return [
        ...commonItems,
        { label: "New Complaint", path: "/complaint/new", icon: <FilePlus size={18} /> },
        { label: "My Complaints", path: "/my-complaints", icon: <List size={18} /> },
        { label: "Track Status", path: "/track-complaint", icon: <Shield size={18} /> },
      ];
    }

    if (role === "department") {
      return [
        { label: "Officer Dashboard", path: "/officer/dashboard", icon: <BarChart3 size={18} /> },
        { label: "Assigned Tasks", path: "/officer/tasks", icon: <List size={18} /> },
      ];
    }

    if (role === "admin") {
      return [
        { label: "Admin Panel", path: "/admin/dashboard", icon: <Shield size={18} /> },
        { label: "User Management", path: "/admin/users", icon: <User size={18} /> },
        { label: "Analytics", path: "/admin/stats", icon: <BarChart3 size={18} /> },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  const profileItems = {
    user: [
      { label: "My Profile", path: "/profile/user", icon: <UserCircle size={16} /> },
      { label: "Settings", path: "/settings", icon: <Settings size={16} /> },
      { label: "Help Center", path: "/support", icon: <HelpCircle size={16} /> },
    ],
    department: [
      { label: "Officer Profile", path: "/profile/officer", icon: <UserCircle size={16} /> },
      { label: "Help Desk", path: "/officer/help", icon: <HelpCircle size={16} /> },
    ],
    admin: [
      { label: "Admin Profile", path: "/profile/admin", icon: <UserCircle size={16} /> },
      { label: "System Settings", path: "/admin/settings", icon: <Settings size={16} /> },
    ],
  };

  const profileMenu = profileItems[role] || [];

  return (
    <nav className="bg-[#002B5B] text-white shadow-xl sticky top-0 z-[100]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2.5">

          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}>
              
            <div className="bg-white p-1.5 rounded-md shadow-inner transition-transform group-hover:scale-105">
              <div className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded">
            
                <img
                  src="/gov.jpg"
                  alt="Government of India Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-extrabold tracking-tighter text-white">
                BCRS <span className="text-orange-400 font-light">INDIA</span>
              </h1>
              <p className="text-[10px] uppercase font-medium text-blue-100 opacity-80 tracking-widest">
                Bharat Complaint Resolution System
              </p>
            </div>

          </div>

          {/* ---------- CENTER NAV ITEMS ---------- */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-white/10 hover:text-orange-300 transition-all duration-200"
              >
                <span className="opacity-70">{item.icon}</span>
                <span className="text-sm font-semibold uppercase tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>

          {/* ---------- RIGHT PROFILE ---------- */}
          <div className="hidden md:block relative">
            <button
              onMouseEnter={() => setIsProfileOpen(true)}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/20 transition-all shadow-sm"
            >
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                {name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium">{name || "User"}</span>
            </button>

            {/* PROFILE MENU DROPDOWN */}
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 bg-white text-slate-800 w-56 rounded-xl shadow-2xl overflow-hidden border border-gray-100 z-[110]"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="p-4 bg-gray-50 border-b">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Signed in as</p>
                  <p className="font-semibold text-blue-900 truncate">{name}</p>
                </div>
                <div className="py-2">
                  {profileMenu.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => { navigate(item.path); setIsProfileOpen(false); }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-blue-50 text-left text-sm transition-colors"
                    >
                      <span className="text-blue-600">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout From System</span>
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden p-2 rounded-md bg-white/10 hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 animate-in slide-in-from-top duration-300">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                  className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-white/10 text-sm font-medium"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 mt-4 pt-4">
              <p className="text-[10px] text-gray-400 uppercase px-4 mb-2 tracking-widest font-bold">User Account</p>
              {profileMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                  className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-white/10 text-sm"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={logout}
                className="w-full flex items-center space-x-4 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg mt-4 font-bold"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NATIONAL TRICOLOR ACCENT */}
      <div className="h-1 flex opacity-90">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
    </nav>
  );
}