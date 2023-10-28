import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import vatNuoiSevices from "~/services/vatNuoiSevices";
import sanXuatVatNuoiSevices from "~/services/sanXuatVatNuoiSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listVatNuoi, setListVatNuoi] = useState<any>([]);
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [form, setForm] = useState({
        vatNuoiId: "",
        caNhanHtxId: "",
        diaChi: "",
        moTa: "",
        hinhAnh: "",
        tinhTrang: ""
    })
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await vatNuoiSevices.displayVatNuoi(listVatNuoi);
                const options = response.data.map((item: any) => ({
                    label: item.name, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListVatNuoi(options);
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
            if (!form.vatNuoiId || !form.caNhanHtxId) {
                alert("Vui lòng chọn vật nuôi, hợp tác xã!");
                return;
            }
            let res: any = await sanXuatVatNuoiSevices.createSanXuatVatNuoi(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    vatNuoiId: "",
                    caNhanHtxId: "",
                    diaChi: "",
                    moTa: "",
                    hinhAnh: "",
                    tinhTrang: ""
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }

        } catch (error) {
            console.error(error)
        }
    };
    const handleVatNuoiChange = (selectedOption: any) => {
        setForm({
            ...form,
            vatNuoiId: selectedOption.target.value,
        });
    };
    const handleHopTacXaChange = (selectedOption: any) => {
        setForm({
            ...form,
            caNhanHtxId: selectedOption.target.value,
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Vật nuôi</div>
                        <Select
                            value={listVatNuoi.length > 0 ? listVatNuoi[0].value : null}
                            placeholder="Chọn vật nuôi"
                            onChange={handleVatNuoiChange}
                        >
                            {listVatNuoi.map((item: any) => (
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
                            name="tinhTrang"
                            label="Tình trạng:"
                            placeholder="Nhập tình trạng:"
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
