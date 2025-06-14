import React from 'react'

const ImagePreview = ({ uploadImage, enhancedImage, loading, enhanceImage, error }) => {
    return (
        <div className='grid mt-8 grid-col-1 md:grid-cols-2 gap-4 w-full'>
            <div className='bg-gray-200 p-4 rounded-lg'>
                <h2 className='text-lg font-semibold mb-2 bg-gray-400 p-2 rounded-lg'>Original Image</h2>
                {uploadImage ? (
                    <img src={uploadImage} alt="Original" className='w-full h-auto rounded-lg' />
                ) : (
                    <div className='text-gray-600'>No image selected or provided</div>
                )}
                {uploadImage && (
                    <div>
                        <button
                            className='bg-blue-600 p-2 mt-3 rounded-lg font-semibold'
                            onClick={enhanceImage}
                            disabled={loading}
                        >
                            {loading ? 'Enhancing...' : 'Enhance with AI'}
                        </button>
                    </div>
                )}
                {error && (
                    <div className="text-red-500 mt-2">{error}</div>
                )}
            </div>
            <div className='bg-gray-200 p-4 rounded-lg'>
                <h2 className='text-lg font-semibold mb-2 p-2 rounded-lg bg-blue-500'>Enhanced Image</h2>
                {loading ? (
                    <div className='text-gray-600'>Enhancing image...</div>
                ) : enhancedImage ? (
                    <img src={enhancedImage} alt="Enhanced" className='w-full h-auto rounded-lg' />
                ) : (
                    <div className='text-gray-600'>No enhanced image available</div>
                )}
                {error && (
                    <div className="text-red-500 mt-2">{error}</div>
                )}
            </div>
        </div>
    )
}

export default ImagePreview