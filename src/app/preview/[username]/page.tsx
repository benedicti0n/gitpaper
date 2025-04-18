import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        const response = axios.get(`/preview/getWallpaper?username=${}`)
    }, [])
    return (
        <div className='h-screen w-full flex justify-center items-center' style={{ backgroundImage: `${}` }}>
            <img src=`${ }` alt=`${ }` />
        </div>
    )
}

export default page