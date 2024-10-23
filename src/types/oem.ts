export type CreateOEMType = {
    oem_name: string;
    model_data: {
        model: string;
        year: string;
    }
}

export type UpdateOEMType = {
    oem_id: string;
    oem_name: string;
}

export type DeleteOEMType = {
    model_id?: string;
    oem_id: string
}

export type UploadEOMPictureType = {
    oem_id: string;
    model_id: string;
    file: FormData;
}

export interface CreateOEMResponseType {
    model: string;
    year: string;
    oem_id: string;
    model_id: string
}

export interface FetchedOEMType {
    oem_name: string;
    model_data: {
        model: string;
        year: string;
        avatar: string;
        _id: string;
    }[]
    data_mode: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    oem_id: string;
}