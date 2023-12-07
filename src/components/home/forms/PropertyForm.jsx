/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
// import Modal from '@mui/material/Modal'
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import { Modal, Typography } from '@mui/material';
import CustomInput from '../../global/CustomInput';
import { FormControl } from '@mui/base/FormControl';
import { styled, css } from '@mui/system'
import CustomMainButton from '../../global/CustomMainButton';
import InputFileUpload from "../../global/InputFileUpload";
import Divider from '@mui/material/Divider';
// import { getBase64 } from "../../../utils/transformers";
// import { storeFile } from "../../../config/indexdb";
// import idb from 'idb'
import { openDB } from 'idb';
import { getBase64 } from "../../../utils/transformers";
import { getAllMultimedia } from "../../../config/indexdb";

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

// function ChildModal(props) {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     if (props.open) {
//       handleOpen()
//     } else {
//       handleClose()
//     }

//   }, [props.open])

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//   };

//   return (
//     <Fragment>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id="child-modal-title">Text in a child modal</h2>
//           <p id="child-modal-description">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </Fragment>
//   );
// }

function PropertyForm(props) {
  const [properties, setProperties] = useState()
  const [formData, setFormData] = useState({});

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

  const handleClose = () => {
    props.setOpenPropertyForm(false)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const dataToSubmit = {
      ...formData
    }
    // console.log(dataToSubmit)
    props.handleSubmit(dataToSubmit)
  }

  const handleInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleInputFileUpload = async (event, typeFile) => {
    const { target } = event
    const { value, files } = target
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/youtube']
    const fileToUpload = {
      file: files[0],
      url: value,
      type: files[0].type,
      base64: await getBase64(files[0]).then(res => {
        return res
      })
    }

    if (!allowedTypes.includes(fileToUpload?.type)) {
      console.log("Archivo no permitido.");
      return
    }

    if (typeFile === 'video/youtube') {
      // setOpenChildModal(true)
      // TODO: open form to add youtube url
    }

    const db = await openDB('Images', 1, {
      upgrade(db) {
        const store = db.createObjectStore('images', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('title', 'title');
      },
    });

    await db.add('images', {
      title: 'Image 1',
      propertyId: 1,
      date: new Date('2019-01-01'),
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      base64: fileToUpload.base64,
    });

    fetchPropertyMultimedia()
  }

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        overflowY: 'scroll'
      }}
    >
      <ModalContent sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h6">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Ingresa la información del inmueble en este formulario
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <CustomInput
              id=""
              name='name'
              label="Nombre"
              placeholder='Escribe el nombre..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='description'
              label="Descripción"
              placeholder='Escribe la descripción..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='squareMeters'
              label="Metros cuadrados"
              placeholder='Escribe los metros cuadrados..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='floors'
              label="Pisos"
              placeholder='Escribe la cantidad de pisos..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name="bedrooms"
              label="Dormitorios"
              placeholder='Escribe la cantidad de dormitorios..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput id=""
              label="Baños"
              name='bathrooms'
              placeholder='Escribe el número de baños..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='parking'
              label="Estacionamiento"
              placeholder='Escribe el número de estacionamientos..'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='kitchen'
              label="Cocína"
              placeholder='¿Tiene cocina?'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='tv'
              label="Tv"
              placeholder='¿Tiene TV?'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name='fridge'
              label="Nevera"
              placeholder='¿Tiene Nevera?'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id=""
              name="diningTable"
              label="Comedor"
              placeholder='¿Tiene comedor?'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <InputFileUpload
              properties={properties}
              onChange={handleInputFileUpload}
            />
          </FormControl>
          <Divider orientation="horizontal" flexItem />
          <FormControl>
            <CustomMainButton
              title={props.btnTitle}
              disabled={false}
              type='submit'
              style={{ width: '100%', marginTop: 20, }}
            />
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PropertyForm