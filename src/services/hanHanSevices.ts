import axiosClient from ".";

const hanHanSevices = {
    displayHanHan(data:
        {
            diaChi: string,
            dienTich: number,
            ngayGhiNhan: string,
            toaDo: number,
            icon: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/han-han`,
        );
    },
    getHanHanId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/han-han/${id}`);
    },
    createHanHan(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/han-han`, newItem);
    },
    updateHanHan(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/han-han/${id}`, editedData);
    },

    deleteHanHan(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/han-han/${id}`);
    },
};

export default hanHanSevices;

