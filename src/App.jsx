import { useEffect, useState } from "react";

import { checkLogin, login } from "./services/apiAuth";

import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import CheckLogin from "./components/CheckLogin";

function App() {
  // 儲存使用者表單資料
  const [formData, setFormData] = useState({
    username: "ollie@test.com",
    password: "ollieollie01",
  });
  // 儲存使用者認證狀態
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await checkLogin();
      if (res?.success) setIsAuth(true);
    })();
  }, []);

  // 提交登入表單的處理函數
  async function handleSubmit(e) {
    // 防止表單的預設重新整理行為
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      console.error("請輸入使用者名稱和密碼");
      return;
    }

    const res = await login(formData);

    if (!res) {
      console.log("登入失敗");
      return;
    }

    // 判斷是否成功取得 token 並更新認證狀態
    setIsAuth(!!res?.token);

    // 清空表單資料（重置表單）
    setFormData({ username: "", password: "" });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    // 更新對應欄位的值，保留其他欄位不變
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <>
      <CheckLogin />
      {isAuth ? (
        <AdminDashboard />
      ) : (
        <Login
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
}

export default App;
