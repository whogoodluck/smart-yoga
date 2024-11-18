import Image from 'next/image'
import Link from 'next/link'
import { getFourProducts } from '@/services/product-service'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/product-card'
import yogaBanner from '@/public/images/yoga-banner.jpg'

export default async function HomePage() {
  const products = await getFourProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className='relative flex items-center justify-center py-12 text-white lg:h-[calc(100vh-6rem)]'>
        <Image
          src={yogaBanner}
          alt='Hero Background'
          fill
          className='inset-0 z-0 object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black opacity-40' />

        <div className='container z-10 mx-auto w-[90%] text-center'>
          <h1 className='text-3xl font-bold lg:text-6xl'>
            Enhance Your Yoga Experience
          </h1>
          <p className='mt-4 lg:text-xl'>
            Discover smart yoga products that guide and support your practice.
          </p>
          <Link
            href='/products'
            className={cn(
              buttonVariants({ size: 'lg', variant: 'secondary' }),
              'mt-8'
            )}
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className='container mx-auto w-[90%] pt-12 lg:pt-20'>
        <h2 className='text-center text-3xl font-bold text-black'>
          About Our Brand
        </h2>
        <p className='mt-6 text-center text-lg'>
          We believe in combining technology with wellness to help you achieve a
          deeper connection with your body and mind. Our smart yoga products are
          designed to provide real-time feedback and personalized routines,
          making every practice session meaningful and effective.
        </p>

        <div className='mt-8 grid gap-8 md:grid-cols-3'>
          <div className='rounded-lg bg-white p-8 text-center'>
            <div className='mx-auto mb-4 h-16 w-16'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 text-blue-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13 16h-1v-4h-1m4-4H9m-1 8h.01M12 6v1m6 3v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2z'
                />
              </svg>
            </div>
            <h3 className='mb-2 text-xl font-semibold'>Real-time Feedback</h3>
            <p>Get guided corrections to improve your form instantly.</p>
          </div>

          <div className='rounded-lg bg-white p-6 text-center'>
            <div className='mx-auto mb-4 h-16 w-16'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m-4-4h8m-8-4h8m-8-4h8'
                />
              </svg>
            </div>
            <h3 className='mb-2 text-xl font-semibold'>Enhanced Posture</h3>
            <p>Maintain proper alignment with smart tracking technology.</p>
          </div>

          <div className='rounded-lg bg-white p-6 text-center'>
            <div className='mx-auto mb-4 h-16 w-16'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 text-purple-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12h6m-3-3v6m-7 5h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h3 className='mb-2 text-xl font-semibold'>Tailored Routines</h3>
            <p>Receive custom yoga plans based on your progress.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className='container mx-auto w-[90%] py-12 text-center lg:py-20'>
        <h2 className='text-3xl font-bold text-black'>Featured Products</h2>
        <div className='mt-8 grid gap-8 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-white py-12 lg:py-20'>
        <div className='container mx-auto w-[90%] text-center'>
          <h2 className='text-3xl font-bold text-black'>
            Ready to Transform Your Yoga Practice?
          </h2>
          <p className='mt-6'>
            Explore our range of smart yoga products and start your journey
            today.
          </p>
          <Link
            href='/products'
            className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className='container mx-auto w-[90%] py-12 lg:py-20'>
        <h2 className='text-center text-3xl font-bold text-black'>
          What Our Customers Say
        </h2>

        <div className='mt-8 grid gap-8 md:grid-cols-3'>
          <blockquote className='rounded-lg bg-white p-6'>
            <p className='mb-4 italic'>
              &quot;The smart yoga mat has transformed my practice. I get
              instant feedback, and it feels like having a personal
              instructor!&quot;
            </p>
            <footer className='font-semibold'>- Sarah L.</footer>
          </blockquote>
          <blockquote className='rounded-lg bg-white p-6'>
            <p className='mb-4 italic'>
              &quot;I love the personalized routines. It’s amazing how tailored
              the sessions are based on my progress.&quot;
            </p>
            <footer className='font-semibold'>- John D.</footer>
          </blockquote>
          <blockquote className='rounded-lg bg-white p-6'>
            <p className='mb-4 italic'>
              &quot;The best investment I&apos;ve made for my yoga journey. It’s
              like having a private instructor at home.&quot;
            </p>
            <footer className='font-semibold'>- Emily R.</footer>
          </blockquote>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className='bg-black py-12 text-background lg:py-20'>
        <div className='container mx-auto w-[90%] text-center'>
          <h2 className='text-3xl font-bold text-white'>Stay Updated</h2>
          <p className='mt-4'>
            Subscribe to our newsletter for the latest yoga tips and product
            updates.
          </p>
          <form className='mt-6 flex justify-center'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='max-w-sm rounded-l-full rounded-r-none'
            />
            <Button
              type='submit'
              className='h-10 rounded-l-none bg-white px-6 py-2 text-primary hover:bg-gray-200'
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
