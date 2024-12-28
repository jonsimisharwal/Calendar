import React from 'react';

const EventComponent = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event">
      <h3>{event.title}</h3>
      <p>{`Start: ${event.start.toLocaleString()}`}</p>
      <p>{`End: ${event.end.toLocaleString()}`}</p>
      <p>{`Description: ${event.description}`}</p>
      <p>{`Location: ${event.location}`}</p>
      <p>{`Email: ${event.email}`}</p>
      <button onClick={() => onEdit(event)}>Edit</button>
      <button onClick={() => onDelete(event.id)}>Delete</button>
    </div>
  );
};

export default EventComponent;