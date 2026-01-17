import React, { useState } from 'react';
import { RefreshCw, Menu } from 'lucide-react';
import StrategyChart from './components/StrategyChart';
import Keypad from './components/Keypad';
import HistoryList from './components/HistoryList';
import { Hand, Winner, Result } from './types';

const App: React.FC = () => {
  const [hands, setHands] = useState<Hand[]>([]);
  const [nextPrediction, setNextPrediction] = useState<Winner | null>(null);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const calculatePrediction = (lastWinner: Winner, isFourCards: boolean): Winner => {
    if (isFourCards) return lastWinner;
    return lastWinner === Winner.PLAYER ? Winner.BANKER : Winner.PLAYER;
  };

  const handleHandSubmit = (winner: Winner, isFourCards: boolean) => {
    let unitsChanged = 0;
    let result = Result.PENDING;

    if (nextPrediction) {
      if (winner === nextPrediction) {
        result = Result.WIN;
        unitsChanged = 1;
      } else {
        result = Result.LOSS;
        unitsChanged = -1;
      }
    } else {
      result = Result.PUSH;
    }

    const lastTotal = hands.length > 0 ? hands[hands.length - 1].runningTotal : 0;
    const newTotal = lastTotal + unitsChanged;
    const strategyPrediction = calculatePrediction(winner, isFourCards);

    const newHand: Hand = {
      id: hands.length + 1,
      winner,
      isFourCards,
      prediction: nextPrediction,
      result,
      runningTotal: newTotal
    };

    setHands(prev => [...prev, newHand]);
    setNextPrediction(strategyPrediction);
    setIsKeypadOpen(false);
  };

  const handleUndo = () => {
    if (hands.length === 0) return;
    const newHands = hands.slice(0, -1);
    setHands(newHands);
    if (newHands.length === 0) {
      setNextPrediction(null);
    } else {
      const lastHand = newHands[newHands.length - 1];
      setNextPrediction(calculatePrediction(lastHand.winner, lastHand.isFourCards));
    }
  };

  const handleReset = () => {
    setHands([]);
    setNextPrediction(null);
    setIsResetModalOpen(false);
  };

  const getNextBetIndicator = () => {
    const baseClass = "flex items-center justify-center w-12 h-12 border-2 transition-all duration-300 rounded-none";
    if (nextPrediction === Winner.PLAYER) {
      return (
        <div className={`${baseClass} bg-blue-500/10 border-blue-500 text-blue-500`}>
          <span className="text-2xl font-black">P</span>
        </div>
      );
    } 
    if (nextPrediction === Winner.BANKER) {
      return (
        <div className={`${baseClass} bg-red-500/10 border-red-500 text-red-500`}>
          <span className="text-2xl font-black">B</span>
        </div>
      );
    }
    return (
      <div className={`${baseClass} bg-zinc-800/50 border-zinc-700 text-zinc-700`}>
        <span className="text-2xl font-black">-</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      <header className="flex-none h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-30 relative">
        <div className="flex items-center space-x-3">
          <h1 className="text-sm font-bold tracking-widest text-zinc-500 uppercase hidden sm:block">Natural Win Nav</h1>
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-3">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter hidden sm:block">Next Suggestion</span>
          {getNextBetIndicator()}
        </div>

        <div className="flex items-center space-x-1">
          <button onClick={() => setIsResetModalOpen(true)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={() => setIsKeypadOpen(true)} className={`p-2 transition-all active:scale-95 ${isKeypadOpen ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 min-h-0 bg-zinc-950 relative">
          <StrategyChart hands={hands} />
        </div>
        <HistoryList hands={hands} isExpanded={isHistoryExpanded} onToggle={() => setIsHistoryExpanded(!isHistoryExpanded)} />
      </main>

      <Keypad isOpen={isKeypadOpen} onClose={() => setIsKeypadOpen(false)} onSubmit={handleHandSubmit} onUndo={handleUndo} canUndo={hands.length > 0} />

      {isResetModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 max-w-sm w-full rounded-none">
            <div className="flex items-center space-x-3 mb-4 text-amber-500">
              <RefreshCw className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">Confirm Reset</h3>
            </div>
            <p className="text-zinc-400 text-xs mb-6 leading-relaxed uppercase tracking-wide">
              All history and performance metrics will be purged. This action is final.
            </p>
            <div class="flex flex-col space-y-2">
              <button onClick={handleReset} className="w-full py-3 text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white uppercase tracking-widest transition-colors">Purge Data</button>
              <button onClick={() => setIsResetModalOpen(false)} className="w-full py-3 text-sm font-medium text-zinc-400 hover:bg-zinc-800 border border-zinc-800 uppercase tracking-widest transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;