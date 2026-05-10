# BUILDPRO Backend Integration Guide

## Vue d'ensemble

Ce guide décrit comment intégrer le backend à l'architecture frontend BUILDPRO actuellement à 50% du MVP.

## Architecture Préparée

### 1. API Services (`lib/services/api.ts`)

Une couche d'API complète est déjà structurée avec:

```typescript
// Structure existante
export const API = {
  chantiers: { ... },
  rapports: { ... },
  stock: { ... },
  achats: { ... },
  finance: { ... },
  hse: { ... },
  engins: { ... },
};
```

### 2. Data Fetching Hooks (`lib/hooks/use-fetch.ts`)

Les hooks pour récupérer les données sont prêts:

```typescript
export function useFetch<T>(url: string) {
  // Implémentation basée sur SWR
  // Gère cache, refetching, erreurs
}
```

## Prochaines Étapes

### Phase 1: Authentification Backend (2-3 jours)

**À implémenter:**
1. Route POST `/api/auth/login`
2. Route POST `/api/auth/register`
3. Route POST `/api/auth/refresh`
4. JWT tokens (access + refresh)
5. HTTP-only cookies pour refresh tokens

**Frontend changes:**
```typescript
// app/api/auth/route.ts (API Route)
export async function POST(request: Request) {
  const { email, password } = await request.json();
  // Appel backend + stockage token
}
```

**Navigation:**
- Ajouter middleware pour protéger les routes
- Redirect vers /auth/login si non authentifié

### Phase 2: Intégration APIs Principaux (5-7 jours)

#### 2.1 Module Chantiers
```typescript
// lib/services/api.ts
export const chantierAPI = {
  list: () => fetch('/api/chantiers'),
  get: (id: string) => fetch(`/api/chantiers/${id}`),
  create: (data) => fetch('/api/chantiers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetch(`/api/chantiers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetch(`/api/chantiers/${id}`, { method: 'DELETE' }),
};
```

**Endpoint Backend attendu:**
```
GET    /api/chantiers
GET    /api/chantiers/:id
POST   /api/chantiers
PUT    /api/chantiers/:id
DELETE /api/chantiers/:id
```

#### 2.2 Module Rapports
```
GET    /api/rapports
POST   /api/rapports
PUT    /api/rapports/:id
DELETE /api/rapports/:id
POST   /api/rapports/:id/photos (multipart)
```

#### 2.3 Module Stock
```
GET    /api/stock/mouvements
POST   /api/stock/mouvements
GET    /api/stock/inventaire
POST   /api/stock/inventaire/items
```

#### 2.4 Module Achats
```
GET    /api/achats/demandes
POST   /api/achats/demandes
PUT    /api/achats/demandes/:id/valider
PUT    /api/achats/demandes/:id/commander
```

#### 2.5 Module Finance
```
GET    /api/finance/dépenses
POST   /api/finance/dépenses
GET    /api/finance/budgets
GET    /api/finance/facturas
GET    /api/finance/paiements
```

### Phase 3: Authentification et Permissions (3-5 jours)

**Middleware d'authentification:**
```typescript
// lib/middleware/auth.ts
export async function authMiddleware(request: Request) {
  const token = request.cookies.get('access_token');
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  // Vérifier le token
}
```

**RBAC Implementation:**
```typescript
// lib/auth/permissions.ts
export const PERMISSIONS = {
  'chantiers:read': ['chef_chantier', 'manager', 'admin'],
  'chantiers:write': ['chef_chantier', 'manager', 'admin'],
  'finance:read': ['manager', 'comptable', 'admin'],
  'hse:write': ['hse_officer', 'admin'],
};

export function canAccess(role: string, action: string) {
  return PERMISSIONS[action]?.includes(role) ?? false;
}
```

### Phase 4: Upload Fichiers (2-3 jours)

**Pour Rapports (photos):**
```typescript
// lib/services/upload.ts
export async function uploadPhotos(files: File[], rapportId: string) {
  const formData = new FormData();
  files.forEach(file => formData.append('photos', file));
  
  return fetch(`/api/rapports/${rapportId}/photos`, {
    method: 'POST',
    body: formData,
  });
}
```

**Endpoint backend:**
```
POST /api/rapports/:id/photos
- Accept: multipart/form-data
- Return: Array<{ url: string, id: string }>
```

### Phase 5: Real-time Updates (3-5 jours)

**WebSocket pour Pointage:**
```typescript
// lib/services/websocket.ts
export class PointageWS {
  socket: WebSocket;
  
