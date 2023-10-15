import axiosClient from ".";

const benhVatNuoiSevices = {
    displayBenhVatNuoi(data:
        {
            "diaChi": string,
            "nguyenNhan": string,
            "dienTich": number,
            "ngayGhiNhan": string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/benh-vat-nuoi`,
        );
    },
    getBenhVatNuoiId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/benh-vat-nuoi/${id}`);
    },
    createBenhVatNuoi(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/benh-vat-nuoi`, newItem);
    },
    updateBenhVatNuoi(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/benh-vat-nuoi/${id}`, editedData);
    },

    deleteBenhVatNuoi(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/benh-vat-nuoi/${id}`);
    },
};

export default benhVatNuoiSevices;

