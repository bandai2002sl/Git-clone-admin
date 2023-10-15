import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
import coSoCheBienSevices from "~/services/coSoCheBienSevices";

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
            const response = await coSoCheBienSevices.updateCoSoCheBien(editedItem.id, editedItem);
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
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            name="diaChi"
                            value={editedItem.diaChi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="loaiCheBien">Loại chế biến:</Label>
                        <Input
                            type="text"
                            name="loaiCheBien"
                            value={editedItem.moTa}
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
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            name="hinhAnh"
                            value={editedItem.hinhAnh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="trangThai">Trạng thái:</Label>
                        <Input
                            type="text"
                            name="trangThai"
                            value={editedItem.trangThai}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="coDangKy">Có đăng ký:</Label>
                        <Input
                            type="text"
                            name="coDangKy"
                            value={editedItem.coDangKy}
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
