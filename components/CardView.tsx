import React from 'react';
import type { Patient } from '@/app/api/data/route';
import { Mail, Phone, MapPin, UserSquare2, Activity } from 'lucide-react';

export const CardView = ({ data }: { data: Patient[] }) => {
  if (!data?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500 ease-out">
      {data.map((patient) => (
        <div 
          key={patient.patient_id} 
          className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col"
        >
          {/* Header area */}
          <div className="p-5 flex items-start gap-4 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50 group-hover:bg-indigo-100 transition-colors"></div>
            
            <div className="flex-shrink-0 relative">
              {patient.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={patient.photo_url} 
                  alt={patient.patient_name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-transparent group-hover:ring-indigo-100 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patient_name)}&background=random`;
                  }}
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 shadow-inner">
                  <UserSquare2 size={24} />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                 <div className="bg-emerald-500 w-3 h-3 rounded-full border-2 border-white"></div>
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-900 truncate tracking-tight">{patient.patient_name}</h3>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                Age: <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{patient.age}</span>
              </p>
            </div>
          </div>
          
          {/* Detailed area */}
          <div className="p-5 flex-1 flex flex-col gap-4">
            {/* Medical Issue Badge */}
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Medical Issue</span>
            </div>
            <div className="inline-flex">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full ring-1 ring-indigo-200">
                {patient.medical_issue.replace(/_/g, ' ')}
              </span>
            </div>
            
            <div className="w-full h-px bg-slate-100 my-1"></div>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-3 mt-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Contact Details</span>
              {patient.contact.map((contact, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                  {contact.email && (
                    <div className="flex items-center gap-3 text-sm text-slate-600 group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/item:bg-indigo-50 transition-colors">
                        <Mail size={14} className="text-slate-400 group-hover/item:text-indigo-500" />
                      </div>
                      <span className="truncate" title={contact.email}>{contact.email}</span>
                    </div>
                  )}
                  {contact.number && (
                    <div className="flex items-center gap-3 text-sm text-slate-600 group/item">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/item:bg-indigo-50 transition-colors">
                        <Phone size={14} className="text-slate-400 group-hover/item:text-indigo-500" />
                      </div>
                      <span>{contact.number}</span>
                    </div>
                  )}
                  {contact.address && (
                    <div className="flex items-start gap-3 text-sm text-slate-600 group/item">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-indigo-50 transition-colors">
                        <MapPin size={14} className="text-slate-400 group-hover/item:text-indigo-500" />
                      </div>
                      <span className="leading-relaxed truncate">{contact.address}</span>
                    </div>
                  )}
                </div>
              ))}
              {patient.contact.length === 0 && (
                 <p className="text-sm text-slate-400 italic">No contact details</p>
              )}
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};
