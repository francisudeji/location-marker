import React, { useState } from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import { formatLocation } from '../utils'
import { useGetLocationsQuery } from '../hooks/use-location'

function Map() {
  const { data, error } = useGetLocationsQuery()
  const [selectedLocation, setSelectedLocation] = useState(null)

  if (error) {
    return (
      <div className='flex items-center justify-center'>
        <span className='text-2xl text-gray-900'>
          There was an error fetching google maps.
        </span>
      </div>
    )
  }

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 6.524379, lng: 3.379206 }}
    >
      {data &&
        data.locations.length > 0 &&
        data.locations.map(location => (
          <Marker
            key={location.id}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
      {selectedLocation && (
        <InfoWindow
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude
          }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div>
            <span className='block font-semibold text-indigo-500 text sm'>
              {selectedLocation.name}
            </span>
            <span className='block font-semibold text-gray-900 uppercase mt-3'>
              {`${formatLocation(selectedLocation.latitude)}° N`}
              {', '}
              {`${formatLocation(selectedLocation.longitude)}° E`}
            </span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

const LagosMap = withScriptjs(withGoogleMap(Map))

export default LagosMap
