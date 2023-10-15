import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useState } from "react";

import cayTrongSevices from "~/services/cayTrongSevices";
import styles from "../../modal-custom.module.scss";
import { useRouter } from "next/router";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewItemModal({
  isOpen,
  onClose,
}: AddNewItemModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    moTa: "",
    image: "",
    tamNgung: "",
  });

  const handleSubmit = async () => {
    try {
      await cayTrongSevices.createCayTrong(form);
      onClose();
      router.replace(router.pathname);
      setForm({
        name: "",
        moTa: "",
        image: "",
        tamNgung: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      className={styles["modal-container"]}
      size="lg"
    >
      <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
        <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
        <ModalBody>
          <div className={styles["modal-body"]}>
            <Input
              name="name"
              label="Tên cây trồng"
              placeholder="Tên cây trồng"
              isRequired
            />
            <Input
              name="moTa"
              label="Mô tả"
              placeholder="Nhập mô tả"
              isRequired
            />
            <Input
              name="image"
              label="Hình ảnh"
              placeholder="Nhập link hình ảnh"
              isRequired
            />
            <Input
              name="tamNgung"
              label="Tạm Ngừng"
              placeholder="Tạm Ngừng"
              isRequired
            />
          </div>
        </ModalBody>
        <div className={styles["modal-footer"]}>
          <ModalFooter>
            <Button small primary bold rounded_6>
              Lưu
            </Button>
            <Button color="secondary" onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </div>
      </Form>
    </Modal>
  );
}
