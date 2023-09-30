import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./mo-hinh-cong-nghe-cao.module.scss"

export default function Page() {
    const [data, setData] = useState<any>([]);
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/hightechmodel-type`, {
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
                <title>{i18n.t("Farming.hightechmodel")}</title>
            </Head>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Cá nhân HTX:</th>
                        <th>Mô tả:</th>
                        <th>Diện tích:</th>
                        <th>Công nghệ sử dụng:</th>
                        <th>Trạng thái:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.Id}>
                            <td>{item.caNhanHtx}</td>
                            <td>{item.moTa}</td>
                            <td>{item.dienTich}</td>
                            <td>{item.congNgheSuDung}</td>
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
