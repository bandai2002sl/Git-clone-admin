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
    const [errInput, setErrInput] = useState("");
    const [errMess, setErrMess] = useState("");

    const checkValidInput = (newItem: any) => {
        setErrInput("");
        setErrMess("");
        const requiredInputs = ['diaChi', 'moTa', 'tinhTrang', 'soDangKy', 'ngayDangKy', 'administrativeUnitId', 'caNhanHTXId'];
        for (let i = 0; i < requiredInputs.length; i++) {
            if (newItem[requiredInputs[i]] === undefined || newItem[requiredInputs[i]] === "") {
                setErrInput(requiredInputs[i]);
                setErrMess("Bạn chưa nhập dữ liệu");
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
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            id="diaChi"
                            placeholder="Địa chỉ"
                            value={newItem.diaChi || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, diaChi: e.target.value });
                            }}
                        />
                        {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="moTa">Mô tả:</Label>
                        <Input
                            type="text"
                            id="moTa"
                            placeholder="Mô tả"
                            value={newItem.moTa || ""}
                            onChange={(e) => setNewItem({ ...newItem, moTa: e.target.value })}
                        />
                        {errInput === 'moTa' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="tinhTrang">Tình trạng:</Label>
                        <Input
                            type="text"
                            id="tinhTrang"
                            placeholder="Tình trạng"
                            value={newItem.tinhTrang || ""}
                            onChange={(e) => setNewItem({ ...newItem, tinhTrang: e.target.value })}
                        />
                        {errInput === 'tinhTrang' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="soDangKy">Số đăng ký:</Label>
                        <Input
                            type="number"
                            id="soDangKy"
                            placeholder="Số đăng ký"
                            value={newItem.soDangKy || ""}
                            onChange={(e) => setNewItem({ ...newItem, soDangKy: parseInt(e.target.value) })}
                        />
                        {errInput === 'soDangKy' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="ngayDangKy">Ngày đăng ký:</Label>
                        <Input
                            type="text"
                            id="ngayDangKy"
                            placeholder="Ngày đăng ký"
                            value={newItem.ngayDangKy || ""}
                            onChange={(e) => setNewItem({ ...newItem, ngayDangKy: e.target.value })}
                        />
                        {errInput === 'ngayDangKy' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="caNhanHTXId">Cá nhân HTX ID:</Label>
                        <Input
                            type="number"
                            id="caNhanHTXId"
                            placeholder="Cá nhân HTX ID"
                            value={newItem.caNhanHTXId || ""}
                            onChange={(e) => setNewItem({ ...newItem, caNhanHTXId: parseInt(e.target.value) })}
                        />
                        {errInput === 'caNhanHTXId' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            id="administrativeUnitId"
                            placeholder="Administrative Unit ID"
                            value={newItem.administrativeUnitId || ""}
                            onChange={(e) => setNewItem({ ...newItem, administrativeUnitId: parseInt(e.target.value) })}
                        />
                        {errInput === 'administrativeUnitId' ? <div className="text-danger">{errMess}</div> : ''}
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
