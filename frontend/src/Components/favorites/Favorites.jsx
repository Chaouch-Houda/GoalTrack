import React, { useContext, useState } from 'react'
import './Favorites.css'
import { FavoritesContext } from './FavoritesContext'
import { DownloadSimple, Heart, Link,ArrowDown,ArrowUp } from 'phosphor-react'
import { renderChart, renderStats } from '../history/History';
import { Button } from 'react-bootstrap';
import { matchData } from '../../componentsData/matchData';
const Favorites = () => {
  const {favorites,handleFavorites} = useContext(FavoritesContext);
  const [seeMoreStat,setSeeMoreStat] = useState([]);
  const handleSeeMoreStat = (index) =>{
    if (seeMoreStat.includes(index))
    setSeeMoreStat(seeMoreStat.filter((i)=> i !== index ));
    else setSeeMoreStat([...seeMoreStat,index])
  }

  return (
    <div  className="w-100 d-flex justify-content-center py-5 ">
      <div className='all-favorites px-2 px-md-4 py-5'>
        <h2>Favorites</h2>
        {matchData.map((match,index)=>(
          favorites.includes(match.id) &&
              <div key={index} className='w-100 d-flex align-items-center justify-content-center history-video-covered' id={`match${match.id}`}>
                <div className='w-100 h-100 d-flex flex-column justify-content-between py-3 px-1 px-md-3'>
                  <div className=' statistics'>
                    <div className='w-100 d-flex flex-column justify-content-center ' style={{maxWidth:'450px'}}>
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
                      {favorites.includes(match.id) ? <Heart size={20} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(match.id)}/> : <Heart size={20} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(match.id)}/>}
                      <DownloadSimple size={20} color="#f7f7f7" cursor='pointer'/>
                      <Link size={20} color="#f7f7f7" cursor='pointer'/>
                      </div>
                    </div>
                    <div className='w-100'>{renderStats(match.generalStats,'General')}</div>
                  </div>
                  <div className={seeMoreStat.includes(index) ? 'd-block' : 'd-none'}>
                    <div className='statistics'>
                      {renderStats(match.teamStats,'Teams')}
                      <div>
                        {renderChart(match.team1.name,match.team2.name)}
                      </div>
                    </div>
                    <div>
                      <span style={{fontSize:'min(14px,6vw)',color:'rgb(0, 255, 30)'}}>key Players Statistics:</span> 
                      <div className=' statistics'>
                        {Object.values(match.keyPlayerStats).map((val,i)=>
                          <table key={i} className='statistic-table' >
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
                                <tr key={i}>
                                  <td>{st[0]}</td>
                                  <td>{st[1]}</td>
                                  <td>{val[1].stats[i][1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                    <div className='statistics'>
                    {renderStats(match.goalkeeperStats,'Goalkeepers')}
                    {renderStats(match.defensiveStats,'Defensives')}
                    {renderStats(match.midfieldStats,'Midfields')}
                    {renderStats(match.attackingStats,'Attackings')}
                    </div>
                  </div>
                  <div className='w-100 d-flex justify-content-center my-3'>
                    {seeMoreStat.includes(index) ? 
                      <Button className='green-btn d-flex see-less-stat-btn' style={{width:'fit-content',fontSize:'min(13px,6vw)'}} onClick={()=>handleSeeMoreStat(index)}>
                        <span>see less statistics</span>
                        <ArrowUp weight='bold' size={18}/>
                      </Button>
                      :<Button className='green-btn d-flex gap-1 see-more-stat-btn' style={{width:'fit-content',fontSize:'min(13px,6vw)'}} onClick={()=>handleSeeMoreStat(index)}>
                        <span>see more statistics</span>
                        <ArrowDown weight='bold' size={18}/>
                      </Button>
                    }                
                  </div> 
                </div>
              </div>  
            ))}
      </div>
    </div>
  )
}

export default Favorites