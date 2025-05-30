'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoginForm, loginFormSchema } from '@/validators/auth-schema'
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

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: LoginForm) {
    try {
      setIsSigningIn(true)
      const callbackUrl = searchParams.get('callbackUrl') || '/products'
      const response = await signIn('credentials', {
        ...data,
        redirect: false
      })
      if (response?.status === 401) toast.error('Invalid credentials')

      if (response?.status === 200) {
        router.push(callbackUrl)
        form.reset()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className='mx-auto my-12 flex max-w-xl flex-col justify-center rounded-xl bg-white px-4 py-12 lg:mt-20 lg:px-8'>
      <h1 className='text-center text-3xl font-semibold text-black'>Sign In</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4'>
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
              loading={isSigningIn}
              variant='secondary'
              className='w-1/2'
              text='Sign In'
            />
            <p className='text-sm text-muted-foreground'>
              <span>Don&apos;t have an account?</span>{' '}
              <Link
                href='/signup'
                className='text-primary underline-offset-4 hover:underline'
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
