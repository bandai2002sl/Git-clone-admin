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
        if (!newItem.ten) {
            setErrInput('ten');
            setErrMess('Tên không được để trống');
        } else if (newItem.chieuDai === 0) {
            setErrInput('chieuDai');
            setErrMess('Chiều dài không được để trống');
        } else if (newItem.chieuDaiKienCo === 0) {
            setErrInput('chieuDaiKienCo');
            setErrMess('Chiều dài kiến có không được để trống');
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
                        <Label for="chieuDai">Chiều Dài:</Label>
                        <Input
                            type="number"
                            id="chieuDai"
                            placeholder="Chiều Dài"
                            value={newItem.chieuDai || 0}
                            onChange={(e) => setNewItem({ ...newItem, chieuDai: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'chieuDai' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="chieuDaiKienCo">Chiều Dài Kiến Có:</Label>
                        <Input
                            type="number"
                            id="chieuDaiKienCo"
                            placeholder="Chiều Dài Kiến Có"
                            value={newItem.chieuDaiKienCo || 0}
                            onChange={(e) => setNewItem({ ...newItem, chieuDaiKienCo: parseInt(e.target.value) || 0 })}
                        />
                        {errInput === 'chieuDaiKienCo' ? <div className="text-danger">{errMess}</div> : ''}
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
