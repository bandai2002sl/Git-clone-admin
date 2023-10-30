import React, { Fragment, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Head from 'next/head';
import i18n from '~/locale/i18n';
import styles from '../../manage.module.scss';
import AddNewItemModal from '~/components/page/thuy-loi/tram-bom/modalAddNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ModalEdit from '~/components/page/thuy-loi/kenh-muong/modalEdit';
import kenhMuongServices from "~/services/kenhMuongServices";

export default function Page() {
    const [data, setData] = useState<any>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<any>({});
    const [editedData, setEditedData] = useState<any>({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await kenhMuongServices.display(data);
        const newData = response.data;
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await kenhMuongServices.create(newItem);
      setData([...data, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        ten: 'string',
        chieuDai: 0,
        chieuDaiKienCo: 0,
        administrativeUnitId: 0,
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await kenhMuongServices.update(editedData.id, editedData);
      const updatedData = data.map((item: any) =>
        item.id === editedData.id ? response.data : item
      );
      setData(updatedData);
      setIsEditModalOpen(false);
      setEditedData({
        ten: 'string',
        chieuDai: 0,
        chieuDaiKienCo: 0,
        administrativeUnitId: 0,
      });
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
      const response = await kenhMuongServices.delete(deleteItem.id);
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
        <title>{i18n.t("Farming.plantDisease")}</title>
      </Head>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</button>
        {isAddModalOpen && (
          <AddNewItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAdd}
            newItem={newItem}
            setNewItem={setNewItem} data={[]}          />
        )}
      </div>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Chiều dài</th>
            <th>Chiều dài kiên cố</th>
            <th>Hoạt Động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.ten}</td>
              <td>{item.chieuDai}</td>
              <td>{item.chieuDaiKienCo}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Sửa</button>
                {isEditModalOpen && (
                  <ModalEdit
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
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
                    <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => handleConfirmDelete(item)}>
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
