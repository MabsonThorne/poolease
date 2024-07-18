const fs = require('fs');
const path = require('path');

// 确保目录存在的函数
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// 文件内容
const appJsonContent = {
  "pages": [
    "pages/index/index",
    "pages/tableselection/tableselection",
    "pages/productcarousel/productcarousel",
    "pages/orders/orders",
    "pages/profile/profile"
  ],
  "window": {
    "navigationBarTitleText": "WeChat",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#8a8a8a",
    "selectedColor": "#000000",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/tableselection/tableselection",
        "text": "台球",
        "iconPath": "icons/billiards.png",
        "selectedIconPath": "icons/billiards_selected.png"
      },
      {
        "pagePath": "pages/productcarousel/productcarousel",
        "text": "商品",
        "iconPath": "icons/products.png",
        "selectedIconPath": "icons/products_selected.png"
      },
      {
        "pagePath": "pages/orders/orders",
        "text": "订单",
        "iconPath": "icons/orders.png",
        "selectedIconPath": "icons/orders_selected.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "个人",
        "iconPath": "icons/profile.png",
        "selectedIconPath": "icons/profile_selected.png"
      }
    ]
  }
};

const tableselectionJsonContent = {
  "navigationBarTitleText": "台球"
};

const productcarouselJsonContent = {
  "navigationBarTitleText": "商品"
};

const ordersJsonContent = {
  "navigationBarTitleText": "订单"
};

const profileJsonContent = {
  "navigationBarTitleText": "个人"
};

// 路径
const rootDir = path.join(__dirname, 'miniprogram');
const pagesDir = path.join(rootDir, 'pages');
const tableselectionDir = path.join(pagesDir, 'tableselection');
const productcarouselDir = path.join(pagesDir, 'productcarousel');
const ordersDir = path.join(pagesDir, 'orders');
const profileDir = path.join(pagesDir, 'profile');

// 确保目录存在
ensureDir(rootDir);
ensureDir(pagesDir);
ensureDir(tableselectionDir);
ensureDir(productcarouselDir);
ensureDir(ordersDir);
ensureDir(profileDir);

// 文件路径
const appJsonPath = path.join(rootDir, 'app.json');
const tableselectionJsonPath = path.join(tableselectionDir, 'tableselection.json');
const productcarouselJsonPath = path.join(productcarouselDir, 'productcarousel.json');
const ordersJsonPath = path.join(ordersDir, 'orders.json');
const profileJsonPath = path.join(profileDir, 'profile.json');

// 写入文件
const writeFileWithoutBOM = (filePath, content) => {
  fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing ${filePath}:`, err);
    } else {
      console.log(`${filePath} has been saved!`);
    }
  });
};

writeFileWithoutBOM(appJsonPath, appJsonContent);
writeFileWithoutBOM(tableselectionJsonPath, tableselectionJsonContent);
writeFileWithoutBOM(productcarouselJsonPath, productcarouselJsonContent);
writeFileWithoutBOM(ordersJsonPath, ordersJsonContent);
writeFileWithoutBOM(profileJsonPath, profileJsonContent);
