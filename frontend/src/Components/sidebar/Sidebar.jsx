import React, { useContext, useEffect, useRef, useState } from 'react'
import {List} from "phosphor-react";
import {NavLink,useLocation } from 'react-router-dom';
import {BiHistory} from "react-icons/bi";
import {MdFavoriteBorder,MdOutlineNotificationsActive,MdOutlinePrivacyTip} from "react-icons/md";
import {TbSettings,TbLayoutDashboard} from "react-icons/tb";
import {FiLogOut} from "react-icons/fi";
import {RiArrowDropDownLine,RiAccountCircleLine} from 'react-icons/ri'
import logo from "../../assets/images/logo.png";
import "./Sidebar.css";
import Notifications from '../notifications/Notifications';
import { sidebarContext } from './sidebarContext';
import { AuthContext } from '../../pages/userDashboard/AuthContext';

const Sidebar = () => {
//  Pour gérer l'affichage de notif on utilise :
//      - ces deux refs (notifRefbtn,notifRef) pour cacher notif si en clique en dehors du label de notif et de l'élement 'Notifications' dans le sidebar. 
//      - cette state (showNotifications) pour ouvrir/fermer la label de notif.
  const notifRefbtn = useRef(null);
  const notifRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
 

  //tableau des élements de sidebar
    const menus = [
        {label:"Dashboard" , link:"dashboard" , icon: TbLayoutDashboard},
        // {label:"Sports News" , link:"#" , icon: BiNews,margin:true
        //       ,submenu:[ {label:'Account',icon:BiHistory,link:'#'},
        //       {label:'Privacy',icon:BiHistory,link:'#'},
        //       {label:'Noti',icon:BiHistory,link:'#'},
        //       ]
        //       ,arrow_icon:RiArrowDropDownLine,},
        {label:"profile",link:'profile',icon:RiAccountCircleLine,margin:true},
        {label:"History" , link:"history" , icon: BiHistory},
        {label:"Favorites" , link:"favorites" , icon:MdFavoriteBorder },
        {label:"Notifications" , link:"#" , icon: MdOutlineNotificationsActive,margin:true,ref:notifRefbtn},
        {label:"Setting" , link:"#" , icon: TbSettings
                ,submenu:[ {label:'Account',icon:RiAccountCircleLine,link:'accountSettings'},
                           {label:'Privacy',icon:MdOutlinePrivacyTip,link:'privacySettings'},
                           {label:'Notifications',icon:MdOutlineNotificationsActive,link:'notificationsSettings'},
                          ]
                ,arrow_icon:RiArrowDropDownLine,
        },
        {label:"Logout" , link:"/" , icon: FiLogOut},
      ];

      const {open,setOpen,handleMenu,menuVisible,setMenuVisible,handleMenuVisible,openSubMenu,setOpenSubMenu,handleSubMenuToggle} = useContext(sidebarContext)

  // windowWidth pour stocker la largeur de la fenêtre
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Met à jour la largeur de la fenêtre en réponse à un événement de redimensionnement 
    const handleResize = () => {
      setWindowWidth(window.innerWidth); 
    };
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      if (windowWidth>= 576  && windowWidth < 800) {
        setOpen(false);  //  Si la largeur de fenêtre est inférieure à 800 pixels, sidebar(5rem) seulement les icons qui sont affichés 
      }
      
      else if(windowWidth < 576) {
        setOpen(true); //  Si la fenêtre est inférieure à 576 pixels, sidebar(18rem) toute est affichée .Ajouter setOpen(true) à la fonction handleMenuVisible ne résoudra pas entièrement le problème. Si le menu est déjà en position fermée (!open) lorsqu'il est affiché sur un grand écran et que la largeur est réduite, le menu ne s'ouvrira pas automatiquement. Dans ce cas, seuls les icônes pourraient être visibles, ce qui ne résoudra pas complètement la situation.
      }
    }, [windowWidth]); // Cet effet s'exécute chaque fois que windowWidth change

    const mediumWidth =  windowWidth >= 576 && windowWidth < 800   ; 
    const xsWidth =  windowWidth < 576 ; 
      
  // Pour identifier l'élément actif dans le menu
    const location = useLocation();
  
  //pour gérer l'affichage de notifications 
    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
    };

  // on veut que notifications se cachent lorsque on clique en dehors de div de notifications
    useEffect(() => {
      // le gestionnaire d'événements mousedown au document (qui est ajouté via document.addEventListener) détecte les clics en dehors du notifications div grâce à la fonction handleClickOutside
        //Cette fonction sera exécutée chaque fois qu'un événement mousedown se produit sur le document
        function handleClickOutside(event) {
        if (notifRef.current && notifRefbtn.current && !notifRef.current.contains(event.target) && !notifRefbtn.current.contains(event.target)) {
          setShowNotifications(false);
          // notifRef.current: Vérifie si la référence notifRef existe.
          // !notifRef.current.contains(event.target) Vérifie si l'élément n'est pas enfant du div. 
          // meme pour notifRefbtn?
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        //La fonction retournée par useEffect est utilisée pour nettoyer l'écouteur d'événements lors du démontage du composant. Cela garantit qu'il n'y a pas de fuites de mémoire ou d'écouteurs d'événements inutiles après que le composant a été retiré du DOM.
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    // use logout to logout and to navigate to home page 
    const {logout} = useContext(AuthContext);
  return (
    <>
      <nav  className={`Sidebar left-0 text-white ${ xsWidth ? 'w-100' : 'min-vh-100'} `} style={{width: open ? '18rem': '5rem'}}>
          <div className={`py-3 d-flex justify-content-between ${ !open && mediumWidth  ? 'px-2' :'px-4'}`} style={{height:'72px'}}>
            <img className='logo' src={logo} alt="logo" style={{display:!open ? (mediumWidth ?'block' :'none') : 'block', height:'40px'}}/>
            
            {/* icon ,pour les grands écrans, qui gère le width de sidebar-content */}
            <List className={`${xsWidth ? 'd-none':'d-block'} ${!open ? (mediumWidth ? 'd-none': 'w-100'): ''}`}  size={"26px"} cursor={"pointer"} onClick={handleMenu}/>
            
            {/* icon ,pour les grands écrans, qui gère l'affichage de sidebar-content */}
            <List className={`${!xsWidth ? 'd-none':'d-block'}`}  size={"26px"} cursor={"pointer"} onClick={handleMenuVisible}/>
          </div>

          <div className={`menu px-4 ${!menuVisible && xsWidth && 'd-none'} `}>
            { menus.map((menu,i)=>(
              <div key={i} className={`${menu.margin && 'mb-5'} `}>
                <NavLink to={menu.link} className={`navlink menu-item gap-3      
                                                    ${!open && 'bg-transparent'}
                                                    ${(location.pathname === ("/connected/"+menu.link) && !open) ? 'actif': location.pathname === ("/connected/"+menu.link) ? 'actif2': ''} 
                                                    ${openSubMenu === i ? 'menu-link-active' : ''}
                                                    `}
                                        ref={menu.ref && menu.ref}
                                        onClick={() => {if(menu.submenu)  handleSubMenuToggle(i);
                                                          else {
                                                            if (menu.label=== 'Notifications') toggleNotifications();
                                                            setMenuVisible(false); 
                                                            setOpenSubMenu(null);
                                                          }
                                                         if(menu.label === 'Logout') logout() 
                                                        }}
                >
                                                    {/* on veux que l'icon devient green meme si l'un de ces children est actif ${((location.pathname === menu.link || (menu.submenu &&( menu.submenu.map((e,i)=> {return e.link===location.pathname})))) && !open) ? 'actif': location.pathname === menu.link ? 'actif2': ''}  */}

                  <div className={`${!open && 'icon-bg'} p-2`}>
                    {menu.icon && <menu.icon size="22"/>}
                  </div>
                  <h2 className={`${!open && 'item-hidden' }`} style={{transitionDelay: `${i+3}00ms`}}>{menu.label}</h2>
                  <div className={`${!open && 'item-hidden '} p-2`} style={{transform: openSubMenu === i && 'rotate(180deg)' , transition: 'all 0.3s ease-in-out',right:'1rem',position:'absolute'}}>
                    {menu.arrow_icon && <menu.arrow_icon size="30" />}
                  </div>
                  <h2 className={`${open && 'opacity-0 overflow-hidden'} h2-hovered`}>{menu.label}</h2>
                </NavLink>

                <div className={` ${openSubMenu === i ? 'd-block' : 'd-none'} ${!open && 'submenu'}` }>
                  {menu.submenu && menu.submenu.map((subItem,j) => (
                    <NavLink to={subItem.link} key={j} 
                      className={`navlink gap-2 ${open ? 'px-5' : 'px-2'} ${location.pathname === ("/connected/"+subItem.link) ? 'actif2':''} `} 
                      onClick={()=>{if(!open || xsWidth) setOpenSubMenu(null);
                                    setMenuVisible(false)}} 
                    >
                    <div className={`p-2`}>
                      {subItem.icon && <subItem.icon size="22"/>}
                    </div>
                    <h2>{subItem.label}</h2>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav> 
        {/* Affichage conditionné de notifications  */}
        {showNotifications && <Notifications toggleNotifications={toggleNotifications} showNotifications={showNotifications} setShowNotifications={setShowNotifications} notifRef={notifRef}/>}
    </>
        // where we will call the Sidebar, we must put <Outlet/> component where the content will be rendered.
  );
};

export default Sidebar