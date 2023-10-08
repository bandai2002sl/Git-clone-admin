import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "./chuyen-doi-su-dung-dat.module.scss"

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

    const [editedX, setEditedX] = useState("");
    const [editedY, setEditedY] = useState("");
    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
        if (editedData) {
            setEditedItem({ ...editedData });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/chuyen-doi-su-dung-dat/${editedItemId}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            // Kiểm tra kết quả từ API (response) và xử lý tùy theo kết quả
            if (response.data.statusCode === 1) {
                // Dữ liệu đã được cập nhật thành công trên API
                onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
                setEditedData({}); // Đặt lại editedData trong component cha
                onClose(); // Đóng modal sau khi cập nhật thành công
            } else {
                console.log("lỗi", response)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size='lg'>
            <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="moTa">Mô tả:</Label>
                        <Input
                            type="text"
                            name="moTa"
                            value={editedItem.moTa}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            name="diaChi"
                            value={editedItem.diaChi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dienTich">Diện tích</Label>
                        <Input
                            type="text"
                            name="dienTich"
                            value={editedItem.dienTich}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="ngayChuyenDoi" >Ngày chuyển đổi</Label>
                        <Input
                            type="text"
                            name="ngayChuyenDoi"
                            value={editedItem.ngayChuyenDoi}
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
        </Modal >
    );
}
