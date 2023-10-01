import React, { useContext, useEffect, useRef, useState } from 'react'
import './History.css'
import { Button} from 'react-bootstrap'
import {NavLink } from 'react-router-dom'
import { DownloadSimple, Heart, Link ,ArrowDown,ArrowUp, CaretDoubleDown, ArrowFatDown, ArrowFatLineDown, ArrowFatLinesDown} from 'phosphor-react'
import { matchData } from '../../componentsData/matchData'
import  {FavoritesContext} from '../favorites/FavoritesContext'
import ReactApexChart from 'react-apexcharts'
import {FaTrash} from 'react-icons/fa'
import {MdMoreVert} from 'react-icons/md';
import { DownloadsContext } from './DownloadsContext'
import { HistoryContext } from './HistoryContext'

export const renderStats =(statsType,statsName)=>{
  return statsType && 
    (<div className='w-100 my-2'>
      <span style={{fontSize:'min(14px,6vw)',color:'rgb(0, 255, 30)'}}>{statsName} Statistics:</span>
      <table className='statistic-table'>
        <thead>
          <tr>
            <td></td>
            {Object.keys(statsType).map((key)=>
              <td key={key}>{key}</td>
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
export const renderChart = (team1,team2) =>{
  const chartOptions = {
    chart: {
      type: 'area',
      stacked: true,
    },
    xaxis: {
      categories: ['Match Start', '15 min', '30 min', '45 min', '60 min', '75 min', '90 min'],
      labels: {
        style: {
          colors: '#ffffff', // Couleur du texte sur l'axe X
        },
      },
    },
    yaxis: {
      title: {
        text: 'Ball Possession (%)',
        style: {
          color: 'rgb(0, 255, 30)', // Couleur du texte du titre de l'axe Y
          fontWeight :500,
          fontSize : '12px',
        },
      },
      labels: {
        style: {
          colors: '#ffffff', // Couleur du texte sur l'axe Y
        },
      },
    },
    tooltip: {
      theme: 'dark', // Thème de la tooltip
      style: {
        // background: '#ffffff', // Couleur d'arrière-plan de la tooltip
        color: '#000000', // Couleur du texte de la tooltip
      },
    },
    colors: ['#00e600', '#004d00'], // Couleurs des zones pour les équipes 1 et 2
  };
  
  const chartSeries = [
    {
      name: team1,
      data: [50, 55, 60, 65, 70, 75, 80],
    },
    {
      name: team2,
      data: [50, 45, 40, 35, 30, 25, 20],
    },
  ];
  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={350}/>
    </div> 
  )
}

const History = () => {
  const {favorites,handleFavorites} = useContext(FavoritesContext);
  const [seeMoreStat,setSeeMoreStat] = useState([]);
  const handleSeeMoreStat = (index) =>{
    if (seeMoreStat.includes(index))
    setSeeMoreStat(seeMoreStat.filter((i)=> i !== index ));
    else setSeeMoreStat([...seeMoreStat,index])
  }
  const {downloads,handleDownloads} = useContext(DownloadsContext);
  const {history,handleHistory} = useContext(HistoryContext);

  const [showDelete,setShowDelete] = useState('');
  const handleShowDelete = (index)=>{
    setShowDelete(showDelete === index ? '' : index)
  }
  const btnDeleteHistoryRef = useRef(null);
  const deleteHistoryRef = useRef(null);

  useEffect(() => {
    // le gestionnaire d'événements mousedown au document (qui est ajouté via document.addEventListener) détecte les clics en dehors du bouton et du div grâce à la fonction handleClickOutside
    //Cette fonction sera exécutée chaque fois qu'un événement mousedown se produit sur le document
    function handleClickOutside(event) {
      if (deleteHistoryRef.current && !deleteHistoryRef.current.contains(event.target) && !btnDeleteHistoryRef.current !== event.target) {
        setShowDelete(false);
        // divRef.current: Vérifie si la référence divRef existe.
        // !divRef.current.contains(event.target) Vérifie si l'élément n'est pas enfant du div.
        // btnDeleteHistoryRef.current !== event.target : Vérifie si l'élément cliqué n'est pas le bouton.
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      //La fonction retournée par useEffect est utilisée pour nettoyer l'écouteur d'événements lors du démontage du composant. Cela garantit qu'il n'y a pas de fuites de mémoire ou d'écouteurs d'événements inutiles après que le composant a été retiré du DOM.
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // const [chartOptions, setChartOptions] = useState({
  //   chart: {
  //     type: 'donut',
  //   },
  //   labels: ['Équipe 1', 'Équipe 2'],
  // });
  // const [chartSeries, setChartSeries] = useState([0, 0]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const team1Possession = Math.floor(Math.random() * 100);
  //     const team2Possession = 100 - team1Possession;

  //     setChartSeries([team1Possession, team2Possession]);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  
  
  return (
    <div className="w-100 d-flex justify-content-center py-5 ">
      <div className='all-history px-2 px-md-4 py-5'>
        <h2>History</h2>
        <div>
          <h6>Videos Covered Previously</h6>
          {matchData.map((match,index)=>(
              history.includes(`history-${match.id}`) &&
              <div key={index} className='w-100 d-flex align-items-center justify-content-center history-video-covered' id={`match${match.id}`}>
                <div className='w-100 h-100 d-flex flex-column justify-content-between py-3 px-1 px-md-3'>
                <div className='w-100 d-flex justify-content-between mb-2'>
                  <div className='d-flex flex-column justify-content-center'>
                    <div className=' d-flex align-items-baseline'>
                      <span >
                        Match:{match.team1.name}
                        <img src={match.team1.src} alt={match.team1.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/>
                        vs. {match.team2.name}
                        <img src={match.team2.src} alt={match.team2.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/> 
                      </span>
                    </div>
                    <span >{match.matchdate}</span>
                  </div>
                  <div className='position-relative'>
                    <MdMoreVert size={19} cursor='pointer' onClick={()=>handleShowDelete(`history-${match.id}`)} ref={btnDeleteHistoryRef}/>
                    {showDelete === `history-${match.id}` && 
                      <div className='position-absolute d-flex justify-content-between align-items-center bg-white p-3 show-delete' onClick={()=>handleHistory(`history-${match.id}`)} ref={deleteHistoryRef}>
                        <span>Remove from History</span>
                        <FaTrash size={18}/>
                      </div>
                    }
                  </div>
                </div>
                  <div className=' statistics'>
                    <div className='w-100 d-flex flex-column justify-content-center' style={{maxWidth:'480px'}}>
                      <div className='video-container d-flex  align-items-center justify-content-center'>
                        <video src={match.matchVideo.src} controls style={{minHeight:'100%',minWidth:'100%'}}></video>
                      </div>
                      <div className='d-flex justify-content-end gap-1 mt-1'>
                      {favorites.includes(index) ? <Heart size={20} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(index)}/> : <Heart size={20} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(index)}/>}
                      <DownloadSimple size={20} color="#f7f7f7" cursor='pointer'/>
                      <Link size={20} color="#f7f7f7" cursor='pointer'/>
                      </div>
                    </div>
                    <div className='w-100'>{renderStats(match.generalStats,'General')}</div>
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
                  <div className={seeMoreStat.includes(index) ? 'd-block' : 'd-none'}>
                    <div className='statistics'>
                      {renderStats(match.teamStats,'Teams')}
                      <div>
                        {/* <ReactApexChart
                          options={chartOptions}
                          series={chartSeries}
                          type="donut"
                        /> */}
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
        <div className='mt-4'>
          <h6>Videos downloaded</h6>
          {matchData.map((match,index)=>(
            downloads.includes(`downloaded-${match.id}`) &&
            <div key={index} className='w-100 d-flex align-items-center justify-content-center history-video-covered' id={`match${match.id}`}>
              <div className='w-100 h-100 d-flex flex-column justify-content-between py-3 px-1 px-md-3'>
              <div className='w-100 d-flex justify-content-between mb-2'>
                <div className='d-flex flex-column justify-content-center'>
                  <div className=' d-flex align-items-baseline'>
                    <span >
                      Match:{match.team1.name}
                      <img src={match.team1.src} alt={match.team1.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/>
                      vs. {match.team2.name}
                      <img src={match.team2.src} alt={match.team2.alt} width='25px' height='14px' style={{margin:'0 4px',display:'inline-block'}}/> 
                    </span>
                  </div>
                  <span >{match.matchdate}</span>
                </div>
                <div className='position-relative'>
                  <MdMoreVert size={19} cursor='pointer' onClick={()=>handleShowDelete(`downloaded-${match.id}`)}/>
                  {showDelete === `downloaded-${match.id}` && 
                    <div className='position-absolute d-flex justify-content-between align-items-center bg-white p-3 show-delete' id='deleteDownloaded' onClick={()=>handleDownloads(`downloaded-${match.id}`)}>
                      <span>Delete Downloaded Video</span>
                      <FaTrash size={18}/>
                    </div>
                  }
                </div>
              </div>
                <div className=' statistics'>
                  <div className='w-100 d-flex flex-column justify-content-center' style={{maxWidth:'480px'}}>
                    <div className='video-container d-flex  align-items-center justify-content-center'>
                      <video src={match.matchVideo.src} controls style={{minHeight:'100%',minWidth:'100%'}}></video>
                    </div>
                    <div className='d-flex justify-content-end gap-1 mt-1'>
                    {favorites.includes(index) ? <Heart size={20} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(index)}/> : <Heart size={20} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(index)}/>}
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
                      {/* <CaretDoubleDown weight='bold' size={18}/> */}
                      {/* <ArrowFatDown weight='bold' size={18}/> */}
                      {/* <ArrowFatLinesDown weight='bold' size={18}/> */}

                    </Button>
                  }                
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