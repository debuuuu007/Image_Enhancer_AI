const API_KEY = 'wxeivanxqay1fzvdf'
const BASE_URL = 'https://techhk.aoscdn.com/api/tasks/visual/scale'
import axios from 'axios'

export const enhancedImageAPI = async (file) => {
    try {
        const taskid = await uploadImage(file)
        if (!taskid) throw new Error('Failed to upload image.')
        const enhancedImage = await enhanceImage(taskid)
        return enhancedImage
    } catch (err) {
        throw new Error(err.message || 'Image enhancement failed.')
    }
}

const uploadImage = async (file) => {
    try {
        const formData = new FormData()
        formData.append('image_file', file)

        const { data } = await axios.post(`${BASE_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-API-KEY': API_KEY
            }
        })
        console.log(data)
        // Check if the response contains task_id
        return data && data.data && data.data.task_id ? data.data.task_id : null
    } catch (err) {
        throw new Error('Image upload failed.')
    }
}

const enhanceImage = async (taskid) => {
    let progress = 0;
    let data = null;
    const startTime = Date.now();
    try {
        // Poll every 2 seconds until progress is 100 or timeout after 1 minute
        while (progress !== 100) {
            if (Date.now() - startTime > 60000) {
                throw new Error('The processing is taking too long and hence cancelled');
            }
            const response = await axios.get(`${BASE_URL}/${taskid}`, {
                headers: {
                    'X-API-KEY': API_KEY
                }
            });
            data = response.data;
            progress = data?.data?.progress ?? 0;
            if (progress !== 100) {
                await new Promise(res => setTimeout(res, 2000)); // wait 2 seconds
            }
        }
        console.log(data)
        return data;
    } catch (err) {
        // If the error is our timeout error, rethrow as is
        if (err.message === 'The processing is taking too long and hence cancelled') {
            throw err;
        }
        throw new Error('Image enhancement polling failed.')
    }
}