import { z } from 'zod'

import { requiredString } from './helpers'

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
