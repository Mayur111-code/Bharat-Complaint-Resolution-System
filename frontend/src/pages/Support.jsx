import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, User, HelpCircle, AlertCircle, Clock, Shield, 
  Phone, Mail, ChevronRight, AlertTriangle, CheckCircle, 
  FileText, MessageSquare, Headphones
} from "lucide-react";

export default function Support() {
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Namaste! 🙏 Welcome to the BCRS Support Assistant. I am here to guide you through the grievance filing process or answer any system-related queries.",
      formatted: true,
      formattedContent: [{ type: 'paragraph', text: "Namaste! 🙏 Welcome to the BCRS Support Assistant. I am here to guide you through the grievance filing process or answer any system-related queries." }]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_KEY = import.meta.env.VITE_KEY;

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const formatAIResponse = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    let formattedContent = [];
    
    lines.forEach(line => {
      if (line.match(/^[A-Z][^:]+:$/) || line.match(/^[0-9]+\./) || line.match(/^[•\-*]/)) {
        formattedContent.push({ type: 'header', text: line });
      } else if (line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().startsWith('•')) {
        formattedContent.push({ type: 'bullet', text: line.trim().substring(1).trim() });
      } else if (line.match(/^\d+\./)) {
        formattedContent.push({ type: 'numbered', text: line });
      } else if (line.toLowerCase().includes('important:') || line.toLowerCase().includes('note:')) {
        formattedContent.push({ type: 'important', text: line });
      } else {
        formattedContent.push({ type: 'paragraph', text: line });
      }
    });
    return formattedContent;
  };

  const sendMessage = async (overrideInput) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: textToSend, formatted: false }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: "You are the official BCRS (Bharat Complaint Resolution System) Assistant. You help citizens file complaints, track status, and understand government grievance protocols. Keep responses professional, structured, and focused on Indian government standards."
            },
            { role: "user", content: textToSend }
          ]
        })
      });

      const data = await res.json();
      const aiReply = data?.choices?.[0]?.message?.content || "Communication link interrupted. Please try again.";
      setMessages((prev) => [...prev, { role: "bot", text: aiReply, formatted: true, formattedContent: formatAIResponse(aiReply) }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Connection Error: BCRS servers are currently unreachable.", formatted: false }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How to file a new complaint?",
    "Tracking my grievance status",
    "Required ID proof/documents",
    "Expected resolution timeline"
  ];

  const renderFormattedMessage = (message) => {
    if (!message.formattedContent) return <p className="text-sm leading-relaxed">{message.text}</p>;

    return (
      <div className="space-y-3">
        {message.formattedContent.map((item, idx) => {
          switch (item.type) {
            case 'header': return <h4 key={idx} className="font-black text-[#002B5B] text-sm uppercase tracking-wider border-b border-blue-50 pb-1">{item.text}</h4>;
            case 'bullet': return <div key={idx} className="flex items-start text-sm text-slate-700"><ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 mr-1 flex-shrink-0" /><span>{item.text}</span></div>;
            case 'numbered': return <div key={idx} className="flex items-start text-sm text-slate-700"><span className="font-black text-blue-600 mr-2">{item.text.match(/^\d+/)?.[0]}.</span><span>{item.text.replace(/^\d+\.\s*/, '')}</span></div>;
            case 'important': return <div key={idx} className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r flex gap-2"><AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" /><span className="text-orange-900 text-xs font-bold leading-relaxed">{item.text}</span></div>;
            default: return <p key={idx} className="text-sm text-slate-700 leading-relaxed">{item.text}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Official Header */}
      <div className="bg-[#002B5B] text-white pt-12 pb-24 px-6 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Headphones className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Support <span className="text-orange-400">Assistant</span></h1>
              <p className="text-blue-100/70 text-sm">Automated Grievance & Technical Help Desk</p>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-4 py-2 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            System Status: Nominal
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex h-1.5"><div className="flex-1 bg-[#FF9933]"></div><div className="flex-1 bg-white"></div><div className="flex-1 bg-[#138808]"></div></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col h-[650px] bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Chat Meta */}
          <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold"><Bot size={20}/></div>
              <div><p className="text-xs font-black text-slate-800 uppercase">BCRS Bot v2.0</p><p className="text-[10px] text-green-600 font-bold uppercase">Ready to Assist</p></div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm border ${msg.role === "user" ? "bg-[#002B5B] text-white rounded-br-none border-blue-900" : "bg-slate-50 border-slate-100 text-slate-800 rounded-bl-none"}`}>
                  {msg.role === "bot" ? renderFormattedMessage(msg) : <p className="text-sm font-medium">{msg.text}</p>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-bl-none flex items-center gap-3">
                  <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div><div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Analyzing Query...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompting Area */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)} className="text-[10px] font-bold uppercase bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">{q}</button>
              ))}
            </div>
            <div className="relative flex items-center gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask about filing, tracking, or system help..." className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-inner" />
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading} className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl transition-all shadow-lg shadow-orange-200 active:scale-95 disabled:opacity-50"><Send size={20}/></button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2"><Phone size={16} /> Direct Assistance</h3>
            <div className="space-y-5">
              <div className="flex gap-4 p-3 bg-blue-50/50 rounded-2xl border border-blue-50">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200"><Phone size={18}/></div>
                <div><p className="text-[10px] font-black text-blue-600 uppercase">Toll-Free</p><p className="font-black text-slate-800 tracking-tight">1800-11-7000</p></div>
              </div>
              <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center shrink-0"><Mail size={18}/></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase">Official Email</p><p className="font-bold text-slate-700 text-sm">support@bcrs.gov.in</p></div>
              </div>
            </div>
          </div>

          <div className="bg-[#002B5B] p-6 rounded-3xl text-white shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4 flex items-center gap-2"><Shield size={16} /> Trust & Privacy</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs"><CheckCircle size={14} className="text-green-400"/> Data 256-bit Encrypted</li>
              <li className="flex items-center gap-3 text-xs"><CheckCircle size={14} className="text-green-400"/> Official Govt. Protocol</li>
              <li className="flex items-center gap-3 text-xs"><CheckCircle size={14} className="text-green-400"/> Privacy Act Compliant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}