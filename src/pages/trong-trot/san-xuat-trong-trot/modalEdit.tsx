import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
import sanXuatTrongTrotSevices from "~/services/sanXuatTrongTrotSevices";

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
            const response = await sanXuatTrongTrotSevices.updateSanXuatTrongTrot(editedItem.id, editedItem);
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
                        <Label for="dienTichTrong">Diện tích trồng:</Label>
                        <Input
                            type="text"
                            name="dienTichTrong"
                            value={editedItem.dienTichTrong}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTrongMoi">Diện tích trồng mới:</Label>
                        <Input
                            type="text"
                            name="dienTichTrongMoi"
                            value={editedItem.dienTichTrongMoi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichChoSanPham">Diện tích cho sản phẩm:</Label>
                        <Input
                            type="text"
                            name="dienTichChoSanPham"
                            value={editedItem.dienTichChoSanPham}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="nangSuat" >Năng suất:</Label>
                        <Input
                            type="text"
                            name="nangSuat"
                            value={editedItem.nangSuat}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="sanLuong">Sản lượng</Label>
                        <Input
                            type="text"
                            name="sanLuong"
                            value={editedItem.sanLuong}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="thoiDiemBaoCao" >Thời điểm báo cáo:</Label>
                        <Input
                            type="text"
                            name="thoiDiemBaoCao"
                            value={editedItem.thoiDiemBaoCao}
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
