import {createClient} from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-08-23',
})

/**
 * Deletes photo documents by optional project code, and their unreferenced image assets.
 */
async function deletePhotos(projectCode) {
  const query = projectCode
    ? '*[_type == "photo" && project == $code]{_id, image{asset}}'
    : '*[_type == "photo"]{_id, image{asset}}'

  const params = projectCode ? {code: projectCode} : {}
  const photos = await client.fetch(query, params)

  console.log(`Found ${photos.length} photos to delete.`)
  for (const photo of photos) {
    const assetRef = photo.image.asset._ref

    // Delete the photo document
    console.log(`Deleting photo document ${photo._id}`)
    await client.delete(photo._id)

    // Check if the asset is referenced by any other photo
    const assetInUse = await client.fetch('*[_type == "photo" && image.asset._ref == $ref]', {
      ref: assetRef,
    })

    if (assetInUse.length === 0) {
      console.log(`Deleting unreferenced asset ${assetRef}`)
      await client.delete(assetRef)
    } else {
      console.log(`Asset ${assetRef} is still referenced elsewhere, skipping deletion.`)
    }
  }

  console.log('Done deleting photos and assets.')
}

// Example usage: delete all photos for a project
// deletePhotos('PRJ001').catch(console.error)

// To delete all photos regardless of project, use:
deletePhotos().catch(console.error)
