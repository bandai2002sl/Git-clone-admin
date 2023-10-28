import axiosClient from ".";

const duongDonViHanhChinhSevices = {
    displayDuongDonViHanhChinh(data:
        {
            "administrativeUnitId": number,
            "duong": string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/duong-don-vi-hanh-chinh`,
        );
    },
    getDuongDonViHanhChinhById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/duong-don-vi-hanh-chinh/${id}`);
    },
    createDuongDonViHanhChinh(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/duong-don-vi-hanh-chinh`, newItem);
    },
    updateDuongDonViHanhChinh(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/duong-don-vi-hanh-chinh/${id}`, editedData);
    },

    deleteDuongDonViHanhChinh(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/duong-don-vi-hanh-chinh/${id}`);
    },
};

export default duongDonViHanhChinhSevices;

