import React, { useState } from 'react'
import "./SideBar.css"

const SideBar = () => {
    const items=["home","about","contact","plans"];
    const [activeIndex, setActiveIndex] = useState(null);
  
    const handleItemHover = (index) => {
      setActiveIndex(index);
    };
  
    return (
      <section className='sideBar'>
        <div id="menu" data-active-index={activeIndex}>
            <div id="menu-items">
            {items.map((item,i)=>(
                <div key={i} className={`menu-item ${activeIndex === i ? 'active' : ''}`}
                onMouseEnter={() => handleItemHover(i)}
                onMouseLeave={() => handleItemHover(null)}>
                    {item}
                </div>
            ))}
            
            </div>
            <div id="menu-background-pattern"></div>
            <div id="menu-background-image"></div>
        </div>
      </section>
    );
}

export default SideBar