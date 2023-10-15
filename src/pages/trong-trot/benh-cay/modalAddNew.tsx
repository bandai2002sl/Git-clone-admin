import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
    data: any[]
}

export function InputValidation() {
    const [errInput, setErrinput] = useState("");
    const [errMess, setErrMess] = useState("")

    const checkValidInput = (newItem: any) => {
        setErrinput("");
        setErrMess("");
        let isValid = true;
        let arrInput = ['diaChi', 'moTa', 'hinhAnh', 'dienTich', 'ngayGhiNhan'];
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
                        <Label for="cropTypeId">Id cây trồng</Label>
                        <Input type="number"
                            id="cropTypeId"
                            placeholder="Id cây trồng"
                            value={newItem.cropTypeId || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, cropTypeId: e.target.value || "" })
                            }} />
                    </div>
                    <div className='input-container'>
                        <Label for="loaiBenhId">Id loại bệnh</Label>
                        <Input type="number"
                            id="loaiBenhId"
                            placeholder="Id loại bệnh"
                            value={newItem.loaiBenhId || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, loaiBenhId: e.target.value || "" })
                            }} />
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Id đơn vị hành chính</Label>
                        <Input type="number"
                            id="administrativeUnitId"
                            placeholder="Id đơn vị hành chính"
                            value={newItem.administrativeUnitId || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, administrativeUnitId: e.target.value || "" })
                            }} />
                    </div>
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
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            id="hinhAnh"
                            placeholder="Hình ảnh"
                            value={newItem.hinhAnh || ""}
                            onChange={(e) => setNewItem({ ...newItem, hinhAnh: e.target.value || "" })}
                        />
                        {errInput === 'hinhAnh' ? <div className="text-danger">{errMess}</div> : ''}
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
