import React from 'react'
import NearMeIcon from '@mui/icons-material/NearMe';

export default function MessageBtn() {
  return (
    <div>
        <button
          className=' text-sm font-medium px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition nav-btn'
        >
            <NearMeIcon/>
            Message
        </button>
    </div>
  )
}
