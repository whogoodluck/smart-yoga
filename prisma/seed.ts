import { hashPassword } from '@/services/user-service'
import { Role } from '@prisma/client'

import prisma from '@/lib/prisma'

async function main() {
  const users = [
    {
      firstName: 'Good',
      lastName: 'Luck',
      email: 'goodluck@example.com',
      password: 'securepassword',
      role: Role.ADMIN
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'securepassword',
      role: Role.ADMIN
    },
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'securepassword',
      role: Role.USER
    },
    {
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@example.com',
      password: 'securepassword',
      role: Role.USER
    }
  ]

  const products = [
    {
      name: 'Smart Yoga Mat Pro',
      description:
        'High-tech yoga mat with real-time feedback and posture correction.',
      price: 14999,
      image:
        'https://www.atha.one/wp-content/uploads/2021/10/pro_black_yogamat.jpg.webp',
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
        'https://blog.bestbuy.ca/wp-content/uploads/2018/12/fitness-trackers-.jpg',
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
        'https://media.istockphoto.com/id/620734990/photo/woman-practicing-advanced-yoga-pilates-stretching-training-yoga-wheel-poses.jpg?s=612x612&w=0&k=20&c=lh9xi9w7Cj4GdA1k1BIiVCh_Ti4nf7mYT08BTSZ0RxM=',
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
        'https://media.istockphoto.com/id/1476493286/photo/pilates-physiotherapy-and-massage-woman-with-foam-roller-on-floor-for-leg-tension-and-support.jpg?s=612x612&w=0&k=20&c=a-f9qERo21VDJf9ohPu1LQGuD1EjhaJdeDoK9hzn_o0=',
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
        'https://media.istockphoto.com/id/1333975306/photo/young-african-american-couple-smiling-happy-training-using-chair-at-sport-center.jpg?s=612x612&w=0&k=20&c=yr-49Hy9EeXRSRwKkpuFYlkZaB4FKTF9GsvBOZ_-3hw=',
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
        'https://images.squarespace-cdn.com/content/v1/61f7b214c3e111165a45cd53/1675099487959-20XL9QK69EB4H9ANEJWC/LHP-Brand-Shoot-179.jpg',
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
        'https://standuppaddleboardworld.com/wp-content/uploads/2023/05/ceb30971-5744-4c50-95c6-90c71ccc49c2-shutterstock_1452889004.jpg',
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
        'https://media.istockphoto.com/id/1306214707/photo/bringing-the-body-and-mind-together-into-one-harmonious-experience.jpg?s=612x612&w=0&k=20&c=Kl2HPY40fAaOlzHi3GFNa6nxem959s02QgmjMXqEzGQ=',
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
        'https://www.corebalance.co.uk/cdn/shop/files/EVA_Yoga_Block_2025_S_EBC_Feature_4.jpg?v=1739357638&width=1080',
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
        'https://www.huggermugger.com/wp-content/uploads/2021/02/supported-savasana.jpg',
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
        'https://t3.ftcdn.net/jpg/02/32/44/44/360_F_232444426_A8Bpd0II2HAboHDndASG5VIEZKlyeBsf.jpg',
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
        'https://www.yogapaws.com/cdn/shop/products/DSC_0490_preview.jpeg?v=1597482123',
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
        'https://media.istockphoto.com/id/1307599895/photo/slender-girl-doing-stretching-with-yoga-blocks.jpg?s=612x612&w=0&k=20&c=xyV6q_V3hHMxPaQDlmbpLQU6TnrUjF_4jIhkLQeeefs=',
      category: 'Block',
      material: 'Foam',
      dimensions: '23x15x8 cm',
      weight: '0.7 kg',
      brand: 'BlockYoga',
      rating: 4.3
    }
  ]

  const blogs = [
    {
      title: 'Benefits of Morning Yoga',
      content:
        'Discover the amazing benefits of starting your day with morning yoga. From improved flexibility to a calmer mind, learn why yoga is the perfect way to begin your day.',
      image:
        'https://yogajala.com/wp-content/uploads/8-Benefits-Of-Morning-Yoga.jpg',
      tags: ['yoga', 'wellness', 'morning routine']
    },
    {
      title: 'Meditation Techniques for Beginners',
      content:
        'Learn simple and effective meditation techniques that are perfect for beginners. Start your journey towards mindfulness and inner peace today.',
      image:
        'https://www.burnalong.com/wp-content/uploads/2022/04/female-teacher-leading-group-of-mature-men-1.jpg',
      tags: ['meditation', 'mindfulness', 'yoga']
    },
    {
      title: 'Top 5 Yoga Poses for Stress Relief',
      content:
        'Feeling stressed? Try these top 5 yoga poses that are specifically designed to help you relax and de-stress after a long day.',
      image:
        'https://www.dexterwellness.org/wp-content/uploads/sites/17/2024/09/PWM-2968454_Sept10_YogaPoses_Graphic-2-scaled.jpg',
      tags: ['stress relief', 'yoga poses', 'health']
    },
    {
      title: 'Mindful Eating: Combining Yoga and Nutrition',
      content:
        'Discover how to incorporate mindful eating practices into your yoga routine. Learn the connection between nutrition and yoga for a balanced lifestyle.',
      image:
        'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2024/03/633081-5-Mindful-Eating-Techniques-for-a-Healthier-Relationship-With-Food-1296x728-header_body.jpg',
      tags: ['nutrition', 'mindful eating', 'yoga']
    },
    {
      title: 'The Power of Breath in Yoga',
      content:
        'Breath control is an essential aspect of yoga. Discover the power of breath and how it can transform your yoga practice and overall well-being.',
      image:
        'https://anandayogadetox.com/wp-content/uploads/2025/02/WhatsApp-Image-2025-01-15-at-13.05.51.jpeg',
      tags: ['breathwork', 'yoga practice', 'well-being']
    },
    {
      title: 'Yoga and Mental Health: Finding Inner Peace',
      content:
        'Yoga is not just physical exercise; it’s also a great way to support mental health. Learn how yoga can help manage stress, anxiety, and depression.',
      image:
        'https://images.pexels.com/photos/2908175/pexels-photo-2908175.jpeg',
      tags: ['mental health', 'yoga benefits', 'inner peace']
    },
    {
      title: 'Yoga for Athletes: Enhancing Performance',
      content:
        'Athletes can greatly benefit from yoga. Explore how yoga can enhance athletic performance, improve flexibility, and aid in recovery.',
      image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
      tags: ['athletes', 'performance', 'yoga']
    },
    {
      title: 'Setting Intentions in Your Yoga Practice',
      content:
        'Setting an intention is a powerful way to enhance your yoga practice. Learn how to set meaningful intentions and align your practice with your personal goals.',
      image:
        'https://yogajala.com/wp-content/uploads/2021/11/Setting-Yoga-Intentions_-A-Guide-6.jpg',
      tags: ['intention', 'mindfulness', 'yoga practice']
    }
  ]

  try {
    console.log('Deleting existing data...')
    await prisma.blog.deleteMany()
    await prisma.product.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.user.deleteMany()

    console.log('Hashing passwords...')
    const usersWithHashedPasswords = await Promise.all(
      users.map(async user => ({
        ...user,
        password: await hashPassword(user.password)
      }))
    )

    console.log('Seeding users...')
    await prisma.user.createMany({
      data: usersWithHashedPasswords
    })

    console.log('Creating carts for users...')
    const allUsers = await prisma.user.findMany()
    const carts = allUsers.map(user => ({
      userId: user.id
    }))
    await prisma.cart.createMany({
      data: carts
    })

    console.log('Seeding products...')
    await prisma.product.createMany({
      data: products
    })

    console.log('Seeding blogs...')
    const blogsWithAuthors = blogs.map((blog, index) => ({
      ...blog,
      authorId: allUsers[index % allUsers.length].id
    }))

    for (const blog of blogsWithAuthors) {
      await prisma.blog.create({
        data: {
          title: blog.title,
          content: blog.content,
          image: blog.image,
          tags: { set: blog.tags },
          authorId: blog.authorId
        }
      })
    }

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
