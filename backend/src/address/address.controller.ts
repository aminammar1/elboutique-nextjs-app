    import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    UseFilters,
    } from '@nestjs/common';
    import { AddressService } from './address.service';
    import { CreateAddressDto } from './dto/address.dto';
    import { AuthGuard } from '../guards/auth.guards';
    import { HttpExceptionFilter } from '../exception.filter';

    @Controller('address')
    @UseGuards(AuthGuard)
    @UseFilters(HttpExceptionFilter)
    export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('createAddress')
    async create(@Req() req, @Body() dto: CreateAddressDto) {
        return this.addressService.createAddress(req.userId, dto);
    }

    @Get('allAddresses')
    async findAll(@Req() req) {
        return this.addressService.getAllAddresses(req.userId);
    }

    @Get('allAdresses/:id')
    async findOne(@Req() req, @Param('id') id: string) {
        return this.addressService.getAddressById(req.userId, id);
    }

    @Put('updateAddress/:id')
    async update(
        @Req() req,
        @Param('id') id: string,
        @Body() dto: Partial<CreateAddressDto>,
    ) {
        return this.addressService.updateAddress(req.userId, id, dto);
    }

    @Delete('deleteAddress/:id')
    async remove(@Req() req, @Param('id') id: string) {
        return this.addressService.deleteAddress(req.userId, id);
    }
    }