  constructor(userId: string) {
    this.socket = new WebSocket(`wss://api.buildpro.fr/ws/pointage/${userId}`);
  }
  
  onPointageUpdate(callback: (data: Pointage) => void) {
    this.socket.onmessage = (e) => callback(JSON.parse(e.data));
  }
}
```

## Structure Backend Recommandée

```
backend/
├── api/
│   ├── auth.py
│   ├── chantiers.py
│   ├── rapports.py
│   ├── stock.py
│   ├── achats.py
│   ├── finance.py
│   ├── hse.py
│   └── engins.py
├── models/
│   ├── user.py
│   ├── chantier.py
│   ├── rapport.py
│   ├── stock.py
│   ├── achat.py
│   ├── finance.py
│   ├── hse.py
│   └── engin.py
├── middleware/
│   ├── auth.py
│   ├── permissions.py
│   └── error_handling.py
├── services/
│   └── (business logic)
└── migrations/
    └── (database)
```

## Base de données - Schéma Recommandé

### Utilisateurs
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'manager', 'chef_chantier', 'ouvrier', 'comptable', 'hse_officer'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Chantiers
```sql
CREATE TABLE chantiers (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status ENUM('planifié', 'lancé', 'en_cours', 'terminé', 'suspendu', 'clos'),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12, 2),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Rapports
```sql
CREATE TABLE rapports (
  id UUID PRIMARY KEY,
  chantier_id UUID REFERENCES chantiers(id),
  date DATE NOT NULL,
  weather VARCHAR(50),
  teams_count INT,
  description TEXT,
  status ENUM('brouillon', 'soumis', 'validé', 'rejeté'),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Checklist d'Intégration

- [ ] Backend API setup
- [ ] Authentification JWT
- [ ] Routes API pour tous les modules
- [ ] Base de données & migrations
- [ ] Permissions RBAC
- [ ] Upload fichiers
- [ ] WebSocket pour temps réel
- [ ] Tests API (Jest)
- [ ] Documentation API (Swagger)
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] Error handling global

## Testing

### Tests Frontend (Jest + React Testing Library)
```typescript
// app/chantiers/__tests__/chantiers.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { ChantiersPage } from '../page';

describe('Chantiers Page', () => {
  it('should display chantiers list', async () => {
    render(<ChantiersPage />);
    await waitFor(() => {
      expect(screen.getByText('Rénovation Paris 5')).toBeInTheDocument();
    });
  });
});
```

### Tests Backend (pytest/unittest)
```python
# tests/test_chantiers.py
def test_list_chantiers(client):
    response = client.get('/api/chantiers')
    assert response.status_code == 200
    assert len(response.json()) > 0
```

## Dépannage Courant

### CORS Issues
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.BACKEND_URL },
        ],
      },
    ];
  },
};
```

### Token Expiration
```typescript
// lib/hooks/use-fetch.ts
export function useFetch<T>(url: string) {
  const { data, error, mutate } = useSWR<T>(url, async (key) => {
    const res = await fetch(key);
    
    if (res.status === 401) {
      // Token expiré, refresh
      const refreshRes = await fetch('/api/auth/refresh', { method: 'POST' });
      if (refreshRes.ok) {
        // Retry original request
        return fetch(key).then(r => r.json());
      }
    }
    
    return res.json();
  });
}
```

## Timeline Estimé

- **Phase 1 (Auth):** 2-3 jours
- **Phase 2 (APIs):** 5-7 jours
- **Phase 3 (RBAC):** 3-5 jours
- **Phase 4 (Upload):** 2-3 jours
- **Phase 5 (Real-time):** 3-5 jours

**Total:** 15-23 jours pour un MVP backend complet

## Support

Pour les questions sur l'intégration:
1. Consultez le DEVELOPMENT.md pour les patterns frontend
2. Vérifiez les types dans `lib/types/erp.ts`
3. Utilisez la structure de services dans `lib/services/api.ts` comme reference

---

**Status:** Le frontend est prêt pour l'intégration backend. Tous les hooks et services sont préparés pour recevoir les données via API REST.
