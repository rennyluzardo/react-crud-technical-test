/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
// Components
import MainLayout from "../components/global/MainLayout"
import PropertyList from "../components/home/PropertyList"
import PropertyForm from "../components/home/forms/PropertyForm"
import { getAllMultimedia } from "../config/indexdb"

function Admin(props) {
  const [openPropertyForm, setOpenPropertyForm] = useState(false)
  const [btnTitle, setBtnTitle] = useState('Guardar')
  const [isAdmin, setIsAdmin] = useState(null)
  const [properties, setProperties] = useState()

  useEffect(() => {
    const data = localStorage.getItem('data')

    if (data) {
      const jsonParse = JSON.parse(data)

      if (jsonParse.user && jsonParse.user?.role === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [])

  useEffect(() => {
    setProperties(props.properties)
  }, [props.properties])

  const fetchPropertyMultimedia = () => {
    const dataLocalStorage = localStorage.getItem('data')

    getAllMultimedia().then(images => {
      const localStorageParse = JSON.parse(dataLocalStorage)
      const propertiesParse = localStorageParse.properties.map(property => {
        const base64Images = images.filter((image) => image.propertyId === property.id)

        property.multimedia = base64Images.map(base64Image => ([{
          type: "image",
          url: base64Image.base64
        }]));

        return property
      })

      localStorageParse.properties = propertiesParse

      setProperties(propertiesParse)
    })
  }

  const handleSubmitForm = formData => {
    const data = localStorage.getItem('data')
    const dataParse = JSON.parse(data)

    dataParse.properties.push(formData)

    localStorage.setItem('data', JSON.stringify(dataParse))
    setOpenPropertyForm(false)
    fetchPropertyMultimedia()
  }

  const propsPropertyForm = {
    open: openPropertyForm,
    setOpenPropertyForm: setOpenPropertyForm,
    title: 'Nuevo inmueble',
    btnTitle: btnTitle,
    handleSubmit: handleSubmitForm,
    properties: properties,
  }

  const propsPropertyList = {
    open: openPropertyForm,
    setOpenPropertyForm: setOpenPropertyForm,
    isAdmin: isAdmin,
    properties: properties
  }

  const propsMainLayout = {
    setOpenPropertyForm: setOpenPropertyForm,
    pathname: props.location,
  }

  if (isAdmin) {
    return (
      <MainLayout {...propsMainLayout}>
        <PropertyList {...propsPropertyList} />
        <PropertyForm {...propsPropertyForm} />
      </MainLayout>
    )
  } else {
    return (
      <h2>No tienes permisos para ver esta pagina</h2>
    )
  }

}

export default Admin