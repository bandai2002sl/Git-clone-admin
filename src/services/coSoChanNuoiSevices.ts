import axiosClient from ".";

const coSoChanNuoiSevices = {
    displayCoSoChanNuoi(data:
        {
            "tinhTrang": string,
            "caNhanHtxId": number,
            "vatNuoiIds": [
                number
            ],
            "hinhThucChanNuoiId": number
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/co-so-chan-nuoi`,
        );
    },
    getCoSoChanNuoiId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-chan-nuoi/${id}`);
    },
    createCoSoChanNuoi(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-chan-nuoi`, newItem);
    },
    updateCoSoChanNuoi(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-chan-nuoi/${id}`, editedData);
    },

    deleteCoSoChanNuoi(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/co-so-chan-nuoi/${id}`);
    },
};

export default coSoChanNuoiSevices;

