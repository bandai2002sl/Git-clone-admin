import { useRouter } from "next/router";
import React, { useState } from "react";
import Form, { Input } from "~/components/common/Form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "~/pages/modal-custom.module.scss";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import { toastError, toastSuccess } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any[]
}
export default function AddNewItemModal({ isOpen, onClose, data }: AddNewItemModalProps) {
    const router = useRouter();
    const [form, setForm] = useState({
        maHanhChinh: "",
        ten: "",
        capHanhChinh: "",
        tenVietTat: "",
        toaDo: "",
    })
    const handleSubmit = async () => {
        if (isMaHanhChinhExisted(data, form.maHanhChinh)) {
            alert("Mã hành chính đã tồn tại.");
            return;
        }
        try {
            let res: any = await donViHanhChinhSevices.createDonViHanhChinh(form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    maHanhChinh: "",
                    ten: "",
                    capHanhChinh: "",
                    tenVietTat: "",
                    toaDo: "",
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };
    function isMaHanhChinhExisted(data: any[], maHanhChinhToCheck: string): boolean {
        return data.some((item) => item.maHanhChinh === maHanhChinhToCheck);
    }
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="maHanhChinh"
                            label="Mã hành chính"
                            placeholder="Nhập mã hành chính"
                            isRequired
                        />
                        <Input
                            name="ten"
                            label="Tên hành chính"
                            placeholder="Nhập tên hành chính"
                            isRequired
                        />
                        <Input
                            type="number"
                            name="capHanhChinh"
                            label="Cấp hành chính"
                            placeholder="nhập cấp hành chính"
                            isRequired
                        />
                        <Input
                            name="tenVietTat"
                            label="Tên viết tắt"
                            placeholder="Nhập tên viết tắt"
                            isRequired
                        />
                        <Input
                            name="toaDo"
                            label="Tọa độ: Point(X Y)"
                            placeholder="Nhập tọa độ"
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
