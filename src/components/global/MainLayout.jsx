/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Stack } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

// Components
import CustomMainButton from '../global/CustomMainButton'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom';

const { Search } = Input

function MainLayout(props) {
  const [isAdmin, setIsAdmin] = useState(null)
  const pathname = window.location.pathname

  useEffect(() => {
    const data = localStorage.getItem('data')
    const jsonParse = JSON.parse(data)

    if (jsonParse.user && jsonParse.user.role === 'admin') {
      setIsAdmin(true)
    }
  }, [])

  const handleOpenPropertyForm = () => {
    props.setOpenPropertyForm(true)
  }

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch = (value, _e, info) => console.log(info?.source, value)

  const items = [
    {
      key: '1',
      label: (
        <Link to={'/'}>Início</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={'/admin'}>Administración</Link>
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Stack direction={'row'} className="header">
          <div className="flex-1 header__left">
            <h1>Logo</h1>
          </div>
          <div className="flex-3 header__mid">
            <Search
              placeholder="input search text"
              enterButton="Buscar"
              size="large"
              suffix={suffix}
              onSearch={onSearch}
            />
          </div>
          <div className="flex-1 header__right">
            <Dropdown menu={{ items }} placement="topRight">
              <Button>  <MenuIcon /></Button>
            </Dropdown>
          </div>
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <>
          <h2>Lista de inmuebles</h2>
        </>
        {
          (isAdmin && pathname === '/admin') &&
          <div className='toolbar flex'>
            <CustomMainButton
              title={'Nuevo'}
              disabled={false}
              handleClick={handleOpenPropertyForm}
            />
          </div>
        }
      </Grid>
      <Grid item xs={12} md={12}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default MainLayout