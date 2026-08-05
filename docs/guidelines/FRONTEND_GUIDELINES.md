---
title: Diretrizes de Desenvolvimento Frontend
category: frontend
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Padrões de desenvolvimento frontend com componentes, API services, páginas, autenticação e tratamento de erros.
---

# Diretrizes de Desenvolvimento — Frontend

Este documento define as diretrizes para o desenvolvimento do frontend do projeto **{{PROJECT_NAME}}**.

---

## 1. Stack Tecnológico

| Tecnologia | Versão | Descrição |
|------------|-------|----------|
| {{FRONTEND_LIB}} | {{FRONTEND_LIB_VERSION}} | Biblioteca principal |
| {{FRONTEND_LANG}} | {{FRONTEND_LANG_VERSION}} | Linguagem/Tipagem |
| {{FRONTEND_BUILD_TOOL}} | {{FRONTEND_BUILD_TOOL_VERSION}} | Build tool e dev server |
| {{UI_LIBRARY}} | Latest | Componentes UI |
| {{ROUTER_LIB}} | {{ROUTER_LIB_VERSION}} | Roteamento |
| {{E2E_TOOL}} | {{E2E_TOOL_VERSION}} | Testes E2E |
| Linter | Latest | Linting |

### 1.1 Configuração Básica

```typescript
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 2. Estrutura de Diretórios

```
src/
├── main.tsx                 # Ponto de entrada
├── App.tsx                  # Componente raiz com rotas
├── types/
│   └── index.ts            # Tipos globais
├── services/
│   └── [modulo]Api.ts     # APIs para comunicação com backend
├── pages/
│   ├── index.ts           # Export de todas as páginas
│   ├── [Modulo]Page.tsx   # Página de listagem
│   └── Cadastro[Modulo]Page.tsx # Página de cadastro
├── components/
│   ├── index.ts           # Export de componentes
│   ├── ui/                # Componentes reutilizáveis
│   ├── forms/             # Componentes de formulário
│   ├── modals/            # Componentes de modal
│   ├── crud/              # Componentes de CRUD
│   └── [feature]/        # Componentes específicos de feature
├── contexts/
│   ├── AuthContext.tsx   # Contexto de autenticação
│   └── ThemeContext.tsx  # Contexto de tema
├── data/
│   └── [modulo].ts        # Dados mock para desenvolvimento
├── constants/
│   └── images.ts          # Constantes
└── styles/
    └── index.css           # Estilos globais
```

---

## 3. Padrão de API Service

### 3.1 Estrutura Base

```typescript
import { api } from './api'

export interface User {
  id: string
  name: string
  email: string
  active: boolean
  createdAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export const usersApi = {
  getAll: (page = 0, size = 20, sort = 'createdAt,desc') =>
    api.get<PageResponse<User>>('/users', { params: { page, size, sort } }),

  getById: (id: string) =>
    api.get<User>(`/users/${id}`),

  create: (data: CreateUserRequest) =>
    api.post<User>('/users', data),

  update: (id: string, data: CreateUserRequest) =>
    api.put<User>(`/users/${id}`, data),

  delete: (id: string) =>
    api.delete(`/users/${id}`),
}
```

### 3.2 API Client Base

```typescript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:{{BACKEND_PORT}}'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      method: 'GET',
      headers: this.getHeaders()
    })
    if (!response.ok) throw new Error(await response.text())
    return response.json()
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined
    })
    if (!response.ok) throw new Error(await response.text())
    return response.json()
  }
}

export const api = new ApiClient(BASE_URL)
```

---

## 4. Padrão de Páginas

### 4.1 Página de Listagem

```typescript
import { useState, useEffect } from 'react'
import { usersApi, User } from '@/services/usersApi'

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    loadUsers()
  }, [page])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await usersApi.getAll(page, 20)
      setUsers(response.content)
      setTotalPages(response.totalPages)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (user: User) => {
    if (confirm('Deseja inativar este registro?')) {
      await usersApi.delete(user.id)
      loadUsers()
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Usuários</h1>
        <button onClick={() => navigate('/usuarios/novo')}>
          Novo Usuário
        </button>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.active ? 'Ativo' : 'Inativo'}</td>
                <td>
                  <button onClick={() => navigate(`/usuarios/${user.id}`)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(user)}>
                    Inativar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
```

### 4.2 Página de Cadastro/Edição

```typescript
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usersApi, CreateUserRequest } from '@/services/usersApi'

export function CadastroUsuariosPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateUserRequest>({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (id) loadUser(id)
  }, [id])

  const loadUser = async (id: string) => {
    const user = await usersApi.getById(id)
    setForm({ name: user.name, email: user.email, password: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (id) {
        await usersApi.update(id, form)
      } else {
        await usersApi.create(form)
      }
      navigate('/usuarios')
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h1>{id ? 'Editar' : 'Cadastrar'} Usuário</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>{id ? 'Nova Senha' : 'Senha'}</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!id}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {id ? 'Atualizar' : 'Cadastrar'}
          </button>
          <button type="button" onClick={() => navigate('/usuarios')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
```

---

## 5. Padrão de Autenticação

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { api } from '@/services/api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await api.post<{ token: string; user: User }>('/auth/login', {
      email, password
    })
    localStorage.setItem('token', response.token)
    setUser(response.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

---

## 6. Tratamento de Erros

```typescript
try {
  await usersApi.create(form)
  toast.success('Registro criado com sucesso')
  navigate('/usuarios')
} catch (error: any) {
  if (error.message.includes('already registered')) {
    toast.error('Registro já cadastrado')
  } else if (error.message.includes('validation')) {
    toast.error('Dados inválidos')
  } else {
    toast.error('Erro ao processar requisição')
  }
}
```

---

## 7. Convenções de Nomenclatura

| Tipo | Nome | Exemplo |
|------|------|---------|
| Page | [Nome]Page.tsx | UsersPage.tsx |
| Service API | [nome]Api.ts | usersApi.ts |
| Componente | [Nome].tsx | UserCard.tsx |
| Campo | [nome]Field.tsx | EmailField.tsx |
| Tipo/Interface | [Nome] | User |

---

## 8. Estados de UI

Cada página/componente deve tratar os seguintes estados:

| Estado | Descrição | Implementação |
|--------|-----------|--------------|
| **Loading** | Carregamento inicial | Spinner, skeleton ou loader |
| **Empty** | Nenhum dado encontrado | Mensagem "Nenhum registro encontrado" |
| **Error** | Falha na requisição | Mensagem de erro + botão "Tentar novamente" |
| **Success** | Dados carregados | Renderização normal dos dados |

---

## 9. Referências

- `docs/guidelines/AI_GUIDELINES.md` — Guia geral para IAs
- `docs/guidelines/BACKEND_GUIDELINES.md` — Padrões backend
- `docs/guidelines/FEATURE_PLANNING_GUIDELINES.md` — Planejamento de features
