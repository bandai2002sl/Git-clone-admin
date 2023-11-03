import { Fragment, ReactElement, useEffect, useState } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Head from "next/head";
import i18n from "~/locale/i18n";
import styles from "../../manage.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import hopTacXaSevices from "~/services/hopTacXaSevices";
import { useRouter } from "next/router";
import AddNewItemModal from "~/components/page/trong-trot/ca-nhan-Htx/modalAddNew";
import ModalEdit from "~/components/page/trong-trot/ca-nhan-Htx/modalEdit";
import Button from "~/components/common/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import { toastSuccess, toastError } from "~/common/func/toast";
import Pagination from "~/components/common/Pagination";
import CheckPermission from "~/components/common/CheckPermission";
import { PageKey, PermissionID } from "~/constants/config/enum";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State để kiểm soát hiển thị modal thêm

  const [editedData, setEditedData] = useState<any>({}); // State để lưu dữ liệu cần sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State để kiểm soát hiển thị modal sửa
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataToDisplay = data.slice(startIndex, endIndex);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await hopTacXaSevices.displayHopTacXa(data);
        const newData = response.data;
        setData(newData);
        setTotal(newData.length);
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
      const res: any = await hopTacXaSevices.deleteHopTacXa(deleteItem.id);
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
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  function formatDateTime(dateTime: any) {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Định dạng "dd/mm/yyyy --:--"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  return (
    <Fragment>
      <Head>
        <title>{i18n.t("Farming.Cooperative")}</title>
      </Head>
      <div>
        <CheckPermission
          pageKey={PageKey.Hop_tac_xa}
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
          />
        )}
      </div>
      <table className={styles["customers"]}>
        <thead>
          <tr>
            <th>ĐV Hành chính</th>
            <th>Tên</th>
            <th>Sdt</th>
            <th>Địa chỉ</th>
            <th>Mô tả</th>
            <th>Lĩnh vực HĐ</th>
            <th>Hình ảnh</th>
            <th>Ngày thành lập</th>
            <th>Loại hình</th>
            <th>Số người</th>
            <th>Trạng thái</th>
            <th>Tọa độ</th>
            <th>icon</th>
            <th>Hoạt động</th>

          </tr>
        </thead>
        <tbody>
          {dataToDisplay.map((item: any) => (
            <tr key={item.id}>
              <td>{item.administrativeUnit.ten}</td>
              <td>{item.name}</td>
              <td>{item.sdt}</td>
              <td>{item.address}</td>
              <td>{item.moTa}</td>
              <td>{item.linhVucHoatDong}</td>
              <td>{item.hinhAnh}</td>
              <td>{formatDateTime(item.ngayThanhLap)}</td>
              <td>{item.loaiHinh}</td>
              <td>{item.soNguoi}</td>
              <td>{item.trangThai}</td>
              <td>{item.toaDo}</td>
              <td>{item.icon}</td>
              <td>
                <CheckPermission
                  pageKey={PageKey.Hop_tac_xa}
                  permissionId={PermissionID.Sua}
                >
                  <button onClick={() => handleEdit(item)} style={{ border: 'none', marginRight: '10px', }}><MdEdit /></button>
                </CheckPermission>
                <CheckPermission
                  pageKey={PageKey.Hop_tac_xa}
                  permissionId={PermissionID.Xoa}
                >
                  <button onClick={() => handleDelete(item)} style={{ border: 'none' }} ><MdDelete /></button>
                </CheckPermission>
              </td>
            </tr>
          ))}
          {/* Render modal sửa chi tiết */}
          {isEditModalOpen && (
            <ModalEdit
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false)
              }}
              setEditedData={setEditedData}
              editedData={editedData}
            />
          )}
          {/* Render modal xác nhận xóa nếu isConfirmDeleteOpen là true */}
          {isConfirmDeleteOpen && (
            <Modal isOpen={isConfirmDeleteOpen}>
              <ModalHeader>Xác nhận xóa</ModalHeader>
              <ModalBody>
                Bạn có chắc chắn muốn xóa?
              </ModalBody>
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
      <Pagination
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onSetPage={handlePageChange}
      />
    </Fragment>
  );
}

Page.getLayout = function (page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
