import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loadTopCoins } from '../store/slices/cryptoSlice';

export const useTopCoins = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { coins, loading, error, currency } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    dispatch(loadTopCoins({ currency }));
  }, [dispatch, currency]);

  return { coins, loading, error };
};