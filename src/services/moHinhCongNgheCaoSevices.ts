import axiosClient from ".";

const moHinhCongNgheCaoSevices = {
    displayMoHinhCongNgheCao(data:
        {
            "name": string,
            "address": string,
            "moTa": string,
            "dienTich": number,
            "congNgheSuDung": string,
            "trangThai": string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/mo-hinh-cong-nghe-cao`,
        );
    },
    getMoHinhCongNgheCaoId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/mo-hinh-cong-nghe-cao/${id}`);
    },
    createMoHinhCongNgheCao(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/mo-hinh-cong-nghe-cao`, newItem);
    },
    updateMoHinhCongNgheCao(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/mo-hinh-cong-nghe-cao/${id}`, editedData);
    },

    deleteMoHinhCongNgheCao(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/mo-hinh-cong-nghe-cao/${id}`);
    },
};

export default moHinhCongNgheCaoSevices;

