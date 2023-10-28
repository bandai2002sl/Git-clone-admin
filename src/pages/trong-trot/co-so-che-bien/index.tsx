import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss"
import AddNewItemModal from "~/components/page/trong-trot/co-so-che-bien/modalAddNew";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import coSoCheBienSevices from "~/services/coSoCheBienSevices";
import ModalEdit from "~/components/page/trong-trot/co-so-che-bien/modalEdit";
import { useRouter } from "next/router";
import Button from "~/components/common/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { toastSuccess, toastError } from "~/common/func/toast";

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<any>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm

    const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await coSoCheBienSevices.displayCoSoCheBien(data);
                const newData = response.data;
                setData(newData);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [router])

    const handleEdit = (item: any) => {
        setEditedData(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = (deleteItem: any) => {
        setItemToDelete(deleteItem);
        setIsConfirmDeleteOpen(true);
    };
    const handleConfirmDelete = async (deleteItem: any) => {
        try {
            let res: any = await coSoCheBienSevices.deleteCoSoCheBien(deleteItem.id);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                router.replace(router.pathname);
                setIsConfirmDeleteOpen(false);
                setItemToDelete(null);
            } else {
                toastError({ msg: "Không thành công" });
                setIsConfirmDeleteOpen(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmDeleteOpen(false);
        setItemToDelete(null);
    };

    return (
        <Fragment>
            <Head>
                <title>{i18n.t("Farming.processingfacilities")}</title>
            </Head>
            <div>
                <Button
                    primary
                    bold
                    rounded_4
                    maxContent
                    onClick={() => setIsAddModalOpen(true)}
                >
                    &#x002B; Thêm
                </Button>
                {/* Render modal nếu isModalOpen là true */}
                {isAddModalOpen && (
                    <AddNewItemModal
                        isOpen={isAddModalOpen}
                        onClose={() => {
                            setIsAddModalOpen(false);
                        }}
                    />
                )}
            </div>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>DV Hành chính</th>
                        <th>Hợp tác xã</th>
                        <th>Địa chỉ</th>
                        <th>Loại chế biến</th>
                        <th>Mô tả</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                        <th>Có đăng ký</th>
                        <th>Hoạt Động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.administrativeUnit.ten}</td>
                            <td>{item.caNhanHtx.name}</td>
                            <td>{item.diaChi}</td>
                            <td>{item.loaiCheBien}</td>
                            <td>{item.moTa}</td>
                            <td>{item.hinhAnh}</td>
                            <td>{item.trangThai}</td>
                            <td>{item.coDangKy}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} style={{ border: 'none', marginRight: '10px', }}><MdEdit /></button>
                                <button onClick={() => handleDelete(item)} style={{ border: 'none' }} ><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                    {/* Render modal sửa chi tiết */}
                    {isEditModalOpen && (
                        <ModalEdit
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false)
                            }}
                            setEditedData={setEditedData}
                            editedData={editedData}
                        />
                    )}
                    {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
                    {isConfirmDeleteOpen && (
                        <Modal isOpen={isConfirmDeleteOpen} >
                            <ModalHeader>Xác nhận xóa</ModalHeader>
                            <ModalBody>
                                Bạn có chắc chắn muốn xóa?
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    danger bold rounded_4 maxContent
                                    onClick={() => handleConfirmDelete(itemToDelete)}
                                >
                                    Có
                                </Button>
                                <Button secondary bold rounded_4 maxContent onClick={handleCancelDelete}>
                                    Không
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}

Page.getLayout = function (page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};
