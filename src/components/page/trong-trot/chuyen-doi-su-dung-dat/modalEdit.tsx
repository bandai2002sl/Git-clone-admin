import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hinhThucChuyenDoiDatSevices from "~/services/hinhThucChuyenDoiDatSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import chuyenDoiSuDungDatSevices from "~/services/chuyenDoiSuDungDatSevices";
import { toastSuccess, toastError } from "~/common/func/toast";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";
import ReactSelect from "react-select";

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    editedData: any;
    setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
    isOpen,
    onClose,
    editedData,
    setEditedData,
}: ModalEditProps) {
    const router = useRouter();
    const [listHanhChinh, setListHanhChinh] = useState<any>([]);
    const [listHinhThucChuyenDoiDat, setListHinhThucChuyenDoiDat] = useState<any>([]);
    const [listKyBaoCao, setListKyBaoCao] = useState<any>([]);
    const [form, setForm] = useState({ ...editedData })

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
                const res2 = await kyBaoCaoSevices.displayKyBaoCao(listKyBaoCao);
                const options3 = res2.data.map((item: any) => ({
                    label: item.tenBaoCao,
                    value: item.id,
                }));
                setListKyBaoCao(options3);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.hinhThucChuyenDoiDatId || !form.kyBaoCaoId) {
                alert("Vui lòng chọn đơn vị hành chính, hình thức chuyển đổi đất!");
                return;
            }
            let res: any = await chuyenDoiSuDungDatSevices.updateChuyenDoiSuDungDat(form.id, form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setEditedData(null);
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleDVHanhChinhChange = (selectedOption: any) => {
        setForm({
            ...form,
            administrativeUnitId: selectedOption.value,
        });
    };
    const handleHinhThucChuyenDoiDatChange = (selectedOption: any) => {
        setForm({
            ...form,
            hinhThucChuyenDoiDatId: selectedOption.value,
        });
    };
    const handleKyBaoCaoChange = (selectedOption: any) => {
        setForm({
            ...form,
            kyBaoCaoId: selectedOption.value,
        });
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <div style={{ marginBottom: '10px' }}>Đơn vị hành chính</div>
                        <ReactSelect
                            options={listHanhChinh}
                            onChange={handleDVHanhChinhChange}
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Hình thức chuyển đổi đất</div>
                        <ReactSelect
                            options={listHinhThucChuyenDoiDat}
                            onChange={handleHinhThucChuyenDoiDatChange}
                        />
                        <div style={{ marginBottom: '13px' }}></div>
                        <div style={{ marginBottom: '10px' }}>Kỳ báo cáo:</div>
                        <ReactSelect
                            options={listKyBaoCao}
                            onChange={handleKyBaoCaoChange}
                        />
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
