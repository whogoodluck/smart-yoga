import prisma from '@/lib/prisma'

async function main() {
  console.log('Seeding products...')

  const products = [
    {
      name: 'Smart Yoga Mat Pro',
      description:
        'High-tech yoga mat with real-time feedback and posture correction.',
      price: 14999,
      image:
        'https://images.pexels.com/photos/3824688/pexels-photo-3824688.jpeg'
    },
    {
      name: 'Yoga Wearable Tracker',
      description: 'Track your movements and monitor your yoga progress.',
      price: 9999,
      image:
        'https://images.pexels.com/photos/4283400/pexels-photo-4283400.jpeg'
    },
    {
      name: 'Smart Yoga Wheel',
      description:
        'Enhance your flexibility and posture with a smart yoga wheel.',
      price: 6999,
      image:
        'https://images.pexels.com/photos/4214726/pexels-photo-4214726.jpeg'
    },
    {
      name: 'Yoga Foam Roller',
      description: 'Foam roller with built-in sensors for body recovery.',
      price: 3999,
      image:
        'https://images.pexels.com/photos/4201609/pexels-photo-4201609.jpeg'
    },
    {
      name: 'Smart Yoga Chair',
      description:
        'Chair designed for yoga practice with posture correction features.',
      price: 19999,
      image:
        'https://images.pexels.com/photos/4194326/pexels-photo-4194326.jpeg'
    },
    {
      name: 'Yoga Resistance Bands',
      description: 'Resistance bands for improving strength and flexibility.',
      price: 1999,
      image:
        'https://images.pexels.com/photos/3815607/pexels-photo-3815607.jpeg'
    },
    {
      name: 'Balance Board',
      description:
        'Yoga balance board for improving core strength and stability.',
      price: 8999,
      image:
        'https://images.pexels.com/photos/4214727/pexels-photo-4214727.jpeg'
    },
    {
      name: 'Smart Yoga Mirror',
      description: 'Smart mirror that tracks and corrects your yoga posture.',
      price: 39999,
      image:
        'https://images.pexels.com/photos/4340274/pexels-photo-4340274.jpeg'
    },
    {
      name: 'Yoga Blocks Set',
      description: 'Set of yoga blocks to assist in various poses.',
      price: 2599,
      image:
        'https://images.pexels.com/photos/3997300/pexels-photo-3997300.jpeg'
    },
    {
      name: 'Yoga Bolster',
      description: 'Bolster pillow for better support during yoga poses.',
      price: 3999,
      image:
        'https://images.pexels.com/photos/4258669/pexels-photo-4258669.jpeg'
    },
    {
      name: 'Yoga Resistance Rings',
      description: 'Smart rings for resistance training during yoga practice.',
      price: 2499,
      image:
        'https://images.pexels.com/photos/4342577/pexels-photo-4342577.jpeg'
    },
    {
      name: 'Yoga Gloves',
      description: 'Non-slip gloves for enhanced grip during yoga.',
      price: 1999,
      image:
        'https://images.pexels.com/photos/4214826/pexels-photo-4214826.jpeg'
    },
    {
      name: 'Yoga Foam Block',
      description: 'Foam blocks for added support in various poses.',
      price: 1699,
      image:
        'https://images.pexels.com/photos/4176975/pexels-photo-4176975.jpeg'
    }
  ]

  try {
    await prisma.product.deleteMany()
    await prisma.product.createMany({ data: products })
    console.log('Seed data created successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
