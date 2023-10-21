import React, { Fragment, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Head from 'next/head';
import i18n from '~/locale/i18n';
import styles from '../../manage.module.scss';
import AddNewItemModal from '../../../components/page/thuy-san/san-xuat-thuy-san/modalAddNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ModalEdit from '../../../components/page/thuy-san/san-xuat-thuy-san/modalEdit';
import sanXuatVatNuoiSevices from '~/services/sanXuatVatNuoiSevices';

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
        const response = await sanXuatVatNuoiSevices.displaySanXuatVatNuoi(data);
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
      const response = await sanXuatVatNuoiSevices.createSanXuatVatNuoi(newItem);
      setData([...data, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        name: '',
        moTa: '',
        image: '',
        tamNgung: '',
      });
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
      const response = await sanXuatVatNuoiSevices.updateSanXuatVatNuoi(editedItem.id, editedItem);
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
      const response = await sanXuatVatNuoiSevices.deleteSanXuatVatNuoi(deleteItem.id);
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
        <title>{i18n.t('Sản xuất thuỷ sản')}</title>
      </Head>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</button>
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
      <table className={styles['customers']}>
        <thead>
          <tr>
            <th>Địa chỉ:</th>
            <th>Mô tả:</th>
            <th>Hình ảnh:</th>
            <th>Tình trạng:</th>
            <th>Hoạt động:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.diaChi}</td>
              <td>{item.moTa}</td>
              <td>{item.hinhAnh}</td>
              <td>{item.tinhTrang}</td>
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
                    <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
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
