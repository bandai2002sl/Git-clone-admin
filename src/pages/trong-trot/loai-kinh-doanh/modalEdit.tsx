import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "../../modal-custom.module.scss"
<<<<<<< HEAD
=======
import loaiKinhDoanhSevices from "~/services/loaiKinhDoanhSevices";
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (editedItem: any) => void;
    editedItemId: number;
    editedData: any;
    setEditedData: React.Dispatch<any>;
}

export default function ModalEdit({
    isOpen,
    onClose,
    onUpdate,
    editedData,
    editedItemId,
    setEditedData,
}: ModalEditProps) {
    const [editedItem, setEditedItem] = useState({ ...editedData });

<<<<<<< HEAD
    const [editedX, setEditedX] = useState("");
    const [editedY, setEditedY] = useState("");
=======
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62
    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
        if (editedData) {
            setEditedItem({ ...editedData });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
<<<<<<< HEAD
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/loai-benh/${editedItemId}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            // Kiểm tra kết quả từ API (response) và xử lý tùy theo kết quả
            if (response.data.statusCode === 1) {
                // Dữ liệu đã được cập nhật thành công trên API
                onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
                setEditedData({}); // Đặt lại editedData trong component cha
                onClose(); // Đóng modal sau khi cập nhật thành công
            } else {
                console.log("lỗi", response)
            }
=======
            const response = await loaiKinhDoanhSevices.updateLoaiKinhDoanh(editedItem.id, editedItem);
            onUpdate(editedItem); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
            setEditedData({}); // Đặt lại editedData trong component cha
            onClose(); // Đóng modal sau khi cập nhật thành công
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size='lg'>
            <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className='input-container'>
<<<<<<< HEAD
                        <Label for="tenBenh">Tên Bệnh:</Label>
                        <Input
                            type="text"
                            name="tenBenh"
                            value={editedItem.tenBenh}
=======
                        <Label for="loaiKinhDoanh">Loại kinh doanh:</Label>
                        <Input
                            type="text"
                            name="loaiKinhDoanh"
                            value={editedItem.loaiKinhDoanh}
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="moTa">Mô tả:</Label>
                        <Input
                            type="text"
                            name="moTa"
                            value={editedItem.moTa}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
<<<<<<< HEAD
                        <Label for="doiTuong">Đối tượng</Label>
                        <Input
                            type="text"
                            name="doiTuong"
                            value={editedItem.doiTuong}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="hinhAnh" >Hình ảnh</Label>
                        <Input
                            type="text"
                            name="hinhAnh"
                            value={editedItem.hinhAnh}
=======
                        <Label for="tamNgung">Tạm ngừng</Label>
                        <Input
                            type="text"
                            name="tamNgung"
                            value={editedItem.tamNgung}
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveChanges}>
                    Lưu thay đổi
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal >
    );
}
