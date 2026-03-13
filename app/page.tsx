import DataViewer from '@/components/DataViewer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-indigo-100 selection:text-indigo-900">
      <main className="flex min-h-screen flex-col items-center justify-between pb-24">
         <DataViewer />
      </main>
    </div>
  );
}
