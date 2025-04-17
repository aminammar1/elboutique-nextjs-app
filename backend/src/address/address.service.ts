    import {
    Injectable,
    NotFoundException,
    } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { Address } from './schemas/address.schema';
    import { CreateAddressDto } from './dto/address.dto';

    @Injectable()
    export class AddressService {
    constructor(
        @InjectModel(Address.name)
        private readonly addressModel: Model<Address>,
    ) {}

    async createAddress(userId: string, dto: CreateAddressDto) {
        const address = new this.addressModel({ ...dto, userId });
        return address.save();
    }

    async getAllAddresses(userId: string) {
        return this.addressModel.find({ userId });
    }

    async getAddressById(userId: string, id: string) {
        const address = await this.addressModel.findOne({ _id: id, userId });
        if (!address) throw new NotFoundException('Address not found');
        return address;
    }

    async updateAddress(
        userId: string,
        id: string,
        dto: Partial<CreateAddressDto>,
    ) {
        const address = await this.addressModel.findOneAndUpdate(
        { _id: id, userId },
        dto,
        { new: true },
        );
        if (!address) throw new NotFoundException('Address not found');
        return address;
    }

    async deleteAddress(userId: string, id: string) {
        const address = await this.addressModel.findOneAndDelete({
        _id: id,
        userId,
        });
        if (!address) throw new NotFoundException('Address not found');
        return { message: 'Address deleted successfully' };
    }
    }
