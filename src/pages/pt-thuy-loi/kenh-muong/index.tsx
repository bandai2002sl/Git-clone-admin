import React, { useState, useEffect } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import tramBomServices from "~/services/tramBomServices";
import EditItemModal from "~/components/page/thuy-loi/tram-bom/EditItemModal";
import AddItemModal from "~/components/page/thuy-loi/tram-bom/AddItemModal";

interface DataItem {
  id: number;
  ten: string;
  diaChi: string;
  congXuat: number;
  loaiHinh: string;
  administrativeUnitId: number;
}

function YourComponent() {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [newItem, setNewItem] = useState<DataItem>({
    id: 0,
    ten: "",
    diaChi: "",
    congXuat: 0,
    loaiHinh: "",
    administrativeUnitId: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await tramBomServices.display({
          ten: "",
          diaChi: "",
          congXuat: 0,
          loaiHinh: "",
          administrativeUnitId: 0,
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Hàm mở modal chỉnh sửa
  const openEditModal = (item: DataItem) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // Hàm chỉnh sửa mục
  const handleEdit = (editedItem: DataItem) => {
    // Gửi yêu cầu chỉnh sửa thông tin đến API
    tramBomServices
      .update(editedItem.id, editedItem)
      .then(() => {
        // Cập nhật danh sách dữ liệu
        const updatedData = data.map((item) =>
          item.id === editedItem.id ? editedItem : item
        );
        setData(updatedData);
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Chỉnh sửa không thành công:", error);
      });
  };

  // Hàm thêm mới mục
  const handleAdd = (newItem: DataItem) => {
    // Gửi yêu cầu thêm mới thông tin đến API
    tramBomServices
      .create(newItem)
      .then((response) => {
        const addedItem = response.data; // Lấy về mục đã được thêm mới từ API
        setData([...data, addedItem]); // Thêm mục vào danh sách
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error("Thêm mới không thành công:", error);
      });
  };

  // Hàm xóa mục
  const handleDelete = (item: DataItem) => {
    // Gửi yêu cầu xóa thông tin đến API
    tramBomServices
      .delete(item.id)
      .then(() => {
        // Xoá mục dữ liệu khỏi danh sách
        const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Xoá không thành công:", error);
      });
  };

  return (
    <BaseLayout>
      <Head>
        <title>{i18n.t("Trạm bơm")}</title>
      </Head>
      <div>
        <button onClick={() => setAddModalOpen(true)}>Thêm Mới</button>
        <table className={styles["customers"]}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Công xuất</th>
              <th>Loại hình</th>
              <th>Đơn vị hành chính Id</th>
              <th>Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: DataItem) => (
              <tr key={item.id}>
                <td>{item.ten}</td>
                <td>{item.diaChi}</td>
                <td>{item.congXuat}</td>
                <td>{item.loaiHinh}</td>
                <td>{item.administrativeUnitId}</td>
                <td>
                  <button onClick={() => openEditModal(item)}>Sửa</button>
                  <button onClick={() => handleDelete(item)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm Mới */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAdd}
        newItem={newItem}
        setNewItem={setNewItem}
      />

      {/* Modal Chỉnh Sửa */}
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={selectedItem}
        onEdit={handleEdit}
      />
    </BaseLayout>
  );
}

export default YourComponent;
