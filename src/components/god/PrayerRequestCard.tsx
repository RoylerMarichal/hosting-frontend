import React from 'react'

const PrayerRequestCard = () => {
  return (
    <div className='bg-gray-50 mb-20 p-4 rounded-lg'>
        <div className="flex justify-between">
            <h3 className='subtitle'>Royler Marichal</h3>
            <span className='badge-main'>Vida espiritual</span>
        </div>
        <div className='pt-3'>
            <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur mollitia architecto molestias, illum facere quisquam assumenda iure ipsam deserunt sit inventore pariatur? Quidem officia, maxime reprehenderit totam officiis consequuntur.</p>
        </div>
        <div className="flex justify-end my-3">
            <button className='btn-main'>Orando</button>
        </div>
    </div>
  )
}

export default PrayerRequestCard