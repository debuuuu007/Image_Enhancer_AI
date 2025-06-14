import React, { useState, useRef } from 'react'
import ImagePreview from './ImagePreview'
import ImageUpload from './ImageUpload'
import { enhancedImageAPI } from '../utils/ImageEnhancement'

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null) // preview URL
    const [uploadFile, setUploadFile] = useState(null)   // actual File object
    const [enhancedImage, setEnhancedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        setError(null)
        try {
            const file = e.target.files[0]
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (ev) => {
                    setUploadImage(ev.target.result)
                    setUploadFile(file)
                }
                reader.readAsDataURL(file)
            } else {
                setUploadImage(null)
                setUploadFile(null)
                setError('Please select a valid image file.')
            }
        } catch (err) {
            setError('Failed to load image.')
        }
    }

    const handleUploadClick = () => {
        setError(null)
        fileInputRef.current.click()
    }

    const enhanceImage = async () => {
        setLoading(true)
        setError(null)
        setEnhancedImage(null)
        try {
            const result = await enhancedImageAPI(uploadFile)
            if (result && result.data && result.data.image) {
                setEnhancedImage(result.data.image)
            } else {
                setError('Failed to enhance image. Please try again.')
            }
        } catch (err) {
            if (err.message === 'The processing is taking too long and hence cancelled') {
                setError('The processing is taking too long and hence cancelled')
            } else {
                setError('Error enhancing image. Please try again.')
            }
        }
        setLoading(false)
    }

    return (
        <div className='w-full flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg '>
            <ImageUpload
                setUploadImage={setUploadImage}
                uploadImage={uploadImage}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleUploadClick={handleUploadClick}
                error={error}
            />
            <ImagePreview
                loading={loading}
                uploadImage={uploadImage}
                enhancedImage={enhancedImage}
                enhanceImage={enhanceImage}
                error={error}
            />
        </div>
    )
}

export default Home