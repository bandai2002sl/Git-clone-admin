import axiosClient from ".";

const sanXuatVatNuoiSevices = {
    displaySanXuatVatNuoi(data:
        {
            diaChi: string,
            moTa: string,
            hinhAnh: string,
            tinhTrang: string,
            toaDo: string,
            icon: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-vat-nuoi`,
        );
    },
    getSanXuatVatNuoiId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-vat-nuoi/${id}`);
    },
    createSanXuatVatNuoi(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-vat-nuoi`, newItem);
    },
    updateSanXuatVatNuoi(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-vat-nuoi/${id}`, editedData);
    },

    deleteSanXuatVatNuoi(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-vat-nuoi/${id}`);
    },
};

export default sanXuatVatNuoiSevices;

