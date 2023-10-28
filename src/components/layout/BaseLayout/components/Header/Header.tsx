import { PropsHeader } from "./interfaces";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import { Icon } from "iconsax-react";
import { useDispatch } from "react-redux";
import { setStateLogin, setToken } from "~/redux/reducer/auth";
import Image from 'next/image';
import Button from "~/components/common/Button";



function Header({ }: PropsHeader) {


  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    dispatch(setToken(''));
    dispatch(setStateLogin(false));

    window.location.reload();
  }

  return (
    <div className={styles.container}>

      <div className={styles.section1}>
        <Image
          className={styles.logo}
          src="/images/icon-logo.png"
          alt="Logo trang web"
          width={100}
          height={100}
        />
      </div>


      <div className={styles.section2}>
        <div className={styles.title}>
          QUẢN LÝ NÔNG NGHIỆP NINH BÌNH
        </div>

      </div>


      <div className={styles.section3}>

          <div className={styles.locationBox}>
            <div className={styles.locationTitle} >
              <div className={styles.locationTitle1} >▼</div>
              <div className={styles.locationTitle2} >Tỉnh</div>
            </div>

            <ul className={styles.locationList}>
              <li>Ninh Bình</li>
              <li>Tỉnh 2</li>
            </ul>

          </div>

        
          <div className={styles.locationBox}>
            <div className={styles.locationTitle} >
              <div className={styles.locationTitle1} >▼</div>
              <div className={styles.locationTitle2} >Huyện</div>
            </div>

              <ul className={styles.locationList}>
                <li>Huyện 1</li>
                <li>Huyện 2</li>
              </ul>

          </div>
  
          <div className={styles.locationBox}>
            <div className={styles.locationTitle} >
              <div className={styles.locationTitle1} >▼</div>
              <div className={styles.locationTitle2} >Xã</div>
            </div>

              <ul className={styles.locationList}>
              <li>Xã 1</li>
              <li>Xã 2</li>
            </ul>

          </div>

        </div>


      <div className={styles.section4}>
        <div className={styles.search}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            placeholder="Nhập vô Enter để tìm kiếm"
            className={styles.input}
          />
        </div>
      </div >

      <div className={styles.section5}>
          
          <Button
          primary
          bold
          rounded_4
          maxContent
          onClick={handleLogout}
        >
           Đăng xuất ↩

        </Button>
      </div>

    </div >
  );
}
export default Header;
