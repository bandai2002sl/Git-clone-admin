import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
}

export function InputValidation() {
    const [errInput, setErrInput] = useState<string | null>(null);

    const checkValidInput = (newItem: any) => {
        setErrInput(null);
        const requiredFields = ['ten', 'chieuDai', 'chieuDaiKienCo', 'administrativeUnitId'];
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
                                setNewItem({ ...newItem, ten: e.target.value });
                            }}
                        />
                        {errInput === 'ten' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="chieuDai">Chiều Dài:</Label>
                        <Input
                            type="number"
                            id="chieuDai"
                            placeholder="Chiều Dài"
                            value={newItem.chieuDai || 0}
                            onChange={(e) => setNewItem({ ...newItem, chieuDai: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'chieuDai' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="chieuDaiKienCo">Chiều Dài Kiến Cố:</Label>
                        <Input
                            type="number"
                            id="chieuDaiKienCo"
                            placeholder="Chiều Dài Kiến Cố"
                            value={newItem.chieuDaiKienCo || 0}
                            onChange={(e) => setNewItem({ ...newItem, chieuDaiKienCo: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'chieuDaiKienCo' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
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
