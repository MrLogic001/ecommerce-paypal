const Feature = require('../../models/feature')

const addFeatureImages = async (req, res) => {
    try {
        const { image } = req.body;        

        const featureImages = new Feature({ image })

        await featureImages.save()

        res.status(201).json({
            success: true,
            data: featureImages
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Some error occurred!"
        })
    }
}

const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature.find({})

         res.status(201).json({
            success: true,
            data: images
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Some error occurred!"
        })
    }
}

module.exports = { addFeatureImages, getFeatureImages }