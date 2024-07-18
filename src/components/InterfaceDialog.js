import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const InterfaceDialog = ({ isOpen, onClose, onSave }) => {
  const [availableInterfaces, setAvailableInterfaces] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState(null);
  const [selectedTableName, setSelectedTableName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchAvailableInterfaces();
      fetchTableNames();
    }
  }, [isOpen]);

  const fetchAvailableInterfaces = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/interfaces");
      setAvailableInterfaces(response.data);
    } catch (error) {
      console.error("Error fetching interfaces:", error);
    }
  };

  const fetchTableNames = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/pool-tables");
      setTableNames(response.data);
    } catch (error) {
      console.error("Error fetching table names:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedInterface || !selectedTableName) {
      setErrorMessage("请先选择接口和台号");
      return;
    }

    const payload = {
      name: selectedTableName,
      status: 0,
      interface: selectedInterface,
    };

    console.log("Sending payload:", payload);
    try {
      await axios.post("http://localhost:5002/api/pool-tables", payload);
      onSave(selectedInterface, selectedTableName);
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.warn("400 Error - checking if table was created anyway");
        try {
          const response = await axios.get("http://localhost:5002/api/pool-tables");
          const newTable = response.data.find(table => table.name === selectedTableName && table.interface === selectedInterface);
          if (newTable) {
            onSave(selectedInterface, selectedTableName);
            onClose();
          } else {
            console.error("Error creating new table:", error);
            setErrorMessage("Error creating new table.");
          }
        } catch (fetchError) {
          console.error("Error verifying new table:", fetchError);
          setErrorMessage("Error verifying new table.");
        }
      } else {
        console.error("Error creating new table:", error);
        setErrorMessage("Error creating new table.");
      }
    }
  };

  const generateTableNames = () => {
    let tableNames = [];
    for (let i = 1; i <= 50; i++) {
      tableNames.push(`${i}`);
    }
    return tableNames;
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2">
            <img src="/cancel.png" alt="cancel" className="w-6 h-6" />
          </button>
          <p>请选择一个接口:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {availableInterfaces.map((interfaceName, index) => (
              <button
                key={index}
                className={`py-2 px-4 rounded-lg ${selectedInterface === interfaceName ? "bg-black text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedInterface(interfaceName)}
              >
                {interfaceName}
              </button>
            ))}
          </div>
          <p className="mt-4">请选择台号:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {generateTableNames().map((name) => {
              const table = tableNames.find(t => t.name === name);
              const isDisabled = table && table.interface === selectedInterface;
              return (
                <button
                  key={name}
                  className={`py-2 px-4 rounded-lg ${selectedTableName === name ? "bg-black text-white" : "bg-gray-200"} ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() => !isDisabled && setSelectedTableName(name)}
                  disabled={isDisabled}
                >
                  {name}
                </button>
              );
            })}
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="border border-black py-2 px-4 rounded-lg">
              取消
            </button>
            <button onClick={handleSave} className="bg-black text-white py-2 px-4 rounded-lg">
              确认
            </button>
          </div>
        </div>
      </div>
    )
  );
};

InterfaceDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default InterfaceDialog;
