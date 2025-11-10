import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Briefcase, Dices, TrendingUp, PlayCircle, LogOut, RefreshCw } from 'lucide-react';

const SCENARIOS = [
  { 
    id: 1, 
    mechanical: 'Dyonics 2 (S+N)', 
    radiofrequency: 'Werewolf+ (S+N)', 
    baseChance: 66, 
    payoff: 10000, 
    recurringRevenue: 2000,
    minRep: 1, 
    rollNeeded: [2,3,4,5,6] 
  },
  { 
    id: 2, 
    mechanical: 'Dyonics 2 (S+N)', 
    radiofrequency: 'SynergyRF (Arthrex)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 3, 
    mechanical: 'Dyonics 2 (S+N)', 
    radiofrequency: 'CrossFire 2 (Stryker)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 4, 
    mechanical: 'Dyonics 2 (S+N)', 
    radiofrequency: 'Edge (Conmed)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 5, 
    mechanical: 'SynergyResection (Arthrex)', 
    radiofrequency: 'Werewolf+ (S+N)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 6, 
    mechanical: 'Core 2 (Stryker)', 
    radiofrequency: 'Werewolf+ (S+N)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 7, 
    mechanical: 'D4000 (Conmed)', 
    radiofrequency: 'Werewolf+ (S+N)', 
    baseChance: 50, 
    payoff: 15000,
    recurringRevenue: 3000,
    minRep: 1, 
    rollNeeded: [4,5,6] 
  },
  { 
    id: 8, 
    mechanical: 'SynergyResection (Arthrex)', 
    radiofrequency: 'SynergyRF (Arthrex)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 9, 
    mechanical: 'SynergyResection (Arthrex)', 
    radiofrequency: 'CrossFire 2 (Stryker)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 10, 
    mechanical: 'SynergyResection (Arthrex)', 
    radiofrequency: 'Edge (Conmed)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 11, 
    mechanical: 'Core 2 (Stryker)', 
    radiofrequency: 'SynergyRF (Arthrex)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 12, 
    mechanical: 'Core 2 (Stryker)', 
    radiofrequency: 'CrossFire 2 (Stryker)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 13, 
    mechanical: 'Core 2 (Stryker)', 
    radiofrequency: 'Edge (Conmed)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 14, 
    mechanical: 'D4000 (Conmed)', 
    radiofrequency: 'SynergyRF (Arthrex)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 15, 
    mechanical: 'D4000 (Conmed)', 
    radiofrequency: 'CrossFire 2 (Stryker)', 
    baseChance: 33, 
    payoff: 20000,
    recurringRevenue: 4000,
    minRep: 1, 
    rollNeeded: [5,6] 
  },
  { 
    id: 16, 
    mechanical: 'D4000 (Conmed)', 
    radiofrequency: 'Edge (Conmed)', 
    baseChance: 16, 
    payoff: 30000,
    recurringRevenue: 6000,
    minRep: 2, 
    rollNeeded: [6] 
  }
];

const TRIAL_COST = 5000;

const ACCOUNT_NAMES = [
  'Apex Health', 'Summit Medical', 'Pinnacle Care', 'Horizon Systems', 'Vertex Solutions',
  'Nexus Corp', 'Meridian Health', 'Zenith Medical', 'Atlas Healthcare', 'Titan Industries',
  'Phoenix Medical', 'Quantum Health', 'Vanguard Systems', 'Eclipse Healthcare', 'Infinity Corp'
];

const TARGET_REVENUE = 100000;
const STARTING_REP = 5;

