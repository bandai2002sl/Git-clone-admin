import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import styles from "../../modal-custom.module.scss"

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
    data: any[]
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
    const [errInput, setErrInput] = useState('');
    const [errMess, setErrMess] = useState('');

    const checkValidInput = () => {
        setErrInput('');
        setErrMess('');
        if (!newItem.ten) {
            setErrInput('ten');
            setErrMess('Bạn chưa nhập dữ liệu tên');
        } else if (!newItem.diaChi) {
            setErrInput('diaChi');
            setErrMess('Bạn chưa nhập dữ liệu địa chỉ');
        } else if (!newItem.kichCo) {
            setErrInput('kichCo');
            setErrMess('Bạn chưa nhập dữ liệu kích cỡ');
        } else if (!newItem.loaiKichThuoc) {
            setErrInput('loaiKichThuoc');
            setErrMess('Bạn chưa nhập dữ liệu loại kích thước');
        } else if (!newItem.loaiHinh) {
            setErrInput('loaiHinh');
            setErrMess('Bạn chưa nhập dữ liệu loại hình');
        } else if (newItem.administrativeUnitId === 0) {
            setErrInput('administrativeUnitId');
            setErrMess('Bạn chưa nhập dữ liệu administrativeUnitId');
        }
    }

    const handleSave = () => {
        checkValidInput();
        onSubmit(newItem);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles['modal-container']} size="lg">
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody>
                <div className={styles['modal-body']}>
                    <div className='input-container'>
                        <Label for="ten">Tên:</Label>
                        <Input
                            type="text"
                            id="ten"
                            placeholder="Tên"
                            value={newItem.ten || ''}
                            onChange={(e) => setNewItem({ ...newItem, ten: e.target.value || '' })}
                        />
                        {errInput === 'ten' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="diaChi">Địa Chỉ:</Label>
                        <Input
                            type="text"
                            id="diaChi"
                            placeholder="Địa Chỉ"
                            value={newItem.diaChi || ''}
                            onChange={(e) => setNewItem({ ...newItem, diaChi: e.target.value || '' })}
                        />
                        {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="kichCo">Kích Cỡ:</Label>
                        <Input
                            type="text"
                            id="kichCo"
                            placeholder="Kích Cỡ"
                            value={newItem.kichCo || ''}
                            onChange={(e) => setNewItem({ ...newItem, kichCo: e.target.value || '' })}
                        />
                        {errInput === 'kichCo' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="loaiKichThuoc">Loại Kích Thước:</Label>
                        <Input
                            type="text"
                            id="loaiKichThuoc"
                            placeholder="Loại Kích Thước"
                            value={newItem.loaiKichThuoc || ''}
                            onChange={(e) => setNewItem({ ...newItem, loaiKichThuoc: e.target.value || '' })}
                        />
                        {errInput === 'loaiKichThuoc' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="loaiHinh">Loại Hình:</Label>
                        <Input
                            type="text"
                            id="loaiHinh"
                            placeholder="Loại Hình"
                            value={newItem.loaiHinh || ''}
                            onChange={(e) => setNewItem({ ...newItem, loaiHinh: e.target.value || '' })}
                        />
                        {errInput === 'loaiHinh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="administrativeUnitId">Administrative Unit ID:</Label>
                        <Input
                            type="number"
                            id="administrativeUnitId"
                            placeholder="Administrative Unit ID"
                            value={newItem.administrativeUnitId || 0}
                            onChange={(e) => setNewItem({ ...newItem, administrativeUnitId: parseInt(e.target.value) || 0 })
                            }
                        />
                        {errInput === 'administrativeUnitId' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                </div>
            </ModalBody>
            <div className={styles['modal-footer']}>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
}
