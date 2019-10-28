import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {
  useAddLocationMutation,
  useEditLocationMutation
} from '../hooks/use-location'

function LocationForm({ type, setType, editId, location, setLocation }) {
  const addMutation = useAddLocationMutation(location)
  const editMutation = useEditLocationMutation(editId, location)

  return (
    <form
      className='flex justify-between p-3 border-b flex-1'
      onSubmit={e => {
        e.preventDefault()
        if (type === 'add') {
          addMutation()
          setLocation('')
        } else {
          editMutation()
          setType('add')
          setLocation('')
        }
      }}
    >
      <div className='flex-1 mr-2'>
        <input
          type='text'
          aria-label='location input'
          placeholder='Add new location'
          className='w-full px-3 py-3 rounded-lg border focus:outline-none focus:border focus:border-gray-400'
          value={location}
          required
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='w-12 h-12 flex text-center items-center justify-center bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default LocationForm
