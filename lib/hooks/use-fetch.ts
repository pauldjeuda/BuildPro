'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/lib/services/api';

interface UseFetchOptions {
  skip?: boolean;
  onError?: (error: any) => void;
  onSuccess?: (data: any) => void;
}

export function useFetch<T>(
  url: string,
  options?: UseFetchOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.client.get<T>(url);
        setData(response.data);
        options?.onSuccess?.(response.data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options?.onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
}

export function usePaginatedFetch<T>(
  url: string,
  pageSize = 10,
  options?: UseFetchOptions
) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.client.get(url, {
          params: {
            page,
            limit: pageSize,
          },
        });
        setData(response.data.data);
        setTotal(response.data.total);
        options?.onSuccess?.(response.data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options?.onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, pageSize, options]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    total,
    pageCount: Math.ceil(total / pageSize),
  };
}
