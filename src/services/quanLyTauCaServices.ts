import axiosClient from ".";

const tauCaServices = {
    displayTauCa(data:
        {
            "soDangKy": number,
            "diaChi": string,
            "tinhTrang": string,
            "moTa": string,
            "ngayDangKy": string,
            "administrativeUnitId": number,
            "caNhanHTXId": number
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/tau-ca`,
        );
    },
    getTauCaById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/tau-ca/${id}`);
    },
    createTauCa(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/tau-ca`, newItem);
    },
    updateTauCa(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/tau-ca/${id}`, editedData);
    },

    deleteTauCa(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/tau-ca/${id}`);
    },
};

export default tauCaServices;