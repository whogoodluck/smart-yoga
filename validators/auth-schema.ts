import { z } from 'zod'

export const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })

export const loginFormSchema = z.object({
  email: requiredString('Email')
    .email({
      message: 'Please provide a valid email address'
    })
    .default(''),
  password: requiredString('Password').default('')
})

export type LoginForm = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  firstName: requiredString('First Name').default(''),
  lastName: requiredString('Last Name').default(''),
  email: requiredString('Email')
    .email({
      message: 'Please provide a valid email address'
    })
    .default(''),
  password: requiredString('Password').default('')
})

export type RegisterForm = z.infer<typeof registerFormSchema>
