import React, { useState } from "react";
import FrameComponent1 from "../components/FrameComponent1";
import TableSelection from "../components/TableSelection";
import TableInfo from "../components/TableInfo";
import PasswordInput from "../components/PasswordInput";
import ProductCarousel from "../components/ProductCarousel";

const OtrasConsultas = () => {
  const [activeTab, setActiveTab] = useState("台球");
  const [isTableSelected, setIsTableSelected] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsTableSelected(false);
  };

  const handleTableClick = (isSelected) => {
    setIsTableSelected(isSelected);
  };

  return (
    <div className="w-full h-[calc(100vh)] relative rounded-xl bg-background-default-default overflow-hidden">
      <main className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full h-full">
        <FrameComponent1 onTabClick={handleTabClick} />
        <section className="self-stretch bg-whitesmoke flex-1 flex flex-row">
          {activeTab === "台球" ? (
            <>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                <TableSelection
                  headerSeparator="/header-separator.svg"
                  className="flex-1 h-full"
                  onTableClick={handleTableClick}
                  showAddButton={false} // 不显示添加按钮
                />
              </div>
              <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
                {isTableSelected ? (
                  <TableInfo className="flex-1 h-full" showMinusButton={false} />
                ) : (
                  <PasswordInput className="flex-1 h-full" />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center border-b border-gray-300 px-4 py-2">
              <ProductCarousel className="flex-1 h-full" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default OtrasConsultas;
