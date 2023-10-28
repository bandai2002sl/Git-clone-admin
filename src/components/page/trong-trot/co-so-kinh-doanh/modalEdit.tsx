import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
import coSoKinhDoanhSevices from "~/services/coSoKinhDoanhSevices";
import { toastSuccess, toastError } from "~/common/func/toast";

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
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [listLoaiKinhDoanh, setListLoaiKinhDoanh] = useState<any>([]);
    const [form, setForm] = useState({ ...editedData })

    const handleSubmit = async () => {
        try {
            if (!form.administrativeUnitId || !form.caNhanHtxId || !form.loaiKinhDoanhId) {
                alert("Vui lòng chọn đơn vị hành chính, hợp tác xã, loại kinh doanh!");
                return;
            }
            let res: any = await coSoKinhDoanhSevices.updateCoSoKinhDoanh(form.id, form);
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
                <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
                <ModalBody>
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
                    <div style={{ marginBottom: '10px' }}>Loại kinh doanh:</div>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        Lưu thay đổi
                    </Button>
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Form>
        </Modal >
    );
}
