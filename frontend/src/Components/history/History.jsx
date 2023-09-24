import React, { useContext, useState } from 'react'
import './History.css'
import { Button} from 'react-bootstrap'
import {NavLink } from 'react-router-dom'
import { DownloadSimple, Heart, Link } from 'phosphor-react'
import { matchData } from '../../componentsData/matchData'
import  {FavoritesContext} from '../favorites/FavoritesContext'

export const renderStats =(statsType,statsName)=>{
  return statsType && 
    (<div className='my-2'>
      <span style={{fontSize:'min(14px,6vw)',color:'rgb(0, 255, 30)'}}>{statsName} Statistics:</span>
      <table className='statistic-table'>
        <thead>
          <tr>
            <td></td>
            {Object.keys(statsType).map((key)=>
              <td>{key}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {(Object.values(statsType)[0]).map((st, index) => (
            <tr key={index}>
              <td>{st[0]}</td>
              <td>{st[1]}</td>
              <td>{Object.values(statsType)[1][index][1]}</td>
            </tr> 
            ))}
        </tbody>
      </table>
    </div>)
}

const History = () => {
  const {favorites,handleFavorites} = useContext(FavoritesContext);
  const [seeMoreStat,setSeeMoreStat] = useState(false);
  return (
    <div  className="w-100 d-flex justify-content-center py-5 ">
      <div className='all-history px-1 py-5'>
        <h2>History</h2>
        <div>
        <h6>Videos Covered Previously</h6>
        {matchData.map((match,index)=>(
            <div className='d-flex align-items-center justify-content-center w-100' key={index} >
              <div className='w-100 h-100 matchh d-flex flex-column justify-content-between p-3 pt-2 mx-2 '>
                <div className='d-flex to-column justify-content-evenly align-items-center '>
                  <div className='w-100 d-flex flex-column justify-content-center ' style={{maxWidth:'400px'}}>
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
                  <div className='d-flex justify-content-end gap-1 mt-1'>
                  {favorites.includes(index) ? <Heart size={20} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(index)}/> : <Heart size={20} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(index)}/>}
                  <DownloadSimple size={20} color="#f7f7f7" cursor='pointer'/>
                  <Link size={20} color="#f7f7f7" cursor='pointer'/>
                  </div>
                  </div>
                  {renderStats(match.generalStats,'General')}
                  {/* <div>
                      <span style={{fontSize:'min(14px,6vw)',color:'var(--green'}}>General Statistics:</span>
                      <table>
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
                      </table>
                  </div> */}
                </div>
                <div className='d-flex w-100 justify-content-center my-3'>
                  <Button className='green-btn' style={{width:'fit-content'}} onClick={()=>setSeeMoreStat(!seeMoreStat)}><NavLink to='/connected/history' className='text-decoration-none text-white' style={{fontSize:'min(13px,6vw)'}}>see more statistics</NavLink></Button>
                </div>
                <div className={seeMoreStat ? 'd-block' : 'd-none'}>
                    <span style={{fontSize:'min(14px,6vw)',color:'rgb(0, 255, 30)'}}>key Players Statistics:</span> 
                    <div className='d-flex justify-content-center gap-3 to-column'>
                      {Object.values(match.keyPlayerStats).map((val)=>
                        <table className='statistic-table'>
                          <thead>
                            <tr>
                              <td></td>
                              <td>
                                {val[0].name}
                                ({val[0].team})
                              </td>
                              <td>
                                {val[1].name}
                                ({val[1].team})
                              </td>
                            </tr> 
                          </thead>
                          <tbody>
                            {val[0].stats.map((st,i)=>(
                              <tr>
                                <td>{st[0]}</td>
                                <td>{st[1]}</td>
                                <td>{val[1].stats[i][1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  <div className='statistics'>
                  {renderStats(match.teamStats,'Teams')}
                  {renderStats(match.goalkeeperStats,'Goalkeepers')}
                  {renderStats(match.defensiveStats,'Defensives')}
                  {renderStats(match.midfieldStats,'Midfields')}
                  {renderStats(match.attackingStats,'Attackings')}
                  </div>
                </div>

                  
              </div>
            </div>  
          ))}
        </div>
      </div>
  </div>
  )
}

export default History