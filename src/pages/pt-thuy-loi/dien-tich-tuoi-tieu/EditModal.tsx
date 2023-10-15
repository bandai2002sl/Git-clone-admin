import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface EditedItem {
    dienTich: number;
    ngayThongKe: string;
    hinhThuc: string;
    administrativeUnitId: number;
    cropTypeId: number;
}

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedItemId: number;
    editedData: EditedItem;
    setEditedData: React.Dispatch<any>;
    onUpdate: (editedItem: EditedItem) => void;
}

export default function ModalEdit({
    isOpen,
    onClose,
    onUpdate,
    editedData,
    editedItemId,
    setEditedData,
}: ModalEditProps) {
    const [editedItem, setEditedItem] = useState<EditedItem>({ ...editedData });

    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
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
                        <Label for="dienTich">Diện Tích:</Label>
                        <Input
                            type="number"
                            name="dienTich"
                            value={editedItem.dienTich}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="ngayThongKe">Ngày Thống Kê:</Label>
                        <Input
                            type="datetime-local"
                            name="ngayThongKe"
                            value={editedItem.ngayThongKe}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="hinhThuc">Hình Thức:</Label>
                        <Input
                            type="text"
                            name="hinhThuc"
                            value={editedItem.hinhThuc}
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
                    <div className='input-container'>
                        <Label for="cropTypeId">Crop Type ID:</Label>
                        <Input
                            type="number"
                            name="cropTypeId"
                            value={editedItem.cropTypeId}
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
