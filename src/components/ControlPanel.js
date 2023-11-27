import React, { useState, useEffect } from "react";

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

  const options1 = ['Status', 'User', 'Priority'];
  const options2 = ['Priority', 'Title'];


  return (
    <div className="control-panel">
      <div className="custom-button">
        Display
        <div className="arrow-icon">&#9660;</div>
        <div className="dropdown-content">
          <div className="dropdown-container">
            <div className="Drop">
            <label htmlFor="grouping">Grouping</label>
            <select defaultValue={groupingOption} id="grouping"
              onChange={(e) => handleGroupingChange(e.target.value)}
              style={{ marginLeft: '35px'}}>
              {options1.map((opt) => (
                <option key={opt} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </select>
            </div>

            <div className="Drop">
            <label htmlFor="ordering">Ordering</label>
            
            <select defaultValue={orderingOption} id="ordering"
              onChange={(e) => handleOrderingChange(e.target.value)}
              style={{ marginLeft: '35px' }}>
              {options2.map((opt) => (
                <option key={opt} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </select>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ControlPanel;
