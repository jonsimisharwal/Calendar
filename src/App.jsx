import React, { useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTime, setEventTime] = useState('');
  const [eventDes, setEventDes] = useState('');
  const [eemailId, setEemailId] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [eventLoc, setEventLoc] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Added for tracking editing state

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
    setIsEditing(false); // Reset editing state
  }

  const handleDropdownClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
    setEventLoc(event.location);
    setEventTime(event.time);
    setEemailId(event.email);
    setEventDes(event.description); // Include description when selecting event
    setIsEditing(true); // Set editing state to true
  }

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      id: selectEvent ? selectEvent.id : Date.now(), // Use existing ID if editing
      title: eventTitle,
      description: eventDes,
      location: eventLoc,
      email: eemailId,
      start: selectedDate,
      end: selectedDate, // You can modify this to include an actual end time
      time: eventTime,
    };

    if (isEditing) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }

    resetForm();
  };

  const resetForm = () => {
    setEventTitle('');
    setEventLoc('');
    setEventTime('');
    setEemailId('');
    setEventDes('');
    setShowModal(false);
    setIsEditing(false);
    setSelectEvent(null);
  }

  const deleteEvent = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event.id !== selectEvent.id);
      setEvents(updatedEvents);
      resetForm();
    }
  }

  // Custom component to display events with additional details
  const EventDisplay = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <br />
      <span>{event.location}</span>
      <br />
      <span>{event.description}</span>
    </div>
  );

  return (
   
      
      
        <div style={{ height: '500px' }} className="calendarcss">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: '50px' }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            components={{
              event: EventDisplay, // Custom event component
            }}
          />

          {showModal && (
            <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>Meeting
                    <button
                      type="button"
                      className="btn-close"
                      onClick={resetForm}
                      style={{ color: "black", backgroundColor: "transparent", position: "top-right" }}
                    >
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <CloseIcon />
                    </button>
                    </h2>
                  </div>
                  <div className="modal-body">
                    <label>Event name </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Event name"
                      value={eventTitle}
                      Style={{color:"black",backgroundColor:"white"}}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Location: </label>
                    <input
                      type="text"
                      placeholder="Location.."
                      value={eventLoc}
                      Style={{color:"black",backgroundColor:"white"}}
                      onChange={(e) => setEventLoc(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Description: </label>
                    <textarea
                      className="form-control"
                      placeholder="Description.."
                      value={eventDes}
                      Style={{color:"black",backgroundColor:"white"}}
                      onChange={(e) => setEventDes(e.target.value)}
                    />
                  </div>
                  <div className="duration-control">
                    <input
                      type="text"
                      className="time-control"
                      placeholder="Time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                    <button onClick={handleDropdownClick} style={{ color: "black", backgroundColor: "transparent" }}>Min <ArrowDropDownIcon /></button>
                    {showOptions && (
                      <ul>
                        <li onClick={() => handleOptionClick('Min')}>Min</li>
                        <li onClick={() => handleOptionClick('hrs')}>hrs</li>
                      </ul>
                    )}
                    <p>Selected Option: {selectedOption}</p>
                  </div>
                  <div>
                    <label>Email ID: </label>
                    <input
                      type="text"
                      placeholder="Email ID.."
                      value={eemailId}
                      Style={{color:"black",backgroundColor:"white"}}
                      onChange={(e) => setEemailId(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    {selectEvent && (
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={deleteEvent}
                        style={{ backgroundColor: "red" }}
                      >
                        Delete Event
                      </button>
                    )}
                    <button type="button" onClick={handleSubmit} style={{ backgroundColor: "lightblue" }}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
     
  );
}

export default App;
