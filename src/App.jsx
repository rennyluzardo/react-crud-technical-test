// import { useState } from 'react'
// import './App.scss'
// import './scss/styles.scss'
import { Route, Routes } from 'react-router-dom'

import data from './data'
import { useEffect, useState, } from 'react'

// Components
import PropertyDetail from './components/home/PropertyDetail'
import Admin from './pages/Admin'
import Sales from './pages/Sales'
import SaleDetail from './components/sales/SaleDetail'
import Rents from './pages/Rents'
import RentDetail from './components/rents/RentDetail'
import Home from './pages/home'

import { getAllMultimedia } from './config/indexdb'

function App() {
  const [properties, setProperties] = useState([])
  const [isLoadedStorage, setIsLoadedStorage] = useState(false)

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('data')

    if (!dataLocalStorage) {
      localStorage.setItem('data', JSON.stringify(data))

      setIsLoadedStorage(true)

      return
    }


    setIsLoadedStorage(true)
  }, [])

  useEffect(() => {
    if (isLoadedStorage) {
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

  }, [isLoadedStorage])

  if (!window.indexedDB) {
    window.alert(
      "Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas",
    );
  }

  if (!isLoadedStorage) {
    return (
      <Routes>
        <Route path='/' element={<h6>Cargando</h6>} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Home properties={properties} />} />
      <Route
        path='/admin'
        element={<Admin
          properties={properties}
          setIsLoadedStorage={setIsLoadedStorage}
        />}
      />
      <Route path='/sales' element={<Sales />} />
      <Route path='/rents' element={<Rents />} />
      <Route path='/:id' element={<PropertyDetail />} />
      <Route path='/sales/:id' element={<SaleDetail />} />
      <Route path='/rents/:id' element={<RentDetail />} />
    </Routes>
  )
}

export default App
