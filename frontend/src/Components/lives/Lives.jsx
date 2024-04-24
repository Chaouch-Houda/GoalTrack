import React from 'react'
import { matchData } from '../../componentsData/matchData'
import './Lives.css'
import logo from '../../assets/images/logo.png'

const Lives = () => {
  return (
    <div className='lives w-100 p-3 d-flex flex-column align-items-center justify-content-center'>
      <div className='w-100 pb-2'>
      <h6 style={{color:'var(--green)',textShadow:'0 0 1px black'}}>Lives on GoalTrack</h6>
      </div>
      <div className='d-grid mb-5'>
        {matchData.map((live,i)=>(
          <div key={i} className='live'>
            <div className='live-video position-relative'>
              <video src={live.matchVideo.src} controls style={{maxWidth:'100%'}}></video>
              <div className='live-word position-absolute py-0 px-2'>Live</div>
            </div>
            <div className='py-1 d-flex gap-1' style={{paddingLeft:'4px'}}>
              <img src={logo} alt="logo" style={{maxWidth:'60px',maxHeight:'30px'}} />
              <div className='d-flex align-items-baseline'>
                <span>
                  Match: {live.team1.name} 
                  <img src={live.team1.src} alt={live.team1.alt} width='25px' height='14px' style={{margin:'0 4px'}}/>
                  vs. {live.team2.name}
                  <img src={live.team2.src} alt={live.team2.alt} width='25px' height='14px' style={{margin:'0 4px'}}/>
                </span>
              </div>
            </div>
          </div>
        
        ))}
      </div>
    </div>
  )
}

export default Lives