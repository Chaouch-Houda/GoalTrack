import React from 'react'
import {Col, Row} from 'react-bootstrap'
import "./Plan.css";
import {plans} from "../../ComponentsData/plansData.js"
import gift from "../../Images/gift-duotone.svg";
import info from "../../Images/info-duotone.svg";
import medals from "../../Images/medal-duotone.svg";
import pro from "../../Images/sketch-logo-duotone.svg";
import for_free from "../../Images/for-free.png";
import credit_card from "../../Images/credit-card-duotone.svg";
import toggle_left from "../../Images/toggle-left-duotone.svg"
import { motion } from 'framer-motion';
import Zoom from 'react-reveal/Zoom';
import {Circle} from "phosphor-react";

const  Plan = () =>{
  return( 
    <section className="plans" id='Plans'>

        <motion.div initial={{ y: 100 ,opacity: 0,scale:0.5 }} animate={{ y: 0 ,opacity:1,scale:1}} transition={{ duration: 0.8, ease: 'easeInOut',delay:0.1 }}>
            <h1 className='font1'>ready to start ?</h1>
            <span>Choose the perfect plan for your needs and unlock the power of AI video analysis for football and basketball matches. Our pricing options offer a variety of features tailored to different levels of analysis. Whether you're just starting out or need advanced insights, we have a plan that suits you. Explore our plans below and elevate your game analysis to the next level</span>
        </motion.div>

        <Row className="plans-card">
            <Col xs={12} sm={12} md={4}className='card'>
                        <div className='first-p'>
                            <img src={gift} alt="" />
                            <span className='font1'>FREE PLAN</span>
                            <span>$0</span>
                        </div>
                        <div>
                            <span>Up to 3 videos</span>
                            <img src={info} alt="" />
                        </div>

                        <div className="five-lignes-p">
                            {renderFeatures(plans[0].features)}
                        </div> 

                        <div className="button-p">
                            <button>
                            <img src={for_free} alt="" />
                            <span>try for free</span>
                            </button>
                        </div> 
            </Col>
            <Col xs={12} sm={12} md={4} className='card'>
                        <div className='first-p'>
                            <div className="title-p">
                                    <img src={medals} alt="" />
                                    <span>POPULAR</span>
                            </div>
                            <div className='line-p'></div>
                            <Circle style={{width:"32px", height:"32px"}} />
                            <span className='font1'>BASIC PLAN</span>
                            <span>$23/mo</span>
                        </div>
                        <div>
                            <span>Billed yearly</span>
                            <img src={toggle_left} alt="" />
                        </div>

                        <div className="five-lignes-p">
                            {renderFeatures(plans[1].features)}
                        </div> 
                        
                        <div className="button-p">
                            <div className='line-p' style={{width:'9rem'}}></div>
                            <button>
                            <img src={credit_card} alt="" />
                            <span>SUBSCRIBE</span>
                            </button>
                        </div> 
            </Col>
            <Col xs={12} sm={12} md={4}className='card'>
                        <div className='first-p'>
                            <img src={pro} alt="" />
                            <span className='font1'>PRO PLAN</span>
                            <span>$35/mo</span>
                        </div>
                        <div>
                            <span>Billed yearly</span>
                            <img src={toggle_left} alt="" />
                        </div>

                        <div className="five-lignes-p">
                            {renderFeatures(plans[2].features)}
                        </div> 

                        <div className="button-p">
                            <button>
                            <img src={credit_card} alt="" />
                            <span>SUBSCRIBE</span>
                            </button>
                        </div> 
            </Col>






            {/* {plans.map((plan,index)=>(
                <div className='card' key={index}>
                    <div className='first-p'>
                       <div className="title-p">
                            <img src={plan.icon} alt="" />
                            <span>POPULAR</span>
                       </div>
                       <div className='line-p'></div>
                        <span className='font1'>{plan.title}</span>
                        <span>{plan.price}</span>
                    </div>

                    <div>
                        <span>{plan.info.infoText}</span>
                    </div>

                    <div className="five-lignes-p">
                        {renderFeatures(plan.features)}
                    </div> 

                    <div className="button-p">
                        <button>
                        <img src={plan.buttonIcon} alt="" />
                        <span>{plan.buttonText}</span>
                        </button>
                    </div> 
                </div>
            ))} */}
        </Row>
    </section>
  );
}

function renderFeatures(features){
    return features.map((feature,index) => (
        <div key={index}>
            <img src={feature.src} alt={feature.alt} />
            <span>{feature.text}</span>
        </div>
    ));
}
export default Plan