import React from 'react';
import basketball_players from "../../assets/images/basketball_players.jpg";
import football_player from "../../assets/images/football_player.jpg";
import football from "../../assets/images/football.jpg";
import basketball from "../../assets/images/basketball.jpg"
import {aboutData} from "../../componentsData/AboutData"
import {aboutData2} from "../../componentsData/AboutData"
import {Zoom} from 'react-reveal'
import {Col, Container,Row} from "react-bootstrap";
import {motion} from 'framer-motion';
import "./About.css" ;
import CustomAnimation from '../../animation/CustomAnimation';

const About = () => {
const [animation,ref]= CustomAnimation(0.5, {x:0,opacity:1,transition:{ type: "spring",duration:0.8 , bounce:0.3 }} ,{x:'-100px',opacity:0});
const [animation2,ref2]= CustomAnimation(0.4, {x:0,opacity:1,scale:1,transition:{type:"ease-in-out" , duration:0.8}} ,{ x:'-50px',opacity:0,scale:0.5});
const [animation3,ref3]= CustomAnimation(0.2, {y:0,opacity:1,scale:1,transition:{type:"ease" , duration:0.8}} ,{ y:'60px',opacity:0,scale:0.5});

    return (
    <section  className='about' id="About" >
        <Container  className=' w-100 w-0' id='About'>
            <Row className="part-one-w">
            <Col ref={ref} xs={12} sm={12} lg={6} className="left-side-w">
                <motion.div  animate={animation} >
                    <img src={basketball_players} alt="basketball_players" />
                </motion.div>
                <motion.div className='column2' animate={animation}>
                    <img  src={football_player} alt="football_player" />
                    <img  src={football} alt="football" />
                    <img  src={basketball} alt="basketball" />
                </motion.div>
            </Col>
            <Col ref={ref2} xs={12} sm={12} lg={6} className="right-side-w">
                <motion.h1 animate={animation2} transition={{ delay: 0.1 }} >Why GoalTrack Is The Best Choice</motion.h1>
                    {aboutData.map((item,i)=>(
                        <motion.div className="item" key={i} animate={animation2} transition={{delay: 0.1 * (i + 1)}} >
                            <img src={item.src} alt={item.alt} />
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
            </Col>
            </Row>

            <div ref={ref3} className="part-two-w">
                <motion.div className="font1" id='motivate' animate={animation3}>
                <span>READY TO START </span>
                <span>YOUR JOURNEY </span>
                <span>NOW WITH US</span>
                </motion.div>

                <Row className="boxs">
                    {aboutData2.map((item,i)=>(
                        <Col  xs={12} sm={12} md={4} key={i} className=' boxs-col '>
                            <motion.div className='boxs-item' whileHover={{scale:1.1}}>
                                <img src={item.icon} alt={item.icon} className={i===1 ? 'second-img': ''} />
                                <span>{item.percent}</span>
                                <span>{item.title}</span>
                            </motion.div>
                        </Col>
                    ))} 
                </Row> 
            </div>
        </Container>
    </section>
  )
}

export default About