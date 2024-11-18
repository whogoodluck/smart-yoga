import fetch from 'node-fetch'

const imageUrls = [
  'https://images.pexels.com/photos/3824688/pexels-photo-3824688.jpeg',
  'https://images.pexels.com/photos/4283400/pexels-photo-4283400.jpeg',
  'https://images.pexels.com/photos/4214777/pexels-photo-4214777.jpeg',
  'https://images.pexels.com/photos/4214726/pexels-photo-4214726.jpeg',
  'https://images.pexels.com/photos/4201609/pexels-photo-4201609.jpeg',
  'https://images.pexels.com/photos/4194326/pexels-photo-4194326.jpeg',
  'https://images.pexels.com/photos/3815607/pexels-photo-3815607.jpeg',
  'https://images.pexels.com/photos/4214727/pexels-photo-4214727.jpeg',
  'https://images.pexels.com/photos/3985369/pexels-photo-3985369.jpeg',
  'https://images.pexels.com/photos/4340274/pexels-photo-4340274.jpeg',
  'https://images.pexels.com/photos/3951910/pexels-photo-3951910.jpeg',
  'https://images.pexels.com/photos/3997300/pexels-photo-3997300.jpeg',
  'https://images.pexels.com/photos/4176997/pexels-photo-4176997.jpeg',
  'https://images.pexels.com/photos/4258669/pexels-photo-4258669.jpeg',
  'https://images.pexels.com/photos/4342577/pexels-photo-4342577.jpeg',
  'https://images.pexels.com/photos/4214826/pexels-photo-4214826.jpeg',
  'https://images.pexels.com/photos/4214887/pexels-photo-4214887.jpeg',
  'https://images.pexels.com/photos/3985364/pexels-photo-3985364.jpeg',
  'https://images.pexels.com/photos/4176975/pexels-photo-4176975.jpeg'
]

async function checkImages() {
  for (const url of imageUrls) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.log(
          `Error: ${url} is not accessible (status code: ${res.status})`
        )
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message)
    }
  }
}

checkImages()
