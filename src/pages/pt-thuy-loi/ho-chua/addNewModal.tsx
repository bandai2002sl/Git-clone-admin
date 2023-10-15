import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface NewData {
  ten: string;
  diaChi: string;
  dungTichThietKe: number;
  dienTichTuoiThietKe: number;
  dienTichTuoiThucTe: number;
  loaiHo: string;
  administrativeUnitId: number;
}

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  editedItemId: number;
  editedData: NewData;
  setEditedData: React.Dispatch<any>;
  onUpdate: (editedItem: NewData) => void;
}

export default function ModalEdit({
  isOpen,
  onClose,
  onUpdate,
  editedData,
  editedItemId,
  setEditedData,
}: ModalEditProps) {
  const [editedItem, setEditedItem] = useState<NewData>({ ...editedData });

  useEffect(() => {
    if (editedData) {
      setEditedItem({ ...editedData });
    }
  }, [editedData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_CLIENT}/cong/${editedItemId}`,
        editedItem,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.data.statusCode === 1) {
        onUpdate(editedItem);
        setEditedData({});
        onClose();
      } else {
        console.log("lỗi", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size='lg'>
      <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className='input-container'>
            <Label for="ten">Tên:</Label>
            <Input
              type="text"
              name="ten"
              value={editedItem.ten}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="diaChi">Địa Chỉ:</Label>
            <Input
              type="text"
              name="diaChi"
              value={editedItem.diaChi}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="dungTichThietKe">Dung Tích Thiết Kế:</Label>
            <Input
              type="number"
              name="dungTichThietKe"
              value={editedItem.dungTichThietKe}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="dienTichTuoiThietKe">Diện Tích Tuới Thiết Kế:</Label>
            <Input
              type="number"
              name="dienTichTuoiThietKe"
              value={editedItem.dienTichTuoiThietKe}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="dienTichTuoiThucTe">Diện Tích Tuới Thực Tế:</Label>
            <Input
              type="number"
              name="dienTichTuoiThucTe"
              value={editedItem.dienTichTuoiThucTe}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="loaiHo">Loại Hồ:</Label>
            <Input
              type="text"
              name="loaiHo"
              value={editedItem.loaiHo}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <Label for="administrativeUnitId">Administrative Unit ID:</Label>
            <Input
              type="number"
              name="administrativeUnitId"
              value={editedItem.administrativeUnitId}
              onChange={handleInputChange}
            />
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
