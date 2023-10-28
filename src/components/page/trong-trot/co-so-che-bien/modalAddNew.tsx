import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import coSoCheBienSevices from "~/services/coSoCheBienSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [form, setForm] = useState({
        administrativeUnitId: "",
        caNhanHtxId: "",
        diaChi: "",
        loaiCheBien: "",
        moTa: "",
        hinhAnh: "",
        trangThai: "",
        coDangKy: "",
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
                const res = await hopTacXaSevices.displayHopTacXa(listHopTacXa);
                const options1 = res.data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }));
                setListHopTacXa(options1);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.caNhanHtxId) {
                alert("Vui lòng chọn đơn vị hành chính, hợp tác xã!");
                return;
            }
            let res: any = await coSoCheBienSevices.createCoSoCheBien(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    administrativeUnitId: "",
                    caNhanHtxId: "",
                    diaChi: "",
                    loaiCheBien: "",
                    moTa: "",
                    hinhAnh: "",
                    trangThai: "",
                    coDangKy: "",
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
    const handleHopTacXaChange = (selectedOption: any) => {
        setForm({
            ...form,
            caNhanHtxId: selectedOption.target.value,
        });
    };
    const handleCoDangKyChange = (selectedOption: any) => {
        setForm({
            ...form,
            coDangKy: selectedOption.target.title,
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
                        <div style={{ marginBottom: '10px' }}>Hợp tác xã</div>
                        <Select
                            value={listHopTacXa.length > 0 ? listHopTacXa[0].value : null}
                            placeholder="Chọn "
                            onChange={handleHopTacXaChange}
                        >
                            {listHopTacXa.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            type="string"
                            name="diaChi"
                            label="Địa chỉ:"
                            placeholder="Nhập địa chỉ:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="loaiCheBien"
                            label="Loại chế biến:"
                            placeholder="Nhập loại chế biến:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="moTa"
                            label="Mô tả:"
                            placeholder="Nhập mô tả:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="hinhAnh"
                            label="Hình ảnh:"
                            placeholder="Nhập link hình ảnh:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="trangThai"
                            label="Trạng thái:"
                            placeholder="Nhập trạng thái:"
                            isRequired
                        />
                        <div style={{ marginBottom: '10px' }}>Có đăng ký</div>
                        <Select
                            value
                            placeholder="Chọn Có hoặc Không"
                            onChange={handleCoDangKyChange}>

                            <Option value={1} title={"Có"} />
                            <Option value={2} title={"Không"} />
                        </Select>
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
