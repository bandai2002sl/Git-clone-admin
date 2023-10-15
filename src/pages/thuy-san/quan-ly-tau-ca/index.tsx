import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import axios from "axios";
import styles from "../../manage.module.scss";
import AddNewItemModal from "./addNewModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ModalEdit from "./EditModal";

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  const authToken = localStorage.getItem('authToken');

  const [errCode, setErrCode] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<any>({
    soDangKy: 0,
    diaChi: "",
    tinhTrang: "",
    moTa: "",
    ngayDangKy: "2023-10-14T18:33:31.613Z",
    administrativeUnitId: 0,
    caNhanHTXId: 0
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const [editedData, setEditedData] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_CLIENT}/quan-ly-tau-ca`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const newData = response.data.data;
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [authToken]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_CLIENT}/quan-ly-tau-ca`, newItem, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setErrCode(response.data.statusCode);
      if (response.data.statusCode === 1) {
        setData([...data, response.data.data]);
        setIsAddModalOpen(false);
        setNewItem({
          soDangKy: 0,
          diaChi: "",
          tinhTrang: "",
          moTa: "",
          ngayDangKy: "2023-10-14T18:33:31.613Z",
          administrativeUnitId: 0,
          caNhanHTXId: 0
        });
        setApiMessage(response.data.message);
        setInputError(null);
      } else if (response.data.statusCode === 0) {
        setInputError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (editedItem: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_CLIENT}/quan-ly-tau-ca/${editedItem.id}`,
        editedItem,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.statusCode === 1) {
        const updatedData = data.map((item: any) =>
          item.id === editedItem.id ? editedItem : item
        );
        setData(updatedData);
        setIsEditModalOpen(false);
        setEditedData({});
      } else if (response.data.statusCode === 0) {
        setInputError(response.data.message);
      }
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
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_CLIENT}/quan-ly-tau-ca/${deleteItem.id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.statusCode === 1) {
        const updatedData = data.filter((dataItem: any) => dataItem.id !== deleteItem.id);
        setData(updatedData);
        setIsConfirmDeleteOpen(false);
        setItemToDelete(null);
      } else if (response.data.statusCode === 0) {
        setInputError(response.data.message);
      }
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
        <title>{i18n.t("Farming.diseasetype")}</title>
      </Head>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</button>
        {apiMessage && <div className="success-message">{apiMessage}</div>}
        {inputError && <div className="error-message">{inputError}</div>}
        {isAddModalOpen && (
          <AddNewItemModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setInputError(null);
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
            <th>Địa Chỉ:</th>
            <th>Mô Tả</th>
            <th>Tình Trạng</th>
            <th>Số Đăng Ký</th>
            <th>Ngày Đăng Ký</th>
            <th>ID Ca Nhân HTX</th>
            <th>ID Đơn Vị Hành Chính</th>
            <th>Hoạt Động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.diaChi}</td>
              <td>{item.moTa}</td>
              <td>{item.tinhTrang}</td>
              <td>{item.soDangKy}</td>
              <td>{item.ngayDangKy}</td>
              <td>{item.caNhanHTXId}</td>
              <td>{item.administrativeUnitId}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
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
                {isConfirmDeleteOpen && (
                  <Modal isOpen={isConfirmDeleteOpen} backdrop={false}>
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
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
