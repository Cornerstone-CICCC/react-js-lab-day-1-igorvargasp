import type { User } from '../types'

type UserProfileProps = {
  user: User | null
  onClose: () => void
}

const UserProfile = ({ user, onClose }: UserProfileProps) => {
  if (!user) return null

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <dl>
        <dt>ID</dt>
        <dd>{user.id}</dd>
        <dt>Full name</dt>
        <dd>{user.fullname}</dd>
        <dt>Age</dt>
        <dd>{user.age}</dd>
        <dt>Education</dt>
        <dd>{user.education}</dd>
        <dt>Gender</dt>
        <dd>{user.gender}</dd>
        <dt>Skills</dt>
        <dd>{user.skills.join(', ') || '—'}</dd>
        <dt>Bio</dt>
        <dd>{user.bio || '—'}</dd>
      </dl>
    </div>
  )
}

export default UserProfile
