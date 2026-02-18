export interface FormErrors {
  title?: string | null
  description?: string | null
}

export interface Task {
  id: string
  title: string
  description: string
  reminder: number | null
  completed: boolean
  deadline?: string | null
  deleted?: boolean 
  createdAt: Date
  archivedAt?: Date
}

export type Screens = 'main' | 'archive' | 'settings'