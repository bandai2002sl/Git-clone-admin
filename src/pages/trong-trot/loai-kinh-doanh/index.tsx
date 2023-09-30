import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./loai-kinh-doanh.module.scss"

export default function Page() {
  const [data, setData] = useState<any>([]);
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/businessCategory-type`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const newData = response.data.data;
        setData(newData);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [authToken])

  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Farming.businessCategory")}</title>
      </Head>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Loại kinh doanh:</th>
            <th>Mô tả:</th>
            <th>Tạm ngưng:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.Id}>
              <td>{item.loaiKinhDoanh}</td>
              <td>{item.moTa}</td>
              <td>{item.tamNgung}</td>
              <td>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
