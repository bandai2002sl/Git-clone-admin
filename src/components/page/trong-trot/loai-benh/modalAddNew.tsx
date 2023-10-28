import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Form, { Input } from "~/components/common/Form";
import React, { useState } from "react";

import loaiBenhSevices from "~/services/loaiBenhSevices";
import styles from "~/pages/modal-custom.module.scss"
import { useRouter } from "next/router";
import { toastSuccess, toastError } from "~/common/func/toast";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewItemModal({
    isOpen,
    onClose,
}: AddNewItemModalProps) {
    const router = useRouter();
    const [form, setForm] = useState({
        tenBenh: "",
        moTa: "",
        doiTuong: "",
        hinhAnh: ""
    });

    const handleSubmit = async () => {
        try {
            let res: any = await loaiBenhSevices.createLoaiBenh(form);
            if (res.statusCode === 200) {
                toastSuccess({ msg: "Thành công" });
                onClose();
                router.replace(router.pathname);
                setForm({
                    tenBenh: "",
                    moTa: "",
                    doiTuong: "",
                    hinhAnh: ""
                });
            } else {
                toastError({ msg: "Không thành công" });
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            toggle={onClose}
            className={styles["modal-container"]}
            size="lg"
        >
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="tenBenh"
                            label="Tên bệnh cây"
                            placeholder="Tên bệnh cây"
                            isRequired
                        />
                        <Input
                            name="moTa"
                            label="Mô tả"
                            placeholder="Nhập mô tả"
                            isRequired
                        />
                        <Input
                            name="doiTuong"
                            label="Đối tượng"
                            placeholder="Nhập đối tượng"
                            isRequired
                        />
                        <Input
                            name="hinhAnh"
                            label="Hình ảnh"
                            placeholder="Nhập link hình ảnh"
                            isRequired
                        />
                    </div>
                </ModalBody>
                <div className={styles["modal-footer"]}>
                    <ModalFooter>
                        <Button small primary bold rounded_6>
                            Lưu
                        </Button>
                        <Button color="secondary" onClick={onClose}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </div>
            </Form>
        </Modal>
    );
}
