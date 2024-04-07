import { call } from "./api";

// 이미지 업로드
export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await call("/v3/boards/image", "POST", formData);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}