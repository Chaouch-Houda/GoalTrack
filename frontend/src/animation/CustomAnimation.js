import { useAnimation } from 'framer-motion';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

function CustomAnimation  (threshold,inViewControls,notInViewControls){
    const {ref:refs,inView:inViews} =useInView({threshold:threshold});
    const controls = useAnimation();
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