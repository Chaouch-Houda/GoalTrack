import { createContext, useState} from "react";

const sidebarContext = createContext();

const SidebarProvider = ({children}) =>{
    //Au début on a met open simplement comme status ds sidebar puis on a le passé avec setOpen comme props de UserDashboard au Sidebar pour pouvoir gérer le padding-left de main content en fontion de valeur de open et finalement on a décider de le mettre dans un contexte pour pouvoir gérer le margin-left de notificationsList aussi en fct de valeur de open.
    //open est pour gérer l'état de menu (avec width='18rem' ou bien width='5rem')
    const [open,setOpen]= useState(true);
    const handleMenu = ()=>{
        setOpen(!open);
        setOpenSubMenu(null); // pour fermer submenu à chaque ouverture/fermeture de menu (ds les grands écrans).
      }

    //menuVisible est pour gérer l'état de menu dans les petits écrans (elle est visible ou bien seulement l'icon menu et logo qui sont visible)
  const [menuVisible,setMenuVisible]= useState(false) ;
  const handleMenuVisible =() =>{
    setMenuVisible(!menuVisible);
    setOpenSubMenu(null); // pour fermer submenu à chaque ouverture/fermeture de menu (ds les petits écrans).
  }

  //gérer l'affichage de submenu sans le menu 
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const handleSubMenuToggle = (index) => {
    setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
    // if(!open && openSubMenu!=null )setOpenSubMenu(null);
  };

    return(
        <sidebarContext.Provider
        value={{open,handleMenu,setOpen,menuVisible,setMenuVisible,handleMenuVisible,setOpenSubMenu,openSubMenu,handleSubMenuToggle}}>
            {children}
        </sidebarContext.Provider>


    );
};
export {sidebarContext,SidebarProvider};