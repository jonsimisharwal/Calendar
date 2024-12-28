import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)
function Bigcalendar(){
  const [events, setEvents] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const[eventtime,setEventtime]=useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectevent, setSelectevent] = useState(null);

  const handleselectorslot = (slotInfo) => {
    setShowmodal(true);
    setSelectedDate(slotInfo.start);
    setSelectevent(null);
  }
  const handleDropdownClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };
  const handleSelectEvent = (event) => {
    setShowmodal(true);
    setSelectevent(event);
    setEventTitle(event.title);
  }
  const saveEventy = () => {
    if(eventTitle && selectedDate) {
      if (selectevent) {
        const updatedevent = { ...selectevent, title:eventTitle };
        console.log('updated event',updatedevent);
        const updatedevents = events.map((event) => {return event === selectevent ? updatedevent : event });
        console.log('Updated events:', updatedevents);
        setEvents(updatedevents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, 'hours').toDate(),
          
        };
        console.log('New event:', newEvent);
        setEvents([...events, newEvent]);
      }
      setShowmodal(false);
      setEventTitle('');
      setSelectevent(null);
      
    }
  };

 const deletedevents=()=>{
  if(selectevent){
    const updatedevents=events.filter((event)=>event!==selectevent);
    setEvents(updatedevents);
    setShowmodal(false);
      setEventTitle('');
      setSelectevent(null);
  }
 }
  return (<div className="container">
    <span className="left-screen"> Mohit goyal</span>
    <span classNmae="right-screen">
    <div style={{ height: '500px' }} className="calendarcss">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        selectable={true}
        onSelectSlot={handleselectorslot}
        onSelectEvent={handleSelectEvent}
      />
      
      {showmodal && (
        <div class="modal" style={{ display: 'block', backgroundColor: 'rgba(0.0.0.0.5)',alignContent:'center', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} className="designcal" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
             <h2>Meeting
             &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                <button type="button" class="btn-close" onClick={() => {
                  setShowmodal(false);
                  setEventTitle('');
                  setSelectevent(null);
                }} style={{ color:"black" ,backgroundColor:"transparent",position:"top-right"}}><CloseIcon /></button>
             </h2>
                <h4 className="modal-title">{selectevent ? "Edit event" : "Add Event"}   </h4>
                  
                
              </div>
              <div class="modal-body"  >
                <label>Event name </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="event name"
                  id="eventTitle"
                  style={{color:"black"}}
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}

                /></div>
                <div>
                <label>Location: </label>
                <input
                  type="text"
                  
                  placeholder="location.."
                  
                  style={{color:"black",backgroundColor:"white"}}
                  value={eventloc}
                  onChange={(e) => setEventloc(e.target.value)}
/></div>
               
               <div class="duration-control">
                <input 
                type="text"
                className="time-control"
                placeholder="time"
                value={eventtime}
                onChange={(event)=>setEventtime(event.target.value)}/>


      <button onClick={handleDropdownClick} style={{ color:"black" ,backgroundColor:"transparent"}} >Min <ArrowDropDownIcon/></button>
      {showOptions && (
        <ul>
          <li onClick={() => handleOptionClick('Min')}>Min</li>
          <li onClick={() => handleOptionClick('hrs')}>hrs</li>
        </ul>
      )}
        <p>Selected Option: {selectedOption}</p>
     </div>
              <div class="modal-footer">
                {selectevent &&
                <button type="button"
                className="btn btn-danger me-2"
                onClick={deletedevents}
                style={{backgroundColor:"red"}}>
                  Delete event
                  </button>
}
                <button type="button" onClick={saveEventy} style={{ backgroundColor: "lightblue" }}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      </span>
    </div>
    
  )
}

export default Bigcalendar();