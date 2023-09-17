// Trong header.tsx

import { PropsHeader } from "./interfaces";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { Icon } from "iconsax-react";

function Header({}: PropsHeader) {
  const [showProvinces, setShowProvinces] = useState(false);
  const [showDistricts, setShowDistricts] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false);

  const toggleProvinces = () => setShowProvinces(!showProvinces);
  const toggleDistricts = () => setShowDistricts(!showDistricts);
  const toggleCommunities = () => setShowCommunities(!showCommunities);

  return (
    <div className={styles.container}>
      {/* Phần 1 */}
      <div className={styles.section}>
        <div className={styles.icon}>

        </div>
      </div>

      {/* Phần 2 */}
        <div className={styles.section}>
          <div className={`${styles.title} ${styles.bold}`}>
            QUẢN LÝ NÔNG NGHIỆP NINH BÌNH
          </div>
      </div>

      {/* Phần 3 */}
      <div className={styles.section}>
        <div
          className={`${styles.locationBox} ${
            showProvinces ? styles.active : ""
          }`}
          onClick={toggleProvinces}
        >
          Tỉnh▼
          {showProvinces && (
            <ul className={styles.locationList}>
              {/* Danh sách các tỉnh */}
              <li>Tỉnh 1</li>
              <li>Tỉnh 2</li>
              
            </ul>
          )}
        </div>

        <div
          className={`${styles.locationBox} ${
            showDistricts ? styles.active : ""
          }`}
          onClick={toggleDistricts}
        >
          Huyện▼
          {showDistricts && (
            <ul className={styles.locationList}>
              {/* Danh sách các huyện */}
              <li>Huyện 1</li>
              <li>Huyện 2</li>
            </ul>
          )}
        </div>

        <div
          className={`${styles.locationBox} ${
            showCommunities ? styles.active : ""
          }`}
          onClick={toggleCommunities}
        >
          Xã▼
          {showCommunities && (
            <ul className={styles.locationList}>
              {/* Danh sách các xã */}
              <li>Xã 1</li>
              <li>Xã 2</li>
            </ul>
          )}
        </div>
      </div>

      {/* Phần 4 */}
      <div className={styles.section}>
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
    </div>
  );
}

export default Header;