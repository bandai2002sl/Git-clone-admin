import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
}

export function InputValidation() {
    const [errInput, setErrinput] = useState("");
    const [errMess, setErrMess] = useState("")

    const checkValidInput = (newItem: any) => {
        setErrinput("");
        setErrMess("");
        let arrInput = ['tenHinhThuc', 'tamNgung'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newItem[arrInput[i]]) {
                setErrinput(arrInput[i]);
                setErrMess("Bạn chưa nhập dữ liệu")
                break;
            }
        }
    };
    return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
    const { errInput, errMess, checkValidInput } = InputValidation();

    const handleSave = () => {
        checkValidInput(newItem);
        onSubmit(newItem);
        onClose();
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody >
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="tenHinhThuc">Tên hình thức:</Label>
                        <Input
                            type="text"
                            id="tenHinhThuc"
                            placeholder="Tên hình thức"
                            value={newItem.tenHinhThuc || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, tenHinhThuc: e.target.value || "" })
                            }}
                        />
                        {errInput === 'tenHinhThuc' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="tamNgung">Tạm ngừng:</Label>
                        <Input
                            type="text"
                            id="tamNgung"
                            placeholder="Tạm ngừng"
                            value={newItem.tamNgung || ""}
                            onChange={(e) => setNewItem({ ...newItem, tamNgung: e.target.value || "" })}
                        />
                        {errInput === 'tamNgung' ? <div className="text-danger">{errMess}</div> : ''}
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
        </Modal >
    );
}
