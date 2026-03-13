import React from 'react';
import type { Patient } from '@/app/api/data/route';
import { Mail, Phone, MapPin, UserCircle2 } from 'lucide-react';

export const RowView = ({ data }: { data: Patient[] }) => {
  if (!data?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 rounded-tl-2xl">ID</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Medical Issue</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {data.map((patient, i) => (
              <tr 
                key={patient.patient_id} 
                className={`hover:bg-slate-50/80 transition-colors group ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}
              >
                <td className="px-6 py-4 font-mono text-slate-500">#{patient.patient_id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {patient.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={patient.photo_url} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patient_name)}&background=random`;
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <UserCircle2 size={24} />
                      </div>
                    )}
                    <span className="font-bold text-slate-900">{patient.patient_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700">
                    {patient.age}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold ring-1 ring-indigo-200/50">
                    {patient.medical_issue.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {patient.contact[0]?.email && (
                      <a href={`mailto:${patient.contact[0].email}`} className="text-slate-400 hover:text-indigo-600 transition-colors" title={patient.contact[0].email}>
                        <Mail size={16} />
                      </a>
                    )}
                    {patient.contact[0]?.number && (
                      <a href={`tel:${patient.contact[0].number}`} className="text-slate-400 hover:text-indigo-600 transition-colors" title={patient.contact[0].number}>
                        <Phone size={16} />
                      </a>
                    )}
                    {patient.contact[0]?.address && (
                      <span className="text-slate-400 cursor-help" title={patient.contact[0].address}>
                        <MapPin size={16} />
                      </span>
                    )}
                    {patient.contact.length === 0 && <span className="text-slate-400">-</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
