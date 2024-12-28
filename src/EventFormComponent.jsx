import React, { useState } from 'react';

const EventFormComponent = ({ onSubmit, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: Date.now(), // Unique ID for the event
      title,
      start: new Date(startTime),
      end: new Date(endTime),
      description,
      location,
      email,
    };
    onSubmit(eventData);
    // Reset form fields
    setTitle('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setLocation('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <br />
      <label>
        Start Time:
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </label>
      <br />
      <label>
        End Time:
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Email ID:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventFormComponent;