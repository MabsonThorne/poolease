import Profile from "../components/Profile";
import TableSelection from "../components/TableSelection";
import TableInfo from "../components/TableInfo";
import Container from "../components/Container";
import Desktop from "../components/Desktop";
import { useState } from "react";

const Frame = () => {
  const [activeTab, setActiveTab] = useState("台球");
  const [isTableSelected, setIsTableSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTableClick = (isSelected) => {
    setIsTableSelected(isSelected);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProductSuccess = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-full h-[calc(100vh)] relative rounded-xl bg-background-default-default overflow-hidden">
      <main className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full h-full">
        <Profile onTabClick={handleTabClick} />
        <section className="self-stretch bg-whitesmoke flex-1 flex flex-row">
          {activeTab === "台球" ? (
            <>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <TableSelection
                  headerSeparator="/header-separator.svg"
                  className="flex-1 h-full"
                  onTableClick={handleTableClick}
                  showAddButton={true}
                />
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                {isTableSelected ? (
                  <TableInfo className="flex-1 h-full" showMinusButton={true} />
                ) : (
                  <div className="flex-1 h-full" />
                )}
              </div>
            </>
          ) : activeTab === "商品" ? (
            <>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <Container className="flex-1 h-full" onProductSelect={handleProductSelect} />
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <Desktop className="flex-1 h-full" selectedProduct={selectedProduct} onAddProductSuccess={handleAddProductSuccess} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <div className="flex-1 h-full" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Frame;
