'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Patient } from '@/app/api/data/route';
import { CardView } from './CardView';
import { RowView } from './RowView';
import { FilterBar } from './FilterBar';
import { Pagination } from './Pagination';
import { LayoutGrid, List } from 'lucide-react';

export default function DataViewer() {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for fetching parameters
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState('');
  const [filterIssues, setFilterIssues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('patient_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Additional state
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [viewMode, setViewMode] = useState<'card' | 'row'>('card');
  
  // Unique issues for filter dropdown extracted mostly from mock data
  const availableIssues = [
    'fever', 'headache', 'sore throat', 'sprained ankle', 'rash',
    'ear infection', 'sinusitis', 'allergic reaction', 'stomach ache', 'broken arm'
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      
      if (filterIssues.length > 0) {
        params.append('filter_issues', filterIssues.join(','));
      }
      
      const response = await fetch(`/api/data?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const result = await response.json();
      
      if (result.error) {
         throw new Error(result.error);
      }
      
      setData(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotalItems(result.pagination.total);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, filterIssues, sortBy, sortOrder]);

  // Debounced Search via useEffect (or could use a ref timer inside handleSearch)
  useEffect(() => {
    const timer = setTimeout(() => {
       fetchData();
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [fetchData]);
  
  // Handlers
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 mt-1">Manage and view patient records</p>
        </div>
        
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${viewMode === 'card' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutGrid size={16} /> Cards
          </button>
          <button 
            onClick={() => setViewMode('row')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${viewMode === 'row' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <List size={16} /> Table
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 sticky top-4 z-10 transition-all">
        <FilterBar 
          search={search}
          setSearch={(v) => { setSearch(v); setPage(1); }}
          sortBy={sortBy}
          setSortBy={(v) => { setSortBy(v); setPage(1); }}
          sortOrder={sortOrder}
          setSortOrder={(v) => { setSortOrder(v); setPage(1); }}
          filterIssues={filterIssues}
          setFilterIssues={(v) => { setFilterIssues(v); setPage(1); }}
          availableIssues={availableIssues}
        />
      </div>

      {loading && data.length === 0 ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 text-center flex flex-col items-center gap-3">
           <p className="font-semibold text-lg">{error}</p>
           <button onClick={fetchData} className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors font-medium">Retry</button>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-slate-50 min-h-[400px] rounded-2xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-500 p-8 text-center">
          <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No patients found</h3>
          <p className="max-w-md">We couldn't find any patients matching your current filters. Try adjusting your search or clearing your filters.</p>
          <button 
            onClick={() => { setSearch(''); setFilterIssues([]); setPage(1); }}
            className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-medium shadow-sm hover:shadow"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm font-medium text-slate-500">
            Showing <span className="text-slate-900">{data.length}</span> of <span className="text-slate-900">{totalItems}</span> results
          </div>
          
          <div className={`transition-all duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {viewMode === 'card' ? (
              <CardView data={data} />
            ) : (
              <RowView data={data} />
            )}
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-10">
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
