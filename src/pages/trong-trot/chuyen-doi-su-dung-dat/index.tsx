import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./chuyen-doi-su-dung-dat.module.scss"

export default function Page() {
    const [data, setData] = useState<any>([]);
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/landuseconversion-type`, {
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
                <title>{i18n.t("Farming.landuseconversion")}</title>
            </Head>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Hình thức chuyển đổi:</th>
                        <th>Mô tả:</th>
                        <th>Địa chỉ</th>
                        <th>Diện tích</th>
                        <th>Ngày chuyển đổi</th>
                        <th>Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.moTa}</td>
                            <td>{item.diaChi}</td>
                            <td>{item.dienTich}</td>
                            <td>{item.ngayChuyenDoi}</td>
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
