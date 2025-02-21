import axios from "axios";

// 從環境變數中解構出 API 基本路徑
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export async function getProducts(page = 1) {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL || !VITE_API_PATH) {
    console.error("環境變數未正確配置：VITE_BASE_URL 或 VITE_API_PATH 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/products?page=${page}`;

  try {
    // 發送 GET 請求以取得產品資料
    const res = await axios.get(url);
    const data = res.data;

    return data;
  } catch (error) {
    console.error(`取得產品發生錯誤：`, error);
    return null;
  }
}

export async function addProduct(product) {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL || !VITE_API_PATH) {
    console.error("環境變數未正確配置：VITE_BASE_URL 或 VITE_API_PATH 缺失");
    return null;
  }

  const newProduct = {
    ...product,
    origin_price: Number(product.origin_price),
    price: Number(product.price),
    is_enabled: product.is_enabled ? 1 : 0,
  };

  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product`;

  try {
    await axios.post(url, {
      data: newProduct,
    });

    console.log(`上傳資料成功！🎉`);
  } catch (error) {
    console.error(`新增產品發生錯誤：`, error);
    return null;
  }
}

export async function deleteProduct(productId) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${productId}`;

  try {
    const res = await axios.delete(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateProduct(product) {
  const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/product/${product.id}`;

  const newProduct = {
    ...product,
    origin_price: Number(product.origin_price),
    price: Number(product.price),
    is_enabled: product.is_enabled ? 1 : 0,
  };

  try {
    const res = await axios.put(url, {
      data: newProduct,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
