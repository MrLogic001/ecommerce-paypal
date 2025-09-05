const express = require("express")
const { upload } = require('../../helpers/cloudinary.js')
const { imageUploadUtil } = require("../../helpers/cloudinary")
const { addProduct, fetchAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/productsController.js')

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await imageUploadUtil(url)

        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: 'An error occurred.'
        })
    }
}

const router = express.Router()

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add', addProduct)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/get', fetchAllProducts)


module.exports = router;