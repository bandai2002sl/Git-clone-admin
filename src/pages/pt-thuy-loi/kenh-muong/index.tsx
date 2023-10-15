import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

interface NewData {
  ten: string;
  chieuDai: number;
  chieuDaiKienCo: number;
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
    chieuDai: 0,
    chieuDaiKienCo: 0,
    administrativeUnitId: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Gọi hàm onSubmit để gửi newData lên server
    onSubmit(newData);
    onClose(); // Đóng modal sau khi thêm mới
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
            <Label for="chieuDai">Chiều dài:</Label>
            <Input type="number" name="chieuDai" value={newData.chieuDai} onChange={handleInputChange} />
          </div>
          <div className="input-container">
            <Label for="chieuDaiKienCo">Chiều dài kiến có:</Label>
            <Input type="number" name="chieuDaiKienCo" value={newData.chieuDaiKienCo} onChange={handleInputChange} />
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
