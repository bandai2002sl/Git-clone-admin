import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./lien-ket.module.scss"

export default function Page() {
    const [data, setData] = useState<any>([]);
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/link-type`, {
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
                <title>{i18n.t("Farming.link")}</title>
            </Head>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Doanh nghiệp:</th>
                        <th>Cá nhân HTX:</th>
                        <th>Hình thức liên kết:</th>
                        <th>Ngày liên kết:</th>
                        <th>Trạng thái:</th>
                        <th>Hoạt động:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.Id}>
                            <td>{item.doanhNghiep}</td>
                            <td>{item.caNhanHtx}</td>
                            <td>{item.hinhThucLienKet}</td>
                            <td>{item.ngayLienKet}</td>
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
