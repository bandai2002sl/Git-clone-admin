import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import hochuaServices from "~/services/hoChuaServices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [form, setForm] = useState({
        ten: '',
        administrativeUnitId: '',
        diaChi: '',
        dungTichThietKe: '',
        dienTichTuoiThietKe: '',
        dienTichTuoiThucTe: '',
        loaiHo: ''
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

            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId ) {
                alert("Vui lòng chọn đơn vị hành chính!");
                return;
            }
            let res: any = await hochuaServices.createHoChua(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    ten: '',
                    administrativeUnitId: '',
                    diaChi: '',
                    dungTichThietKe: '',
                    dienTichTuoiThietKe: '',
                    dienTichTuoiThucTe: '',
                    loaiHo: ''
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


    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '13px' }}></div>
                            <Input
                             type="string"
                             name="ten"
                             label="Tên:"
                             placeholder="Nhập tên:"
                             isRequired
                            />
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
                        <Input
                            type="string"
                            name="diaChi"
                            label="Địa chỉ:"
                            placeholder="Nhập địa chỉ:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dungTichThietKe"
                            label="Dung tích thiết kế:"
                            placeholder="Nhập dung tích thiết kế:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dienTichTuoiThietKe"
                            label="Diện tích tưới thiết kế:"
                            placeholder="Nhập diện tích tưới thiết kế:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="dienTichTuoiThucTe"
                            label="Diện tích tưới thực tế:"
                            placeholder="Nhập diện tích tưới thực tế:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="loaiHo"
                            label="Loại hồ:"
                            placeholder="Nhập loại hồ:"
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
