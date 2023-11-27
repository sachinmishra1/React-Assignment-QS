import React from 'react';
import TicketCard from './TicketCard';

import './TicketList.css'; 


const TicketList = ({ data, groupingOption, sortOption }) => {
  // Filter tickets based on grouping option
  let groupedTickets = {};

  data.tickets.forEach((ticket) => {
    const groupKey =
      groupingOption === 'status'
        ? ticket.status
        : groupingOption === 'user'
        ? ticket.userId
        : ticket.priority;

    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }

    groupedTickets[groupKey].push(ticket);
  });

  // Sort tickets based on sort option
  for (const groupKey in groupedTickets) {
    if (groupedTickets.hasOwnProperty(groupKey)) {
      groupedTickets[groupKey].sort((a, b) => {
        if (sortOption === 'priority') {
          return b.priority - a.priority || a.title.localeCompare(b.title);
        } else if (sortOption === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
  }

const groupKeys = groupingOption === 'status' ? ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'] : groupingOption === 'priority' ? [0,1,2,3,4] : [];

return (
  <div className="ticket-list">
    {/* Display the grouped and sorted tickets using TicketCard component */}
    {groupKeys.length === 0 ? (
      Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="status-column">
          <h2>{getTitle(groupKey, groupingOption, data, groupedTickets)}</h2>
          {groupedTickets[groupKey].map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              priorityInfo={getPriorityInfo(ticket.priority)}
            />
          ))}
        </div>
      ))
    ) : (
      groupKeys.map((groupKey) => (
        <div key={groupKey} className="status-column">
          <h2>{getTitle(groupKey, groupingOption, data, groupedTickets)}</h2>
          {groupedTickets[groupKey]?.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              priorityInfo={getPriorityInfo(ticket.priority)}
            />
          ))}
        </div>
      ))
    )}
  </div>
);

};

const getTitle = (groupKey, groupingOption, data, groupedTickets) => {
if (groupingOption === 'user') {
  const user = data.users.find((user) => user.id === groupKey);
  const numTickets = groupedTickets[groupKey]?.length || 0;
  return `${user?.name} (${numTickets})`;
} else if (groupingOption === 'status') {
  const numTickets = groupedTickets[groupKey]?.length || 0;
  return `${groupKey} (${numTickets})`;
}
else if(groupingOption==='priority') {
  const ticket = data.tickets.find((ticket) => ticket.priority == groupKey);
  const numTickets = groupedTickets[groupKey].length;
  // console.log(getPriorityInfo(ticket.priority))
  return `${getPriorityInfo(ticket.priority).name} (${numTickets})`;
}
 else {
  return groupKey;
}
};



const getPriorityInfo = (priority) => {
  switch (priority) {
    case 4:
      return { name: 'Urgent', code: 'U' };
    case 3:
      return { name: 'High', code: 'H' };
    case 2:
      return { name: 'Medium', code: 'M' };
    case 1:
      return { name: 'Low', code: 'L' };
    default:
      return { name: 'No priority', code: 'N/A' };
  }
};

export default TicketList;
