import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toastSuccess, toastError } from "~/common/func/toast";
import Form, { Input } from "~/components/common/Form";
import styles from "~/pages/modal-custom.module.scss"
import hinhThucChanNuoiSevices from "~/services/hinhThucChanNuoiSevices";

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
    const [form, setForm] = useState({ ...editedData });

    const handleSubmit = async () => {
        try {
            let res: any = await hinhThucChanNuoiSevices.updateHinhThucChanNuoi(form.id, form);
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
    }
    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} size='lg'>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
                <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
                <ModalBody>
                    <div className={styles["modal-body"]}>
                        <Input
                            name="tenHinhThuc"
                            label="Tên hình thức"
                            placeholder="Nhập tên cây trồng"
                            isRequired
                        />
                        <Input
                            name="tamNgung"
                            label="Tạm Ngừng"
                            placeholder="Tạm Ngừng"
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
        </Modal >
    );
}
