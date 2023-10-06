import { Fragment, ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "~/pages/khung.module.css";
import tableStyles from "~/pages/khung.module.css";

export default function Page() {
  const userData = [
    // Dữ liệu mẫu người dùng
    { id: 1, CayTrongId: "1", LoaiBenhId:23,  DonViHanhChinhId: "HN" , DiaChi:"Gia Lâm, HN",MoTa:"Bị sâu",HinhAnh:"anh.jpg", DienTich:"12Ha",  NgayGhiNhan: "23/4/2023",CreatedById: "DaiVu",LasUserId: "daivu10",LastTime:"4:25,10/6/2023", CreatedOn:"5:25,1/2/2023"},
    { id: 1, CayTrongId: "1", LoaiBenhId:23,  DonViHanhChinhId: "HN" , DiaChi:"Gia Lâm, HN",MoTa:"Bị sâu",HinhAnh:"anh.jpg", DienTich:"12Ha",  NgayGhiNhan: "23/4/2023",CreatedById: "DaiVu",LasUserId: "daivu10",LastTime:"4:25,10/6/2023", CreatedOn:"5:25,1/2/2023"},
    { id: 1, CayTrongId: "1", LoaiBenhId:23,  DonViHanhChinhId: "HN" , DiaChi:"Gia Lâm, HN",MoTa:"Bị sâu",HinhAnh:"anh.jpg", DienTich:"12Ha",  NgayGhiNhan: "23/4/2023",CreatedById: "DaiVu",LasUserId: "daivu10",LastTime:"4:25,10/6/2023", CreatedOn:"5:25,1/2/2023"},
    { id: 1, CayTrongId: "1", LoaiBenhId:23,  DonViHanhChinhId: "HN" , DiaChi:"Gia Lâm, HN",MoTa:"Bị sâu",HinhAnh:"anh.jpg", DienTich:"12Ha",  NgayGhiNhan: "23/4/2023",CreatedById: "DaiVu",LasUserId: "daivu10",LastTime:"4:25,10/6/2023", CreatedOn:"5:25,1/2/2023"},
    { id: 1, CayTrongId: "1", LoaiBenhId:23,  DonViHanhChinhId: "HN" , DiaChi:"Gia Lâm, HN",MoTa:"Bị sâu",HinhAnh:"anh.jpg", DienTich:"12Ha",  NgayGhiNhan: "23/4/2023",CreatedById: "DaiVu",LasUserId: "daivu10",LastTime:"4:25,10/6/2023", CreatedOn:"5:25,1/2/2023"},
  ];

  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Trồng trọt")}</title>
      </Head>
      
      <div className={styles.contentContainer}>
    <h2 className={styles.title}>Bệnh của cây</h2>
    <table className={`${styles.table} ${tableStyles.tableWithBorder}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Cây trồng</th>
              <th>ID Loại bệnh</th>
              <th>ID Đơn vị hành chính</th>
              <th>Địa chỉ</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
              <th>Diện tích</th>
              <th>Ngày ghi nhận</th>
              <th>ID người tạo</th>
              <th>ID Người cuối cùng</th>
              <th>Cập nhật lần cuối</th>
              <th>Được tạo vào ngày</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.CayTrongId}</td>
                <td>{user.LoaiBenhId}</td>
                <td>{user.DonViHanhChinhId}</td>
                <td>{user.DiaChi}</td>
                <td>{user.MoTa}</td>
                <td>{user.HinhAnh}</td>
                <td>{user.DienTich}</td>
                <td>{user.NgayGhiNhan}</td>     
                <td>{user.CreatedById}</td>  
                <td>{user.LasUserId}</td>  
                <td>{user.LastTime}</td>  
                <td>{user.CreatedOn}</td>            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
