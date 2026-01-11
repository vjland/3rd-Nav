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
      {/* Backdrop - Removed blur and lightened background */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      
      {/* Side Panel - Increased width from w-32 to w-48 (50% increase) */}
      <div 
        className={`fixed top-16 right-0 z-50 h-fit w-48 bg-zinc-900 border-l border-b border-zinc-800 flex flex-col transition-transform duration-300 transform rounded-none shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Only Close Button */}
        <div className="flex justify-end items-center px-2 py-1 border-b border-zinc-800 bg-zinc-950">
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 flex flex-col space-y-2">
          {/* Winner Selection - Increased Width via panel container */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setSelectedWinner(Winner.PLAYER)}
              className={`h-14 w-full flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.PLAYER
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-[10px] font-black tracking-tighter">P</span>
            </button>
            <button
              onClick={() => setSelectedWinner(Winner.BANKER)}
              className={`h-14 w-full flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.BANKER
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-[10px] font-black tracking-tighter">B</span>
            </button>
          </div>

          {/* YES/NO Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => handleSubmit(true)}
              disabled={!selectedWinner}
              className={`h-14 w-full flex items-center justify-center transition-all rounded-none uppercase ${
                selectedWinner
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <span className="text-[10px] font-black tracking-widest">YES</span>
            </button>

            <button
              onClick={() => handleSubmit(false)}
              disabled={!selectedWinner}
              className={`h-14 w-full flex items-center justify-center transition-all rounded-none uppercase ${
                selectedWinner
                  ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <span className="text-[10px] font-black tracking-widest">NO</span>
            </button>
          </div>

          {/* Undo Button */}
          <button 
             onClick={onUndo}
             disabled={!canUndo}
             className={`w-full h-8 flex items-center justify-center space-x-1 text-[9px] font-bold transition-colors rounded-none uppercase tracking-widest ${
               canUndo 
                 ? 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700' 
                 : 'text-zinc-700 cursor-not-allowed border border-zinc-800'
             }`}
           >
             <RotateCcw className="w-3 h-3" />
             <span>Undo</span>
           </button>
        </div>
      </div>
    </>
  );
};

export default Keypad;