import { SistemasEntity } from '../model/entity/sistema.entity';
import { SistemasURL } from './url/sistemas.url';
import { BaseService } from '../../../service/BaseService';
import { Axios } from "@config/api/axios.config";
import { PrivateDataRequest } from '../model/dtos/sistemas.dto';

export class SistemasService extends BaseService<SistemasEntity> {
    constructor() {
        super(SistemasURL);
    }

    async getPrivateData(data: PrivateDataRequest) {
        const response = await Axios.post(SistemasURL.getPrivateData, data);
        return response.data;
    }
}

export const SistemasApi = new SistemasService();

