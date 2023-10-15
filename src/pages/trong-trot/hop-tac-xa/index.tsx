import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (editedItem: any) => void;
    editedItemId: number;
    editedData: any;
    setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
    isOpen,
    onClose,
    onUpdate,
    editedData,
    editedItemId,
    setEditedData,
}: ModalEditProps) {
    const [editedItem, setEditedItem] = useState({ ...editedData });

    useEffect(() => {
        if (editedData) {
            setEditedItem({ ...editedData });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem((prevEditedItem) => ({
            ...prevEditedItem,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/ca-nhan-htx/${editedItemId}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            if (response.data.statusCode === 1) {
                onUpdate(editedItem);
                setEditedData({});
                onClose();
            } else {
                console.log("lỗi", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size="lg">
            <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className="input-container">
                        <Label for="diaDiem">Địa điểm:</Label>
                        <Input
                            type="text"
                            name="diaDiem"
                            value={editedItem.diaDiem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            name="hinhAnh"
                            value={editedItem.hinhAnh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="dangKyKinhDoanh">Đăng ký kinh doanh:</Label>
                        <Input
                            type="text"
                            name="dangKyKinhDoanh"
                            value={editedItem.dangKyKinhDoanh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="sdt">Số điện thoại:</Label>
                        <Input
                            type="text"
                            name="sdt"
                            value={editedItem.sdt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="trangThai">Trạng thái:</Label>
                        <Input
                            type="text"
                            name="trangThai"
                            value={editedItem.trangThai}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="caNhanHtxId">Ca nhân HTX ID:</Label>
                        <Input
                            type="number"
                            name="caNhanHtxId"
                            value={editedItem.caNhanHtxId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="loaiKinhDoanhId">Loại kinh doanh ID:</Label>
                        <Input
                            type="number"
                            name="loaiKinhDoanhId"
                            value={editedItem.loaiKinhDoanhId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            name="administrativeUnitId"
                            value={editedItem.administrativeUnitId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveChanges}>
                    Lưu thay đổi
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
}
