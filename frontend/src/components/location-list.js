import React, { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { formatLocation } from '../utils'
import { useDeleteLocationMutation } from '../hooks/use-location'

function LocationList({
  id,
  name,
  latitude,
  longitude,
  setLocation,
  setType,
  setEditId
}) {
  const [_id, setId] = useState(null)
  const deleteMutation = useDeleteLocationMutation(_id)

  useEffect(() => {
    if (_id !== null) {
      deleteMutation()
    }
  }, [_id])
  return (
    <ul data-testid='location-list' className='my-3'>
      <li className='flex items-center mt-3 rounded shadow-md border-b p-3'>
        <div className='flex-1'>
          <div>
            <div className='text-indigo-500 text-xs uppercase'>Name</div>
            <div className='text-sm text-gray-800 font-normal'>{name}</div>
          </div>
          <div className='mt-2'>
            <div className='text-indigo-500 text-xs uppercase'>Lat / Lng</div>
            <div className='text-sm text-gray-800 font-normal'>
              <span>{formatLocation(latitude)}</span>
              {' / '}
              <span>{formatLocation(longitude)}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-end w-2/5'>
          <button
            className='rounded-full text-indigo-500 rounded-lg p-4 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none mr-2'
            aria-label='Edit Location'
            onClick={() => {
              setEditId(id)
              setType('edit')
              setLocation(name)
            }}
          >
            <FaPen className='text-lg' />
          </button>
          <button
            className='rounded-full text-red-800 rounded-lg p-4 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none'
            aria-label='Delete Location'
            onClick={() => {
              setId(id)
            }}
          >
            <FaTrash className='text-lg' />
          </button>
        </div>
      </li>
    </ul>
  )
}

export default LocationList
