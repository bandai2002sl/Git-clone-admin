import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedItemId: number;
    editedData: any;
    setEditedData: React.Dispatch<any>;
    onUpdate: (editedItem: any) => void;
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
                `${process.env.NEXT_PUBLIC_API_CLIENT}/cong/${editedItemId}`,
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
                console.log("lỗi", response);
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
                        <Label for="ten">Tên:</Label>
                        <Input
                            type="text"
                            name="ten"
                            value={editedItem.ten}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="diaChi">Địa Chỉ:</Label>
                        <Input
                            type="text"
                            name="diaChi"
                            value={editedItem.diaChi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="kichCo">Kích Cỡ:</Label>
                        <Input
                            type="text"
                            name="kichCo"
                            value={editedItem.kichCo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="loaiKichThuoc">Loại Kích Thước:</Label>
                        <Input
                            type="text"
                            name="loaiKichThuoc"
                            value={editedItem.loaiKichThuoc}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="loaiHinh">Loại Hình:</Label>
                        <Input
                            type="text"
                            name="loaiHinh"
                            value={editedItem.loaiHinh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            name="administrativeUnitId"
                            value={editedItem.administrativeUnitId}
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
