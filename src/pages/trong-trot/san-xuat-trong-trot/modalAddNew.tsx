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
        let arrInput = ['dienTichTrong', 'dienTichTrongMoi', 'dienTichChoSanPham', 'nangSuat', 'sanLuong', 'thoiDiemBaoCao'];
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
                        <Label for="dienTichTrong">Diện tích trồng:</Label>
                        <Input
                            type="text"
                            id="dienTichTrong"
                            placeholder="Diện tích trồng"
                            value={newItem.dienTichTrong || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, dienTichTrong: e.target.value || "" })
                            }}
                        />
                        {errInput === 'dienTichTrong' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTrongMoi">Diện tích trồng mới:</Label>
                        <Input
                            type="text"
                            id="dienTichTrongMoi"
                            placeholder="Diện tích trồng mới"
                            value={newItem.dienTichTrongMoi || ""}
                            onChange={(e) => setNewItem({ ...newItem, dienTichTrongMoi: e.target.value || "" })}
                        />
                        {errInput === 'dienTichTrongMoi' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichChoSanPham">Diện tích cho sản phẩm:</Label>
                        <Input
                            type="text"
                            id="dienTichChoSanPham"
                            placeholder="Diện tích cho sản phẩm"
                            value={newItem.dienTichChoSanPham || ""}
                            onChange={(e) => setNewItem({ ...newItem, dienTichChoSanPham: e.target.value || "" })}
                        />
                        {errInput === 'dienTichChoSanPham' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="nangSuat">Năng suất:</Label>
                        <Input
                            type="text"
                            id="nangSuat"
                            placeholder="Năng suất"
                            value={newItem.nangSuat || ""}
                            onChange={(e) => setNewItem({ ...newItem, nangSuat: e.target.value || "" })}
                        />
                        {errInput === 'nangSuat' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="sanLuong">Sản lượng:</Label>
                        <Input
                            type="text"
                            id="sanLuong"
                            placeholder="Sản lượng"
                            value={newItem.sanLuong || ""}
                            onChange={(e) => setNewItem({ ...newItem, sanLuong: e.target.value || "" })}
                        />
                        {errInput === 'sanLuong' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="thoiDiemBaoCao">Thời điểm báo cáo:</Label>
                        <Input
                            type="text"
                            id="thoiDiemBaoCao"
                            placeholder="Thời điểm báo cáo"
                            value={newItem.thoiDiemBaoCao || ""}
                            onChange={(e) => setNewItem({ ...newItem, thoiDiemBaoCao: e.target.value || "" })}
                        />
                        {errInput === 'thoiDiemBaoCao' ? <div className="text-danger">{errMess}</div> : ''}
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
