import React from 'react'
import {Col, Row} from 'react-bootstrap'
import "./Plan.css";
import {plans} from "../../componentsData/plansData.js";
import {Gift,Info,Medal,SketchLogo,CreditCard,ToggleLeft} from "phosphor-react"
import gift from "../../assets/images/gift-duotone.svg";
import info from "../../assets/images/info-duotone.svg";
import medals from "../../assets/images/medal-duotone.svg";
import pro from "../../assets/images/sketch-logo-duotone.svg";
import for_free from "../../assets/images/for-free.png";
import credit_card from "../../assets/images/credit-card-duotone.svg";
import toggle_left from "../../assets/images/toggle-left-duotone.svg"
import { delay, motion } from 'framer-motion';
import Zoom from 'react-reveal/Zoom';
import {Circle} from "phosphor-react";
import CustomAnimation from '../../animation/CustomAnimation';

const  Plan = () =>{
    const [animation1,ref1]=CustomAnimation(0.2,{ y: 0 ,opacity:1,scale:1,transition:{type:"ease-in-out",duration: 0.8 }},{ y: 50 ,opacity: 0,scale:0.5 });
    const [animation2,ref2]=CustomAnimation(0.3,{ y: 0 ,opacity:1,scale:1,transition:{type:"ease-in-out",duration: 0.8}},{ y:'10' ,opacity: 0,scale:0.8 });
  return( 
    <section className="plans" id='Plans' ref={ref2}>
        <div ref={ref1}>
            <motion.div animate={animation1} >
                <h1 className='font1'>ready to start ?</h1>
                <span>Choose the perfect plan for your needs and unlock the power of AI video analysis for football and basketball matches. Our pricing options offer a variety of features tailored to different levels of analysis. Whether you're just starting out or need advanced insights, we have a plan that suits you. Explore our plans below and elevate your game analysis to the next level</span>
            </motion.div>
        </div>
        <motion.div animate={animation2} className="plans-card row" >
            <Col xs={12} sm={12} md={4} className='card'>
                
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
            <Col xs={12} sm={12} md={4} className='card'>
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
        </motion.div>





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