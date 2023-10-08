import { PropsHeader } from "./interfaces";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";
import Image from 'next/image';



function Header({}: PropsHeader) {
  //=================================================================================================
  const [isProvinceListVisible, setIsProvinceListVisible] = useState(false);
  const [isDistrictListVisible, setIsDistrictListVisible] = useState(false);
  const [isCommuneListVisible, setIsCommuneListVisible] = useState(false);

  const provinceBoxRef = useRef<HTMLDivElement>(null);
  const districtBoxRef = useRef<HTMLDivElement>(null);
  const communeBoxRef = useRef<HTMLDivElement>(null);


  const toggleProvinceList = () => {
    setIsProvinceListVisible(!isProvinceListVisible);
    setIsDistrictListVisible(false);
    setIsCommuneListVisible(false);
  };
  const toggleDistrictList = () => {
    setIsProvinceListVisible(false);
    setIsDistrictListVisible(!isDistrictListVisible);
    setIsCommuneListVisible(false);
  };
  const toggleCommuneList = () => {
    setIsProvinceListVisible(false);
    setIsDistrictListVisible(false);
    setIsCommuneListVisible(!isCommuneListVisible);
  };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        provinceBoxRef.current &&
        !provinceBoxRef.current.contains(event.target as Node)
      ) {
        setIsProvinceListVisible(false);
      }

      if (
        districtBoxRef.current &&
        !districtBoxRef.current.contains(event.target as Node)
      ) {
        setIsDistrictListVisible(false);
      }

      if (
        communeBoxRef.current &&
        !communeBoxRef.current.contains(event.target as Node)
      ) {
        setIsCommuneListVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [provinceBoxRef, districtBoxRef, communeBoxRef]);
 //=================================================================================================
 const provinces: string[] = ["Ninh Bình"];
const districtsByProvince: Record<string, string[]> = {
  "Ninh Bình": ["Huyện 1", "Huyện 2", "Huyện 3"],
};
const communesByDistrict: Record<string, string[]> = {
  "Huyện 1": ["Xã 1", "Xã 2", "Xã 3"],
  "Huyện 2": ["Xã 4", "Xã 5", "Xã 6"],
  "Huyện 3": ["Xã 7", "Xã 8", "Xã 9"],
};

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedCommune(null);
    setIsProvinceListVisible(false);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setSelectedCommune(null);
    setIsDistrictListVisible(false);
  };

  const handleCommuneSelect = (commune: string) => {
    setSelectedCommune(commune);
    setIsCommuneListVisible(false);
  };

 //=================================================================================================

  return (
    <div className={styles.container}>

        
        <div className={styles.section1}>
         <Image
            className={styles.logo}
            src="/images/icon-logo.png"
            alt="Logo trang web"
          />
        </div>
      
        
        <div className={styles.section2}>
          <div className={styles.title}>
            QUẢN LÝ NÔNG NGHIỆP NINH BÌNH
          </div>
          
        </div>
      
        
        <div className={styles.section3}>

        <div
          className={styles.locationBox}
          onClick={toggleProvinceList}
          ref={provinceBoxRef}
        >
          <div className={styles.locationTitle}>{selectedProvince || "Tỉnh"}</div>
          {isProvinceListVisible && (
            <ul className={styles.locationList}>
              {provinces.map((province) => (
                <li key={province} onClick={() => handleProvinceSelect(province)}>
                  {province}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={styles.locationBox}
          onClick={toggleDistrictList}
          ref={districtBoxRef}
        >
          <div className={styles.locationTitle}>{selectedDistrict || "Huyện"}</div>
          {isDistrictListVisible && selectedProvince && (
            <ul className={styles.locationList}>
              {districtsByProvince[selectedProvince].map((district) => (
                <li key={district} onClick={() => handleDistrictSelect(district)}>
                  {district}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={styles.locationBox}
          onClick={toggleCommuneList}
          ref={communeBoxRef}
        >
          <div className={styles.locationTitle}>{selectedCommune || "Xã"}</div>
          {isCommuneListVisible && selectedDistrict && (
            <ul className={styles.locationList}>
              {communesByDistrict[selectedDistrict].map((commune) => (
                <li key={commune} onClick={() => handleCommuneSelect(commune)}>
                  {commune}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

        
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
    
       
        <div className={styles.section5}>
          <button>Đăng xuất</button>
        </div>
    </div>
    
  );
  

}
export default Header;
