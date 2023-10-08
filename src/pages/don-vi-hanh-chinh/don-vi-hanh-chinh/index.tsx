import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "./don-vi-hanh-chinh.module.scss"
import AddNewItemModal from "./modalAddNew";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalEdit from "./modalEdit";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Page() {
    const [data, setData] = useState<any>([]); // State để lưu trữ dữ liệu từ API
    const [newItem, setNewItem] = useState<any>({
        maHanhChinh: "",
        ten: "",
        capHanhChinh: "",
        tenVietTat: "",
        toaDo: ""
    }); // State để lưu trữ thông tin bản ghi mới
    const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa
    const [apiMessage, setApiMessage] = useState<string | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);
    const [errCode, setErrCode] = useState(""); // Sử dụng state để lưu trữ giá trị errCode

    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const authToken = localStorage.getItem('authToken'); // Lấy token từ localStorage

    useEffect(() => {
        // Hàm fetchData để thực hiện cuộc gọi API
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/administrative-unit`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Thêm mã thông báo xác thực vào yêu cầu
                    },
                });
                const newData = response.data.data;
                setData(newData); // Lưu dữ liệu từ API vào state
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        fetchData(); // Gọi hàm fetchData khi component được tạo
    }, [authToken]); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được tạo

    const handleAdd = async () => {
        try {
            // Gửi newItem đến API để thêm bản ghi mới
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CLIENT}/administrative-unit`, newItem, {
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
                    maHanhChinh: "",
                    ten: "",
                    capHanhChinh: "",
                    tenVietTat: "",
                    toaDo: ""
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
                `${process.env.NEXT_PUBLIC_API_CLIENT}/administrative-unit/${editedItem.id}`,
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
                `${process.env.NEXT_PUBLIC_API_CLIENT}/administrative-unit/${deleteItem.id}`,
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
                <title>{i18n.t("administrativeUnit.cooperative")}</title>
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
                        data={data}
                    />
                )}
            </div>
            <table className={styles["customers"]}>
                <thead>
                    <tr>
                        <th>Mã hành chính</th>
                        <th>Tên</th>
                        <th>Cấp Hành Chính</th>
                        <th>Tên viết tắt</th>
                        <th>Tọa độ</th>
                        <th>Hoạt động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.maHanhChinh}</td>
                            <td>{item.ten}</td>
                            <td>{item.capHanhChinh}</td>
                            <td>{item.tenVietTat}</td>
                            <td>{item.toaDo}</td>
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
