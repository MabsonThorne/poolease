import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import TableSelection1 from "../components/TableSelection1";
import TableInfo from "../components/TableInfo";
import Container from "../components/Container";
import Desktop from "../components/Desktop";
import InterfaceDialog from "../components/InterfaceDialog";
import DeleteDialog from "../components/DeleteDialog";
import FrameComponent2 from "../components/FrameComponent2";
import Component3 from "../components/Component3";
import Component4 from "../components/Component4";
import axios from "axios";
import TableProvider from "../contexts/TableProvider";

const Frame = () => {
  const [activeTab, setActiveTab] = useState("台球");
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [tables, setTables] = useState([]);
  const [orders, setOrders] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshContainerKey, setRefreshContainerKey] = useState(0);

  useEffect(() => {
    fetchTables();
    fetchOrders();
  }, [refreshKey]);

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/pool-tables");
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleAddTableClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSave = async (selectedInterface, selectedTableName) => {
    try {
      await axios.post("http://localhost:5002/api/pool-tables", {
        name: selectedTableName,
        status: "空闲",
        interface: selectedInterface,
      });
      fetchTables();
    } catch (error) {
      console.error("Error creating new table:", error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct((prevSelectedProduct) =>
      prevSelectedProduct?.id === product.id ? null : product
    );
  };

  const handleAddProductSuccess = () => {
    setSelectedProduct(null);
    setRefreshContainerKey((prevKey) => prevKey + 1);
  };

  const refreshTableSelection = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5002/api/products/${productToDelete.id}`);
      setRefreshContainerKey((prevKey) => prevKey + 1);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="w-full h-[calc(100vh)] relative rounded-xl bg-background-default-default overflow-hidden">
      <main className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full h-full">
        <Profile onTabClick={handleTabClick} />
        <section className="self-stretch bg-whitesmoke flex-1 flex flex-row">
          {activeTab === "台球" ? (
            <>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <TableSelection1
                  key={refreshKey}
                  headerSeparator="/header-separator.svg"
                  className="flex-1 h-full"
                  onTableClick={handleTableClick}
                  onAddTableClick={handleAddTableClick}
                />
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                {selectedTable !== null ? (
                  <TableProvider tableId={selectedTable} refreshTableSelection={refreshTableSelection}>
                    <TableInfo
                      className="flex-1 h-full"
                      tableId={selectedTable}
                      refreshTableSelection={refreshTableSelection}
                    />
                  </TableProvider>
                ) : (
                  <div className="flex-1 h-full" />
                )}
              </div>
            </>
          ) : activeTab === "商品" ? (
            <>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <Container
                  key={refreshContainerKey}
                  className="flex-1 h-full"
                  onProductSelect={handleProductSelect}
                  onDelete={handleDeleteProduct}
                />
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <Desktop
                  className="flex-1 h-full"
                  selectedProduct={selectedProduct}
                  onAddProductSuccess={handleAddProductSuccess}
                />
              </div>
            </>
          ) : activeTab === "订单管理" ? (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <FrameComponent2 className="flex-1 h-full" />
            </div>
          ) : activeTab === "会员管理" ? (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <Component3 className="flex-1 h-full" orders={orders} />
            </div>
          ) : activeTab === "员工管理" ? (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <Component4 className="flex-1 h-full" orders={orders} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <div className="flex-1 h-full" />
            </div>
          )}
        </section>
      </main>
      <InterfaceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleDialogSave}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Frame;
