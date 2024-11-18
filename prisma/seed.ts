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
        'https://images.pexels.com/photos/3824688/pexels-photo-3824688.jpeg',
      category: 'Mat',
      material: 'Rubber',
      dimensions: '72x24 inches',
      weight: '2.5 kg',
      brand: 'TechYoga',
      rating: 4.5
    },
    {
      name: 'Yoga Wearable Tracker',
      description: 'Track your movements and monitor your yoga progress.',
      price: 9999,
      image:
        'https://images.pexels.com/photos/4283400/pexels-photo-4283400.jpeg',
      category: 'Wearable',
      material: 'Plastic',
      dimensions: '5x5x1 cm',
      weight: '50 g',
      brand: 'FitYoga',
      rating: 4.3
    },
    {
      name: 'Smart Yoga Wheel',
      description:
        'Enhance your flexibility and posture with a smart yoga wheel.',
      price: 6999,
      image:
        'https://images.pexels.com/photos/4214726/pexels-photo-4214726.jpeg',
      category: 'Wheel',
      material: 'Foam',
      dimensions: '12 inches',
      weight: '1 kg',
      brand: 'FlexiYoga',
      rating: 4.7
    },
    {
      name: 'Yoga Foam Roller',
      description: 'Foam roller with built-in sensors for body recovery.',
      price: 3999,
      image:
        'https://images.pexels.com/photos/4201609/pexels-photo-4201609.jpeg',
      category: 'Roller',
      material: 'Foam',
      dimensions: '18 inches',
      weight: '0.8 kg',
      brand: 'BodyFlex',
      rating: 4.2
    },
    {
      name: 'Smart Yoga Chair',
      description:
        'Chair designed for yoga practice with posture correction features.',
      price: 19999,
      image:
        'https://images.pexels.com/photos/4194326/pexels-photo-4194326.jpeg',
      category: 'Chair',
      material: 'Wood',
      dimensions: '45x50x100 cm',
      weight: '7 kg',
      brand: 'YogaFit',
      rating: 4.6
    },
    {
      name: 'Yoga Resistance Bands',
      description: 'Resistance bands for improving strength and flexibility.',
      price: 1999,
      image:
        'https://images.pexels.com/photos/3815607/pexels-photo-3815607.jpeg',
      category: 'Bands',
      material: 'Latex',
      dimensions: '50 cm (length)',
      weight: '150 g',
      brand: 'StrengthFit',
      rating: 4.4
    },
    {
      name: 'Balance Board',
      description:
        'Yoga balance board for improving core strength and stability.',
      price: 8999,
      image:
        'https://images.pexels.com/photos/4214727/pexels-photo-4214727.jpeg',
      category: 'Board',
      material: 'Wood',
      dimensions: '30x60 cm',
      weight: '3 kg',
      brand: 'CoreYoga',
      rating: 4.8
    },
    {
      name: 'Smart Yoga Mirror',
      description: 'Smart mirror that tracks and corrects your yoga posture.',
      price: 39999,
      image:
        'https://images.pexels.com/photos/4340274/pexels-photo-4340274.jpeg',
      category: 'Mirror',
      material: 'Glass',
      dimensions: '100x60 cm',
      weight: '12 kg',
      brand: 'YogaVision',
      rating: 4.9
    },
    {
      name: 'Yoga Blocks Set',
      description: 'Set of yoga blocks to assist in various poses.',
      price: 2599,
      image:
        'https://images.pexels.com/photos/3997300/pexels-photo-3997300.jpeg',
      category: 'Blocks',
      material: 'Cork',
      dimensions: '23x15x8 cm',
      weight: '1 kg',
      brand: 'YogaEssentials',
      rating: 4.4
    },
    {
      name: 'Yoga Bolster',
      description: 'Bolster pillow for better support during yoga poses.',
      price: 3999,
      image:
        'https://images.pexels.com/photos/4258669/pexels-photo-4258669.jpeg',
      category: 'Bolster',
      material: 'Cotton',
      dimensions: '60x20 cm',
      weight: '1.2 kg',
      brand: 'RelaxYoga',
      rating: 4.6
    },
    {
      name: 'Yoga Resistance Rings',
      description: 'Smart rings for resistance training during yoga practice.',
      price: 2499,
      image:
        'https://images.pexels.com/photos/4342577/pexels-photo-4342577.jpeg',
      category: 'Rings',
      material: 'Silicone',
      dimensions: '10 cm (diameter)',
      weight: '200 g',
      brand: 'FlexResistance',
      rating: 4.2
    },
    {
      name: 'Yoga Gloves',
      description: 'Non-slip gloves for enhanced grip during yoga.',
      price: 1999,
      image:
        'https://images.pexels.com/photos/4214826/pexels-photo-4214826.jpeg',
      category: 'Gloves',
      material: 'Silicone',
      dimensions: 'One size',
      weight: '100 g',
      brand: 'GripYoga',
      rating: 4.1
    },
    {
      name: 'Yoga Foam Block',
      description: 'Foam blocks for added support in various poses.',
      price: 1699,
      image:
        'https://images.pexels.com/photos/4176975/pexels-photo-4176975.jpeg',
      category: 'Block',
      material: 'Foam',
      dimensions: '23x15x8 cm',
      weight: '0.7 kg',
      brand: 'BlockYoga',
      rating: 4.3
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
