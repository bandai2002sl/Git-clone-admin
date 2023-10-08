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
        let arrInput = ['name', 'sdt', 'moTa', 'linhVucHoatDong', 'hinhAnh', 'ngayThanhLap', 'loaiHinh', 'soNguoi', 'trangThai'];
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
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody >
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="tenBenh">Tên HTX:</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Tên HTX"
                            value={newItem.name || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, name: e.target.value || "" })
                            }}
                        />
                        {errInput === 'Tên HTX' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="sdt">Sdt:</Label>
                        <Input
                            type="text"
                            id="sdt"
                            placeholder="Sdt"
                            value={newItem.sdt || ""}
                            onChange={(e) => setNewItem({ ...newItem, sdt: e.target.value || "" })}
                        />
                        {errInput === 'Sdt' ? <div className="text-danger">{errMess}</div> : ''}
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
                        <Label for="linhVucHoatDong">Lĩnh vực hoạt động:</Label>
                        <Input
                            type="text"
                            id="linhVucHoatDong"
                            placeholder="Lĩnh vực hoạt động"
                            value={newItem.linhVucHoatDong || ""}
                            onChange={(e) => setNewItem({ ...newItem, linhVucHoatDong: e.target.value || "" })}
                        />
                        {errInput === 'linhVucHoatDong' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            id="hinhAnh"
                            placeholder="Hình ảnh"
                            value={newItem.hinhAnh || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, hinhAnh: e.target.value || "" })
                            }}
                        />
                        {errInput === 'hinhAnh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="ngayThanhLap">Ngày thành lập:</Label>
                        <Input
                            type="text"
                            id="ngayThanhLap"
                            placeholder="Ngày thành lập"
                            value={newItem.ngayThanhLap || ""}
                            onChange={(e) => setNewItem({ ...newItem, ngayThanhLap: e.target.value || "" })}
                        />
                        {errInput === 'ngayThanhLap' ? <div className="text-danger">{errMess}</div> : ''}
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
                        {errInput === 'loaiHinh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="soNguoi">Số người:</Label>
                        <Input
                            type="text"
                            id="soNguoi"
                            placeholder="Số người"
                            value={newItem.soNguoi || ""}
                            onChange={(e) => setNewItem({ ...newItem, soNguoi: e.target.value || "" })}
                        />
                        {errInput === 'soNguoi' ? <div className="text-danger">{errMess}</div> : ''}
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
