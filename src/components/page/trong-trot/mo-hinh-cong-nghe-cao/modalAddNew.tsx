import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import moHinhCongNgheCaoSevices from "~/services/moHinhCongNgheCaoSevices";
import { toastSuccess, toastError } from "~/common/func/toast";
import ReactSelect from "react-select";

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
        address: "",
        moTa: "",
        dienTich: "",
        congNgheSuDung: "",
        trangThai: ""
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
            let res: any = await moHinhCongNgheCaoSevices.createMoHinhCongNgheCao(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    administrativeUnitId: "",
                    caNhanHtxId: "",
                    address: "",
                    moTa: "",
                    dienTich: "",
                    congNgheSuDung: "",
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
    const handleDVHanhChinhChange = (selectedOption: any) => {
        setForm({
            ...form,
            administrativeUnitId: selectedOption.value,
        });
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
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <ReactSelect
                            options={listHanhChinh}
                            onChange={handleDVHanhChinhChange}
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Hợp tác xã</div>
                        <ReactSelect
                            options={listHopTacXa}
                            onChange={handleHopTacXaChange}
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            type="string"
                            name="address"
                            label="Địa chỉ:"
                            placeholder="Nhập địa chỉ:"
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
                            type="number"
                            name="dienTich"
                            label="Diện tích:"
                            placeholder="Nhập diện tích:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="congNgheSuDung"
                            label="Công nghệ sử dụng:"
                            placeholder="Nhập công nghệ sử dụng:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="trangThai"
                            label="Trạng thái:"
                            placeholder="Nhập trạng thái:"
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
