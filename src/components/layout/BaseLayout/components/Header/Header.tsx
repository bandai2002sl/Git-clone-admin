
import { PropsHeader } from "./interfaces";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";


function Header({}: PropsHeader) {
  //==========================Phan 5-============================================================
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
 //============================================================================================

 //==============================Phan5-Dang xuat ==========================================================
 const handleLogout = async () => {
  try {
    // Gửi yêu cầu đến máy chủ hoặc API để đăng xuất
    const response = await fetch('/api/logout', {
      method: 'POST', // Hoặc 'GET', 'DELETE', tùy vào cách bạn đã thiết lập API
      credentials: 'include', 
    });

    if (response.ok) {
      // Đăng xuất thành công
      window.location.reload(); // Tải lại trang để đăng nhập lại hoặc chuyển hướng đến trang đăng nhập
    } else {
      // Xử lý lỗi đăng xuất
      console.error('Không thể đăng xuất');
    }
  } catch (error) {
    // Xử lý lỗi gửi yêu cầu
    console.error('Lỗi khi gửi yêu cầu đăng xuất', error);
  }
};
 //============================================================================================

  return (
    <div className={styles.container}>

        {/* Phần 1 */}
        <div className={styles.section1}>
         <img
            className={styles.logo}
            src="/images/icon-logo.png"
            alt="Logo trang web"
          />
        </div>
      
        {/* Phần 2 */}
        <div className={styles.section2}>
          <div className={styles.title}>
            QUẢN LÝ NÔNG NGHIỆP NINH BÌNH
          </div>
        </div>
      
        {/* Phần 3 */}
        <div className={styles.section3}>
          <div className={styles.locationBox}>
            <div className={styles.locationTitle}>Tỉnh</div>
            <ul className={styles.locationList}>
              {/* Danh sách các tỉnh */}
              <li>Tỉnh 1</li>
              <li>Tỉnh 2</li>
              </ul>
           </div>
  
        <div className={styles.locationBox}>
          <div className={styles.locationTitle}>Huyện</div>
          <ul className={styles.locationList}>
              {/* Danh sách các huyện */}
              <li>Huyện 1</li>
              <li>Huyện 2</li>
            </ul>
        </div>
  
        <div className={styles.locationBox}>
          <div className={styles.locationTitle}>Xã</div>
          <ul className={styles.locationList}>
              {/* Danh sách các xã */}
              <li>Xã 1</li>
              <li>Xã 2</li>
            </ul>
        </div>
      </div>



      {/* Phần 4 */}
      <div className={styles.section4}>
      <div className={styles.search}>
          <div className={styles.searchIcon}>

          </div>
          <input
            type="text"
            placeholder="Nhập vô Enter để tìm kiếm"
            className={styles.input}
          />
        </div>
      </div>
    
    {/* Phần 5 */}
    <div className={styles.section5}>
        <div className={styles.settingsBox}>
          <img
            className={styles.settingsIcon}
            src="/images/settings-icon.png"
            alt="Cài đặt"
            onClick={toggleSettings}
          />
          <ul className={styles.settingsList}>
            <li>
            <button className={styles.logout_button} onClick={handleLogout}>Đăng xuất</button>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
    
  );
}

export default Header;