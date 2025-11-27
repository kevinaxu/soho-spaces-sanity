import {createClient} from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-08-23',
})

const projectCode = 'GOTH'

async function bulkUpdatePhotos(projectCode) {
  // Fetch all photos for the project
  const photos = await client.fetch('*[_type == "photo" && project == $code]{_id}', {
    code: projectCode,
  })
  console.log(`Found ${photos.length} photos to update.`)

  // Loop and patch each photo
  for (const photo of photos) {
    await client
      .patch(photo._id)
      .set({
        tags: ['residential', 'kitchen'],
      })
      .commit({autoGenerateArrayKeys: true})

    console.log(`Updated photo ${photo._id}`)
  }

  console.log('Bulk update complete!')
}

// Run the update
bulkUpdatePhotos(projectCode).catch(console.error)
