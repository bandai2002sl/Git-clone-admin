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
        let arrInput = ['name', 'moTa', 'image', 'tamNgung'];
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
                        <Label for="name">Tên cây trồng:</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Tên cây trồng"
                            value={newItem.name || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, name: e.target.value || "" })
                            }}
                        />
                        {errInput === 'name' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="moTa">Mô tả:</Label>
                        <Input
                            type="text"
                            id="moTa"
                            placeholder="Mô tả"
                            value={newItem.moTa || ""}
                            onChange={(e) => setNewItem({ ...newItem, moTa: e.target.value || "" })}
                        />
                        {errInput === 'moTa' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="image">Hình ảnh:</Label>
                        <Input
                            type="text"
                            id="image"
                            placeholder="Hình ảnh"
                            value={newItem.image || ""}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value || "" })}
                        />
                        {errInput === 'image' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="tamNgung">Tạm Ngừng:</Label>
                        <Input
                            type="text"
                            id="tamNgung"
                            placeholder="Tạm Ngừng"
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
