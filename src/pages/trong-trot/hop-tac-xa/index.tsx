<<<<<<< HEAD
import React, { useState, useEffect } from "react";
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
=======
import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss"
import AddNewItemModal from "../hop-tac-xa/modalAddNew";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalEdit from "./modalEdit";
import hopTacXaSevices from "~/services/hopTacXaSevices";

export default function Page() {
  const [data, setData] = useState<any>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
  const [newItem, setNewItem] = useState<any>({}); // State để lưu trữ thông tin bản ghi mới

  const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await hopTacXaSevices.displayHopTacXa(data);
        const newData = response.data;
        setData(newData);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleAdd = async () => {
    try {
      const response = await hopTacXaSevices.createHopTacXa(newItem)
      setData([...data, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        name: "",
        moTa: "",
        image: "",
        tamNgung: ""
      });
    } catch (error) {
      console.error(error)
    }
  };

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };
  const handleUpdate = async (editedItem: any) => {
    try {
      const response = await hopTacXaSevices.updateHopTacXa(editedItem.id, editedItem);
      // Cập nhật lại state data
      const updatedData = data.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      );
      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData(null)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (deleteItem: any) => {
    setItemToDelete(deleteItem);
    setIsConfirmDeleteOpen(true);
  };
  const handleConfirmDelete = async (deleteItem: any) => {
    try {
      const response = await hopTacXaSevices.deleteHopTacXa(deleteItem.id);
      // Xóa thành công, cập nhật state data
      const updatedData = data.filter((dataItem: any) => dataItem.id !== deleteItem.id);
      setData(updatedData);
      setIsConfirmDeleteOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
  };
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Farming.Cooperative")}</title>
      </Head>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</button>
        {/* Render modal nếu isModalOpen là true */}
        {isAddModalOpen && (
          <AddNewItemModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
            }}
            onSubmit={handleAdd}
            newItem={newItem}
            setNewItem={setNewItem}
          />
        )}
      </div>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Tên:</th>
            <th>Sdt:</th>
            <th>Mô tả:</th>
            <th>Lĩnh vực hoạt động:</th>
            <th>Hình ảnh:</th>
            <th>Ngày thành lập:</th>
            <th>Loại hình:</th>
            <th>Số người:</th>
            <th>Trạng thái:</th>
            <th>Hoạt động:</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.sdt}</td>
              <td>{item.moTa}</td>
              <td>{item.linhVucHoatDong}</td>
              <td>{item.hinhAnh}</td>
              <td>{item.ngayThanhLap}</td>
              <td>{item.loaiHinh}</td>
              <td>{item.soNguoi}</td>
              <td>{item.trangThai}</td>


              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
                {/* Render modal sửa chi tiết */}
                {isEditModalOpen && (
                  <ModalEdit
                    isOpen={isEditModalOpen}
                    onClose={() => {
                      setIsEditModalOpen(false)
                    }}
                    onUpdate={handleUpdate}
                    editedItemId={editedData.id}
                    setEditedData={setEditedData}
                    editedData={editedData}
                  />
                )}
                <button onClick={() => handleDelete(item)}>Xóa</button>
                {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
                {isConfirmDeleteOpen && (
                  <Modal isOpen={isConfirmDeleteOpen} backdrop={false} >
                    <ModalHeader>Xác nhận xóa</ModalHeader>
                    <ModalBody>
                      Bạn có chắc chắn muốn xóa?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => handleConfirmDelete(itemToDelete)}>
                        Có
                      </Button>
                      <Button color="secondary" onClick={handleCancelDelete}>
                        Không
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
>>>>>>> 06fd7b86efd4893a6656f74dc7415445d8c48b62
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

    useEffect(() => {
        if (editedData) {
            setEditedItem({ ...editedData });
        }
    }, [editedData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedItem((prevEditedItem) => ({
            ...prevEditedItem,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_CLIENT}/ca-nhan-htx/${editedItemId}`,
                editedItem,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            if (response.data.statusCode === 1) {
                onUpdate(editedItem);
                setEditedData({});
                onClose();
            } else {
                console.log("lỗi", response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles["modal-container"]} backdrop={false} size="lg">
            <ModalHeader toggle={onClose}>SỬA THÔNG TIN</ModalHeader>
            <ModalBody>
                <div className={styles["modal-body"]}>
                    <div className="input-container">
                        <Label for="diaDiem">Địa điểm:</Label>
                        <Input
                            type="text"
                            name="diaDiem"
                            value={editedItem.diaDiem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            name="hinhAnh"
                            value={editedItem.hinhAnh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="dangKyKinhDoanh">Đăng ký kinh doanh:</Label>
                        <Input
                            type="text"
                            name="dangKyKinhDoanh"
                            value={editedItem.dangKyKinhDoanh}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="sdt">Số điện thoại:</Label>
                        <Input
                            type="text"
                            name="sdt"
                            value={editedItem.sdt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="trangThai">Trạng thái:</Label>
                        <Input
                            type="text"
                            name="trangThai"
                            value={editedItem.trangThai}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="caNhanHtxId">Ca nhân HTX ID:</Label>
                        <Input
                            type="number"
                            name="caNhanHtxId"
                            value={editedItem.caNhanHtxId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="loaiKinhDoanhId">Loại kinh doanh ID:</Label>
                        <Input
                            type="number"
                            name="loaiKinhDoanhId"
                            value={editedItem.loaiKinhDoanhId || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            name="administrativeUnitId"
                            value={editedItem.administrativeUnitId || ""}
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
