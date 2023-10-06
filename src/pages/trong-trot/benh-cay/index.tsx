// Import các module cần thiết
import { Fragment, ReactElement, useState, useEffect } from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Head from 'next/head';
import i18n from '~/locale/i18n';
import styles from '~/pages/khung.module.css';
import tableStyles from '~/pages/khung.module.css';
import benhCayServices from '~/services/benhCaySevices'; 

interface UserData {
  id: number;
  CayTrongId: number;
  LoaiBenhId: number;
  DiaChi: string;
  MoTa: string;
  HinhAnh: string;
  NgayGhiNhan: string;
}

// Function để hiển thị nội dung trang
export default function Page() {
  const [userData, setUserData] = useState<UserData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await benhCayServices.fetchDataFromDatabase({
          "cropTypeId": 0,
          "loaiBenhId": 0,
          "administrativeUnitId": 0,
          "diaChi": "string",
          "moTa": "string",
          "hinhAnh": "string",
          "dienTich": 0,
          "ngayGhiNhan": "string"
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{i18n.t('Trồng trọt')}</title>
      </Head>

      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Bệnh của cây</h2>
        <table className={`${styles.table} ${tableStyles.tableWithBorder}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Cây trồng</th>
              <th>ID Loại bệnh</th>
              <th>Địa chỉ</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Ngày ghi nhận</th>
            </tr>
          </thead>
          <tbody>
            {userData && userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.CayTrongId}</td>
                <td>{user.LoaiBenhId}</td>
                <td>{user.DiaChi}</td>
                <td>{user.MoTa}</td>
                <td>{user.HinhAnh}</td>
                <td>{user.NgayGhiNhan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

// Function để chỉ định bố cục cho trang
Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
