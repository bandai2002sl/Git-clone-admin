import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useEffect, useState } from "react";
import styles from "~/pages/modal-custom.module.scss";
import { useRouter } from "next/router";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import { toastSuccess, toastError } from "~/common/func/toast";
import ReactSelect from "react-select";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [form, setForm] = useState({
        administrativeUnitId: '',
        name: "",
        sdt: "",
        address: "",
        moTa: "",
        linhVucHoatDong: '',
        hinhAnh: '',
        ngayThanhLap: "",
        loaiHinh: "",
        soNguoi: '',
        trangThai: "",
        toaDo: "",
        icon: "",
    })
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/im
    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId) {
                alert("Vui lòng chọn đơn vị hành chính.");
                return;
            } if (form.name.length > 255) {
                alert("Tên Htx dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (!regex.test(form.sdt)) {
                alert("Tên SDT dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.address.length > 255) {
                alert("Địa chỉ dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.moTa.length > 255) {
                alert("Mô tả dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.linhVucHoatDong.length > 255) {
                alert("Lĩnh vực HD dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.loaiHinh.length > 255) {
                alert("Loại hình dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (parseInt(form.soNguoi, 10) <= 0 || form.soNguoi.length > 10) {
                alert("Số người dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            } if (form.trangThai.length > 255) {
                alert("Trạng thái dữ liệu không hợp lệ! vui lòng nhập lại");
                return;
            }
            let res: any = await hopTacXaSevices.createHopTacXa(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    administrativeUnitId: '',
                    name: "",
                    sdt: "",
                    address: "",
                    moTa: "",
                    linhVucHoatDong: '',
                    hinhAnh: '',
                    ngayThanhLap: "",
                    loaiHinh: "",
                    soNguoi: '',
                    trangThai: "",
                    toaDo: "",
                    icon: "",
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await donViHanhChinhSevices.displayDonViHanhChinh(listHanhChinh);
                const options = response.data.map((item: any) => ({
                    label: item.ten, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListHanhChinh(options);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleDVHanhChinhChange = (selectedOption: any) => {
        setForm({
            ...form,
            administrativeUnitId: selectedOption.value,
        });
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <ReactSelect
                            options={listHanhChinh}
                            onChange={handleDVHanhChinhChange}
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            name="name"
                            label="Tên Htx"
                            placeholder="Nhập tên Htx"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="sdt"
                            label="Số ĐT"
                            placeholder="Nhập SDT"
                            isRequired
                        />
                        <Input
                            name="address"
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            isRequired
                        />
                        <Input
                            name="moTa"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            isRequired
                        />
                        <Input
                            name="linhVucHoatDong"
                            label="Lĩnh vực HĐ"
                            placeholder="Nhập lĩnh vực HĐ"
                            isRequired
                        />
                        <Input
                            name="hinhAnh"
                            label="hình ảnh"
                            placeholder="Nhập link ảnh"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="ngayThanhLap"
                            label="Ngày thành lập"
                            placeholder="Nhập ngày thành lập"
                            isRequired
                        />
                        <Input
                            name="loaiHinh"
                            label="Loại hình"
                            placeholder="Nhập loại hình"
                            isRequired
                        />
                        <Input
                            name="soNguoi"
                            label="Số người"
                            placeholder="Nhập số người"
                            isRequired
                        />
                        <Input
                            name="trangThai"
                            label="trạng thái"
                            placeholder="Nhập trạng thái"
                            isRequired
                        />
                        <Input
                            name="toaDo"
                            label="Tọa độ: Point(X Y)"
                            placeholder="Nhập tọa độ"
                            isRequired
                        />
                        <Input
                            name="icon"
                            label="Icon"
                            placeholder="Nhập icon"
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
