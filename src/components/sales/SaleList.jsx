/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

function SaleList(props) {
  const [saleList, setSaleList] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('data')
    const jsonParse = JSON.parse(data)

    if (jsonParse.sales) {
      setSaleList(jsonParse.sales)
    }
  }, [])

  const handleOpenSaleForm = () => {
    props.setOpenPropertyForm(true)
  }

  const handleDelete = () => {

  }

  return (
    <ul>
      {
        !!saleList &&
        saleList.map((sale, i) => {
          return <li key={i}>
            <div className='list-item'>
              <div className='list-item__name'>{sale.name}</div>
              <div className='list-item__actions flex'>
                <div>
                  <input type='button' value={'Ver'} onClick={handleOpenSaleForm} />
                </div>
                <div>
                  <input type='button' value={'Editar'} onClick={handleOpenSaleForm} />
                </div>
                <div>
                  <input type='button' value={'Eliminar'} onClick={handleDelete} />
                </div>
              </div>
            </div>
          </li>
        })
      }
    </ul>
  )
}

export default SaleList