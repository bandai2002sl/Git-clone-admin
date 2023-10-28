import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [listLoaiKinhDoanh, setListLoaiKinhDoanh] = useState<any>([]);
    const [form, setForm] = useState({
        caNhanHtxId: '',
        loaiKinhDoanhId: '',
        administrativeUnitId: '',
        diaDiem: "",
        hinhAnh: "",
        dangKyKinhDoanh: "",
        sdt: "",
        trangThai: "",
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

                const res1 = await loaiKinhDoanhSevices.displayLoaiKinhDoanh(listLoaiKinhDoanh);
                const options2 = res1.data.map((item: any) => ({
                    label: item.loaiKinhDoanh,
                    value: item.id,
                }));

                setListLoaiKinhDoanh(options2);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.caNhanHtxId || !form.loaiKinhDoanhId) {
                alert("Vui lòng chọn đơn vị hành chính, hợp tác xã, loại kinh doanh!");
                return;
            }
            let res: any = await coSoKinhDoanhSevices.createCoSoKinhDoanh(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    caNhanHtxId: '',
                    loaiKinhDoanhId: '',
                    administrativeUnitId: '',
                    diaDiem: "",
                    hinhAnh: "",
                    dangKyKinhDoanh: "",
                    sdt: "",
                    trangThai: "",
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
    const handleLoaiKinhDoanhChange = (selectedOption: any) => {
        setForm({
            ...form,
            loaiKinhDoanhId: selectedOption.target.value,
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
                        <div style={{ marginBottom: '10px' }}>Hợp tác xã:</div>
                        <Select
                            value={listHopTacXa.length > 0 ? listHopTacXa[0].value : null}
                            placeholder="Chọn hợp tác xã"
                            onChange={handleHopTacXaChange}
                        >
                            {listHopTacXa.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Loại Kinh Doanh:</div>
                        <Select
                            value={listLoaiKinhDoanh.length > 0 ? listLoaiKinhDoanh[0].value : null}
                            placeholder="Chọn loại kinh doanh"
                            onChange={handleLoaiKinhDoanhChange}
                        >
                            {listLoaiKinhDoanh.map((item: any) => (
                                <Option key={item.value} value={item.value} title={item.label} />
                            ))}
                        </Select>
                        <div style={{ marginBottom: '13px' }}></div>
                        <Input
                            type="string"
                            name="diaDiem"
                            label="Địa điểm:"
                            placeholder="Nhập địa điểm:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="hinhAnh"
                            label="Hình ảnh:"
                            placeholder="Nhập hình link ảnh:"
                            isRequired
                        />
                        <Input
                            type="string"
                            name="dangKyKinhDoanh"
                            label="Đăng kí kinh doanh:"
                            placeholder="Nhập đăng kí:"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="sdt"
                            label="Số điện thoại:"
                            placeholder="Nhập số điện thoại:"
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
