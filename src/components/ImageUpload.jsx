import React from 'react'

const ImageUpload = ({
    setUploadImage,
    uploadImage,
    fileInputRef,
    handleFileChange,
    handleUploadClick,
    error
}) => {
    return (
        <div className='bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center'>
            <label htmlFor="inputFile" className='block cursor-pointer w-full border-2 border-dashed border-gray-300 rounded-lg p-5 hover:border-blue-700 transition-all duration-300'>
                <input
                    type="file"
                    id="inputFile"
                    className='hidden'
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <span className='text-lg font-medium text-gray-600'>
                    Click or drag the image
                </span>
            </label>
            <button
                className='mt-3 p-3 bg-green-500 rounded-lg font-semibold hover:shadow-lg transition-all duration-300'
                onClick={handleUploadClick}
                type="button"
            >
                Click to upload
            </button>
            {/* Optionally show preview here if you want */}
            {/* Show error if present */}
            {error && (
                <div className="text-red-500 mt-2">{error}</div>
            )}
        </div>
    )
}

export default ImageUpload