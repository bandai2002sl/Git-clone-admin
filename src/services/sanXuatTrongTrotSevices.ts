import axiosClient from ".";

const sanXuatTrongTrotSevices = {
    displaySanXuatTrongTrot(data:
        {
            "dienTichTrong": number,
            "dienTichTrongMoi": number,
            "dienTichChoSanPham": number,
            "nangSuat": number,
            "sanLuong": number,
            "thoiDiemBaoCao": string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-trong-trot`,
        );
    },
    getSanXuatTrongTrotId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-trong-trot/${id}`);
    },
    createSanXuatTrongTrot(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-trong-trot`, newItem);
    },
    updateSanXuatTrongTrot(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-trong-trot/${id}`, editedData);
    },

    deleteSanXuatTrongTrot(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/san-xuat-trong-trot/${id}`);
    },
};

export default sanXuatTrongTrotSevices;

