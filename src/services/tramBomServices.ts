import axiosClient from ".";

const tramBomServices = {
    displayTramBom(data:
        {
            "ten": string,
            "diaChi": string,
            "congXuat": number,
            "loaiHinh": string,
            "administrativeUnitId": number
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/tram-bom`,
        );
    },
    getTramBomId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom/${id}`);
    },
    createTramBom(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom`, newItem);
    },
    updateTramBom(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom${id}`, editedData);
    },

    deleteTramBom(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/tram-bom/${id}`);
    },
};

export default tramBomServices;