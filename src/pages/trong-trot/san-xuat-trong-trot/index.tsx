import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./san-xuat-trong-trot.module.scss"

export default function Page() {
    const [data, setData] = useState<any>([]);
    const authToken = localStorage.getItem('authToken')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/cultivationProduction-type`, {
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
                <title>{i18n.t("Farming.cultivationProduction")}</title>
            </Head>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Loại cây:</th>
                        <th>Diện tích trồng:</th>
                        <th>Diện tích trồng mới:</th>
                        <th>Diện tích cho sản phẩm:</th>
                        <th>Năng suất:</th>
                        <th>Sản lượng:</th>
                        <th>Thời điểm báo cáo:</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.Id}>
                            <td>{item.loaiCay}</td>
                            <td>{item.dienTichTrong}</td>
                            <td>{item.dienTichTrongMoi}</td>
                            <td>{item.dienTichChoSanPham}</td>
                            <td>{item.nangSuat}</td>
                            <td>{item.sanLuong}</td>
                            <td>{item.thoiDiemBaoCao}</td>
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
