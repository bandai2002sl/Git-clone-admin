import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useState } from "react";
import styles from "~/pages/modal-custom.module.scss";
import { useRouter } from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";
import kyBaoCaoSevices from "~/services/kyBaoCaoSevices";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function AddNewItemModal({ isOpen, onClose }: AddNewItemModalProps) {
    const router = useRouter();
    const [form, setForm] = useState({
        tenBaoCao: '',
        thoiDiemBatDau: '',
        thoiDiemKetThuc: '',
        trangThai: ''
    })
    const handleSubmit = async () => {
        try {
            let res: any = await kyBaoCaoSevices.createKyBaoCao(form)
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    tenBaoCao: '',
                    thoiDiemBatDau: '',
                    thoiDiemKetThuc: '',
                    trangThai: ''
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="tenBaoCao"
                            label="Tên báo cáo"
                            placeholder="Nhập tên báo cáo"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="thoiDiemBatDau"
                            label="Thời điểm bắt đầu"
                            placeholder="Nhập thời điểm bắt đầu"
                            isRequired
                        />
                        <Input
                            type="datetime-local"
                            name="thoiDiemKetThuc"
                            label="Thời điểm kết thúc"
                            placeholder="Nhập thời điểm kết thúc"
                            isRequired
                        />
                        <Input
                            name="trangThai"
                            label="Trạng thái"
                            placeholder="Nhập trạng thái"
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
