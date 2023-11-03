import axiosClient from ".";

const vungChanNuoiAnToanSevices = {
    displayVungChanNuoiAnToan(data:
        {
            name: string,
            diaChi: string,
            quyMo: string,
            moTa: string,
            ngayChungNhan: string,
            toaDo: string,
            icon: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/vung-chan-nuoi-an-toan`,
        );
    },
    getVungChanNuoiAnToanId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/vung-chan-nuoi-an-toan/${id}`);
    },
    createVungChanNuoiAnToan(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/vung-chan-nuoi-an-toan`, newItem);
    },
    updateVungChanNuoiAnToan(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/vung-chan-nuoi-an-toan/${id}`, editedData);
    },

    deleteVungChanNuoiAnToan(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/vung-chan-nuoi-an-toan/${id}`);
    },
};

export default vungChanNuoiAnToanSevices;