const LaunchLeaderGame = () => {
  const [gameState, setGameState] = useState(null);
  const [playerId, setPlayerId] = useState(localStorage.getItem('launchLeaderPlayerId') || '');
  const [playerName, setPlayerName] = useState('');
  const [joinName, setJoinName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [repToCommit, setRepToCommit] = useState(1);
  const [message, setMessage] = useState('');
  const [diceRoll, setDiceRoll] = useState(null);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    loadGame();
    const interval = setInterval(loadGame, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadGame = async () => {
    try {
      const result = await window.storage.get('launch-leader-game', true);
      if (result) {
        setGameState(JSON.parse(result.value));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const saveGame = async (newState) => {
    try {
      await window.storage.set('launch-leader-game', JSON.stringify(newState), true);
      setGameState(newState);
    } catch (error) {
      setMessage('Failed to save game state');
    }
  };

  const createGame = async () => {
    if (!playerName.trim()) return;
    
    const newPlayerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const accounts = generateAccounts();
    
    const newGame = {
      players: [{
        id: newPlayerId,
        name: playerName.trim(),
        rep: STARTING_REP,
        revenue: 0
      }],
      accounts,
      currentPlayerIndex: 0,
      winner: null,
      createdAt: Date.now()
    };

    await saveGame(newGame);
    setPlayerId(newPlayerId);
    localStorage.setItem('launchLeaderPlayerId', newPlayerId);
    setMessage(`Game created! Share this page with others to join.`);
  };

  const joinGame = async () => {
    if (!joinName.trim() || !gameState) return;
    
    const newPlayerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const updatedGame = {
      ...gameState,
      players: [...gameState.players, {
        id: newPlayerId,
        name: joinName.trim(),
        rep: STARTING_REP,
        revenue: 0
      }]
    };

    await saveGame(updatedGame);
    setPlayerId(newPlayerId);
    localStorage.setItem('launchLeaderPlayerId', newPlayerId);
    setMessage(`Joined game as ${joinName}!`);
  };

  const generateAccounts = () => {
    const accounts = [];
    const shuffledNames = [...ACCOUNT_NAMES].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 20; i++) {
      const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
      accounts.push({
        id: `account_${i}`,
        name: shuffledNames[i % ACCOUNT_NAMES.length] + (i >= ACCOUNT_NAMES.length ? ` ${Math.floor(i / ACCOUNT_NAMES.length) + 1}` : ''),
        scenario: scenario.id,
        mechanical: scenario.mechanical,
        radiofrequency: scenario.radiofrequency,
        baseChance: scenario.baseChance,
        payoff: scenario.payoff,
        recurringRevenue: scenario.recurringRevenue,
        minRep: scenario.minRep,
        rollNeeded: scenario.rollNeeded,
        available: true,
        ownedBy: null
      });
    }
    return accounts;
  };

  const getCurrentPlayer = () => {
    if (!gameState || !gameState.players || !gameState.players.length) return null;
    return gameState.players[gameState.currentPlayerIndex];
  };

  const getMyPlayer = () => {
    if (!gameState || !gameState.players || !playerId) return null;
    return gameState.players.find(p => p.id === playerId);
  };

  const isMyTurn = () => {
    const current = getCurrentPlayer();
    return current && current.id === playerId;
  };

  const gainRep = async () => {
    if (!isMyTurn()) return;
    
    const myPlayer = getMyPlayer();
    
    // Calculate recurring revenue from owned accounts
    const myAccounts = gameState.accounts.filter(a => a.ownedBy === playerId);
    const recurringRevenue = myAccounts.reduce((sum, acc) => sum + acc.recurringRevenue, 0);
    
    const updatedPlayers = gameState.players.map(p => 
      p.id === playerId ? { ...p, rep: p.rep + 2, revenue: p.revenue + recurringRevenue } : p
    );
    
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    await saveGame({
      ...gameState,
      players: updatedPlayers,
      currentPlayerIndex: nextPlayerIndex
    });
    
    if (recurringRevenue > 0) {
      setMessage(`You focused and gained 2 Rep Presence! Also earned ${recurringRevenue.toLocaleString()} from your ${myAccounts.length} account(s).`);
    } else {
      setMessage('You focused and gained 2 Rep Presence!');
    }
  };

  const attemptTrial = async () => {
    if (!isMyTurn() || !selectedAccount || rolling) return;
    
    const account = gameState.accounts.find(a => a.id === selectedAccount);
    const myPlayer = getMyPlayer();
    
    if (!account || !account.available) {
      setMessage('This account is no longer available');
      return;
    }
    
    if (!myPlayer) {
      setMessage('Player not found');
      return;
    }
    
    if (repToCommit < account.minRep) {
      setMessage(`This account requires at least ${account.minRep} Rep Presence`);
      return;
    }
    
    if (myPlayer.rep < repToCommit) {
      setMessage('Not enough Rep Presence tokens');
      return;
    }

    setRolling(true);
    setMessage('Rolling dice...');
    
    // Animate dice roll
    let count = 0;
    const rollInterval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(rollInterval);
        finalizeTrial(account, myPlayer);
      }
    }, 100);
  };

  const finalizeTrial = async (account, myPlayer) => {
    const finalRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(finalRoll);
    
    // Calculate success
    const extraRep = repToCommit - account.minRep;
    let successRolls = [...account.rollNeeded];
    
    // Each extra rep adds one more success number
    for (let i = 0; i < extraRep && successRolls.length < 5; i++) {
      const lowestNotIncluded = [1,2,3,4,5].find(n => !successRolls.includes(n));
      if (lowestNotIncluded) {
        successRolls.push(lowestNotIncluded);
      }
    }
    
    const success = successRolls.includes(finalRoll);
    
    // Update game state - subtract trial cost and add payoff if successful
    const updatedPlayers = gameState.players.map(p => {
      if (p.id === playerId) {
        return {
          ...p,
          rep: p.rep - repToCommit,
          revenue: success ? p.revenue + account.payoff - TRIAL_COST : p.revenue - TRIAL_COST
        };
      }
      return p;
    });
    
    const updatedAccounts = gameState.accounts.map(a => 
      a.id === account.id && success ? { ...a, available: false } : a
    );
    
    const winner = success && (myPlayer.revenue + account.payoff - TRIAL_COST >= TARGET_REVENUE) 
      ? playerId 
      : gameState.winner;
    
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    await saveGame({
      ...gameState,
      players: updatedPlayers,
      accounts: updatedAccounts,
      currentPlayerIndex: nextPlayerIndex,
      winner
    });
    
    if (success) {
      setMessage(`SUCCESS! Rolled ${finalRoll}. Earned ${account.payoff.toLocaleString()} (minus ${TRIAL_COST.toLocaleString()} trial cost)!`);
    } else {
      setMessage(`Failed. Rolled ${finalRoll}. Needed: ${successRolls.join(', ')}. Lost ${TRIAL_COST.toLocaleString()} trial cost.`);
    }
    
    setRolling(false);
    setSelectedAccount(null);
    setRepToCommit(1);
    
    setTimeout(() => setDiceRoll(null), 3000);
  };

  const resetGame = async () => {
    try {
      await window.storage.delete('launch-leader-game', true);
      setGameState(null);
      setPlayerId('');
      setPlayerName('');
      setJoinName('');
      localStorage.removeItem('launchLeaderPlayerId');
      setMessage('Game reset!');
    } catch (error) {
      setMessage('Failed to reset game');
    }
  };

  const leaveGame = () => {
    setPlayerId('');
    localStorage.removeItem('launchLeaderPlayerId');
    setMessage('Left game');
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-white">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  // Lobby screen
  if (!playerId || !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-800">Intellio Shift Launch Leader</h1>
            </div>
            
            <p className="text-gray-600 mb-8">
              Be the first to reach ${(TARGET_REVENUE/1000).toFixed(0)}K in revenue by running successful Intellio Shift trials! Each trial costs ${(TRIAL_COST/1000).toFixed(0)}K.
            </p>

            {!gameState ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Create New Game</h2>
                <input
                  type="text"
                  placeholder="Your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg"
                  maxLength={20}
                />
                <button
                  onClick={createGame}
                  disabled={!playerName.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-6 h-6" />
                  Create Game
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Join Game</h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Players:</p>
                  {gameState.players.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg"
                  maxLength={20}
                />
                <button
                  onClick={joinGame}
                  disabled={!joinName.trim()}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  Join Game
                </button>
              </div>
            )}

            {message && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  const currentPlayer = getCurrentPlayer();
  const myPlayer = getMyPlayer();
  const availableAccounts = gameState.accounts ? gameState.accounts.filter(a => a.available) : [];
  const selectedAccountData = selectedAccount && gameState.accounts ? gameState.accounts.find(a => a.id === selectedAccount) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">Intellio Shift Launch Leader</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={leaveGame} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Leave
              </button>
              <button onClick={resetGame} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        {gameState.winner && (
          <div className="bg-yellow-400 text-gray-900 rounded-lg shadow-lg p-6 mb-4 text-center">
            <h2 className="text-3xl font-bold">🎉 {gameState.players.find(p => p.id === gameState.winner)?.name} Wins! 🎉</h2>
            <p className="text-xl mt-2">Target revenue reached!</p>
          </div>
        )}

        {/* Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {gameState.players && gameState.players.map((player, idx) => (
            <div 
              key={player.id}
              className={`bg-white rounded-lg shadow-lg p-4 ${idx === gameState.currentPlayerIndex ? 'ring-4 ring-yellow-400' : ''} ${player.id === playerId ? 'ring-2 ring-blue-400' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-gray-800">{player.name}</span>
                </div>
                {idx === gameState.currentPlayerIndex && <span className="text-yellow-600 font-bold">▶</span>}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Rep: {player.rep || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className={(player.revenue || 0) < 0 ? 'text-red-600 font-bold' : ''}>${(player.revenue || 0).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, ((player.revenue || 0) / TARGET_REVENUE) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Turn Actions */}
        {isMyTurn() && !gameState.winner && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Turn</h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={gainRep}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Focus (Gain 2 Rep, Skip Trial)
              </button>
              {selectedAccount && (
                <button
                  onClick={attemptTrial}
                  disabled={rolling || (selectedAccountData && myPlayer.rep < repToCommit)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Dices className="w-5 h-5" />
                  {rolling ? 'Rolling...' : 'Launch Trial'}
                </button>
              )}
            </div>
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${message.includes('SUCCESS') ? 'bg-green-100 text-green-800' : message.includes('Failed') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {message}
              </div>
            )}
            {diceRoll && (
              <div className="mt-4 text-center">
                <div className="inline-block bg-white border-4 border-gray-800 rounded-lg p-8 text-6xl font-bold">
                  {diceRoll}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Selected Account Details */}
        {selectedAccountData && isMyTurn() && myPlayer && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Trial Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Minimum Rep: {selectedAccountData.minRep || 0}</p>
                <p className="text-sm text-gray-600">Base Success: {selectedAccountData.baseChance || 0}%</p>
                <p className="text-sm text-gray-600">Success on roll: {selectedAccountData.rollNeeded ? selectedAccountData.rollNeeded.join(', ') : 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commit Rep Presence: {repToCommit}
                </label>
                <input
                  type="range"
                  min={selectedAccountData.minRep || 1}
                  max={Math.min(myPlayer.rep || 1, (selectedAccountData.minRep || 1) + 4)}
                  value={repToCommit}
                  onChange={(e) => setRepToCommit(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Extra Rep: +{(repToCommit - (selectedAccountData.minRep || 0)) * 10}% chance
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Available Accounts */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Accounts ({availableAccounts.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableAccounts.map(account => (
              <div
                key={account.id}
                onClick={() => isMyTurn() && !rolling && setSelectedAccount(account.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAccount === account.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400'
                } ${!isMyTurn() || rolling ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2">{account.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Mechanical:</strong> {account.mechanical}</p>
                  <p><strong>RF:</strong> {account.radiofrequency}</p>
                  <p><strong>Success:</strong> {account.baseChance}%</p>
                  <p className="text-green-600 font-bold text-lg">${account.payoff.toLocaleString()}</p>
                  <p className="text-blue-600 font-semibold">+${account.recurringRevenue.toLocaleString()}/turn</p>
                  <p><strong>Min Rep:</strong> {account.minRep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Owned Accounts */}
        {gameState.accounts.filter(a => a.ownedBy).length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Won Accounts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {gameState.accounts.filter(a => a.ownedBy).map(account => {
                const owner = gameState.players.find(p => p.id === account.ownedBy);
                return (
                  <div
                    key={account.id}
                    className={`border-2 rounded-lg p-4 ${account.ownedBy === playerId ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-gray-50'}`}
                  >
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{account.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Owner:</strong> {owner?.name}</p>
                      <p><strong>Mechanical:</strong> {account.mechanical}</p>
                      <p><strong>RF:</strong> {account.radiofrequency}</p>
                      <p className="text-blue-600 font-semibold">+${account.recurringRevenue.toLocaleString()}/turn</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchLeaderGame;