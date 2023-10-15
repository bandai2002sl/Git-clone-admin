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
    const requiredInputs = ['diaChi', 'loaiCheBien', 'moTa', 'hinhAnh', 'trangThai', 'coDangKy', 'caNhanHtxId', 'administrativeUnitId'];
    for (let i = 0; i < requiredInputs.length; i++) {
      if (!newItem[requiredInputs[i]]) {
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
                setNewItem({ ...newItem, diaChi: e.target.value || "" });
              }}
            />
            {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="loaiCheBien">Loại chế biến:</Label>
            <Input
              type="text"
              id="loaiCheBien"
              placeholder="Loại chế biến"
              value={newItem.loaiCheBien || ""}
              onChange={(e) => setNewItem({ ...newItem, loaiCheBien: e.target.value || "" })}
            />
            {errInput === 'loaiCheBien' ? <div className="text-danger">{errMess}</div> : ''}
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
          <div className='input-container'>
            <Label for="coDangKy">Có đăng ký:</Label>
            <Input
              type="text"
              id="coDangKy"
              placeholder="Có đăng ký"
              value={newItem.coDangKy || ""}
              onChange={(e) => setNewItem({ ...newItem, coDangKy: e.target.value || "" })}
            />
            {errInput === 'coDangKy' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="caNhanHtxId">Cá nhân HTX ID:</Label>
            <Input
              type="number"
              id="caNhanHtxId"
              placeholder="Cá nhân HTX ID"
              value={newItem.caNhanHtxId || ""}
              onChange={(e) => setNewItem({ ...newItem, caNhanHtxId: e.target.value ? parseInt(e.target.value) : 0 })}
            />
            {errInput === 'caNhanHtxId' ? <div className="text-danger">{errMess}</div> : ''}
          </div>
          <div className='input-container'>
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input
              type="number"
              id="administrativeUnitId"
              placeholder="Administrative Unit ID"
              value={newItem.administrativeUnitId || ""}
              onChange={(e) => setNewItem({ ...newItem, administrativeUnitId: e.target.value ? parseInt(e.target.value) : 0 })}
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
