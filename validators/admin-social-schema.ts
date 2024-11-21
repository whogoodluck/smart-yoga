import { z } from 'zod'

import { requiredString } from './helpers'

export const adminSocialMediaLinksFormSchema = z.object({
  facebook: requiredString('URL').url('Please enter a valid URL').default(''),
  instagram: requiredString('URL').url('Please enter a valid URL').default(''),
  twitter: requiredString('URL').url('Please enter a valid URL').default('')
})

export type AdminSocialMediaLinksForm = z.infer<
  typeof adminSocialMediaLinksFormSchema
>
