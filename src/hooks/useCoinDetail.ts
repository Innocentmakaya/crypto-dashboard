import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { loadCoinDetail } from '../store/slices/detailSlice';

export const useCoinDetail = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { coin, loading, error } = useSelector(
    (state: RootState) => state.detail
  );
  const { currency } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    if (id) dispatch(loadCoinDetail({ id, currency }));
  }, [dispatch, id, currency]);

  return { coin, loading, error };
};