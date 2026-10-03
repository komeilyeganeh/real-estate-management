import { Injectable } from '@nestjs/common';
import { CreateLeaseDto } from './dto/create-lease.dto';

@Injectable()
export class LeasesService {
    create(dto: CreateLeaseDto) {
        return "created";
    }
}
