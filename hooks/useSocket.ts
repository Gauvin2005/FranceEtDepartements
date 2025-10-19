import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { GameState, DiceRoll, Composition, RoundResult } from '@/types';

interface UseSocketOptions {
  onStateUpdate?: (state: Partial<GameState>) => void;
  onPlayerJoined?: (player: any) => void;
  onPlayerLeft?: (playerId: number) => void;
  onTurnStarted?: (playerId: number) => void;
  onDiceRolled?: (dice: DiceRoll) => void;
  onCompositionsList?: (compositions: Composition[]) => void;
  onIndicesReveal?: (data: { indexNumber: number; indicesRevealed: number[] }) => void;
  onMovePiece?: (playerId: number, newPosition: number) => void;
  onRoundResult?: (result: RoundResult) => void;
  onError?: (message: string) => void;
  onGameFinished?: (data: { winner: any }) => void;
  onGameSaved?: (data: { message: string }) => void;
  onCardsSold?: (data: { playerId: number; newMoney: number; cardsReturned: number[] }) => void;
  onSpectatorMode?: (isSpectator: boolean) => void;
}

export function useSocket(options: UseSocketOptions = {}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3403';
    console.log('Connexion Socket.IO à:', socketUrl);
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Socket connecté');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket déconnecté');
      setIsConnected(false);
    });

    newSocket.on('game:state:update', (state: Partial<GameState>) => {
      console.log('Événement game:state:update reçu:', state);
      optionsRef.current.onStateUpdate?.(state);
    });

    newSocket.on('game:player:joined', (player: any) => {
      optionsRef.current.onPlayerJoined?.(player);
    });

    newSocket.on('game:player:left', (playerId: number) => {
      optionsRef.current.onPlayerLeft?.(playerId);
    });

    newSocket.on('game:turn:started', (playerId: number) => {
      optionsRef.current.onTurnStarted?.(playerId);
    });

    newSocket.on('game:dice:rolled', (dice: DiceRoll) => {
      optionsRef.current.onDiceRolled?.(dice);
    });

    newSocket.on('game:compositions:list', (compositions: Composition[]) => {
      optionsRef.current.onCompositionsList?.(compositions);
    });

    newSocket.on('game:indices:reveal', (data: any) => {
      optionsRef.current.onIndicesReveal?.(data);
    });

    newSocket.on('game:move:piece', (playerId: number, newPosition: number) => {
      optionsRef.current.onMovePiece?.(playerId, newPosition);
    });

    newSocket.on('game:round:result', (result: RoundResult) => {
      optionsRef.current.onRoundResult?.(result);
    });

    newSocket.on('game:finished', (data: { winner: any }) => {
      optionsRef.current.onGameFinished?.(data);
    });

    newSocket.on('game:saved', (data: { message: string }) => {
      optionsRef.current.onGameSaved?.(data);
    });

    newSocket.on('game:cards:sold', (data: any) => {
      optionsRef.current.onCardsSold?.(data);
    });

    newSocket.on('game:spectator:mode', (isSpectator: boolean) => {
      optionsRef.current.onSpectatorMode?.(isSpectator);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Erreur de connexion Socket.IO:', error);
      setIsConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Erreur Socket.IO:', error);
    });

    newSocket.on('server:error', (message: string) => {
      console.error('Erreur serveur:', message);
      optionsRef.current.onError?.(message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinGame = useCallback(
    (code: string, pseudo: string, token?: string) => {
      if (socket) {
        socket.emit('game:join', { code, pseudo, token });
      }
    },
    [socket]
  );

  const startGame = useCallback(
    (code: string) => {
      if (socket) {
        socket.emit('game:start', { code });
      }
    },
    [socket]
  );

  const rollDice = useCallback(
    (code: string) => {
      if (socket) {
        socket.emit('game:roll:dice', { code });
      }
    },
    [socket]
  );

  const revealIndex = useCallback(
    (code: string, indexNumber: number) => {
      if (socket) {
        socket.emit('game:use:index', { code, indexNumber });
      }
    },
    [socket]
  );

  const chooseComposition = useCallback(
    (code: string, compositionValue: number) => {
      if (socket) {
        socket.emit('game:choose:composition', { code, compositionValue });
      }
    },
    [socket]
  );

  const saveGame = useCallback(
    (code: string) => {
      if (socket) {
        socket.emit('game:save', { code });
      }
    },
    [socket]
  );

  const sellSouvenirs = useCallback(
    (code: string, playerId: number) => {
      if (socket) {
        socket.emit('game:sell:souvenirs', { code, playerId });
      }
    },
    [socket]
  );

  return {
    socket,
    isConnected,
    joinGame,
    startGame,
    rollDice,
    revealIndex,
    chooseComposition,
    saveGame,
    sellSouvenirs,
  };
}

