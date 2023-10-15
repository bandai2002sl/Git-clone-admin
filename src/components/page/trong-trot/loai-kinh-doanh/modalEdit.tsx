import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";

import axios from "axios";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import styles from "~/pages/modal-custom.module.scss";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (editedItem: any) => void;
  editedItemId: number;
  editedData: any;
  setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
  isOpen,
  onClose,
  onUpdate,
  editedData,
  editedItemId,
  setEditedData,
}: ModalEditProps) {
  const [editedItem, setEditedItem] = useState({ ...editedData });

  useEffect(() => {
    // Kiểm tra nếu editedData không phải là null hoặc undefined
    if (editedData) {
      setEditedItem({ ...editedData });
    }
  }, [editedData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await loaiKinhDoanhSevices.updateLoaiKinhDoanh(
        editedItem.id,
        editedItem
      );
      onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
      setEditedData({}); // Đặt lại editedData trong component cha
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      backdrop={false}
      size="lg"
    >
      <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
      <ModalBody>
        <div className={styles["modal-body"]}>
          <div className="input-container">
            <Label for="loaiKinhDoanh">Loại kinh doanh:</Label>
            <Input
              type="text"
              name="loaiKinhDoanh"
              value={editedItem.loaiKinhDoanh}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="moTa">Mô tả:</Label>
            <Input
              type="text"
              name="moTa"
              value={editedItem.moTa}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <Label for="tamNgung">Tạm ngừng</Label>
            <Input
              type="text"
              name="tamNgung"
              value={editedItem.tamNgung}
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
