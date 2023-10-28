import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { PageKey, PermissionID } from "~/constants/config/enum";

import AddNewItemModal from "../../../components/page/ql-don-vi-hanh-chinh/don-vi-hanh-chinh/modalAddNew";
import BaseLayout from "~/components/layout/BaseLayout";
import CheckPermission from "~/components/common/CheckPermission";
import Head from "next/head";
import ModalEdit from "../../../components/page/ql-don-vi-hanh-chinh/don-vi-hanh-chinh/modalEdit";
import donViHanhChinhSevices from "~/services/donViHanhChinhSevices";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss";
import { useRouter } from "next/router";
import Button from "~/components/common/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { toastError, toastSuccess } from "~/common/func/toast";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>([]); // State để lưu trữ dữ liệu từ API
  const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await donViHanhChinhSevices.displayDonViHanhChinh(
          data
        );
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
  const handleDelete = (deleteItem: any) => {
    setItemToDelete(deleteItem);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async (deleteItem: any) => {
    try {
      let res: any = await donViHanhChinhSevices.deleteDonViHanhChinh(deleteItem.id);
      if (res.statusCode === 200) {
        toastSuccess({ msg: "Thành công" });
        router.replace(router.pathname);
        setIsConfirmDeleteOpen(false);
        setItemToDelete(null);
      } else {
        toastError({ msg: "Không thành công" });
        setIsConfirmDeleteOpen(false);
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
        <title>{i18n.t("administrativeUnit.cooperative")}</title>
      </Head>
      <div>
        <CheckPermission
          pageKey={PageKey.Don_vi_hanh_chinh}
          permissionId={PermissionID.Them}
        >
          <Button primary bold rounded_4 maxContent onClick={() => setIsAddModalOpen(true)}>&#x002B; Thêm</Button>
        </CheckPermission>
        {/* Render modal nếu isModalOpen là true */}
        {isAddModalOpen && (
          <AddNewItemModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
            }}
            data={data}
          />
        )}
      </div>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>Mã hành chính</th>
            <th>Tên</th>
            <th>Cấp Hành Chính</th>
            <th>Tên viết tắt</th>
            <th>Tọa độ</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.maHanhChinh}</td>
              <td>{item.ten}</td>
              <td>{item.capHanhChinh}</td>
              <td>{item.tenVietTat}</td>
              <td>{item.toaDo}</td>
              <td>
                <button onClick={() => handleEdit(item)} style={{ border: 'none', marginRight: '10px', }}><MdEdit /></button>
                <button onClick={() => handleDelete(item)} style={{ border: 'none' }} ><MdDelete /></button>
              </td>
            </tr>
          ))}
          {/* Render modal sửa chi tiết */}
          {isEditModalOpen && (
            <ModalEdit
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
              }}
              setEditedData={setEditedData}
              editedData={editedData}
            />
          )}
          {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
          {isConfirmDeleteOpen && (
            <Modal isOpen={isConfirmDeleteOpen}>
              <ModalHeader>Xác nhận xóa</ModalHeader>
              <ModalBody>Bạn có chắc chắn muốn xóa?</ModalBody>
              <ModalFooter>
                <Button
                  danger bold rounded_4 maxContent
                  onClick={() => handleConfirmDelete(itemToDelete)}
                >
                  Có
                </Button>
                <Button secondary bold rounded_4 maxContent onClick={handleCancelDelete}>
                  Không
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </tbody>
      </table>
    </Fragment>
  );
}
Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
