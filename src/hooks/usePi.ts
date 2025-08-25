import { useContext } from 'react';
import { PiContext } from '../context/PiContext';

export const usePi = () => {
  const ctx = useContext(PiContext);
  if (!ctx) throw new Error('usePi must be used inside PiProvider');
  return ctx;
};