import axiosClient from ".";

const vatNuoiSevices = {
    displayVatNuoi(data:
        {
            name: string,
            moTa: string,
            image: string,
            tamNgung: string,
            icon: string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/vat-nuoi`,
        );
    },
    getVatNuoiId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/vat-nuoi/${id}`);
    },
    createVatNuoi(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/vat-nuoi`, newItem);
    },
    updateVatNuoi(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/vat-nuoi/${id}`, editedData);
    },

    deleteVatNuoi(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/vat-nuoi/${id}`);
    },
};

export default vatNuoiSevices;

