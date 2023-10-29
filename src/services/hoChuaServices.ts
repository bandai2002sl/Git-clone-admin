import axiosClient from ".";

const hoChuaServices = {
    displayHoChua(data:
        {
            "ten":string,
            "diaChi": string,
            "dungTichThietKe": number,
            "dienTichTuoiThietKe": number,
            "dienTichTuoiThucTe": number,
            "loaiHo": string,
            "administrativeUnitId": number
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/ho-chua`,
        );
    },
    getHoChuaId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`);
    },
    createHoChua(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua`, newItem);
    },
    updateHoChua(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`, editedData);
    },

    deleteHoChua(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/ho-chua/${id}`);
    },
};

export default hoChuaServices;