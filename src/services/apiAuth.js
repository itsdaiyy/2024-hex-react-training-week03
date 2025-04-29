import axios from "axios";
import toast from "react-hot-toast";

const { VITE_BASE_URL } = import.meta.env;

export async function login(account) {
  // 確保環境變數存在，否則提示錯誤
  if (!VITE_BASE_URL) {
    toast.error("環境變數未正確配置：VITE_BASE_URL 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/admin/signin`;

  try {
    const res = await axios.post(url, account);
    const { expired, token, message } = res.data;

    document.cookie = `hexToken=${token};expires=${new Date(expired)}`;

    axios.defaults.headers.common.Authorization = `${token}`;

    return { expired, token, message };
  } catch (error) {
    toast.error("登入失敗，請檢查帳號或密碼");
    return null;
  }
}

export async function checkLogin() {
  // 確保環境變數存在，否則提示錯誤｀
  if (!VITE_BASE_URL) {
    toast.error("環境變數未正確配置：VITE_BASE_URL 缺失");
    return null;
  }

  const url = `${VITE_BASE_URL}/v2/api/user/check`;

  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken"))
      ?.split("=")[1];

    axios.defaults.headers.common.Authorization = `${token}`;

    const res = await axios.post(url);

    const { success, uid } = res.data;

    return { success, uid };
  } catch (error) {
    console.error("未登入");
    return null;
  }
}
