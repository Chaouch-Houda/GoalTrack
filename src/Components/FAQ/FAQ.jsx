import React, { useState } from 'react'
import "./FAQ.css"
import {CaretDown,CaretUp} from "@phosphor-icons/react"
import {faqData} from "../../ComponentsData/faqData"
const FAQ = ()=> {
  const [isAnswerVisible, setIsAnswerVisible] = useState(null);

  const handleToggleAnswer = (i) => {
    isAnswerVisible===i? setIsAnswerVisible(null) : setIsAnswerVisible(i);
  };

  return (
    <div className='faq'>
        <h1 className='font1'>FAQ</h1>
        <div className="faq-items">
          {faqData.map((item,index)=>(
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={()=>handleToggleAnswer(index)} style={{ border: isAnswerVisible ? 'none' : 'px solid rgba(255,255,255,0.1)' }}>
                <span>{item.question}</span>
                {isAnswerVisible===index ? <CaretUp/>: <CaretDown/>}
              </div>
              <div className={isAnswerVisible!==index ? "faq-answer": "show"}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>




        {/* <div className='faq-item'>
          <div className='question-faq'>
            <span className='font1'>How does your AI analysis software work?</span>
            <button onClick={handleToggleAnswer}>{isAnswerVisible ? <CaretUp className='faq-caret'/> : <CaretDown className='faq-caret'/>}</button>
          </div>
          {isAnswerVisible && (
              <div className="response-faq">
                <span>answ</span>
              </div>
          )}
        </div>

        <div className='faq-item'>
          <div className='question-faq'>
              <span className='font1'>How does your AI analysis software work?</span>
              <button >{isAnswerVisible ? <CaretUp className='faq-caret'/> : <CaretDown className='faq-caret'/>}</button>
          </div>
          {isAnswerVisible && (
              <div className="response-faq">
                <span>Yes, you have the option to download the analyzed match videos and highlights generated by our AI analysis software. This allows you to save and access them offline or share them with others as needed.</span>
              </div>
          )}
        </div>

        <div className='faq-item'>
          <div className='question-faq'>
              <span className='font1'>How does your AI analysis software work?</span>
              <button onClick={handleToggleAnswer}>{isAnswerVisible ? <CaretUp className='faq-caret'/> : <CaretDown className='faq-caret'/>}</button>
          </div>
          {isAnswerVisible && (
              <div className="response-faq">
                <span>We support playback of analyzed match highlights on popular social networks such as YouTube, Facebook, Twitter, and Instagram. Once the match analysis is complete, you can easily share the generated highlights on these platforms or embed them on your own website or blog. Additionally, our cutting-edge stream integration allows you to broadcast live matches on YouTube and social media platforms, providing a seamless and engaging experience for your audience.</span>
              </div>
          )}
        </div> */}

    </div>
  )
}

export default FAQ