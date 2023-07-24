import React from 'react';

import basketball_players from "../../Images/basketball_players.jpg";
import football_player from "../../Images/football_player.jpg";
import football from "../../Images/football.jpg";
import basketball from "../../Images/basketball.jpg"
import {aboutData} from "../../ComponentsData/AboutData"
import {aboutData2} from "../../ComponentsData/AboutData"
import {Zoom} from 'react-reveal'
import {Col, Container,Row} from "react-bootstrap"
import {motion} from 'framer-motion';

import "./About.css" ;

const About = () => {
    // const initial={};
    // const animate={x:0,opacity:1,scale:1};
  return (
    <section className='about' id="About" >
        <Container className=' w-100 w-0' id='About'>
            <Row className="part-one-w">
            <Col xs={12} sm={12} lg={6} className="left-side-w">
                <div>
                    <img src={basketball_players} alt="basketball_players" />
                </div>
                <div className='column2'>
                    <img src={football_player} alt="football_player" />
                    <img src={football} alt="football" />
                    <img src={basketball} alt="basketball" />
                </div>
            </Col>
            <Col xs={12} sm={12} lg={6} className="right-side-w">
                <h1>Why GoalTrack Is The Best Choice</h1>
                    {aboutData.map((item,i)=>(
                        <motion.div className="item" key={i} initial={{ x:-50 ,opacity: 0,scale:0.5 }} transition={{delay:0.2}} animate={{x:0,opacity:1,scale:1}}>
                            <img src={item.src} alt={item.alt} />
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
            </Col>
            </Row>

            <div className="part-two-w">
                <div className="font1" id='motivate'>
                <span>READY TO START </span>
                <span>YOUR JOURNEY </span>
                <span>NOW WITH US</span>
                </div>
                <Row className="boxs">
                    
                    {aboutData2.map((item,i)=>(
                        <Col xs={12} sm={12} md={4} key={i} className='boxs-item'>
                        <img src={item.icon} alt="" />
                        <span>{item.percent}</span>
                        <span>{item.title}</span>
                        </Col>
                    ))} 
                </Row>   
                    {/* <div>
                        <img src={chart_line_up} alt="Accuracy rate" />
                        <span>95%</span>
                        <span>Accuracy rate</span>
                    </div>
                    <div>
                        <div className='balls'>
                        <img src={soccer_ball_light} id='football' alt="football" />
                        <img src={dribbble_light} alt="basketball" />
                        </div>
                        <span>2%</span>
                        <span>Sports Covered</span>
                    </div>
                    <div>
                        <img src={video} alt="video" />
                        <span>300%</span>
                        <span>Matches Analyzed</span>
                    </div> */}
                
            </div>
        </Container>
    </section>
  )
}

export default About