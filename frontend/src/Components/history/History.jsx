import React, { useContext, useState } from 'react'
import './History.css'
import { DownloadsContext } from './DownloadsContext'
import { HistoryContext } from './HistoryContext'
import VideosList from '../videosList/VideosList'
import { Form } from 'react-bootstrap'
import { BiSearchAlt } from 'react-icons/bi'

// export const  Histories = (props) => { 
//   return (<VideosList title= {props.title} videosList= {props.videosList} handleVideosList = {props.handleVideosList} deleteBtnExists = {props.deleteBtnExists} deleteMsg ={props.deleteMsg} searchVideo={props.searchVideo} setSearchVideo={props.setSearchVideo}/>)
// }
// export const  Downloads = (props) => { 
//   return (<VideosList title= {props.title} videosList= {props.videosList} handleVideosList = {props.handleVideosList} deleteBtnExists = {props.deleteBtnExists} deleteMsg ={props.deleteMsg} searchVideo={props.searchVideo} setSearchVideo={props.setSearchVideo}/>)
// }

const History = () => {
  
  const {downloads,handleDownloads} = useContext(DownloadsContext);
  const {history,handleHistory} = useContext(HistoryContext);


  const matchDat = [];//for testing no data found

  const [searchVideo,setSearchVideo] = useState('');
     
  const [selectedTab, setSelectedTab] = useState("histories");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  }
  return (
    <div className="w-100 d-flex justify-content-center py-5 ">
      <div className='all-history px-2 px-md-4 py-3'style={{minHeight:'100dvh'}}>
        <h2>History</h2>
        <div className='history-header w-100 d-flex flex-column flex-md-row align-items-center justify-content-around gap-4 gap-md-0 py-2'>
          <div className='d-flex gap-2' style={{fontSize:'min(14px,3.5vw)',maxWidth:'100%'}}>
            <button onClick={() => handleTabClick("histories")} className={`bg-transparent  ${selectedTab === "histories" && 'btn-activate'} `}>Videos Covered Previously</button>
            <button onClick={() => handleTabClick("downloads")} className={`bg-transparent  ${selectedTab === "downloads" && 'btn-activate'} `}>Videos downloaded</button>
          </div>
          {/* <nav className='d-flex gap-2' style={{fontSize:'min(14px,6vw)'}}>
            <NavLink to='histories' activeClassName='btn-activate'>Videos Covered Previously</NavLink>
            <NavLink to='downloads' activeClassName='btn-activate'>Videos downloaded</NavLink>
          </nav> */}
          <Form className='search-video position-relative' style={{width:'min(80vw,280px)'}}>
              <BiSearchAlt color='gray' className='position-absolute'/>
              <Form.Control
              type='text'
              placeholder='Search'
              className='w-100'
              value={searchVideo}
              onChange={(e)=> setSearchVideo(e.target.value)}
              />
          </Form>
        </div>
      {selectedTab === "downloads" && (
        <VideosList
          title=""
          videosList={downloads}
          handleVideosList={handleDownloads}
          deleteBtnExists={true}
          deleteMsg="Delete Downloaded Video"
          searchVideo={searchVideo}
          setSearchVideo={setSearchVideo}
        />
      )}
      {selectedTab === "histories" && (
        <VideosList
          title=""
          videosList={history}
          handleVideosList={handleHistory}
          deleteBtnExists={true}
          deleteMsg="Remove from History"
          searchVideo={searchVideo}
          setSearchVideo={setSearchVideo}
        />
      )}
      {/* <Outlet />
      <Routes>
        <Route path='history' element={<History/>}>
        <Route index element={<Histories/>} />
        <Route path="histories" element={<Histories title= "Videos Covered Previously" videosList= {history} handleVideosList = {handleHistory} deleteBtnExists = {true} deleteMsg = "Remove from History" searchVideo={searchVideo} setSearchVideo={setSearchVideo} />} />
        <Route path="downloads" element={<Downloads title= "Videos downloaded" videosList= {downloads} handleVideosList = {handleDownloads} deleteBtnExists = {true} deleteMsg = "Delete Downloaded Video" searchVideo={searchVideo} setSearchVideo={setSearchVideo}/>} />
      </Route></Routes> */}
        
      </div>
  </div>
  )
}

export default History