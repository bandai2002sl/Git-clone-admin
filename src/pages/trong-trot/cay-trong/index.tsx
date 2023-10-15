import "bootstrap/dist/css/bootstrap.min.css";

import { Fragment, ReactElement, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import AddNewItemModal from "./modalAddNew";
import BaseLayout from "~/components/layout/BaseLayout";
import Button from "~/components/common/Button";
import Head from "next/head";
import ModalEdit from "./modalEdit";
import cayTrongSevices from "~/services/cayTrongSevices";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
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
        const response = await cayTrongSevices.displayCayTrong(data);
        const newData = response.data;
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [router]);

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };
  const handleUpdate = async (editedItem: any) => {
    try {
      const response = await cayTrongSevices.updateCayTrong(
        editedItem.id,
        editedItem
      );
      // Cập nhật lại state data
      const updatedData = data.map((item: any) =>
        item.id === editedItem.id ? editedItem : item
      );
      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData(null);
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
      const response = await cayTrongSevices.deleteCayTrong(deleteItem.id);
      // Xóa thành công, cập nhật state data
      const updatedData = data.filter(
        (dataItem: any) => dataItem.id !== deleteItem.id
      );
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
        <title>{i18n.t("Farming.crops")}</title>
      </Head>
      <div>
        <Button
          primary
          bold
          rounded_4
          maxContent
          onClick={() => setIsAddModalOpen(true)}
        >
          &#x002B; Thêm
        </Button>
        {/* Render modal nếu isModalOpen là true */}
        {isAddModalOpen && (
          <AddNewItemModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
            }}
          />
        )}
      </div>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Tên cây:</th>
            <th>Mô Tả</th>
            <th>Hình Ảnh</th>
            <th>Tam Ngừng</th>
            <th>Hoạt Động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.moTa}</td>
              <td>{item.image}</td>
              <td>{item.tamNgung}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
                {/* Render modal sửa chi tiết */}
                {isEditModalOpen && (
                  <ModalEdit
                    isOpen={isEditModalOpen}
                    onClose={() => {
                      setIsEditModalOpen(false);
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
                  <Modal isOpen={isConfirmDeleteOpen} backdrop={false}>
                    <ModalHeader>Xác nhận xóa</ModalHeader>
                    <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => handleConfirmDelete(itemToDelete)}
                      >
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
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
