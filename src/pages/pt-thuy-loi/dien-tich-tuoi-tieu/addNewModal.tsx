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
  const [errInput, setErrInput] = useState<string | null>(null);

  const checkValidInput = (newItem: any) => {
    setErrInput(null);
    const requiredFields = ['dienTich', 'ngayThongKe', 'hinhThuc', 'administrativeUnitId', 'cropTypeId'];
    for (const field of requiredFields) {
      if (!newItem[field]) {
        setErrInput(field);
        return;
      }
    }
  };

  return { errInput, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
  const { errInput, checkValidInput } = InputValidation();

  const handleSave = () => {
    checkValidInput(newItem);

    // Check if there is an error before submitting
    if (!errInput) {
      onSubmit(newItem);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
      <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          {/* ... code trước đó ... */}

          {/* Hiển thị lỗi */}
          {errInput && (
            <div className="text-danger">
              Bạn chưa nhập dữ liệu cho trường: {errInput === 'dienTich' && 'Diện tích'}
              {errInput === 'ngayThongKe' && 'Ngày thống kê'}
              {errInput === 'hinhThuc' && 'Hình thức'}
              {errInput === 'administrativeUnitId' && 'Administrative Unit ID'}
              {errInput === 'cropTypeId' && 'Crop Type ID'}
            </div>
          )}
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
