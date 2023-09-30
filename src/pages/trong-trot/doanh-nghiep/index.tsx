import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./doanh-nghiep.module.scss"

export default function Page() {
    const [data, setData] = useState<any>([]);
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/enterprise-type`, {
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
                <title>{i18n.t("Farming.enterprise")}</title>
            </Head>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Tên doanh nghiệp:</th>
                        <th>Địa chỉ:</th>
                        <th>Mô tả:</th>
                        <th>Lĩnh Vực:</th>
                        <th>Ảnh:</th>
                        <th>Ngày thành lập:</th>
                        <th>Trạng thái:</th>
                        <th>Hoạt động:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.Id}>
                            <td>{item.name}</td>
                            <td>{item.diaChi}</td>
                            <td>{item.moTa}</td>
                            <td>{item.linhVuc}</td>
                            <td>{item.image}</td>
                            <td>{item.ngayThanhLap}</td>
                            <td>{item.trangThai}</td>
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
