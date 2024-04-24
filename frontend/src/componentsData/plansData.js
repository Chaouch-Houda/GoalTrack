import lock from "../assets/images/lock-duotone.svg";
import lock1 from "../assets/images/lock-duotone(1).svg";
import highlights from "../assets/images/pen-duotone.svg";
import highlights1 from "../assets/images/pen-duotone(1).svg";
import statistics from "../assets/images/chart-bar-duotone.svg";
import statistics1 from "../assets/images/chart-bar-duotone(1).svg";
import live from "../assets/images/video-duotone.svg";
import live1 from "../assets/images/video-duotone(1).svg";
import person from "../assets/images/person-duotone.svg";
import person1 from "../assets/images/person-duotone(1).svg";

export const plans = [
    {   
      // icon:  gift,
      //   title: 'FREE PLAN',
      //   price: '$0',
      //   info:[{infoText: 'Up to 3 videos',infoIcon:{info}}],
        features: [
          { src: lock, alt: 'lock', text: 'Password protect' },
          { src: highlights, alt: 'highlights', text: 'Limited highlights analysis' },
          { src: statistics, alt: 'statistics', text: 'Basic player statistics' },
          { src: live, alt: 'live', text: 'Live streaming on YouTube (with limited duration)' },
          { src: person, alt: 'person', text: '12,000 visitors' },
        ],
        // buttonText: 'try for free',
        // buttonIcon :{for_free} ,
      },

      {   
        // icon:  medal,
        // title: 'BASIC PLAN',
        // price: '$23/mo',
        // info:[{infoText: 'Billed yearly',infoIcon:{info}}],
        features: [
          { src: lock1, alt: 'lock', text: 'Password protect' },
          { src: highlights1, alt: 'highlights', text: 'Highlights analysis' },
          { src: statistics1, alt: 'statistics', text: 'Player statistics' },
          { src: live1, alt: 'live', text: 'Live streaming on YouTube' },
          { src: person1, alt: 'person', text: '10,000 visitors' },
        ],
        // buttonText: 'SUBSCRIBE',
        // buttonIcon :{credit_card} ,
      },

      {
      //   icon:  pro,
      // title: 'PRO PLAN',
      // price: '$35/mo',
      // info:[{infoText: 'Billed yearly',infoIcon:info}],
      features: [
        { src: lock1, alt: 'lock', text: 'Password protect' },
        { src: highlights1, alt: 'highlights', text: 'Highlights analysis with slow motion' },
        { src: statistics1, alt: 'statistics', text: 'Advanced player analysis with facial recognition' },
        { src: live1, alt: 'live', text: 'Live streaming on YouTube and social media platforms' },
        { src: person1, alt: 'person', text: '9,700 visitors' },
      ],
      // buttonText: 'SUBSCRIBE',
      // buttonIcon :{credit_card} ,
    },


];