import { useEffect, useState } from 'react'
import MainLayout from '../components/global/MainLayout'

function Rents() {
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('data')
    const jsonParse = JSON.parse(data)

    if (jsonParse.user && jsonParse.user.role === 'admin') {
      setIsAdmin(true)
    }
  }, [])


  if (isAdmin) {
    return (
      <MainLayout>
        List
        Form
      </MainLayout>
    )
  } else {
    return (
      <h2>No tienes permisos para ver esta pagina</h2>
    )
  }
}

export default Rents