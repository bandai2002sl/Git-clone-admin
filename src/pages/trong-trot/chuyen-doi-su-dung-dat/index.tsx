import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./chuyen-doi-su-dung-dat.module.scss"
import AddNewItemModal from "./modalAddNew";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalEdit from "./modalEdit";

export default function Page() {
    const [data, setData] = useState<any>([]);

    const authToken = localStorage.getItem('authToken')

    const [errCode, setErrCode] = useState(""); // Sử dụng state để lưu trữ giá trị errCode
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
    const [newItem, setNewItem] = useState<any>({
        moTa: "",
        diaChi: "",
        dienTich: "",
        ngayChuyenDoi: ""
    }); // State để lưu trữ thông tin bản ghi mới
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);

    const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/chuyen-doi-su-dung-dat`, {
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

    const handleAdd = async () => {
        try {
            // Gửi newItem đến API để thêm bản ghi mới
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CLIENT}/chuyen-doi-su-dung-dat`, newItem, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setErrCode(response.data.statusCode); // Lưu giá trị errCode vào state
            // Cập nhật state data
            if (response.data.statusCode === 1) {
                setData([...data, response.data.data]);
                setIsAddModalOpen(false);
                setNewItem({
                    moTa: "",
                    diaChi: "",
                    dienTich: "",
                    ngayChuyenDoi: ""
                });
                setApiMessage(response.data.message);
                setInputError(null); // Xóa thông báo lỗi
            } else if (response.data.statusCode === 0) {
                setInputError(response.data.message);
            }
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
            // Gửi dữ liệu đã sửa đến API để cập nhật
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/chuyen-doi-su-dung-dat/${editedItem.id}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.data.statusCode === 1) {
                // Cập nhật lại state data
                const updatedData = data.map((item: any) =>
                    item.id === editedItem.id ? editedItem : item
                );
                setData(updatedData);
                setIsEditModalOpen(false);
                setEditedData(null)
            } else if (response.data.statusCode === 0) {
                setInputError(response.data.message);
            }
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
            // Gửi yêu cầu xóa item đến API
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/chuyen-doi-su-dung-dat/${deleteItem.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.data.statusCode === 1) {
                // Xóa thành công, cập nhật state data
                const updatedData = data.filter((dataItem: any) => dataItem.id !== deleteItem.id);
                setData(updatedData);
                setIsConfirmDeleteOpen(false);
                setItemToDelete(null);
            } else if (response.data.statusCode === 0) {
                setInputError(response.data.message);
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
                <title>{i18n.t("Farming.landuseconversion")}</title>
            </Head>
            <div>
                <button onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</button>
                {apiMessage && <div className="success-message">{apiMessage}</div>}
                {inputError && <div className="error-message">{inputError}</div>}
                {/* Render modal nếu isModalOpen là true */}
                {isAddModalOpen && (
                    <AddNewItemModal
                        isOpen={isAddModalOpen}
                        onClose={() => {
                            setIsAddModalOpen(false);
                            setInputError(null);
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
                        <th>Mô tả:</th>
                        <th>Địa chỉ</th>
                        <th>Diện tích</th>
                        <th>Ngày chuyển đổi</th>
                        <th>Hoạt Động</th>
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
                                <button onClick={() => handleEdit(item)}>Sửa</button>
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
                                <button onClick={() => handleDelete(item)}>Xóa</button>
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
