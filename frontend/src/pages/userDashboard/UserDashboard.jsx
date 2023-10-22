import React, { useContext} from 'react';
import "./UserDashboard.css";
import Sidebar from '../../Components/sidebar/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { sidebarContext } from '../../Components/sidebar/sidebarContext';
import { AuthContext } from './AuthContext';

const UserDashboard = () => {
  // La variable "open" est utilisée pour gérer l'état du menu, permettant de réguler la largeur entre "18rem" ou "5rem". Nous l'initialisons ici et la transmettons au composant fils Sidebar. Cela nous permet de contrôler le contenu principal en ajustant la marge gauche (lmargin-left) en fonction de la largeur du sidebar. Cette adaptation garantit que le sidebar conserve une position fixe.
  const {open}= useContext(sidebarContext);
  const {user} = useContext(AuthContext); // si user existe => user connected => display userdashboard else display Login page
  return (
     user ? 
     <>
      <div className="userDashboard">
        <div className='sidebar'>
            <Sidebar/>
        </div>
        <main className={`main-content  ${open ? 'mOpen' : 'mClosed'} `}>
          <Outlet/>
          {/* <Contact/> */}
          {/* <Footer/> */}
        </main>
      </div>
    </> 
    : <Navigate to='/login'/>
  )
}

export default UserDashboard;