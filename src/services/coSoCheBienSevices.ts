import axiosClient from ".";

const coSoCheBienSevices = {
    displayCoSoCheBien(data:
        {
            diaChi: string,
            loaiCheBien: string,
            moTa: string,
            hinhAnh: string,
            trangThai: string,
            coDangKy: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/co-so-che-bien`,
        );
    },
    getCoSoCheBienId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-che-bien/${id}`);
    },
    createCoSoCheBien(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-che-bien`, newItem);
    },
    updateCoSoCheBien(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-che-bien/${id}`, editedData);
    },

    deleteCoSoCheBien(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-che-bien/${id}`);
    },
};

export default coSoCheBienSevices;

