import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from "reactstrap";
import styles from "../../modal-custom.module.scss";

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
    const [editedItem, setEditedItem] = useState({
        soDangKy: 0,
        diaChi: "",
        tinhTrang: "",
        moTa: "",
        ngayDangKy: "2023-10-14T18:33:31.613Z",
        administrativeUnitId: 0,
        caNhanHTXId: 0
    });

    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
        if (editedData) {
            setEditedItem({
                soDangKy: editedData.soDangKy || 0,
                diaChi: editedData.diaChi || "",
                tinhTrang: editedData.tinhTrang || "",
                moTa: editedData.moTa || "",
                ngayDangKy: editedData.ngayDangKy || "2023-10-14T18:33:31.613Z",
                administrativeUnitId: editedData.administrativeUnitId || 0,
                caNhanHTXId: editedData.caNhanHTXId || 0
            });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/quan-ly-tau-ca/${editedItemId}`,
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
                console.log("lỗi", response);
            }
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
                        <Label for="diaChi">Địa chỉ:</Label>
                        <Input
                            type="text"
                            name="diaChi"
                            value={editedItem.diaChi}
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
                        <Label for="tinhTrang">Tình trạng:</Label>
                        <Input
                            type="text"
                            name="tinhTrang"
                            value={editedItem.tinhTrang}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="soDangKy">Số đăng ký:</Label>
                        <Input
                            type="number"
                            name="soDangKy"
                            value={editedItem.soDangKy}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="ngayDangKy">Ngày đăng ký:</Label>
                        <Input
                            type="text"
                            name="ngayDangKy"
                            value={editedItem.ngayDangKy}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="caNhanHTXId">Cá nhân HTX ID:</Label>
                        <Input
                            type="number"
                            name="caNhanHTXId"
                            value={editedItem.caNhanHTXId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            name="administrativeUnitId"
                            value={editedItem.administrativeUnitId}
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
        </Modal>
    );
}
