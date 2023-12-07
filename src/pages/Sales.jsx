import { useEffect, useState } from "react"

// Components
import MainLayout from "../components/global/MainLayout"
import SaleList from "../components/sales/SaleList"

function Sales() {
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
        <SaleList />
        Form
      </MainLayout>
    )
  } else {
    return (
      <h2>No tienes permisos para ver esta pagina</h2>
    )
  }

}

export default Sales