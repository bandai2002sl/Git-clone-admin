import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useState } from "react";

import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import styles from "~/pages/modal-custom.module.scss"
import { useRouter } from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";

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
    loaiKinhDoanh: "",
    moTa: "",
    tamNgung: "",
  });

  const handleSubmit = async () => {
    try {
      let res: any = await loaiKinhDoanhSevices.createLoaiKinhDoanh(form);
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({
          loaiKinhDoanh: "",
          moTa: "",
          tamNgung: "",
        });
      } else {
        toastError({ msg: "Không thành công" });
        onClose();
      }
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
              name="loaiKinhDoanh"
              label="Loại kinh doanh"
              placeholder="Nhập loại kinh doanh"
              isRequired
            />
            <Input
              name="moTa"
              label="Mô tả"
              placeholder="Nhập mô tả"
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
