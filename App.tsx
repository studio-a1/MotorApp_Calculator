import React from 'react';
import Calculator from './components/Calculator';

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-9 sm:w-9 mr-3 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.5a1.5 1.5 0 0 1-3 0m-8 0a1.5 1.5 0 0 1-3 0"></path>
        <path d="M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"></path>
        <path d="M2 12h20"></path>
        <path d="M5 18.5h8"></path>
    </svg>
);


function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-950 to-slate-900 p-4 sm:p-6 md:p-8"
    >
      <header className="max-w-5xl mx-auto mb-8 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center">
          <CarIcon />
          MotorApp_Calculator
        </h1>
        <p className="text-slate-400">
          Sua ferramenta para calcular a viabilidade de viagens, corridas, entregas e rolézinhos em geral.
        </p>
      </header>
      <main className="max-w-5xl mx-auto">
        <Calculator />
      </main>
    </div>
  );
}

export default App;
