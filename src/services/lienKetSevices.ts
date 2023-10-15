import axiosClient from ".";

const lienKetSevices = {
    displayLienKet(data:
        {
            hinhThucLienKet: string,
            ngayLienKet: string,
            trangThai: string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/lien-ket`,
        );
    },
    getLienKetId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/lien-ket/${id}`);
    },
    createLienKet(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/lien-ket`, newItem);
    },
    updateLienKet(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/lien-ket/${id}`, editedData);
    },

    deleteLienKet(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/lien-ket/${id}`);
    },
};

export default lienKetSevices;

