import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SwitchTableDialog = ({
  showSwitchTableDialog,
  newTableId,
  setNewTableId,
  currentTableId,
  setShowSwitchTableDialog,
  refreshTableSelection,
}) => {
  const [availableTables, setAvailableTables] = useState([]);

  useEffect(() => {
    const fetchAvailableTables = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/pool-tables/available'); // 确保URL正确
        setAvailableTables(response.data);
      } catch (error) {
        console.error('Error fetching available tables:', error);
      }
    };

    if (showSwitchTableDialog) {
      fetchAvailableTables();
    }
  }, [showSwitchTableDialog]);

  const handleSwitchTable = async () => {
    try {
      await axios.post('http://localhost:5002/api/pool-tables/switch-table', {
        currentTableId,
        newTableId,
      });
      refreshTableSelection();
      setShowSwitchTableDialog(false);
    } catch (error) {
      console.error('Error switching table:', error);
    }
  };

  if (!showSwitchTableDialog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={() => setShowSwitchTableDialog(false)} className="absolute top-2 right-2">
          X
        </button>
        <p>请选择要换到的台号:</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {availableTables.map((table) => (
            <button
              key={table.id}
              className={`py-2 px-4 rounded-lg ${newTableId === table.id ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setNewTableId(table.id)}
            >
              {table.name}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => setShowSwitchTableDialog(false)} className="border border-black py-2 px-4 rounded-lg">
            取消
          </button>
          <button onClick={handleSwitchTable} className="bg-black text-white py-2 px-4 rounded-lg">
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

SwitchTableDialog.propTypes = {
  showSwitchTableDialog: PropTypes.bool.isRequired,
  newTableId: PropTypes.number,
  setNewTableId: PropTypes.func.isRequired,
  currentTableId: PropTypes.string.isRequired,
  setShowSwitchTableDialog: PropTypes.func.isRequired,
  refreshTableSelection: PropTypes.func.isRequired,
};

export default SwitchTableDialog;
