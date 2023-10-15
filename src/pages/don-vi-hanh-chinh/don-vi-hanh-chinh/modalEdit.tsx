import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await donViHanhChinhSevices.updateDonViHanhChinh(editedItemId, editedItem);
            onUpdate(editedItem);
            setEditedData({});
            onClose();
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
                        {/* <Label for="id">ID</Label>
                        <Input type="text" name="id" value={editedItem.id} disabled /> */}
                    </div>
                    <div className='input-container'>
                        <Label for="maHanhChinh">Mã hành chính</Label>
                        <Input
                            type="text"
                            name="maHanhChinh"
                            value={editedItem.maHanhChinh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="ten">Tên</Label>
                        <Input
                            type="text"
                            name="ten"
                            value={editedItem.ten}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="capHanhChinh">Cấp Hành Chính</Label>
                        <Input
                            type="text"
                            name="capHanhChinh"
                            value={editedItem.capHanhChinh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="tenVietTat" >Tên viết tắt</Label>
                        <Input
                            type="text"
                            name="tenVietTat"
                            value={editedItem.tenVietTat}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="toaDo">Tọa độ (X, Y):
                            <div>VD: point(10 -10)</div>
                        </Label>
                        <Input
                            type="text"
                            name="toaDo"
                            value={editedItem.toaDo}
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
