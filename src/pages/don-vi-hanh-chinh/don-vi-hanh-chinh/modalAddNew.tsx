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
        let arrInput = ['maHanhChinh', 'ten', 'capHanhChinh', 'tenVietTat'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newItem[arrInput[i]]) {
                isValid = false;
                setErrinput(arrInput[i]);
                setErrMess("Bạn chưa nhập dữ liệu")
                break;
            }
        }
        return isValid;
    };
    return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem, data }: AddNewItemModalProps) {
    const { errInput, errMess, checkValidInput } = InputValidation();
    const [errExist, setErrExist] = useState("")
    const [xCoordinate, setXCoordinate] = useState(newItem.xCoordinate || "");
    const [yCoordinate, setYCoordinate] = useState(newItem.yCoordinate || "");
    const [err, setErr] = useState("")

    const handleSave = () => {
        // Chuyển đổi giá trị X và Y thành số
        const x = parseFloat(xCoordinate);
        const y = parseFloat(yCoordinate);

        const isValid = checkValidInput(newItem);
        if (xCoordinate.trim() === "" || yCoordinate.trim() === "") {
            setErr("Bạn chưa nhập dữ liệu X hoặc Y");
        } else
            // Kiểm tra giá trị của X và Y
            if (validateCoordinates(x, y)) {
                // Tạo giá trị tọa độ "POINT(X Y)"
                const toaDo = `POINT(${x} ${y})`;
                setNewItem({ ...newItem, toaDo });
                setErr("");
            } else {
                setErr("Kinh độ phải trong khoảng -180 đến 180, Vĩ độ phải trong khoảng -90 đến 90");
            }
        if (isMaHanhChinhExisted(data, newItem.maHanhChinh)) {
            setErrExist('Mã hành chính đã tồn tại');
        } else if (!isMaHanhChinhExisted(data, newItem.maHanhChinh)) {
            setErrExist('')
            onSubmit(newItem);
        }
        else if (!isValid) {
            onSubmit(newItem);
        } else onClose()
    };
    function isMaHanhChinhExisted(data: any[], maHanhChinhToCheck: string): boolean {
        return data.some((item) => item.maHanhChinh === maHanhChinhToCheck);
    }
    const validateCoordinates = (x: number, y: number): boolean => {
        // Kiểm tra giá trị của X và Y
        const isValidX = !isNaN(x) && x >= -180 && x <= 180;
        const isValidY = !isNaN(y) && y >= -90 && y <= 90;
        return isValidX && isValidY;
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody >
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
                        <Label for="maHanhChinh">Mã hành chính:</Label>
                        <Input
                            type="text"
                            id="maHanhChinh"
                            placeholder="Mã hành chính"
                            value={newItem.maHanhChinh || ""}
                            onChange={(e) => {
                                setNewItem({ ...newItem, maHanhChinh: e.target.value || "" })
                            }}
                        />
                        {errInput === 'maHanhChinh' ? <div className="text-danger">{errMess}</div> : ''}
                        {errExist ? <div className="text-danger">{errExist}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="ten">Tên:</Label>
                        <Input
                            type="text"
                            id="ten"
                            placeholder="Tên"
                            value={newItem.ten || ""}
                            onChange={(e) => setNewItem({ ...newItem, ten: e.target.value || "" })}
                        />
                        {errInput === 'ten' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="capHanhChinh">Cấp Hành Chính:</Label>
                        <Input
                            type="number"
                            id="capHanhChinh"
                            placeholder="Cấp Hành Chính"
                            value={newItem.capHanhChinh || ""}
                            onChange={(e) => setNewItem({ ...newItem, capHanhChinh: e.target.value || "" })}
                        />
                        {errInput === 'capHanhChinh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="tenVietTat">Tên viết tắt:</Label>
                        <Input
                            type="text"
                            id="tenVietTat"
                            placeholder="Tên viết tắt"
                            value={newItem.tenVietTat || ""}
                            onChange={(e) => setNewItem({ ...newItem, tenVietTat: e.target.value || "" })}
                        />
                        {errInput === 'tenVietTat' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="toaDo">Tọa độ (X, Y):</Label>
                        <Input
                            type="text"
                            id="toaDoX"
                            placeholder="Tọa độ X"
                            value={xCoordinate}
                            onChange={(e) => setXCoordinate(e.target.value || "")}
                        />
                        <Input
                            type="text"
                            id="toaDoY"
                            placeholder="Tọa độ Y"
                            value={yCoordinate}
                            onChange={(e) => setYCoordinate(e.target.value || "")}
                        />
                        {err ? <div className="text-danger">{err}</div> : ''}
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
