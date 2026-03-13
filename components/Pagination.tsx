import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // how many pages to show beside current
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (l !== undefined) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 font-medium">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm ${
          currentPage === 1 
            ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100' 
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((pageNum, idx) => (
        <React.Fragment key={idx}>
          {pageNum === '...' ? (
            <div className="w-10 h-10 flex items-center justify-center text-slate-400">
              <MoreHorizontal size={18} />
            </div>
          ) : (
            <button
              onClick={() => onPageChange(pageNum as number)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm border ${
                currentPage === pageNum
                  ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {pageNum}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm ${
          currentPage === totalPages 
            ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100' 
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
