import React from 'react';
import { ChevronUp, ChevronDown, History, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Hand, Winner, Result } from '../types';

interface HistoryListProps {
  hands: Hand[];
  isExpanded: boolean;
  onToggle: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ hands, isExpanded, onToggle }) => {
  const reversedHands = [...hands].reverse();

  return (
    <div 
      className={`flex-none bg-zinc-900 border-t border-zinc-800 flex flex-col transition-all duration-300 ease-in-out z-20 rounded-none ${
        isExpanded ? 'h-[60vh]' : 'h-20'
      }`}
    >
      <div 
        onClick={onToggle} 
        className="px-4 py-2 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center cursor-pointer hover:bg-zinc-900 transition-colors group h-8 shrink-0"
      >
        <div className="flex items-center space-x-2 text-zinc-500 group-hover:text-zinc-300">
          <History className="w-3 h-3" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Audit Log</span>
          <span className="text-[9px] text-zinc-700 font-mono">[{hands.length}]</span>
        </div>
        <button className="text-zinc-700 group-hover:text-zinc-400">
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-0 custom-scroll bg-black/20">
        {hands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-700 text-[10px] font-bold uppercase tracking-widest italic py-2">
            <span>No data</span>
          </div>
        ) : (
          reversedHands.map((h) => (
            <div 
              key={h.id} 
              className="grid grid-cols-12 gap-1 items-center px-4 py-2 border-b border-zinc-800/50 text-[11px] hover:bg-zinc-800/30 transition-colors h-10"
            >
              <div className="col-span-1 text-zinc-600 font-mono">#{String(h.id).padStart(2, '0')}</div>
              
              <div className="col-span-4 flex items-center space-x-2">
                <span className={`font-black tracking-tight ${h.winner === Winner.PLAYER ? 'text-blue-500' : 'text-red-500'}`}>
                  {h.winner.toUpperCase()}
                </span>
                <span className={`text-[8px] font-black border px-1 ${h.isFourCards ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' : 'text-zinc-500 border-zinc-800 bg-zinc-900'}`}>
                  {h.isFourCards ? '4C' : '5+C'}
                </span>
              </div>

              <div className="col-span-3 text-center">
                {h.prediction ? (
                  <div className="flex items-center justify-center space-x-1">
                    <span className={`font-black px-1 border ${
                      h.prediction === Winner.PLAYER ? 'border-blue-900 text-blue-400' : 'border-red-900 text-red-400'
                    }`}>
                      {h.prediction === Winner.PLAYER ? 'P' : 'B'}
                    </span>
                  </div>
                ) : (
                  <span className="text-zinc-800">-</span>
                )}
              </div>

              <div className="col-span-2 flex justify-center">
                {h.result === Result.WIN && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                {h.result === Result.LOSS && <TrendingDown className="w-3 h-3 text-rose-500" />}
                {h.result === Result.PUSH && <Minus className="w-3 h-3 text-zinc-700" />}
              </div>

              <div className={`col-span-2 text-right font-mono font-bold ${
                h.runningTotal > 0 ? 'text-emerald-500' : h.runningTotal < 0 ? 'text-rose-500' : 'text-zinc-600'
              }`}>
                {h.runningTotal > 0 ? '+' : ''}{h.runningTotal}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;