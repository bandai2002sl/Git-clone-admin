import axiosClient from ".";

const vungDonViHanhChinhSevices = {
    displayVungDonViHanhChinh(data:
        {
            "administrativeUnitId": number,
            "moTa": string,
            "vung": string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/vung-don-vi-hanh-chinh`,
        );
    },
    getVungDonViHanhChinhById(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/vung-don-vi-hanh-chinh/${id}`);
    },
    createVungDonViHanhChinh(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/vung-don-vi-hanh-chinh`, newItem);
    },
    updateVungDonViHanhChinh(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/vung-don-vi-hanh-chinh/${id}`, editedData);
    },

    deleteVungDonViHanhChinh(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/vung-don-vi-hanh-chinh/${id}`);
    },
};

export default vungDonViHanhChinhSevices;

