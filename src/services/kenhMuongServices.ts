import axiosClient from ".";

const kenhMuongServices = {
    displayKenhMuong(data:
        {
            "ten": string,
            "chieuDai": number,
            "chieuDaiKienCo": number,
            "administrativeUnitId": number
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong`,
        );
    },
    getKenhMuongId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`);
    },
    createKenhMuong(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong`, newItem);
    },
    updateKenhMuong(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`, editedData);
    },

    deleteKenhMuong(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/kenh-muong/${id}`);
    },
};

export default kenhMuongServices;