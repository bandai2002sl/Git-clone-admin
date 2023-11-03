import axiosClient from ".";

const coSoKinhDoanhSevices = {
    displayCoSoKinhDoanh(data:
        {
            diaDiem: string,
            hinhAnh: string,
            dangKyKinhDoanh: string,
            sdt: string,
            trangThai: string,
            toaDo: string,
            icon: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/co-so-kinh-doanh`,
        );
    },
    getCoSoKinhDoanhId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-kinh-doanh/${id}`);
    },
    createCoSoKinhDoanh(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-kinh-doanh`, newItem);
    },
    updateCoSoKinhDoanh(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-kinh-doanh/${id}`, editedData);
    },

    deleteCoSoKinhDoanh(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-kinh-doanh/${id}`);
    },
};

export default coSoKinhDoanhSevices;

