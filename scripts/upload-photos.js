import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-08-23',
})

const imagesDir = path.resolve('./images') // folder at project root
const projectCode = 'GOTH'

async function uploadImages() {
  const files = fs.readdirSync(imagesDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f))

  for (const file of files) {
    const filePath = path.join(imagesDir, file)

    // Upload image asset
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: file,
    })

    console.log(`Uploaded ${file}: ${asset._id}`)

    // Create photo document
    // const projectCode = file.split('_')[0] // e.g., PRJ001 from PRJ001_image.jpg

    const title = `${projectCode}_${file.replace(/\.[^/.]+$/, '')}`
    console.log('creatign photo:', title)

    await client.create({
      _type: 'photo',
      title,
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      project: projectCode,
      tags: [],
      description: '',
      // Optional: link to project if known
    })
  }
}

uploadImages()
  .then(() => console.log('Done!'))
  .catch(console.error)
