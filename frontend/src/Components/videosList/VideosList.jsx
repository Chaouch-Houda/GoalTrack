import React, { useContext, useEffect, useRef, useState } from 'react'
import { FavoritesContext } from '../favorites/FavoritesContext';
import { MdMoreVert } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { ArrowDown, ArrowUp, DownloadSimple, Heart, Link } from 'phosphor-react';
import ReactApexChart from 'react-apexcharts';
import { Button } from 'react-bootstrap';
import './VideosList.css';

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
const VideosList = (props) => {
    const {favorites,handleFavorites} = useContext(FavoritesContext);
  const [seeMoreStat,setSeeMoreStat] = useState([]);
  const handleSeeMoreStat = (index) =>{
    if (seeMoreStat.includes(index))
    setSeeMoreStat(seeMoreStat.filter((i)=> i !== index ));
    else setSeeMoreStat([...seeMoreStat,index])
  }
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
        if (deleteHistoryRef.current && btnDeleteHistoryRef.current && !deleteHistoryRef.current.contains(event.target) && !btnDeleteHistoryRef.current.contains(event.target)) {
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

    
  return (
    <div className='videos-list my-3 '>
          <h6>{props.title && props.title}</h6>
          { props.videosList.length === 0  
            ? (<div className='p-4 text-center'><h3>No Data Found! </h3></div> )
            : props.videosList.filter((item)=>{
              return (props.searchVideo).toLowerCase() === ''
              ? item
              : item.team1.name.toLowerCase().includes(props.searchVideo) || item.team2.name.toLowerCase().includes(props.searchVideo);
            }).map((match,index)=>(
                // props.videosList.includes(match) &&
                <div key={index} className='w-100 d-flex align-items-center justify-content-center videos-item' id={`match${match.id}`}>
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
                    {props.deleteBtnExists && 
                    <div className='position-relative'>
                        <MdMoreVert size={19} cursor='pointer' onClick={()=>handleShowDelete(match.id)} ref={btnDeleteHistoryRef}/>
                        {showDelete === match.id && 
                            <div className='position-absolute d-flex justify-content-between align-items-center bg-white p-3 show-delete' onClick={()=>props.handleVideosList(match.id)} ref={deleteHistoryRef}>
                            <span>{props.deleteMsg}</span>
                            <FaTrash size={18}/>
                            </div>
                        }
                    </div>
                    }
                  </div>
                    <div className=' statistics'>
                      <div className='w-100 d-flex flex-column justify-content-center' style={{maxWidth:'480px'}}>
                        <div className='video-container d-flex  align-items-center justify-content-center'>
                          <video src={match.matchVideo.src} controls style={{minHeight:'100%',minWidth:'100%'}}></video>
                        </div>
                        <div className='d-flex justify-content-end gap-1 mt-1'>
                        {favorites.includes(match) ? <Heart size={20} color="#ec0909" cursor='pointer' weight="fill" onClick={()=>handleFavorites(match)}/> : <Heart size={20} color="#f7f7f7" cursor='pointer' onClick={()=>handleFavorites(match)}/>}
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
              ))
          }
        </div>
  )
}

export default VideosList