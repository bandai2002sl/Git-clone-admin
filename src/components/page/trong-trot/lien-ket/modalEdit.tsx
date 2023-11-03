import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import DatePicker from "~/components/common/DatePicker";
import Form, { Input } from "~/components/common/Form";
import Select, { Option } from "~/components/common/Select";
import styles from "~/pages/modal-custom.module.scss";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import lienKetSevices from "~/services/lienKetSevices";

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
    const [listHopTacXa, setListHopTacXa] = useState<any>([]);
    const [form, setForm] = useState({ ...editedData })

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await hopTacXaSevices.displayHopTacXa(listHopTacXa);
                const options = response.data.map((item: any) => ({
                    label: item.name, // Tên đơn vị
                    value: item.id,  // ID của đơn vị
                }));
                setListHopTacXa(options)
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
            let res: any = await lienKetSevices.updateLienKet(form.id, form);
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
    const handleHopTacXaChange = (selectedOption: any) => {
        setForm({
            ...form,
            caNhanHtxId: selectedOption.value,
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
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
