import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface NewData {
  ten: string;
  diaChi: string;
  congXuat: number;
  loaiHinh: string;
  administrativeUnitId: number;
}

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newData: NewData) => void;
}

export default function ModalAdd({ isOpen, onClose, onSubmit }: ModalAddProps) {
  const [newData, setNewData] = useState<NewData>({
    ten: "",
    diaChi: "",
    congXuat: 0,
    loaiHinh: "",
    administrativeUnitId: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Call the onSubmit function to send newData to the server
      onSubmit(newData);
      onClose(); // Close the modal after adding new data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size="lg">
      <ModalHeader toggle={onClose}>THÊM DỮ LIỆU MỚI</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="ten">Tên:</Label>
            <Input type="text" name="ten" value={newData.ten} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input type="text" name="diaChi" value={newData.diaChi} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="congXuat">Công suất:</Label>
            <Input type="number" name="congXuat" value={newData.congXuat} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại hình:</Label>
            <Input type="text" name="loaiHinh" value={newData.loaiHinh} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input type="number" name="administrativeUnitId" value={newData.administrativeUnitId} onChange={handleInputChange} />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSaveChanges}>
          Lưu thay đổi
        </Button>
        <Button color="secondary" onClick={onClose}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}
