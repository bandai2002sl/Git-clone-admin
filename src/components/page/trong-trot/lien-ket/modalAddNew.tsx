import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import lienKetSevices from "~/services/lienKetSevices";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
  const router = useRouter();
  const [listHopTacXa, setListHopTacXa] = useState<any>([]);
  const [form, setForm] = useState({
    caNhanHtxId: "",
    hinhThucLienKet: "",
    ngayLienKet: "",
    trangThai: ""
  })
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await hopTacXaSevices.displayHopTacXa(listHopTacXa);
        const options = response.data.map((item: any) => ({
          label: item.name, // Tên đơn vị
          value: item.id,  // ID của đơn vị
        }));
        setListHopTacXa(options);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);
  const handleSubmit = async () => {
    try {
      if (!form.caNhanHtxId) {
        alert("Vui lòng chọn hợp tác xã!");
        return;
      }
      let res: any = await lienKetSevices.createLienKet(form)
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({
          caNhanHtxId: "",
          hinhThucLienKet: "",
          ngayLienKet: "",
          trangThai: ""
        });
      } else {
        toastError({ msg: "Không thành công" });
        onClose();
      }
    } catch (error) {
      console.error(error)
    }
  };
  const handleHopTacXaChange = (selectedOption: any) => {
    setForm({
      ...form,
      caNhanHtxId: selectedOption.value,
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
      <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
        <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
        <ModalBody>
          <div className={styles["modal-body"]}>
            <div style={{ marginBottom: '10px' }}>Hợp tác xã</div>
            <ReactSelect
              options={listHopTacXa}
              onChange={handleHopTacXaChange}
            />
            <div style={{ marginBottom: '13px' }}></div>
            <Input
              type="string"
              name="hinhThucLienKet"
              label="Hình thức liên kết:"
              placeholder="Nhập hình thức liên kết:"
              isRequired
            />
            <Input
              type="string"
              name="trangThai"
              label="Trạng thái:"
              placeholder="Nhập trạng thái:"
              isRequired
            />
            <Input
              type="datetime-local"
              name="ngayLienKet"
              label="Ngày liên kết:"
              placeholder="Nhập ngày liên kết:"
              isRequired
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className={styles["modal-footer"]}>
            <Button color="primary">
              Lưu
            </Button>{" "}
            <Button color="secondary" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </ModalFooter>
      </Form>
    </Modal >
  );
}
