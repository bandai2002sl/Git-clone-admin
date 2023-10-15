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
        let arrInput = ['diaChi', 'nguyenNhan', 'dienTich', 'ngayGhiNhan'];
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
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            id="diaChi"
                            placeholder="Địa chỉ"
                            value={newItem.diaChi || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, diaChi: e.target.value || "" })
                            }}
                        />
                        {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="nguyenNhan">Nguyên nhân:</Label>
                        <Input
                            type="text"
                            id="nguyenNhan"
                            placeholder="Nguyên nhân"
                            value={newItem.nguyenNhan || ""}
                            onChange={(e) => setNewItem({ ...newItem, nguyenNhan: e.target.value || "" })}
                        />
                        {errInput === 'nguyenNhan' ? <div className="text-danger">{errMess}</div> : ''}
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
                        <Label for="ngayGhiNhan">Ngày ghi nhận:</Label>
                        <Input
                            type="text"
                            id="ngayGhiNhan"
                            placeholder="Ngày ghi nhận"
                            value={newItem.ngayGhiNhan || ""}
                            onChange={(e) => setNewItem({ ...newItem, ngayGhiNhan: e.target.value || "" })}
                        />
                        {errInput === 'ngayGhiNhan' ? <div className="text-danger">{errMess}</div> : ''}
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
