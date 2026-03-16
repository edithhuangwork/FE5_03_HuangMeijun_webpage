import React, { useState } from 'react';

function Navbar() {
  // 1. 定義狀態：true 表示已登入 (Member)，false 表示未登入 (Visitor)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 2. 登入功能 (模擬)
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('userToken', 'abc-123'); // 存入瀏覽器，下次重新整理也不會消失
  };
  // 3. 登出功能 (Logout Function)
  const handleLogout = () => {
    // 步驟 A: 清除瀏覽器緩存 (Token)
    localStorage.removeItem('userToken');
    // 步驟 B: 更新 React 狀態，讓畫面立即變動
    setIsLoggedIn(false);
    // 步驟 C: 提示使用者 (可選)
    alert('您已成功登出 HKCT 系統');
    // 步驟 D: 如果有使用路由 (React Router)，可以在這裡跳轉頁面
    // navigate('/'); 
  };

  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold' }}>HKCT</div>
      <div>
        {/* 條件渲染：根據 isLoggedIn 顯示不同介面 */}
        {isLoggedIn ? (
          /* Member 介面 */
          <>
            <span style={{ marginRight: '15px' }}>Welcome back, username! 👋</span>
            <button 
              onClick={handleLogout}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
            >
              登出 (Log Out)
            </button>
          </>
        ) : (
          /* Visitor 介面 */
          <>
            <button 
              onClick={handleLogin}
              style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Log-In
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
