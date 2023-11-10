import { useAnimation } from 'framer-motion';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

function CustomAnimation  (threshold,inViewControls,notInViewControls){  //si threshold=0.5 par exp càd lorsque la moitié de l'élément refentiel devient dans la vue l'animation se démarre .
    const {ref:refs,inView:inViews} = useInView({threshold:threshold}); //useInView est un hook pour détecter si l'élement est ns la vue du navigateur ou pas, elle renvoi une référence à 
    const controls = useAnimation(); //useAnimation est un hook pour controller les animations : démarrer,arréter ou modifier l'animation.
    useEffect(()=>{
        console.log("use effect hook inView: ",inViews);
        if(inViews){
            controls.start(inViewControls);
        }
        else{
            controls.start(notInViewControls)
        }

    },[inViews,controls,inViewControls,notInViewControls]);
 return [controls,refs]
}

export default CustomAnimation