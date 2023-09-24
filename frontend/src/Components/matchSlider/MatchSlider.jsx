import React, { useContext, useState } from 'react'
import {matchData} from '../../componentsData/matchData'
import {BiShareAlt,BiLink} from 'react-icons/bi'
import {DownloadSimple, Heart, Link} from 'phosphor-react'
import { Button,Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './MatchSlider.css'
import Slider from 'react-slick'
import {ArrowRight} from 'phosphor-react';
import { FavoritesContext } from '../favorites/FavoritesContext'
import { renderStats } from '../history/History'

const Match = () => {
    const {favorites,handleFavorites} = useContext(FavoritesContext);
    const NextArrow = (props) => {
      return <div onClick={props.onClick}><ArrowRight style={{position:'absolute',top:'50%',right:'-20px'}}/></div>;
    };
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2.5,
      responsive: [
        {
          breakpoint: 600, // À partir de cette largeur d'écran
          settings: {
            slidesToShow: 1, // Afficher 1 slide
          },
        },
        {
          breakpoint: 990,
          settings : {
            slidesToShow : 2 ,
          },
        },
      ],
      // nextArrow:<NextArrow/>,
      slidesToScroll: 1, 
      // autoplay: true,
      // autoplaySpeed: 1000,
      pauseOnHover: false, // Empêche la pause en survolant
      pauseOnFocus: false, // Empêche la pause en mettant le focus sur le slider
    };

    
  return (
    <div className='matchs d-flex flex-column justify-content-center align-items-center my-5 pb-2'>
      <div className='p-1 mx-3' style={{maxWidth:'950px',width:'90%'}}>
        <div className='w-100 d-flex justify-content-between p-2 '>
        <h6 style={{color:'var(--green)',textShadow:'0 0 1px black'}}>Videos Covered Previously</h6>
        <button className='see-btn'>
          <NavLink to='/connected/history' className='text-white text-decoration-none text-nowrap'>
            See All
            <ArrowRight color='var(--green)' size='min(22px,6vw)' weight='bold'/>
           </NavLink>
        </button>
      </div>
      <Slider {...settings} className='d-flex justify-content-center align-items-center w-100 ' >
          {matchData.map((match,index)=>(
            <div className='d-flex align-items-center justify-content-center w-100' key={index} >
              <div className='match d-flex flex-column justify-content-between p-1 pt-2 mx-2 w-100 h-100'>
                <div className='d-flex flex-column justify-content-center '>
                  <div className=' d-flex align-items-baseline'>
                    <span >
                      Match:{match.team1.name}
                      <img src={match.team1.src} alt={match.team1.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/>
                      vs. {match.team2.name}
                      <img src={match.team2.src} alt={match.team2.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/> 
                    </span>
                  </div>
                  <span >{match.matchdate}</span>
                  <div className='video-container'>
                    <video src={match.matchVideo.src} controls style={{minHeight:'100%',minWidth:'100%'}}></video>
                  </div>
                  {renderStats(match.generalStats,'General')}
                  {/* <div>
                    <span style={{fontSize:'min(14px,6vw)',color:'var(--green'}}>General Statistics:</span>
                    <Table>
                      <thead>
                        <tr>
                          <td></td>
                          <td>{match.team1.name}</td>
                          <td>{match.team2.name}</td>
                        </tr>
                      </thead>
                      <tbody>
                        {match.generalStats.map((gs,i1)=>(
                          <tr key={i1}>
                              <td>{gs[0]}</td>
                              <td>{gs[1]}</td>
                              <td>{gs[2]}</td>
                          </tr> 
                        ))}
                      </tbody>
                    </Table>
                  </div> */}
                </div>
                <div>
                  <div className='d-flex w-100 justify-content-center'>
                        <Button className='green-btn' style={{width:'fit-content'}}><NavLink to='/connected/history' className='text-decoration-none text-white' style={{fontSize:'min(13px,6vw)'}}>see more statistics</NavLink></Button>
                  </div>
                  <div className='d-flex justify-content-end gap-1 mt-1'>
                  {favorites.includes(index) ? <Heart size={22} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(index)}/> : <Heart size={22} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(index)}/>}
                  <DownloadSimple size={22} color="#f7f7f7" cursor='pointer'/>
                  <Link size={22} color="#f7f7f7" cursor='pointer'/>
                  </div>
                </div>
              </div>
            </div>  
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Match