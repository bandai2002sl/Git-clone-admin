import axiosClient from ".";

const hinhThucChanNuoiSevices = {
    displayHinhThucChanNuoi(data:
        {
            tenHinhThuc: string,
            tamNgung: string
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chan-nuoi`,
        );
    },
    getHinhThucChanNuoiId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chan-nuoi/${id}`);
    },
    createHinhThucChanNuoi(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chan-nuoi`, newItem);
    },
    updateHinhThucChanNuoi(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chan-nuoi/${id}`, editedData);
    },

    deleteHinhThucChanNuoi(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chan-nuoi/${id}`);
    },
};

export default hinhThucChanNuoiSevices;

