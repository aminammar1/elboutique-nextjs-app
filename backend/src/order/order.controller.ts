    import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    Headers,
    RawBodyRequest,
    UseGuards,
    } from '@nestjs/common';
    import { OrderService } from './order.service';
    import { CreateOrderDto } from './dto/create-order.dto';
    import { UpdateOrderDto } from './dto/update-order.dto';
    import { Order } from './schemas/order.schema';
    import { AuthGuard } from '../guards/auth.guards';
    import { Request } from 'express';

    @Controller('order')
    export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: Request,
    ): Promise<{ order: Order; checkoutUrl?: string }> {
        const orderData = {
        ...createOrderDto,
        user: req.userId,
        };
        return this.orderService.createOrder(orderData);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrderById(@Param('id') id: string): Promise<Order> {
        return this.orderService.getOrderById(id);
    }

    @Get('user/orders')
    @UseGuards(AuthGuard)
    async getUserOrders(@Req() req: Request): Promise<Order[]> {
        return this.orderService.getUserOrders(req.userId);
    }

    @Put('status')
    @UseGuards(AuthGuard)
    async updateOrderStatus(
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        return this.orderService.updateOrderStatus(updateOrderDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllOrders(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }

    @Post('webhook')
    async handleStripeWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: RawBodyRequest<Request>,
    ): Promise<{ received: boolean }> {
        return this.orderService.handleStripeWebhook(signature, req.rawBody);
    }
    }
