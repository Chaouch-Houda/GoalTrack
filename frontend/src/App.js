import './App.css';
import React from 'react';
// import { SignupProvider } from './Components/signup/SignupContext';
// import { LoginProvider } from './Components/login/LoginContext';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import UserDashboard from './pages/userDashboard/UserDashboard';
import LandingPage from './pages/LandingPage';
import History from './Components/history/History';
import Dashboard from './Components/dashboard/Dashboard';
import AccountSettings from './Components/accountSettings/AccountSettings';
import PrivacySettings from './Components/privacySettings/PrivacySettings';
import NotificationsSettings from './Components/notificationsSettings/NotificationsSettings';
import AllNotifications from './Components/notifications/AllNotifications';
import { SidebarProvider } from './Components/sidebar/sidebarContext';
import Profile from './Components/profile/Profile';
import { FavoritesProvider } from './Components/favorites/FavoritesContext';
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';
import Favorites from './Components/favorites/Favorites';
import { HistoryProvider } from './Components/history/HistoryContext';
import { DownloadsProvider } from './Components/history/DownloadsContext';
import { ProfileProvider } from './Components/profile/ProfileContext';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarProvider>
        <FavoritesProvider>
        <HistoryProvider>
        <DownloadsProvider>
        <ProfileProvider>
                <Routes>
                  <Route path='/' element={<LandingPage/>}>
                    <Route path='signup' element={<Signup/>}/>
                    <Route path='login' element={<Login/>}/>
                  </Route>
                  <Route path='/connected' element={<UserDashboard/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path='dashboard' element={<Dashboard/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='history'element={<History/>}/>
                    <Route path='favorites'element={<Favorites/>}/>
                    <Route path='allNotifications'element={<AllNotifications/>}/>
                    {/* <Route path='accountSettings'element={<AccountSettings/>}/> */}
                    <Route path='privacySettings' element={<PrivacySettings/>}/>
                    <Route path='notificationsSettings' element={<NotificationsSettings/>}/>
                  </Route>
                  <Route path='*' element={<h1 style={{color:'white'}}>page not found</h1>}/>
                </Routes>
        </ProfileProvider>
        </DownloadsProvider>
        </HistoryProvider>
        </FavoritesProvider>
        </SidebarProvider>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
