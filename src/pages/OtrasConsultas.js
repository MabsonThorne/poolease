// OtrasConsultas.js
import React, { useState, useEffect } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import TableSelection from "../components/TableSelection";
import TableInfo1 from "../components/TableInfo1";
import ProductCarousel1 from "../components/ProductCarousel1";
import ProductCarousel from "../components/ProductCarousel"; // Import ProductCarousel
import TableProvider from "../contexts/TableProvider";

const OtrasConsultas = () => {
  const [activeTab, setActiveTab] = useState("台球");
  const [selectedTable, setSelectedTable] = useState(null);
  const [isTableSelected, setIsTableSelected] = useState(false);
  const [passwords, setPasswords] = useState({});
  const [showProductCarousel, setShowProductCarousel] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsTableSelected(false);
    setShowProductCarousel(false);
  };

  const handleTableClick = (tableName) => {
    setSelectedTable(tableName);
    if (tableName && passwords[tableName]) {
      setIsTableSelected(true);
    } else {
      setIsTableSelected(false);
    }
  };

  const handlePasswordSubmit = (tableId, password) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [tableId]: password,
    }));
    setIsTableSelected(true);
  };

  const refreshTableSelection = () => {
    setSelectedTable(null);
    setIsTableSelected(false);
  };

  useEffect(() => {
    console.log("Selected tableName in OtrasConsultas (useEffect):", selectedTable || null);
  }, [selectedTable]);

  const handleAddItemClick = (orderId) => {
    setCurrentOrderId(orderId);
    setShowProductCarousel(true);
  };

  const handleBackClick = () => {
    setShowProductCarousel(false);
    setCurrentOrderId(null);
  };

  const handleConfirm = () => {
    setShowProductCarousel(false);
    setCurrentOrderId(null);
  };

  return (
    <div className="w-full h-[calc(100vh)] relative rounded-xl bg-background-default-default overflow-hidden">
      <main className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full h-full">
        <FrameComponent1 onTabClick={handleTabClick} />
        <section className="self-stretch bg-whitesmoke flex-1 flex flex-row">
          {activeTab === "台球" ? (
            <>
              {!showProductCarousel ? (
                <>
                  <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                    <TableSelection
                      headerSeparator="/header-separator.svg"
                      className="flex-1 h-full"
                      onTableClick={handleTableClick}
                      showAddButton={false}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                    {selectedTable ? (
                      <TableProvider tableId={parseInt(selectedTable, 10)} refreshTableSelection={refreshTableSelection}>
                        <TableInfo1
                          className="flex-1 h-full"
                          tableId={selectedTable}
                          refreshTableSelection={refreshTableSelection}
                          onAddItem={(orderId) => handleAddItemClick(orderId)}
                        />
                      </TableProvider>
                    ) : (
                      <div className="flex-1 h-full" />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                  <ProductCarousel1
                    className="flex-1 h-full"
                    onBack={handleBackClick}
                    orderId={currentOrderId}
                    onConfirm={handleConfirm}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <ProductCarousel
                className="flex-1 h-full"
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default OtrasConsultas;