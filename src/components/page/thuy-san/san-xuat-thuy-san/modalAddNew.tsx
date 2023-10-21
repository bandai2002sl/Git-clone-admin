import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import styles from "~/styles/modal-custom.module.scss";

interface AddNewItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newItem: any) => void;
    newItem: any;
    setNewItem: (item: any) => void;
}

export function InputValidation() {
    const [errInput, setErrInput] = useState('');
    const [errMess, setErrMess] = useState('');

    const checkValidInput = (newItem: any) => {
        setErrInput('');
        setErrMess('');
        const arrInput = ['diaChi', 'moTa', 'hinhAnh', 'tinhTrang', 'caNhanHtxId', 'vatNuoiId'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newItem[arrInput[i]]) {
                setErrInput(arrInput[i]);
                setErrMess('Bạn chưa nhập dữ liệu');
                break;
            }
        }
    }
    
    return { errInput, errMess, checkValidInput };
}

export default function AddNewItemModal({ isOpen, onClose, onSubmit, newItem, setNewItem }: AddNewItemModalProps) {
    const { errInput, errMess, checkValidInput } = InputValidation();

    const handleSave = () => {
        checkValidInput(newItem);
        onSubmit(newItem);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} toggle={onClose} className={styles['modal-container']} size="lg">
            <ModalHeader toggle={onClose}>THÊM MỚI</ModalHeader>
            <ModalBody>
                <div className={styles['modal-body']}>
                    <div className='input-container'>
                        <Label for="diaChi">Địa Chỉ:</Label>
                        <Input
                            type="text"
                            id="diaChi"
                            placeholder="Địa Chỉ"
                            value={newItem.diaChi || ''}
                            onChange={(e) => {
                                setNewItem({ ...newItem, diaChi: e.target.value || '' })
                            }}
                        />
                        {errInput === 'diaChi' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="moTa">Mô tả:</Label>
                        <Input
                            type="text"
                            id="moTa"
                            placeholder="Mô tả"
                            value={newItem.moTa || ''}
                            onChange={(e) => setNewItem({ ...newItem, moTa: e.target.value || '' })}
                        />
                        {errInput === 'moTa' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="hinhAnh">Hình ảnh:</Label>
                        <Input
                            type="text"
                            id="hinhAnh"
                            placeholder="Hình ảnh"
                            value={newItem.hinhAnh || ''}
                            onChange={(e) => setNewItem({ ...newItem, hinhAnh: e.target.value || '' })
                            }
                        />
                        {errInput === 'hinhAnh' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="tinhTrang">Tình trạng:</Label>
                        <Input
                            type="text"
                            id="tinhTrang"
                            placeholder="Tình trạng"
                            value={newItem.tinhTrang || ''}
                            onChange={(e) => setNewItem({ ...newItem, tinhTrang: e.target.value || '' })
                            }
                        />
                        {errInput === 'tinhTrang' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="caNhanHtxId">Cá nhân HTX ID:</Label>
                        <Input
                            type="number"
                            id="caNhanHtxId"
                            placeholder="Cá nhân HTX ID"
                            value={newItem.caNhanHtxId || ''}
                            onChange={(e) => setNewItem({ ...newItem, caNhanHtxId: parseInt(e.target.value) || 0 })
                            }
                        />
                        {errInput === 'caNhanHtxId' ? <div className="text-danger">{errMess}</div> : ''}
                    </div>
                    <div className='input-container'>
                        <Label for="vatNuoiId">Vật Nuôi ID:</Label>
                        <Input
                            type="number"
                            id="vatNuoiId"
                            placeholder="Vật Nuôi ID"
                            value={newItem.vatNuoiId || ''}
                            onChange={(e) => setNewItem({ ...newItem, vatNuoiId: parseInt(e.target.value) || 0 })
                            }
                        />
                        {errInput === 'vatNuoiId' ? <div className="text-danger">{errMess}</div> : ''}
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
