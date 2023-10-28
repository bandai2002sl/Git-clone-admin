import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss"
import AddNewItemModal from "../../../components/page/thuy-san/co-so-kinh-doanh/modalAddNew";
import "bootstrap/dist/css/bootstrap.min.css";
import {Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalEdit from "../../../components/page/thuy-san/co-so-kinh-doanh/modalEdit";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";
import Button from "~/components/common/Button";

export default function Page() {
    const [data, setData] = useState<any>([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
    const [newItem, setNewItem] = useState<any>({}); // State để lưu trữ thông tin bản ghi mới


    const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await coSoKinhDoanhSevices.displayCoSoKinhDoanh(data);
                const newData = response.data;
                setData(newData);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleAdd = async () => {
        try {
            const response = await coSoKinhDoanhSevices.createCoSoKinhDoanh(newItem)
            setData([...data, response.data]);
            setIsAddModalOpen(false);
            setNewItem({
                name: "",
                moTa: "",
                image: "",
                tamNgung: ""
            });
        } catch (error) {
            console.error(error)
        }
    };

    const handleEdit = (item: any) => {
        setEditedData(item);
        setIsEditModalOpen(true);
    };
    const handleUpdate = async (editedItem: any) => {
        try {
            const response = await coSoKinhDoanhSevices.updateCoSoKinhDoanh(editedItem.id, editedItem);
            // Cập nhật lại state data
            const updatedData = data.map((item: any) =>
                item.id === editedItem.id ? editedItem : item
            );
            setData(updatedData);
            setIsEditModalOpen(false);
            setEditedData(null)
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (deleteItem: any) => {
        setItemToDelete(deleteItem);
        setIsConfirmDeleteOpen(true);
    };
    const handleConfirmDelete = async (deleteItem: any) => {
        try {
            const response = await coSoKinhDoanhSevices.deleteCoSoKinhDoanh(deleteItem.id);
            // Xóa thành công, cập nhật state data
            const updatedData = data.filter((dataItem: any) => dataItem.id !== deleteItem.id);
            setData(updatedData);
            setIsConfirmDeleteOpen(false);
            setItemToDelete(null);
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
                <title>{i18n.t("Cơ sở kinh doanh")}</title>
            </Head>
            <div>
            <Button primary bold rounded_4 maxContent onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm </Button>                

                {/* Render modal nếu isModalOpen là true */}
                {isAddModalOpen && (
                    <AddNewItemModal
                        isOpen={isAddModalOpen}
                        onClose={() => {
                            setIsAddModalOpen(false);
                        }}
                        onSubmit={handleAdd}
                        newItem={newItem}
                        setNewItem={setNewItem}
                    />
                )}
            </div>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Địa điểm:</th>
                        <th>Hình ảnh:</th>
                        <th>Đăng ký kinh doanh:</th>
                        <th>Sdt:</th>
                        <th>Trạng thái:</th>
                        <th>Hoạt Động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.diaDiem}</td>
                            <td>{item.hinhAnh}</td>
                            <td>{item.dangKyKinhDoanh}</td>
                            <td>{item.sdt}</td>
                            <td>{item.trangThai}</td>
                            <td>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Button primary bold rounded_4 maxContent onClick={() => handleEdit(item)}>&#9998; Sửa</Button>                             

                                {/* Render modal sửa chi tiết */}
                                {isEditModalOpen && (
                                    <ModalEdit
                                        isOpen={isEditModalOpen}
                                        onClose={() => {
                                            setIsEditModalOpen(false)
                                        }}
                                        onUpdate={handleUpdate}
                                        editedItemId={editedData.id}
                                        setEditedData={setEditedData}
                                        editedData={editedData}
                                    />
                                )}
                <div style={{marginLeft: '10px'}}>  
                  <Button primary bold rounded_4 maxContent onClick={() => handleDelete(item)}>&#10060; </Button>
                </div>
              </div>                                

                                {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
                                {isConfirmDeleteOpen && (
                                    <Modal isOpen={isConfirmDeleteOpen} backdrop={false} >
                                        <ModalHeader>Xác nhận xóa</ModalHeader>
                                        <ModalBody>
                                            Bạn có chắc chắn muốn xóa?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={() => handleConfirmDelete(itemToDelete)}>
                                                Có
                                            </Button>
                                            <Button color="secondary" onClick={handleCancelDelete}>
                                                Không
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                )}
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
