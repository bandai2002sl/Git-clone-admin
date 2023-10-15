import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
    onUpdate: (editedItem: any) => void;
}

export function InputValidation() {
    const [errInput, setErrInput] = useState<string | null>(null);

    const checkValidInput = (newItem: any) => {
        setErrInput(null);
        const requiredFields = ['ten', 'diaChi', 'kichCo', 'loaiKichThuoc', 'loaiHinh', 'administrativeUnitId'];
        for (const field of requiredFields) {
            if (!newItem[field]) {
                setErrInput(field);
                return;
            }
        }
    };

    return { errInput, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
    const { errInput, checkValidInput } = InputValidation();

    const handleSave = () => {
        checkValidInput(newItem);

        // Check if there is an error before submitting
        if (!errInput) {
            onSubmit(newItem);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="ten">Tên:</Label>
                        <Input
                            type="text"
                            id="ten"
                            placeholder="Tên"
                            value={newItem.ten || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, ten: e.target.value || "" });
                            }}
                        />
                        {errInput === 'ten' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            id="diaChi"
                            placeholder="Địa chỉ"
                            value={newItem.diaChi || ""}
                            onChange={(e) => setNewItem({ ...newItem, diaChi: e.target.value || "" })}
                        />
                        {errInput === 'diaChi' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="kichCo">Kích cỡ:</Label>
                        <Input
                            type="text"
                            id="kichCo"
                            placeholder="Kích cỡ"
                            value={newItem.kichCo || ""}
                            onChange={(e) => setNewItem({ ...newItem, kichCo: e.target.value || "" })}
                        />
                        {errInput === 'kichCo' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="loaiKichThuoc">Loại kích thước:</Label>
                        <Input
                            type="text"
                            id="loaiKichThuoc"
                            placeholder="Loại kích thước"
                            value={newItem.loaiKichThuoc || ""}
                            onChange={(e) => setNewItem({ ...newItem, loaiKichThuoc: e.target.value || "" })}
                        />
                        {errInput === 'loaiKichThuoc' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="loaiHinh">Loại hình:</Label>
                        <Input
                            type="text"
                            id="loaiHinh"
                            placeholder="Loại hình"
                            value={newItem.loaiHinh || ""}
                            onChange={(e) => setNewItem({ ...newItem, loaiHinh: e.target.value || "" })}
                        />
                        {errInput === 'loaiHinh' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            id="administrativeUnitId"
                            placeholder="Administrative Unit ID"
                            value={newItem.administrativeUnitId || 0}
                            onChange={(e) => setNewItem({ ...newItem, administrativeUnitId: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'administrativeUnitId' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                </div>
            </ModalBody>
            <div className={styles["modal-footer"]}>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        Lưu
                    </Button>{" "}
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
}
