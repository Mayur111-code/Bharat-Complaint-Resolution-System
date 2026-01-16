import React from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    ExternalLink,
    ShieldCheck,
    ChevronRight
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#001529] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Column 1: Brand & Logo */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-lg">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                    alt="Emblem"
                                    className="w-8"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-black tracking-tighter">BCRS <span className="text-orange-500">INDIA</span></h3>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Digital Grievance Cell</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Bharat Complaint Resolution System is a unified platform for citizens to voice their concerns directly to the relevant government departments.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-orange-500 transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-orange-500 transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-orange-500 transition-colors"><Instagram size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-orange-400 border-l-4 border-orange-500 pl-3">
                            Quick Navigation
                        </h4>

                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/complaint/new" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    New Complaint
                                </Link>
                            </li>

                            <li>
                                <Link to="/track-complaint" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    Track Status
                                </Link>
                            </li>

                            <li>
                                <Link to="/profile/user" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    User Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="/support" className="text-sm text-slate-400 hover:text-white flex items-center gap-2 group">
                                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-orange-400 border-l-4 border-orange-500 pl-3">Contact Desk</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <Phone className="text-orange-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-slate-400">Toll Free Helpline</p>
                                    <a
                                        href="tel:1800117000"
                                        className="text-sm font-bold hover:text-orange-500 transition-colors"
                                    >
                                        1800-11-7000
                                    </a>
                                </div>

                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="text-orange-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-slate-400">Official Email</p>
                                    <a
                                        href="mailto:support@bcrs.gov.in"
                                        className="text-sm font-bold hover:text-orange-500 transition-colors"
                                    >
                                        support@bcrs.gov.in
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pt-2">
                                <ShieldCheck className="text-green-500 shrink-0" size={20} />
                                <p className="text-xs text-slate-400">Secured with 256-bit SSL Encryption</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Newsletter/Updates */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-orange-400 border-l-4 border-orange-500 pl-3">Stay Updated</h4>
                        <p className="text-xs text-slate-400 mb-4">Get notifications on latest policy updates and system features.</p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter Email Address"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-all"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3 rounded-xl uppercase tracking-widest transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-slate-500">
                        © {currentYear} BCRS INDIA. All Rights Reserved.
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Sitemap</a>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-md border border-white/5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-bold text-slate-400">SERVER: MUM-01</span>
                    </div>
                </div>
            </div>

            {/* Tricolor Accent at the very bottom */}
            <div className="mt-8 flex h-1.5">
                <div className="flex-1 bg-[#FF9933]"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-[#138808]"></div>
            </div>
        </footer>
    );
};

export default Footer;