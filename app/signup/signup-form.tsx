'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createUser } from '@/services/user-service'
import { RegisterForm, registerFormSchema } from '@/validators/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/loading-button'

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const searchParams = useSearchParams()

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: RegisterForm) {
    try {
      setIsSigningUp(true)
      const createdUser = await createUser(data)
      const callbackUrl = searchParams.get('callbackUrl') || '/products'
      await signIn('credentials', { email: createdUser.email, password: createdUser.password,
        callbackUrl
      })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || 'Failed to register. Please try again.')
      } else toast.error('Something went wrong')
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <div className='mx-auto my-12 flex max-w-xl flex-col justify-center rounded-xl bg-white px-4 py-12 lg:mt-20 lg:px-8'>
      <h1 className='text-center text-3xl font-semibold text-black'>Sign Up</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4'>
          <div className='flex flex-col gap-4 lg:flex-row'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter your last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter your last name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      id='password'
                      placeholder='Enter your password'
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-2 top-1/2 -translate-y-1/2 transform'
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeIcon className='h-5 w-5' />
                      ) : (
                        <EyeOffIcon className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col items-center space-y-6 pt-4'>
            <LoadingButton
              loading={isSigningUp}
              variant='secondary'
              className='w-1/2'
              text='Sign Up'
            />
            <p className='text-sm text-muted-foreground'>
              <span>Don&apos;t have an account?</span>{' '}
              <Link
                href='/signin'
                className='text-primary underline-offset-4 hover:underline'
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
