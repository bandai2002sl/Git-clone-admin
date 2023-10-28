import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hinhThucChuyenDoiDatSevices from "~/services/hinhThucChuyenDoiDatSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import chuyenDoiSuDungDatSevices from "~/services/chuyenDoiSuDungDatSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
  const router = useRouter();
  const [listHanhChinh, setListHanhChinh] = useState<any>([]);
  const [listHinhThucChuyenDoiDat, setListHinhThucChuyenDoiDat] = useState<any>([]);
  const [form, setForm] = useState({
    administrativeUnitId: "",
    hinhThucChuyenDoiDatId: "",
    moTa: "",
    diaChi: "",
    dienTich: "",
    ngayChuyenDoi: ""
  })
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await donViHanhChinhSevices.displayDonViHanhChinh(listHanhChinh);
        const options = response.data.map((item: any) => ({
          label: item.ten, // Tên đơn vị
          value: item.id,  // ID của đơn vị
        }));
        setListHanhChinh(options);
        const res = await hinhThucChuyenDoiDatSevices.displayHinhThucChuyenDoiDat(listHinhThucChuyenDoiDat);
        const options1 = res.data.map((item: any) => ({
          label: item.tenHinhThuc,
          value: item.id,
        }));
        setListHinhThucChuyenDoiDat(options1);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);
  const handleSubmit = async () => {
    try {
      if (!form.administrativeUnitId || !form.hinhThucChuyenDoiDatId) {
        alert("Vui lòng chọn đơn vị hành chính, hình thức chuyển đổi đất!");
        return;
      }
      let res: any = await chuyenDoiSuDungDatSevices.createChuyenDoiSuDungDat(form)
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        onClose();
        router.replace(router.pathname);
        setForm({
          administrativeUnitId: "",
          hinhThucChuyenDoiDatId: "",
          moTa: "",
          diaChi: "",
          dienTich: "",
          ngayChuyenDoi: ""
        });
      } else {
        toastError({ msg: "Không thành công" });
        onClose();
      }
    } catch (error) {
      console.error(error)
    }
  };
  const handleDVHanhChinhChange = (selectedOption: any) => {
    setForm({
      ...form,
      administrativeUnitId: selectedOption.target.value,
    });
  };
  const handleHinhThucChuyenDoiDatChange = (selectedOption: any) => {
    setForm({
      ...form,
      hinhThucChuyenDoiDatId: selectedOption.target.value,
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
      <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
        <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
        <ModalBody>
          <div className={styles["modal-body"]}>
            <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
            <Select
              value={listHanhChinh.length > 0 ? listHanhChinh[0].value : null}
              placeholder="Chọn đơn vị hành chính"
              onChange={handleDVHanhChinhChange}
            >
              {listHanhChinh.map((item: any) => (
                <Option key={item.value} value={item.value} title={item.label} />
              ))}
            </Select>
            <div style={{ marginBottom: '13px' }}></div>
            <div style={{ marginBottom: '10px' }}>Hình thức chuyển đổi đất</div>
            <Select
              value={listHinhThucChuyenDoiDat.length > 0 ? listHinhThucChuyenDoiDat[0].value : null}
              placeholder="Chọn "
              onChange={handleHinhThucChuyenDoiDatChange}
            >
              {listHinhThucChuyenDoiDat.map((item: any) => (
                <Option key={item.value} value={item.value} title={item.label} />
              ))}
            </Select>
            <div style={{ marginBottom: '13px' }}></div>
            <Input
              type="string"
              name="moTa"
              label="Mô tả:"
              placeholder="Nhập mô tả:"
              isRequired
            />
            <Input
              type="string"
              name="diaChi"
              label="Địa chỉ:"
              placeholder="Nhập địa chỉ:"
              isRequired
            />
            <Input
              type="number"
              name="dienTich"
              label="Diện tích:"
              placeholder="Nhập diện tích:"
              isRequired
            />
            <Input
              type="datetime-local"
              name="ngayChuyenDoi"
              label="Ngày chuyển đổi:"
              placeholder="Nhập ngày chuyển đổi:"
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
