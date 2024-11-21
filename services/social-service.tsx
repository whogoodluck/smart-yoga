'use server'

import prisma from '@/lib/prisma'

export async function getSocialMediaLinks() {
  return await prisma.socialMediaLink.findMany()
}

export async function getInstagramLink() {
  return await prisma.socialMediaLink.findFirst({
    where: { name: 'instagram' }
  })
}

export async function updateSocialMediaLinks(links: {
  facebook: string
  instagram: string
  twitter: string
}) {
  const { facebook, instagram, twitter } = links

  await prisma.socialMediaLink.upsert({
    where: { name: 'facebook' },
    update: { url: facebook },
    create: { name: 'facebook', url: facebook }
  })

  await prisma.socialMediaLink.upsert({
    where: { name: 'instagram' },
    update: { url: instagram },
    create: { name: 'instagram', url: instagram }
  })

  await prisma.socialMediaLink.upsert({
    where: { name: 'twitter' },
    update: { url: twitter },
    create: { name: 'twitter', url: twitter }
  })
}
