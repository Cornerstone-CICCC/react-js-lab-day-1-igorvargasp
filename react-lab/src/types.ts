export type User = {
  id: string
  fullname: string
  age: number
  education: string
  gender: string
  skills: string[]
  bio: string
}

export type UserFormData = Omit<User, 'id'>
