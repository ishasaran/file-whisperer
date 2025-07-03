
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'

// Setup multer for in-memory storage
const upload = multer({
  storage: multer.memoryStorage(),
})

interface ResponseData {
  filename?: string
  size?: number
  mimetype?: string
  error?: string
}

const apiRoute = nextConnect<NextApiRequest, NextApiResponse<ResponseData>>({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  },
})

apiRoute.use(upload.single('file'))

apiRoute.post((req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  res.status(200).json({
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  })
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apiRoute
