import React from 'react';

import './TicketCard.css'; 

const TicketCard = ({ ticket, priorityInfo }) => {
  return (
    <div className="ticket-card">
      <h4 style={{ fontSize: '14px' }}>{ticket.id}</h4>
      <h3 style={{ fontSize: '16px' }}>{ticket.title}</h3>
      <p style={{ fontSize: '14px' }}>Priority: {priorityInfo.name} ({priorityInfo.code})</p>
      <p style={{ fontSize: '14px' }}> {getTags(ticket.tag)}</p>
    </div>
  );
};


const getTags = (tags) => {
  const MAX_TAGS_DISPLAY = 3;
  if (tags && tags.length > 0) {
    const displayedTags = tags.slice(0, MAX_TAGS_DISPLAY).join(', ');
    const ellipsis = tags.length > MAX_TAGS_DISPLAY ? '...' : '';
    return `${displayedTags}${ellipsis}`;
  } else {
    return 'No tags';
  }
};

export default TicketCard;
