import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface NewItem {
  ten: string;
  diaChi: string;
  congXuat: number;
  loaiHinh: string;
  administrativeUnitId: number;
  [key: string]: any;
}

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: NewItem) => void;
}

export function InputValidation() {
  const [errInput, setErrInput] = useState("");
  const [errMess, setErrMess] = useState("");

  const checkValidInput = (newItem: NewItem) => {
    setErrInput("");
    setErrMess("");
    const arrInput = ['ten', 'diaChi', 'congXuat', 'loaiHinh', 'administrativeUnitId'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!newItem[arrInput[i]]) {
        setErrInput(arrInput[i]);
        setErrMess("Bạn chưa nhập dữ liệu");
        break;
      }
    }
  };
  return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit }: AddNewItemModalProps) {
  const { errInput, errMess, checkValidInput } = InputValidation();
  const [newItem, setNewItem] = useState<NewItem>({
    ten: "",
    diaChi: "",
    congXuat: 0,
    loaiHinh: "",
    administrativeUnitId: 0,
  });

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
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              id="ten"
              placeholder="Tên"
              value={newItem.ten}
              onChange={(e) => {
                setNewItem({ ...newItem, ten: e.target.value });
              }}
            />
            {errInput === 'ten' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="diaChi">Địa chỉ:</Label>
            <Input
              type="text"
              id="diaChi"
              placeholder="Địa chỉ"
              value={newItem.diaChi}
              onChange={(e) => setNewItem({ ...newItem, diaChi: e.target.value })}
            />
            {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="congXuat">Công suất:</Label>
            <Input
              type="number"
              id="congXuat"
              placeholder="Công suất"
              value={newItem.congXuat}
              onChange={(e) => setNewItem({ ...newItem, congXuat: parseInt(e.target.value) || 0 })}
            />
            {errInput === 'congXuat' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="loaiHinh">Loại hình:</Label>
            <Input
              type="text"
              id="loaiHinh"
              placeholder="Loại hình"
              value={newItem.loaiHinh}
              onChange={(e) => setNewItem({ ...newItem, loaiHinh: e.target.value })}
            />
            {errInput === 'loaiHinh' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input
              type="number"
              id="administrativeUnitId"
              placeholder="Administrative Unit ID"
              value={newItem.administrativeUnitId}
              onChange={(e) => setNewItem({ ...newItem, administrativeUnitId: parseInt(e.target.value) || 0 })}
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
