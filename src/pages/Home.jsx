/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
// Components
import MainLayout from "../components/global/MainLayout"
import PropertyList from "../components/home/PropertyList"

function Home(props) {
  const [openPropertyForm, setOpenPropertyForm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('data')
    const jsonParse = JSON.parse(data)

    if (jsonParse.user && jsonParse.user.role === 'admin') {
      setIsAdmin(true)
    }
  }, [])

  const propsPropertyList = {
    open: openPropertyForm,
    setOpenPropertyForm: setOpenPropertyForm,
    isAdmin: isAdmin,
    properties: props.properties
  }

  const propsMainLayout = {
    setOpenPropertyForm: setOpenPropertyForm,
  }

  return (
    <MainLayout {...propsMainLayout}>
      <PropertyList {...propsPropertyList} />
    </MainLayout>
  )
}

export default Home