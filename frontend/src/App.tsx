import React from 'react';
import { SEOMeta } from './seo/SEOMeta';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
      <SEOMeta 
        title="The Consistent Coders" 
        description="A platform for consistent developers to grow and build together."
      />
      <header className="text-center p-8 bg-white shadow-xl rounded-2xl max-w-2xl w-full border border-slate-100">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          The Consistent Coders
        </h1>
        <p className="text-lg text-slate-600 mb-8 font-medium">
          MERN stack application boilerplate with Tailwind CSS, Vite, and TypeScript.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-200">
            Get Started
          </button>
          <button className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition">
            Learn More
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
