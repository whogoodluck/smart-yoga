import { z } from 'zod'

import { requiredString } from './helpers'

export const adminBlogFormSchema = z.object({
  title: requiredString('Title').default(''),
  content: requiredString('Content').default(''),
  image: requiredString('Image URL').url('Invalid image URL')
})

export type AdminBlogForm = z.infer<typeof adminBlogFormSchema>
