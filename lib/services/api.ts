/**
 * Service API centralisé pour BUILDPRO
 * Configuration axios et intercepteurs
 */

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add token if available
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Chantiers
  async getChantiers(filters?: Record<string, any>) {
    return this.client.get('/chantiers', { params: filters });
  }

  async getChantier(id: string) {
    return this.client.get(`/chantiers/${id}`);
  }

  async createChantier(data: any) {
    return this.client.post('/chantiers', data);
  }

  async updateChantier(id: string, data: any) {
    return this.client.put(`/chantiers/${id}`, data);
  }

  async deleteChantier(id: string) {
    return this.client.delete(`/chantiers/${id}`);
  }

  // Rapports
  async getRapports(filters?: Record<string, any>) {
    return this.client.get('/rapports', { params: filters });
  }

  async getRapport(id: string) {
    return this.client.get(`/rapports/${id}`);
  }

  async createRapport(data: any) {
    return this.client.post('/rapports', data);
  }

  async updateRapport(id: string, data: any) {
    return this.client.put(`/rapports/${id}`, data);
  }

  // Stock
  async getStock(filters?: Record<string, any>) {
    return this.client.get('/stock', { params: filters });
  }

  async getStockItem(id: string) {
    return this.client.get(`/stock/${id}`);
  }

  async createStockMouvement(data: any) {
    return this.client.post('/stock/mouvements', data);
  }

  // Finance
  async getFinance(filters?: Record<string, any>) {
    return this.client.get('/finance', { params: filters });
  }

  async getDashboardKPIs() {
    return this.client.get('/dashboard/kpis');
  }

  // Upload
  async uploadFile(file: File, folder = 'uploads') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return this.client.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Health check
  async healthCheck() {
    return this.client.get('/health');
  }
}

export const apiService = new APIService();
