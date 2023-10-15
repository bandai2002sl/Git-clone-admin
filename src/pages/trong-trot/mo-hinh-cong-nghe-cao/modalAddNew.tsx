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
        let arrInput = ['address', 'moTa', 'dienTich', 'congNgheSuDung', 'trangThai'];
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
                        <Label for="address">Địa chỉ:</Label>
                        <Input
                            type="text"
                            id="address"
                            placeholder="Địa chỉ"
                            value={newItem.address || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, address: e.target.value || "" })
                            }}
                        />
                        {errInput === 'address' ? <div className="text-danger">{errMess}</div> : ''}
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
                        <Label for="dienTich">Diện tích:</Label>
                        <Input
                            type="text"
                            id="dienTich"
                            placeholder="Diện tích"
                            value={newItem.dienTich || ""}
                            onChange={(e) => setNewItem({ ...newItem, dienTich: e.target.value || "" })}
                        />
                        {errInput === 'dienTich' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="congNgheSuDung">Công nghệ sử dụng:</Label>
                        <Input
                            type="text"
                            id="congNgheSuDung"
                            placeholder="Công nghệ sử dụng"
                            value={newItem.congNgheSuDung || ""}
                            onChange={(e) => setNewItem({ ...newItem, congNgheSuDung: e.target.value || "" })}
                        />
                        {errInput === 'congNgheSuDung' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="trangThai">Trạng thái:</Label>
                        <Input
                            type="text"
                            id="trangThai"
                            placeholder="Trạng thái"
                            value={newItem.trangThai || ""}
                            onChange={(e) => setNewItem({ ...newItem, trangThai: e.target.value || "" })}
                        />
                        {errInput === 'trangThai' ? <div className="text-danger">{errMess}</div> : ''}
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
