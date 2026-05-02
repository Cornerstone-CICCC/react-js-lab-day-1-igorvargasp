import type { ChangeEvent, FormEvent } from 'react'
import type { UserFormData } from '../types'

type UserFormProps = {
  formData: UserFormData
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>
  onSubmit: () => void
  onClear: () => void
  isEditing: boolean
}

const educationOptions = ['Grade school', 'High school', 'College']
const genderOptions = ['Male', 'Female', 'Other']
const skillOptions = ['TypeScript', 'React', 'Node', 'NoSQL']

const UserForm = ({ formData, setFormData, onSubmit, onClear, isEditing }: UserFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>

      <div className="field">
        <label htmlFor="fullname">Full name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min={0}
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="education">Education</label>
        <select
          id="education"
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        >
          <option value="">-- select --</option>
          {educationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <span className="label">Gender</span>
        <div className="options">
          {genderOptions.map((option) => (
            <label key={option} className="option">
              <input
                type="radio"
                name="gender"
                value={option}
                checked={formData.gender === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="label">Skills</span>
        <div className="options">
          {skillOptions.map((skill) => (
            <label key={skill} className="option">
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleSkillsChange}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="actions">
        <button type="submit">{isEditing ? 'Save User' : 'Add User'}</button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default UserForm
