import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PropertyDetail() {
  const params = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    if (params.id) {
      const data = localStorage.getItem('data')

      if (data) {
        const foundProperty = JSON.parse(data).properties.find((n) => n.id === Number(params.id))

        if (foundProperty) {
          setProperty(foundProperty)
        }
      }
    }
  }, [params.id])

  if (!property) {
    return (<>Loading...</>)
  }

  return (
    <>
      {
        property.name
      }
    </>
  )
}

export default PropertyDetail