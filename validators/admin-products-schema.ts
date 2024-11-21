import { z } from 'zod'

import { requiredString } from './helpers'

export const adminProductFormSchema = z.object({
  name: requiredString('Name').default(''),
  description: requiredString('Description'),
  price: requiredString('Price'),
  image: requiredString('Image URL').url('Invalid image URL')
})

export type AdminProductForm = z.infer<typeof adminProductFormSchema>
