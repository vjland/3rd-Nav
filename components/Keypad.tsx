import React, { useState, useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Winner } from '../types';

interface KeypadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (winner: Winner, isFourCards: boolean) => void;
  onUndo: () => void;
  canUndo: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ isOpen, onClose, onSubmit, onUndo, canUndo }) => {
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);

  useEffect(() => {
    if (isOpen) setSelectedWinner(null);
  }, [isOpen]);

  const handleSubmit = (isFourCards: boolean) => {
    if (selectedWinner) onSubmit(selectedWinner, isFourCards);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      
      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-zinc-900 border-l border-zinc-800 flex flex-col transition-transform duration-300 transform rounded-none shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Compact Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800 bg-zinc-950">
          <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Manual Input</h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Winner Selection (Side-by-Side Row) */}
        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800">
          <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3 text-center">Winner Outcome</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedWinner(Winner.PLAYER)}
              className={`h-16 flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.PLAYER
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-xs font-black tracking-widest">PLAYER</span>
            </button>
            <button
              onClick={() => setSelectedWinner(Winner.BANKER)}
              className={`h-16 flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.BANKER
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-xs font-black tracking-widest">BANKER</span>
            </button>
          </div>
        </div>

        {/* Simplified Yes/No Row */}
        <div className="p-4 bg-zinc-900 flex flex-col space-y-2 flex-1">
           <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center mb-3">
             4 cards?
           </div>
           
           <div className="grid grid-cols-2 gap-2">
             <button
               onClick={() => handleSubmit(true)}
               disabled={!selectedWinner}
               className={`h-16 flex items-center justify-center transition-all rounded-none uppercase ${
                 selectedWinner
                   ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                   : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
               }`}
             >
               <span className="text-sm font-black tracking-widest">YES</span>
             </button>

             <button
               onClick={() => handleSubmit(false)}
               disabled={!selectedWinner}
               className={`h-16 flex items-center justify-center transition-all rounded-none uppercase ${
                 selectedWinner
                   ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                   : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
               }`}
             >
               <span className="text-sm font-black tracking-widest">NO</span>
             </button>
           </div>
        </div>

        {/* Undo Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
           <button 
             onClick={onUndo}
             disabled={!canUndo}
             className={`w-full h-12 flex items-center justify-center space-x-2 text-xs font-bold transition-colors rounded-none uppercase tracking-widest ${
               canUndo 
                 ? 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700' 
                 : 'text-zinc-700 cursor-not-allowed border border-zinc-800'
             }`}
           >
             <RotateCcw className="w-4 h-4" />
             <span>Undo Last</span>
           </button>
        </div>
      </div>
    </>
  );
};

export default Keypad;