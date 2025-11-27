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

// TODO: set these before running this script!!
const imagesDir = path.resolve('./images') // folder at project root
const projectCode = 'DARK'
const projectReferenceId = '07f88b7f-05db-4af2-a836-77d3be31559e'

async function uploadImages() {
  const files = fs.readdirSync(imagesDir).filter((f) => {
    const fullPath = path.join(imagesDir, f)
    return fs.statSync(fullPath).isFile() && /\.(jpg|jpeg|png)$/i.test(f)
  })

  for (const file of files) {
    const filePath = path.join(imagesDir, file)

    // Upload image asset
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: file,
    })

    console.log(`Uploaded ${file}: ${asset._id}`)

    const title = `${projectCode}_${file.replace(/\.[^/.]+$/, '')}`
    console.log('creatign photo:', title)

    await client.create({
      _type: 'photo',
      title,
      image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      projectCode,
      project: {_type: 'reference', _ref: projectReferenceId},
      tags: [],
    })
  }
}

uploadImages()
  .then(() => console.log('Done!'))
  .catch(console.error)
