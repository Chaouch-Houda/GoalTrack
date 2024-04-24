import React from 'react'
import "./Home.css";
import Home_background from "../../assets/videos/Home_background.mp4"
import { motion } from 'framer-motion';
import {Play,DeviceMobile} from 'phosphor-react'
import Header from '../header2/Header';
// import Header from '../header/Header';

const Home = () => {
  return (
    <section className="home" id="Home">
      <div className="bg_video">
        <video autoPlay loop muted playsInline>
        <source src={Home_background} type="video/mp4" />
        </video>
      </div>

      <div className="all-content">
        <Header/>
      
        <div className="content">
          <motion.h1 className='font1' initial={{ x: -10 ,opacity: 0 }} animate={{ x: 0 ,opacity:1}} transition={{ duration: 0.8, ease: 'easeInOut',delay:0.1 }}>
            goal track
          </motion.h1>

          <motion.p  initial={{ x: -15 , opacity: 0 }} animate={{ x: 0, opacity:1 }} transition={{ duration: 0.8, ease: 'easeInOut',delay:0.2 }}>
            Our state-of-the-art AI algorithms dive deep into football and basketball match videos, extracting mind-blowing highlights and key moments. Experience the future of sports analysis, effortlessly capturing the essence of every match.
          </motion.p>

          <motion.div className="buttons-h" initial={{ x: -20 , opacity: 0 }} animate={{ x: 0, opacity:1 }} transition={{ duration: 0.8, ease: 'easeInOut',delay:0.3 }}>
            <button><DeviceMobile color='var(--green)' size={30} weight='regular'/><span>Get The App</span></button>
            <button><Play color='var(--green)' size={30} weight='regular'/> <span>Watch The Video</span></button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Home



