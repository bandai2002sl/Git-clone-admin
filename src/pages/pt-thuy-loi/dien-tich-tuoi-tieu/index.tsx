import React, { Fragment, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Head from 'next/head';
import i18n from '~/locale/i18n';
import styles from '../../manage.module.scss';
import AddNewItemModal from '../../../components/page/thuy-san/quan-ly-tau-ca/modalAddNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ModalEdit from '../../../components/page/thuy-san/quan-ly-tau-ca/modalEdit';
import dienTichTuoiTieuServices from "~/services/dienTichTuoiTieuServices"; // Import dienTichTuoiTieuServices
import Button from "~/components/common/Button";

export default function Page() {
  const [data, setData] = useState<any>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    dienTich: 0,
    ngayThongKe: 'string',
    hinhThuc: 'string',
    administrativeUnitId: 0,
    cropTypeId: 0,
  });
  const [editedData, setEditedData] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dienTichTuoiTieuServices.display(data); // Use dienTichTuoiTieuServices to fetch data
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
      const response = await dienTichTuoiTieuServices.create(newItem); // Use dienTichTuoiTieuServices to create a new item
      setData([...data, response.data]);
      setIsAddModalOpen(false);
      setNewItem({
        dienTich: 0,
        ngayThongKe: 'string',
        hinhThuc: 'string',
        administrativeUnitId: 0,
        cropTypeId: 0,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (item: any) => {
    setEditedData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (editedItem: any) => {
    try {
      const response = await dienTichTuoiTieuServices.update(editedItem.id, editedItem); // Use dienTichTuoiTieuServices to update an item
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
      const response = await dienTichTuoiTieuServices.delete(deleteItem.id); // Use dienTichTuoiTieuServices to delete an item
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
          <title>{i18n.t('Quản lý diện tích tuối tiêu')}</title>
        </Head>
        <div>
          <Button primary bold rounded_4 maxContent onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm </Button>

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
            <th>Diện tích</th>
            <th>Ngày thống kê</th>
            <th>Hình thức</th>
            <th>Hoạt động</th>
          </tr>
          </thead>
          <tbody>
          {data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.dienTich}</td>
                <td>{item.ngayThongKe}</td>
                <td>{item.hinhThuc}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button primary bold rounded_4 maxContent onClick={() => handleEdit(item)}>&#9998; Sửa</Button>
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
                    <div style={{ marginLeft: '10px' }}>
                      <Button primary bold rounded_4 maxContent onClick={() => handleDelete(item)}>&#10060; </Button>
                    </div>
                  </div>
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
