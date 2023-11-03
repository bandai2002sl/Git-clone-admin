import axiosClient from ".";

const loaiBenhSevices = {
    displayLoaiBenh(data:
        {
            tenBenh: string,
            moTa: string,
            doiTuong: string,
            hinhAnh: string,
            icon: string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/loai-benh`,
        );
    },
    getLoaiBenhId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/loai-benh/${id}`);
    },
    createLoaiBenh(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/loai-benh`, newItem);
    },
    updateLoaiBenh(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/loai-benh/${id}`, editedData);
    },

    deleteLoaiBenh(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/loai-benh/${id}`);
    },
};

export default loaiBenhSevices;

