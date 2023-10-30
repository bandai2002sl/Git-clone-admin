import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import styles from "~/styles/modal-custom.module.scss";

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
        if (newItem.dienTich === 0) {
            setErrInput('dienTich');
            setErrMess('Dien Tich cannot be 0');
        } else if (!newItem.ngayThongKe) {
            setErrInput('ngayThongKe');
            setErrMess('Bạn chưa nhập ngay Thong Ke');
        } else if (!newItem.hinhThuc) {
            setErrInput('hinhThuc');
            setErrMess('Bạn chưa nhập hinh Thuc');
        } else if (newItem.administrativeUnitId === 0) {
            setErrInput('administrativeUnitId');
            setErrMess('Administrative Unit ID cannot be 0');
        } else if (newItem.cropTypeId === 0) {
            setErrInput('cropTypeId');
            setErrMess('Crop Type ID cannot be 0');
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
                        <Label for="dienTich">Diện Tích:</Label>
                        <Input
                            type="number"
                            id="dienTich"
                            placeholder="Diện Tích"
                            value={newItem.dienTich || 0}
                            onChange={(e) => setNewItem({ ...newItem, dienTich: parseFloat(e.target.value) || 0 })}
                        />
                        {errInput === 'dienTich' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="ngayThongKe">Ngày Thống Kê:</Label>
                        <Input
                            type="text"
                            id="ngayThongKe"
                            placeholder="Ngày Thống Kê"
                            value={newItem.ngayThongKe || ''}
                            onChange={(e) => setNewItem({ ...newItem, ngayThongKe: e.target.value || '' })}
                        />
                        {errInput === 'ngayThongKe' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="hinhThuc">Hình Thức:</Label>
                        <Input
                            type="text"
                            id="hinhThuc"
                            placeholder="Hình Thức"
                            value={newItem.hinhThuc || ''}
                            onChange={(e) => setNewItem({ ...newItem, hinhThuc: e.target.value || '' })}
                        />
                        {errInput === 'hinhThuc' ? <div className="text-danger">{errMess}</div> : ''}
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
                    <div className='input-container'>
                        <Label for="cropTypeId">Crop Type ID:</Label>
                        <Input
                            type="number"
                            id="cropTypeId"
                            placeholder="Crop Type ID"
                            value={newItem.cropTypeId || 0}
                            onChange={(e) => setNewItem({ ...newItem, cropTypeId: parseInt(e.target.value) || 0 })
                            }
                        />
                        {errInput === 'cropTypeId' ? <div className="text-danger">{errMess}</div> : ''}
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
