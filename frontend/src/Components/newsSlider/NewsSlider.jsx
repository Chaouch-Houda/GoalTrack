import React from 'react'
import new0 from "../../assets/images/new0.jpg"
import new1 from "../../assets/images/new1.jpg"
import new2 from "../../assets/images/new2.jpg"
import new3 from "../../assets/images/new3.jpg"
import Slider from 'react-slick';
import v1 from '../../assets/videos/news/v1.mp4'
import v2 from '../../assets/videos/news/v2.mp4'
import v3 from '../../assets/videos/news/v3.mp4'
import './NewsSlider.css'

const NewsSlider = () => {
    const news = [
        [v1,"video"],
        [new0,"img"],
        [new3,"img"],
        [v3,"video"],
        [new1,"img"],
        [new3,"img"],
        [v3,"video"],
        [new2,"img"],
        // [video1,"video"],
        [new3,"img"],
        [v2,"video"],
        [new0,"img"],[v1,"video"],
        [new0,"img"],
        [new3,"img"],
        [v3,"video"],
        [new1,"img"],
        [new3,"img"],
        [v3,"video"],
        [new2,"img"],
        // [video1,"video"],
        [new3,"img"],
        [v2,"video"],
        [new0,"img"],
      ]
      const settings = {
        autoplay: true,
        infinite: true,
        dots: false,
        autoplaySpeed: 0, // Désactivez le délai entre les transitions
        arrows: false, // Désactivez les flèches
        pauseOnFocus: true, // Empêche la pause en mettant le focus sur le slider
        cssEase:"linear" ,// Utilisez une transition linéaire pour un fondu enchaîné fluide
        // // slidesToScroll: 1,
        // swipeToSlide: true, // Activez le défilement par balayage
        // touchMove: true, // Activez le défilement tactile
        // fade:true, // Activez l'effet fondu entre les diapositives
        // speed: 50,
        slidesToShow: 7, // Afficher 4 éléments à la fois
        responsive: [
          {
            breakpoint: 700, // À partir de cette largeur d'écran
            settings: {
              slidesToShow: 3.5, // Afficher 1 slide
            },
          },
          {
            breakpoint: 990,
            settings : {
              slidesToShow : 4.5 ,
            },
          },
        ],
      };
  return (
    <div className='mx-2 overflow-hidden' style={{width:'95%'}}>
              <Slider {...settings} className='news-slider w-100 mx-2 pt-0 pt-sm-4 '>
                {news.map((newItem, index) => (
                  <div key={index} className='news-container'>
                    {newItem[1] === "video" ?
                      <video autoPlay muted loop playsInline className='news'>
                        <source src={newItem[0]} type="video/mp4" />
                      </video> 
                    : 
                      <img src={newItem[0]} alt='news ' className='news'/>
                    }
                  </div>
                ))}
              </Slider>
            </div> 
  )
}

export default NewsSlider