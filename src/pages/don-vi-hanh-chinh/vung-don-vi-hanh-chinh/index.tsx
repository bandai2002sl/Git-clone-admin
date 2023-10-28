import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss"
import { useRouter } from "next/router";
import vungDonViHanhChinhSevices from "~/services/vungDonViHanhChinhServices";
import Button from "~/components/common/Button";
import AddNewItemModal from "~/components/page/ql-don-vi-hanh-chinh/vung-don-vi-hanh-chinh/modelAddNew";
import { MdDelete, MdEdit } from "react-icons/md";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalEdit from "~/components/page/ql-don-vi-hanh-chinh/vung-don-vi-hanh-chinh/modalEdit";
import { toastSuccess, toastError } from "~/common/func/toast";

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<any>([]);
    const [editedData, setEditedData] = useState<any>({});
    const [itemToDelete, setItemToDelete] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await vungDonViHanhChinhSevices.displayVungDonViHanhChinh(
                    data
                );
                const newData = response.data;
                setData(newData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [router]);
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
            let res: any = await vungDonViHanhChinhSevices.deleteVungDonViHanhChinh(deleteItem.id);
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
                <title>{i18n.t("Administrativeunits.administrativeunitregion")}</title>
            </Head>
            <div>
                <Button primary bold rounded_4 maxContent onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</Button>
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
                        <th>Tên đơn vị hành chính:</th>
                        <th>Mô tả:</th>
                        <th>Vùng:</th>
                        <th>Hoạt động:</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.administrativeUnit.ten}</td>
                            <td>{item.moTa}</td>
                            <td>{item.vung}</td>
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
                                setIsEditModalOpen(false);
                            }}
                            setEditedData={setEditedData}
                            editedData={editedData}
                        />
                    )}
                    {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
                    {isConfirmDeleteOpen && (
                        <Modal isOpen={isConfirmDeleteOpen}>
                            <ModalHeader>Xác nhận xóa</ModalHeader>
                            <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
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
