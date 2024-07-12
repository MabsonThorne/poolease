import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = ["饮料", "零食", "香烟", "纸巾", "其他"];

const Desktop = ({ className = "", selectedProduct, onAddProductSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: "商品名称",
    category: "类目",
    price: "00.00",
    stock: "0",
    cost: "00.00",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setProductInfo({
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price.toString(),
        stock: selectedProduct.quantity.toString(),
        cost: selectedProduct.cost_price.toString(),
      });
      setImagePreview(selectedProduct.image);
      setIsEditing(false); // View mode initially
    } else {
      setProductInfo({
        name: "商品名称",
        category: "类目",
        price: "00.00",
        stock: "0",
        cost: "00.00",
      });
      setImagePreview("");
      setIsEditing(false); // Default to view mode
    }
  }, [selectedProduct]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (selectedProduct) {
      setIsEditing(false);
    } else {
      setProductInfo({
        name: "商品名称",
        category: "类目",
        price: "00.00",
        stock: "0",
        cost: "00.00",
      });
      setImagePreview("");
    }
  };

  const handleSave = async () => {
    setIsEditing(false);

    let imageUrl = imagePreview;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post("http://localhost:5002/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        imageUrl = response.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const productData = {
      image: imageUrl,
      name: productInfo.name,
      price: parseFloat(productInfo.price),
      quantity: parseInt(productInfo.stock),
      cost_price: parseFloat(productInfo.cost),
      category: productInfo.category,
    };

    try {
      if (selectedProduct) {
        await axios.put(`http://localhost:5002/api/products/${selectedProduct.id}`, productData);
      } else {
        await axios.post('http://localhost:5002/api/products', productData);
      }
      onAddProductSuccess();
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleAdd = () => {
    setIsEditing(true);
    setProductInfo({
      name: "商品名称",
      category: "类目",
      price: "00.00",
      stock: "0",
      cost: "00.00",
    });
    setImagePreview("");
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryClick = (category) => {
    setProductInfo((prev) => ({
      ...prev,
      category: prev.category === category ? "类目" : category,
    }));
  };

  const handleStockChange = (amount) => {
    setProductInfo((prev) => ({
      ...prev,
      stock: Math.max(0, parseInt(prev.stock) + amount).toString(),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full h-full rounded-xl bg-background-default-default overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-left text-13xl text-background-default-default font-single-line-body-base ${className}`}>
      <div className="relative hidden min-w-[64px] mq450:text-lgi mq1050:text-7xl">
        结账
      </div>
      <div className="w-full h-full relative rounded-xl bg-background-default-default hidden max-w-full" />
      <main className="self-stretch bg-whitesmoke flex flex-row items-start justify-start pt-2 px-4 pb-[20px] box-border gap-[20px] max-w-full z-[1] text-left text-base text-text-default-secondary font-single-line-body-base mq1150:flex-wrap mq750:gap-[10px] mq750:pb-5 mq750:box-border mq1050:pt-2 mq1050:pb-[10px] mq1050:box-border">
        <div className="h-full w-full relative bg-whitesmoke hidden max-w-full" />
        <div className="flex-1 rounded-xl bg-background-default-default flex flex-row items-start justify-start py-[20px] px-[20px] box-border min-w-[442px] max-w-full z-[2] mq450:pt-2 mq450:pb-2 mq450:box-border mq750:min-w-full mq1050:pt-[10px] mq1050:pb-[10px] mq1050:box-border">
          <div className="h-full w-full relative rounded-xl bg-background-default-default hidden max-w-full" />
          <div className="flex-1 flex flex-col items-start justify-start pt-2 px-2 pb-[20px] box-border gap-[20px] min-w-[240px] max-w-full z-[3] mq450:pt-[10px] mq450:pb-[20px] mq450:box-border mq750:pl-4 mq750:pr-4 mq750:box-border mq1050:pt-[20px] mq1050:pb-[20px] mq1050:box-border">
            <div className="self-stretch flex flex-row items-start justify-start max-w-full mq750:gap-[16px]">
              <div className="relative w-[180px] h-[320px] flex-1 max-w-full overflow-hidden object-cover bg-gray-200 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    className="w-full h-full object-cover"
                    loading="lazy"
                    alt="预览图片"
                    src={imagePreview}
                  />
                ) : (
                  "图片预览"
                )}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-center py-0 px-0 box-border gap-[20px] max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start text-5xl text-black-100">
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                  <div className="self-stretch flex flex-row items-start justify-start">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={productInfo.name}
                        onChange={handleChange}
                        className="relative text-inherit tracking-[-0.02em] leading-[29px] font-semibold font-inherit inline-block min-w-[48px] mq450:text-lgi mq450:leading-[23px]"
                      />
                    ) : (
                      <h3 className="m-0 relative text-inherit tracking-[-0.02em] leading-[29px] font-semibold font-inherit inline-block min-w-[48px] mq450:text-lgi mq450:leading-[23px]">
                        {productInfo.name}
                      </h3>
                    )}
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-center py-0 pr-[250px] pl-0 gap-[4px] text-base text-text-positive-on-positive-secondary mq750:pr-[125px] mq750:box-border">
                    {isEditing ? (
                      <div className="flex flex-row items-center justify-center gap-4">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className={`rounded-radius-200 p-2 cursor-pointer ${
                              productInfo.category === category ? "bg-red-200 text-white" : "bg-background-positive-secondary text-black"
                            }`}
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-radius-200 bg-background-positive-secondary flex flex-row items-center justify-center p-2">
                        <div className="relative leading-[100%] inline-block min-w-[32px]">
                          {productInfo.category}
                        </div>
                      </div>
                    )}
                    <div className="self-stretch flex flex-row items-baseline justify-start gap-[8px] text-29xl text-text-default-default whitespace-nowrap">
                      <div className="flex-1 flex flex-row items-center justify-start">
                        <span className="relative tracking-[-0.02em] leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
                          价格：
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            name="price"
                            value={productInfo.price}
                            onChange={handleChange}
                            className="relative tracking-[-0.02em] leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px] bg-transparent border-none text-right"
                          />
                        ) : (
                          <b className="relative tracking-[-0.02em] leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
                            {productInfo.price}
                          </b>
                        )}
                      </div>
                      <div className="w-[52px] relative text-sm leading-[140%] hidden">
                        / month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative leading-[140%] inline-block min-w-[88px] flex items-center gap-2">
                库存数量：
                {isEditing ? (
                  <>
                    <button
                      className="bg-transparent text-black w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center"
                      onClick={() => handleStockChange(-1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name="stock"
                      value={productInfo.stock}
                      onChange={handleChange}
                      className="relative leading-[140%] inline-block min-w-[32px] text-center"
                    />
                    <button
                      className="bg-transparent text-black w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center"
                      onClick={() => handleStockChange(1)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  productInfo.stock
                )}
              </div>
              <div className="w-full flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border max-w-[640px] mq750:max-w-full">
                <div className="relative leading-[140%] inline-block min-w-[82px]">
                  进价：
                  {isEditing ? (
                    <input
                      type="text"
                      name="cost"
                      value={productInfo.cost}
                      onChange={handleChange}
                      className="relative tracking-[-0.02em] leading-[58px] mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px] bg-transparent border-none"
                    />
                  ) : (
                    productInfo.cost
                  )}
                </div>
              </div>
              {isEditing ? (
                <div className="self-stretch flex flex-row items-center justify-between gap-4">
                  <button
                    className="flex-1 cursor-pointer py-2.5 px-5 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-background-brand-default"
                    onClick={handleCancel}
                  >
                    <div className="relative text-base leading-[100%] font-single-line-body-base text-text-brand-on-brand text-left inline-block min-w-[32px]">
                      取消
                    </div>
                  </button>
                  <button
                    className="flex-1 cursor-pointer py-2.5 px-5 bg-background-brand-default rounded-radius-200 overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-background-brand-default"
                    onClick={handleSave}
                  >
                    <div className="relative text-base leading-[100%] font-single-line-body-base text-text-brand-on-brand text-left inline-block min-w-[32px]">
                      确定
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  className="cursor-pointer py-2.5 px-5 bg-background-brand-default self-stretch rounded-radius-200 overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-background-brand-default"
                  onClick={handleEdit}
                >
                  <div className="relative text-base leading-[100%] font-single-line-body-base text-text-brand-on-brand text-left inline-block min-w-[32px]">
                    {selectedProduct ? "编辑" : "添加"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Desktop;
