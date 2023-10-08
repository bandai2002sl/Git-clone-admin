import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, } from "reactstrap";
import styles from "./don-vi-hanh-chinh.module.scss"

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

    const [editedX, setEditedX] = useState("");
    const [editedY, setEditedY] = useState("");
    useEffect(() => {
        // Kiểm tra nếu editedData không phải là null hoặc undefined
        if (editedData) {
            setEditedItem({ ...editedData });
            // Tách X và Y từ editedItem và cập nhật state tương ứng
            const { x, y } = extractXYFromPoint(editedItem.toaDo);
            setEditedX(`${x}`); // Sử dụng template literals để chuyển đổi x thành chuỗi
            setEditedY(y.toString()); // hoặc setEditedY(`${y}`);

        }
    }, [editedData]);

    // Hàm để tách X và Y từ định dạng "POINT(X Y)"
    function extractXYFromPoint(pointString: string): { x: number; y: number } {
        // Loại bỏ "POINT(" và ")" từ đầu và cuối chuỗi
        const coordinates = pointString.replace("POINT(", "").replace(")", "");
        // Tách X và Y bằng dấu khoảng trắng
        const [x, y] = coordinates.split(" ");
        // Trả về X và Y dưới dạng số
        return { x: parseFloat(x), y: parseFloat(y) };
    }

    // Hàm cập nhật X và Y khi người dùng thay đổi
    const handleXInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newX = event.target.value;
        setEditedX(newX);
    };

    const handleYInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newY = event.target.value;
        setEditedY(newY);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            // Tạo chuỗi tọa độ mới dựa trên editedX và editedY
            const newToaDo = `POINT(${editedX} ${editedY})`;
            // Cập nhật giá trị tọa độ vào editedItem
            const editedItemWithToaDo = { ...editedItem, toaDo: newToaDo };
            // Gửi dữ liệu đã sửa đến API để cập nhật
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/administrative-unit/${editedItemId}`,
                editedItemWithToaDo,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            // Kiểm tra kết quả từ API (response) và xử lý tùy theo kết quả
            if (response.data.statusCode === 1) {
                // Dữ liệu đã được cập nhật thành công trên API
                onUpdate(editedItemWithToaDo); // Gọi hàm onUpdate để cập nhật lại dữ liệu ở component cha
                setEditedData({}); // Đặt lại editedData trong component cha
                onClose(); // Đóng modal sau khi cập nhật thành công
            } else {
                console.log("lỗi", response)
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
                        {/* <Label for="id">ID</Label>
                        <Input type="text" name="id" value={editedItem.id} disabled /> */}
                    </div>
                    <div className='input-container'>
                        <Label for="maHanhChinh">Mã hành chính</Label>
                        <Input
                            type="text"
                            name="maHanhChinh"
                            value={editedItem.maHanhChinh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="ten">Tên</Label>
                        <Input
                            type="text"
                            name="ten"
                            value={editedItem.ten}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="capHanhChinh">Cấp Hành Chính</Label>
                        <Input
                            type="text"
                            name="capHanhChinh"
                            value={editedItem.capHanhChinh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="tenVietTat" >Tên viết tắt</Label>
                        <Input
                            type="text"
                            name="tenVietTat"
                            value={editedItem.tenVietTat}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='input-container'>
                        <Label for="toaDO">Tọa độ</Label>
                        <Input
                            type="text"
                            name="toaDoX"
                            value={editedX}
                            onChange={handleXInputChange}
                        />
                        <Input
                            type="text"
                            name="toaDoY"
                            value={editedY}
                            onChange={handleYInputChange}
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
