/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Button, List, Skeleton, Card } from 'antd'
import { Carousel } from 'antd'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const dataCards = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

function PropertyList(props) {
  const [propertyList, setPropertyList] = useState(null)
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null)
  const pathname = window.location.pathname

  useEffect(() => {
    // const data = localStorage.getItem('data')
    // const jsonParse = JSON.parse(data)
    if (props.properties) {
      setInitLoading(false);
      setPropertyList(props.properties)
    }
  }, [props.properties])

  useEffect(() => {
    const data = localStorage.getItem('data')
    const jsonParse = JSON.parse(data)

    if (jsonParse.user && jsonParse.user.role === 'admin') {
      setIsAdmin(true)
    }
  }, [])

  // const handleOpenPropertyForm = () => {
  //   props.setOpenPropertyForm(true)
  // }

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>Ver más</Button>
      </div>
    ) : null;

  // if (!propertyList) {
  //   return (<>Loading...</>)
  // }

  // return (
  //   <ul>
  //     {
  //       !!propertyList &&
  //       propertyList.map((property, i) => {
  //         return (
  //           <li key={i}>
  //             <div className='list-item'>
  //               <div className='list-item__info'>{property.name}</div>
  //               <div className='list-item__images'>
  //                 <ImageList
  //                   sx={{
  //                     width: 320,
  //                     height: 220,
  //                     overflowY: 'scroll',
  //                     overflowX: 'hidden',
  //                   }}
  //                   cols={3}
  //                   rowHeight={100}
  //                 >
  //                   {
  //                     // props.properties.map((item) => (
  //                     property.multimedia.map(src => (
  //                       <ImageListItem key={src.img}>
  //                         <iframe
  //                           width="100"
  //                           height="100"
  //                           src="https://www.youtube.com/embed/3NGpNQBtuqc?si=dFzVjs7YUTFcd7gc"
  //                           title="YouTube video player"
  //                           frameborder="0"
  //                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
  //                           allowfullscreen></iframe>
  //                       </ImageListItem>
  //                     ))

  //                     // ))
  //                   }
  //                 </ImageList>
  //               </div>
  //               {
  //                 props.isAdmin &&
  //                 <div className='list-item__actions flex'>
  //                   <div>
  //                     <input type='button' value={'Ver'} onClick={handleOpenPropertyForm} />
  //                   </div>
  //                   <div>
  //                     <input type='button' value={'Editar'} onClick={handleOpenPropertyForm} />
  //                   </div>
  //                   <div>
  //                     <input type='button' value={'Eliminar'} onClick={handleOpenPropertyForm} />
  //                   </div>
  //                 </div>
  //               }
  //             </div>
  //           </li>
  //         )
  //       })
  //     }
  //   </ul>
  // )

  if (isAdmin && pathname === '/admin') {
    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={propertyList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item.multimedia[0]} />}
                title={<a href="/">{item?.name}</a>}
                description={item.description}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }

  if (pathname === '/' && propertyList) {
    return (
      <div>
        <List
          style={{
            margin: 30
          }}
          grid={{
            gutter: 16,
            column: 4,
          }}
          dataSource={propertyList}
          renderItem={(item) => (
            <List.Item>
              {console.log(item)}
              <Card
                hoverable
                title={item.name}
                cover={<img alt="example" src={item?.multimedia[0]?.url} />}
              >

              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default PropertyList