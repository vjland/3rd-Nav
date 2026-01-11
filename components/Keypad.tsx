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
      {/* Backdrop - Subtle dark overlay, no blur */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose} 
      />
      
      {/* Side Panel - Moved to absolute top-right (top-0) and widened to w-64 */}
      <div 
        className={`fixed top-0 right-0 z-50 h-fit w-64 bg-zinc-900 border-l border-b border-zinc-800 flex flex-col transition-transform duration-300 transform rounded-none shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Minimalist */}
        <div className="flex justify-end items-center px-3 py-2 border-b border-zinc-800 bg-zinc-950">
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col space-y-3">
          {/* Winner Selection - Wide P/B Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedWinner(Winner.PLAYER)}
              className={`h-16 w-full flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.PLAYER
                  ? 'bg-blue-600 border-blue-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-sm font-black tracking-widest">PLAYER</span>
            </button>
            <button
              onClick={() => setSelectedWinner(Winner.BANKER)}
              className={`h-16 w-full flex items-center justify-center border-2 transition-all rounded-none ${
                selectedWinner === Winner.BANKER
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <span className="text-sm font-black tracking-widest">BANKER</span>
            </button>
          </div>

          {/* YES/NO Buttons - Wide Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSubmit(true)}
              disabled={!selectedWinner}
              className={`h-16 w-full flex items-center justify-center transition-all rounded-none uppercase ${
                selectedWinner
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <span className="text-xs font-black tracking-[0.2em]">YES</span>
            </button>

            <button
              onClick={() => handleSubmit(false)}
              disabled={!selectedWinner}
              className={`h-16 w-full flex items-center justify-center transition-all rounded-none uppercase ${
                selectedWinner
                  ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <span className="text-xs font-black tracking-[0.2em]">NO</span>
            </button>
          </div>

          {/* Undo Button - Distanced by mt-16 */}
          <button 
             onClick={onUndo}
             disabled={!canUndo}
             className={`w-full h-12 flex items-center justify-center space-x-2 text-[10px] font-bold transition-colors rounded-none uppercase tracking-widest mt-16 ${
               canUndo 
                 ? 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700' 
                 : 'text-zinc-700 cursor-not-allowed border border-zinc-800'
             }`}
           >
             <RotateCcw className="w-4 h-4" />
             <span>Undo Action</span>
           </button>
        </div>
      </div>
    </>
  );
};

export default Keypad;