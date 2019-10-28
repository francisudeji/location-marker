import React, { useState, useRef } from 'react'
import { useGetLocationsQuery } from './hooks/use-location'
import LagosMap from './components/lagos-map'
import LocationForm from './components/location-form'
import LocationList from './components/location-list'
import { FaSpinner } from 'react-icons/fa'

function App() {
  const navRef = useRef()
  const [location, setLocation] = useState('')
  const [type, setType] = useState('add')
  const [editId, setEditId] = useState(null)
  const { data, error, loading } = useGetLocationsQuery()

  return (
    <div className='h-100vh bg-gray-100'>
      <header className='h-16 w-full bg-white border-b fixed left-0 top-0 text-gray-900 flex items-center flex px-1 md:px-6'>
        <div className='flex items-center'>
          <button
            className='p-3 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-100 lg:hidden'
            onClick={() => navRef.current.classList.toggle('-ml-100%')}
          >
            <svg
              className='fill-current h-5 w-5'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
          <span
            data-testid='header-text'
            className='font-semibold text-xl ml-2 lg:ml-0'
          >
            Location Marker
          </span>
        </div>
        <div className='flex-1 ml-10 hidden md:block'>
          <LocationForm
            editId={editId}
            type={type}
            location={location}
            setLocation={setLocation}
          />
        </div>
      </header>

      <main className='flex pt-16 h-full'>
        <aside
          className='-ml-100% lg:ml-0 bg-white h-full overflow-y-scroll w-80'
          ref={navRef}
          style={{
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <div className='md:hidden bla bla bla'>
            <LocationForm
              editId={editId}
              type={type}
              location={location}
              setLocation={setLocation}
            />
          </div>

          {loading && (
            <div data-testid='loading'>
              <FaSpinner />
            </div>
          )}

          {error && (
            <div data-testid='error'>
              Error Getting Locations {console.log(error)}
            </div>
          )}
          {data &&
            data.locations &&
            data.locations.length > 0 &&
            data.locations.map(location => (
              <LocationList
                key={location.id}
                id={location.id}
                name={location.name}
                latitude={location.latitude}
                longitude={location.longitude}
                setLocation={setLocation}
                setType={setType}
                setEditId={setEditId}
              />
            ))}
          {data && data.locations && data.locations.length === 0 && (
            <div className='text-center mt-6'>No Locations saved</div>
          )}
        </aside>
        <div className='flex-1 md:ml-0'>
          <LagosMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </main>
    </div>
  )
}

export default App
