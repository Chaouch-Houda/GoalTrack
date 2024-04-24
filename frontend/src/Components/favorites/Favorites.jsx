import React, { useContext, useState } from 'react'
import './Favorites.css'
import { FavoritesContext } from './FavoritesContext'
import VideosList from '../videosList/VideosList';
import { BiSearchAlt } from 'react-icons/bi';
import { Form } from 'react-bootstrap';
const Favorites = () => {
  const {favorites,handleFavorites} = useContext(FavoritesContext);

  const [searchFav,setSearchFav] = useState('');
  return (
    <div  className="w-100 d-flex justify-content-center py-5 " >
      <div className='all-favorites px-2 px-md-4 py-4'>
        
        <div className='py-2 d-flex'>
          <h2 style={{flex:'auto'}}>Favorites</h2>
          <Form className='search-video position-relative'>
                <BiSearchAlt color='gray' className='position-absolute'/>
                <Form.Control
                type='text'
                placeholder='Search'
                className='w-100'
                value={searchFav}
                onChange={(e)=> setSearchFav(e.target.value)}
                />
            </Form>
        </div>
        <VideosList title= "" videosList= {favorites} handleVideosList = {handleFavorites} deleteBtnExists = {false} deleteMsg = ""searchVideo ={searchFav} setSearchVideo={setSearchFav}/>
      </div>
    </div>
  )
}

export default Favorites