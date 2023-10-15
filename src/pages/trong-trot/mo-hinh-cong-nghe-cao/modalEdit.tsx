import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
import moHinhCongNgheCaoSevices from "~/services/moHinhCongNgheCaoSevices";

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
            const response = await moHinhCongNgheCaoSevices.updateMoHinhCongNgheCao(editedItem.id, editedItem);
            onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
            setEditedData({}); // Đặt lại editedData trong component cha
            onClose(); // Đóng modal sau khi cập nhật thành công
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
                        <Label for="address">Địa chỉ:</Label>
                        <Input
                            type="text"
                            name="address"
                            value={editedItem.address}
                            onChange={handleInputChange}
                        />
                    </div>
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
                        <Label for="dienTich">Diện tích:</Label>
                        <Input
                            type="text"
                            name="dienTich"
                            value={editedItem.dienTich}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="congNgheSuDung" >Công nghệ sử dụng:</Label>
                        <Input
                            type="text"
                            name="congNgheSuDung"
                            value={editedItem.congNgheSuDung}
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
