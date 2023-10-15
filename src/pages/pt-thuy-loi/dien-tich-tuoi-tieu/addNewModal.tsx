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
        const requiredFields = ['dienTich', 'ngayThongKe', 'hinhThuc', 'administrativeUnitId', 'cropTypeId'];
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
                        <Label for="dienTich">Diện tích:</Label>
                        <Input
                            type="number"
                            id="dienTich"
                            placeholder="Diện tích"
                            value={newItem.dienTich || 0}
                            onChange={(e) => {
                                setNewItem({ ...newItem, dienTich: parseInt(e.target.value) || 0 });
                            }}
                        />
                        {errInput === 'dienTich' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="ngayThongKe">Ngày thống kê:</Label>
                        <Input
                            type="date"
                            id="ngayThongKe"
                            placeholder="Ngày thống kê"
                            value={newItem.ngayThongKe || ""}
                            onChange={(e) => setNewItem({ ...newItem, ngayThongKe: e.target.value || "" })}
                        />
                        {errInput === 'ngayThongKe' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
                    </div>
                    <div className='input-container'>
                        <Label for="hinhThuc">Hình thức:</Label>
                        <Input
                            type="text"
                            id="hinhThuc"
                            placeholder="Hình thức"
                            value={newItem.hinhThuc || ""}
                            onChange={(e) => setNewItem({ ...newItem, hinhThuc: e.target.value || "" })}
                        />
                        {errInput === 'hinhThuc' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
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
                    <div className='input-container'>
                        <Label for="cropTypeId">Crop Type ID:</Label>
                        <Input
                            type="number"
                            id="cropTypeId"
                            placeholder="Crop Type ID"
                            value={newItem.cropTypeId || 0}
                            onChange={(e) => setNewItem({ ...newItem, cropTypeId: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'cropTypeId' && <div className="text-danger">Bạn chưa nhập dữ liệu</div>}
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
