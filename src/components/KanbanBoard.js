import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import TicketList from './TicketList';
import api from '../api/api';

import './KanbanBoard.css';

const KanbanBoard = () => {
  const [data, setData] = useState(null);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'status'
  );
  const [orderingOption, setOrderingOption] = useState(
    localStorage.getItem('orderingOption') || 'priority'
  );


  useEffect(() => {
    // Fetch data from the API
    api.getData().then((response) => setData(response));
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortChange = (option) => {
    setOrderingOption(option);
  };

  return (
    <div className="kanban-board-container">
      {data && (
        <div className="kanban-board">
          <ControlPanel
            groupingOption={groupingOption}
            sortOption={orderingOption}
            onGroupingChange={handleGroupingChange}
            onSortChange={handleSortChange}
          />
          <TicketList data={data} groupingOption={groupingOption} sortOption={orderingOption} />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
