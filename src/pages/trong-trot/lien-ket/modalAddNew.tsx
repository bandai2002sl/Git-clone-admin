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
        let arrInput = ['hinhThucLienKet', 'ngayLienKet', 'trangThai'];
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
                        <Label for="hinhThucLienKet">Hình thức liên kết:</Label>
                        <Input
                            type="text"
                            id="hinhThucLienKet"
                            placeholder="Hình thức liên kết"
                            value={newItem.hinhThucLienKet || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, hinhThucLienKet: e.target.value || "" })
                            }}
                        />
                        {errInput === 'hinhThucLienKet' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="ngayLienKet">Ngày liên kết:</Label>
                        <Input
                            type="text"
                            id="ngayLienKet"
                            placeholder="Ngày liên kết"
                            value={newItem.ngayLienKet || ""}
                            onChange={(e) => setNewItem({ ...newItem, ngayLienKet: e.target.value || "" })}
                        />
                        {errInput === 'ngayLienKet' ? <div className="text-danger">{errMess}</div> : ''}
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
