import React, { Dispatch, SetStateAction, useState } from "react";
import {Button,Input,Label,Modal,ModalBody,ModalFooter,ModalHeader,} from "reactstrap";

import styles from "~/pages/modal-custom.module.scss";

interface DataItem {
  id: number;
  ten: string;
  diaChi: string;
  congXuat: number;
  loaiHinh: string;
  administrativeUnitId: number;
}


interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: DataItem) => void;
  newItem: DataItem;
  setNewItem: Dispatch<SetStateAction<DataItem>>;
}


export default function AddNewItemModal({
  isOpen,
  onClose,
  onSubmit,
}: AddNewItemModalProps) {
  const [newItem, setNewItem] = useState<DataItem>({
    id: 0,
    ten: "",
    diaChi: "",
    congXuat: 0,
    loaiHinh: "",
    administrativeUnitId: 0,
  });

  const [errors, setErrors] = useState<Record<keyof DataItem, string>>({
    id: "",
    ten: "",
    diaChi: "",
    congXuat: "",
    loaiHinh: "",
    administrativeUnitId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof DataItem;
    const value = e.target.value;
  
    setNewItem({ ...newItem, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  

  const handleSave = () => {
    const newErrors: Record<keyof DataItem, string> = {
      id: "",
      ten: "",
      diaChi: "",
      congXuat: "",
      loaiHinh: "",
      administrativeUnitId: "",
    };

    // Kiểm tra tính hợp lệ của các trường đầu vào
    for (const field in newItem) {
      if (!newItem[field as keyof DataItem]) {
        newErrors[field as keyof DataItem] = "Bạn chưa nhập đủ thông tin";
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      // Nếu không có lỗi, gửi thông tin mục mới
      onSubmit(newItem);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size="lg">
      <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              name="ten"
              id="ten"
              placeholder="Tên"
              value={newItem.ten}
              onChange={handleChange}
            />
            {errors.ten && <div className="text-danger">{errors.ten}</div>}
          </div>
          <div className="input-container">
            <Label for="diaChi">Địa chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              id="diaChi"
              placeholder="Địa chỉ"
              value={newItem.diaChi}
              onChange={handleChange}
            />
            {errors.diaChi && <div className="text-danger">{errors.diaChi}</div>}
          </div>
          <div className="input-container">
            <Label for="congXuat">Công xuất:</Label>
            <Input
              type="text"
              name="congXuat"
              id="congXuat"
              placeholder="Công xuất"
              value={newItem.congXuat}
              onChange={handleChange}
            />
            {errors.congXuat && <div className="text-danger">{errors.congXuat}</div>}
          </div>
          <div className="input-container">
            <Label for="loaiHinh">Loại hình:</Label>
            <Input
              type="text"
              name="loaiHinh"
              id="loaiHinh"
              placeholder="Loại hình"
              value={newItem.loaiHinh}
              onChange={handleChange}
            />
            {errors.loaiHinh && <div className="text-danger">{errors.loaiHinh}</div>}
          </div>
          <div className="input-container">
            <Label for="administrativeUnitId">Đơn vị hành chính Id:</Label>
            <Input
              type="text"
              name="administrativeUnitId"
              id="administrativeUnitId"
              placeholder="Đơn vị hành chính Id"
              value={newItem.administrativeUnitId}
              onChange={handleChange}
            />
            {errors.administrativeUnitId && <div className="text-danger">{errors.administrativeUnitId}</div>}
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
