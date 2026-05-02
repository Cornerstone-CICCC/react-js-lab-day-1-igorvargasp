import { useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import type { User, UserFormData } from './types'
import './App.css'

const emptyForm: UserFormData = {
  fullname: '',
  age: 0,
  education: '',
  gender: '',
  skills: [],
  bio: '',
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<UserFormData>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingUser, setViewingUser] = useState<User | null>(null)

  const handleSubmit = () => {
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u))
      )
      if (viewingUser?.id === editingId) {
        setViewingUser({ ...formData, id: editingId })
      }
    } else {
      const newUser: User = { ...formData, id: crypto.randomUUID() }
      setUsers((prev) => [...prev, newUser])
    }
    handleClear()
  }

  const handleClear = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  const handleView = (user: User) => {
    setViewingUser(user)
  }

  const handleEdit = (user: User) => {
    const { id, ...rest } = user
    setFormData(rest)
    setEditingId(id)
  }

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    if (viewingUser?.id === id) setViewingUser(null)
    if (editingId === id) handleClear()
  }

  const handleCloseProfile = () => setViewingUser(null)

  return (
    <div className="app">
      <header>
        <h1>React CRUD Lab</h1>
      </header>
      <main>
        <UserForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClear={handleClear}
          isEditing={editingId !== null}
        />
        <UserList
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <UserProfile user={viewingUser} onClose={handleCloseProfile} />
      </main>
    </div>
  )
}

export default App
