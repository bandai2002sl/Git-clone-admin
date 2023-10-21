import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import styles from "../../pages/modal-custom.module.scss"

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
            setErrMess('Tên không được để trống');
        } else if (!newItem.diaChi) {
            setErrInput('diaChi');
            setErrMess('Địa Chỉ không được để trống');
        } else if (newItem.dungTichThietKe === 0) {
            setErrInput('dungTichThietKe');
            setErrMess('Dung Tích Thiết Kế không được để trống');
        } else if (newItem.dienTichTuoiThietKe === 0) {
            setErrInput('dienTichTuoiThietKe');
            setErrMess('Diện Tích Tưới Thiết Kế không được để trống');
        } else if (newItem.dienTichTuoiThucTe === 0) {
            setErrInput('dienTichTuoiThucTe');
            setErrMess('Diện Tích Tưới Thực Tế không được để trống');
        } else if (!newItem.loaiHo) {
            setErrInput('loaiHo');
            setErrMess('Loại Hồ không được để trống');
        } else if (newItem.administrativeUnitId === 0) {
            setErrInput('administrativeUnitId');
            setErrMess('Administrative Unit ID không được để trống');
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
                        <Label for="dungTichThietKe">Dung Tích Thiết Kế:</Label>
                        <Input
                            type="number"
                            id="dungTichThietKe"
                            placeholder="Dung Tích Thiết Kế"
                            value={newItem.dungTichThietKe || 0}
                            onChange={(e) => setNewItem({ ...newItem, dungTichThietKe: parseFloat(e.target.value) || 0 })}
                        />
                        {errInput === 'dungTichThietKe' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTuoiThietKe">Diện Tích Tưới Thiết Kế:</Label>
                        <Input
                            type="number"
                            id="dienTichTuoiThietKe"
                            placeholder="Diện Tích Tưới Thiết Kế"
                            value={newItem.dienTichTuoiThietKe || 0}
                            onChange={(e) => setNewItem({ ...newItem, dienTichTuoiThietKe: parseFloat(e.target.value) || 0 })}
                        />
                        {errInput === 'dienTichTuoiThietKe' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="dienTichTuoiThucTe">Diện Tích Tưới Thực Tế:</Label>
                        <Input
                            type="number"
                            id="dienTichTuoiThucTe"
                            placeholder="Diện Tích Tưới Thực Tế"
                            value={newItem.dienTichTuoiThucTe || 0}
                            onChange={(e) => setNewItem({ ...newItem, dienTichTuoiThucTe: parseFloat(e.target.value) || 0 })}
                        />
                        {errInput === 'dienTichTuoiThucTe' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="loaiHo">Loại Hồ:</Label>
                        <Input
                            type="text"
                            id="loaiHo"
                            placeholder="Loại Hồ"
                            value={newItem.loaiHo || ''}
                            onChange={(e) => setNewItem({ ...newItem, loaiHo: e.target.value || '' })}
                        />
                        {errInput === 'loaiHo' ? <div className="text-danger">{errMess}</div> : ''}
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
