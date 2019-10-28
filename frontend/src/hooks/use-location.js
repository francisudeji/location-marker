import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

export const CACHED_LOCATIONS_QUERY = gql`
  query {
    locations @client {
      id
      name
      latitude
      longitude
    }
  }
`

export function useGetLocationsQuery() {
  const { loading, error, data } = useQuery(gql`
    query {
      locations {
        id
        name
        longitude
        latitude
      }
    }
  `)

  return { loading, error, data }
}

export function useAddLocationMutation(location) {
  const [addMutation] = useMutation(gql`
    mutation {
      addLocation(name: "${location}") {
        id
        name
        latitude
        longitude
      }
    }
  `)

  const mutation = () =>
    addMutation({
      update: (cache, { data }) => {
        const existingLocations = cache.readQuery({
          query: CACHED_LOCATIONS_QUERY
        })

        const newLocation = data.addLocation

        cache.writeQuery({
          query: CACHED_LOCATIONS_QUERY,
          data: { locations: [newLocation, ...existingLocations.locations] }
        })
      }
    })

  return mutation
}

export function useEditLocationMutation(editId, location) {
  const [editMutation] = useMutation(gql`
    mutation {
      editLocation(id: "${editId}", name: "${location}") {
        id
        name
        latitude
        longitude
      }
    }
  `)

  const mutation = () =>
    editMutation({
      update: (cache, { data }) => {
        const existingLocations = cache.readQuery({
          query: CACHED_LOCATIONS_QUERY
        })

        const updatedLocation = data.editLocation
        const existingLocationsCopy = [...existingLocations.locations]
        const filtered = existingLocationsCopy.filter(
          l => l.id !== updatedLocation.id
        )
        const newUpdate = [updatedLocation, ...filtered]

        cache.writeQuery({
          query: CACHED_LOCATIONS_QUERY,
          data: {
            locations: [...newUpdate]
          }
        })
      }
    })

  return mutation
}

export function useDeleteLocationMutation(_id) {
  const [deleteMutation] = useMutation(
    gql`
      mutation {
        deleteLocation(id: "${_id}") {
          id
          name
          latitude
          longitude
        }
      }
    `
  )

  const mutation = () =>
    deleteMutation({
      update: (cache, { data }) => {
        const existingLocations = cache.readQuery({
          query: CACHED_LOCATIONS_QUERY
        })

        const deletedLocation = data.deleteLocation
        if (deletedLocation !== null) {
          cache.writeQuery({
            query: CACHED_LOCATIONS_QUERY,
            data: {
              locations: existingLocations.locations.filter(
                l => l.id !== deletedLocation.id
              )
            }
          })
        }
      }
    })

  return mutation
}
