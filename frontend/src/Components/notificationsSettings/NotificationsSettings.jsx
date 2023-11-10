import React, {useState } from 'react';
import './NotificationsSettings.css';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const NotificationsSettings = () => {
  const notifTab=[
    {notif:'Video Processing Updates',explanation:'Receive notifications about the status of your uploaded video processing.'},
    {notif:'Key Statistic Alerts',explanation:'Get alerts for key match statistics, including shooting percentages, assists, player stats, and more.'},
    {notif:"Followed Users' Activity",explanation:'Receive notifications when users you follow begin new live broadcasts, keeping you updated on their real-time activities.'},
    {notif:'Live Streaming Notifications',explanation:'Stay informed about key moments during live broadcasts of matches you follow, including exciting plays and game-changing events.'},
    {notif:'Live Stream Commentary Updates',explanation:"Stay informed with real-time notifications of live stream commentary and analysis, enhancing your understanding of the game."},
    {notif:'Recorded Live Video Alerts',explanation:' Be notified of recorded videos from live broadcasts, allowing you to view highlights after the live stream ends.'},
    {notif:'Live Stream Interaction Alerts',explanation:'Stay informed about viewer interactions and comments during your own live broadcasts.'},
    {notif:'Live Stream Polls and Surveys',explanation:'Participate in polls and surveys during live streams and receive notifications for the results and insights.'},
    {notif:'Special offers',explanation:'Be informed about our new speacial offers'},
    {notif:'Tech Innovation Alerts',explanation:'Be informed about new technological advancements in video analysis, AI, and live streaming that could enhance your experience.'},
  ];
//   Upcoming Match Alerts: Get notifications for upcoming matches involving the teams you follow, with details on date, time, and match information.
// Ranking Updates: Receive notifications for updates on team and league standings, keeping you informed about your favorite team's position.
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      // Si l'option est déjà sélectionnée, la retirer de la liste.
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // Sinon, l'ajouter à la liste des options sélectionnées.
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const options =['Email','Msg','push'];
  
    return (
      <div className="notificationsSettings">
        <h1 className='text-nowrap mb-4'>Notifications settings</h1>
        <Table className='table-notif text-white'>
          <thead>
            <tr>
              <td><h6>Notification Types</h6></td>
              {options.map((opt,i)=>(<td key={i}><h6 className="d-flex align-items-center justify-content-center">{opt}</h6></td>))}
            </tr>
          </thead>
          <tbody>
            {notifTab.map((item,index) => (
              <tr key={index}>
                <td>
                  <div>
                    <span>{item.notif}</span>
                    <span>{item.explanation}</span>
                  </div>
                </td>
                {options.map((opt,i)=>(
                  <td key={i}>
                    <Form.Check
                    type="checkbox"
                    value={`${opt}+${index}+${i}`}
                    checked={selectedOptions.includes(`${opt}+${index}+${i}`)}
                    onChange={() => toggleOption(`${opt}+${index}+${i}`)}
                    className="d-flex align-items-center justify-content-center custom-checkbox"
                  />
                  </td>
                  ))}
            </tr>
            ))} 
          </tbody>
        </Table>
        <div className='d-flex justify-content-end gap-3 mt-5' style={{maxWidth:'53rem'}}>
        <Button className='transparent-g-btn cancel-btn text-capitalize'><Link to="/connected">cancel</Link></Button>
        <Button type="submit" className='green-btn text-capitalize' 
          onClick={()=>{toast.success('Your changes have been successfully saved!', {
                          position: 'top-right',
                          autoClose: 3000, // La notification se fermera automatiquement après 3 secondes
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });}}>save</Button>
      </div>
      <ToastContainer/>
    </div>
    );
  };

  
  export default NotificationsSettings;
  



// import React, { useRef, useState } from 'react';
// import Switch from 'react-switch';

// const NotificationsSettings = () => {
//   const buttonRefs = useRef([]);

//   const handleToggle = (index) => {
//     const updatedButtons = buttonRefs.current.map((button, i) =>
//       i === index ? { ...button, isChecked: !button.isChecked } : button
//     );
//     buttonRefs.current = updatedButtons;
//   };

//   return (
//     <div className="toggle-buttons-group">
//       <ToggleButton
//         ref={(el) => (buttonRefs.current[0] = { ref: el, isChecked: false })}
//         onChange={() => handleToggle(0)}
//       />
//       <ToggleButton
//         ref={(el) => (buttonRefs.current[1] = { ref: el, isChecked: false })}
//         onChange={() => handleToggle(1)}
//       />
//       <ToggleButton
//         ref={(el) => (buttonRefs.current[2] = { ref: el, isChecked: false })}
//         onChange={() => handleToggle(2)}
//       />
//       {/* Ajoutez plus de ToggleButton */}
//     </div>
//   );
// };

// const ToggleButton = React.forwardRef(({ onChange }, ref) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleToggleClick = () => {
//     setIsChecked((prevState) => !prevState);
//     onChange();
//   };

//   return (
//     <Switch
//       onChange={handleToggleClick}  // Utilisez directement la fonction de gestion de bascule
//       checked={isChecked}
//       className="react-switch"
//       onColor="#398d03"
//       onHandleColor="#ffffff"
//       handleDiameter={21}
//       uncheckedIcon={false}
//       checkedIcon={false}
//       width={42}
//       height={25}
//     />
//   );
// });


// export default NotificationsSettings;
