import React, { useState } from "react";

import "./ControlPanel.css"; 

const ControlPanel = ({ onGroupingChange, onSortChange }) => {
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem('groupingOption') || 'status'
  );
  const [orderingOption, setOrderingOption] = useState(
    localStorage.getItem('orderingOption') || 'priority'
  );

  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('orderingOption', orderingOption);
  }, [groupingOption, orderingOption]);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
    onGroupingChange(option);
  };

  const handleOrderingChange = (option) => {
    setOrderingOption(option);
    onSortChange(option);
  };

  return (
    <div className="control-panel">
      <div class="custom-button">
        Display
        <div class="arrow-icon">&#9660;</div>
        <div class="dropdown-content">
          <div class="dropdown-container">
            <div className="Drop">
            <label for="grouping">Grouping</label>
            <select
              id="grouping"
              onChange={(e) => handleGroupingChange(e.target.value)}
              style={{ marginLeft: '35px'}}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
            </div>

            <div className="Drop">
            <label for="ordering">Ordering</label>
            <select
              id="ordering"
              onChange={(e) => handleOrderingChange(e.target.value)}
              style={{ marginLeft: '35px' }}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ControlPanel;
