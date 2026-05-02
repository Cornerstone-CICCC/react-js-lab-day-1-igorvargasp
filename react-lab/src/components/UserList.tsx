import type { User } from '../types'

type UserListProps = {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

const UserList = ({ users, onView, onEdit, onDelete }: UserListProps) => {
  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users yet. Add one using the form.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td className="row-actions">
                  <button type="button" onClick={() => onView(user)}>
                    View
                  </button>
                  <button type="button" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => onDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserList
