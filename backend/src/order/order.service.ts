    import {
    Injectable,
    BadRequestException,
    NotFoundException,
    } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { Order } from './schemas/order.schema';
    import { CreateOrderDto } from './dto/create-order.dto';
    import { UpdateOrderDto } from './dto/update-order.dto';
    import Stripe from 'stripe';
    import { ConfigService } from '@nestjs/config';

    @Injectable()
    export class OrderService {
    private stripe: Stripe;

    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
        private configService: ConfigService,
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {});
    }

    async createOrder(
        createOrderDto: CreateOrderDto,
    ): Promise<{ order: Order; checkoutUrl?: string }> {
        try {
        // Create the order first
        const newOrder = new this.orderModel(createOrderDto);
        const savedOrder = await newOrder.save();

        // If payment method is credit_card, create a Stripe checkout session
        if (createOrderDto.paymentMethod === 'credit_card') {
            // Map the order items to Stripe line items
            const lineItems = createOrderDto.products.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                name: item.name,
                images: item.images ? [item.images] : [],
                },
                unit_amount: Math.round(item.price * 100), // Stripe requires amount in cents
            },
            quantity: item.qty,
            }));

            if (createOrderDto.shippingPrice > 0) {
            lineItems.push({
                price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Shipping',
                    images: [],
                },
                unit_amount: Math.round(createOrderDto.shippingPrice * 100),
                },
                quantity: 1,
            });
            }

            // Create Stripe checkout session
            const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${this.configService.get('FRONTEND_URL')}/order/${savedOrder._id}?success=true`,
            cancel_url: `${this.configService.get('FRONTEND_URL')}/cart?canceled=true`,
            metadata: {
                orderId: savedOrder._id.toString(),
            },
            });

            // Update the order with the session ID
            savedOrder.stripeSessionId = session.id;
            await savedOrder.save();

            return {
            order: savedOrder,
            checkoutUrl: session.url,
            };
        }

        return { order: savedOrder };
        } catch (error) {
        throw new BadRequestException(`Failed to create order: ${error.message}`);
        }
    }

    async getOrderById(id: string): Promise<Order> {
        try {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException(`Failed to get order: ${error.message}`);
        }
    }

    async getUserOrders(userId: string): Promise<Order[]> {
        try {
        return await this.orderModel
            .find({ user: userId })
            .sort({ createdAt: -1 });
        } catch (error) {
        throw new BadRequestException(
            `Failed to get user orders: ${error.message}`,
        );
        }
    }

    async updateOrderStatus(updateOrderDto: UpdateOrderDto): Promise<Order> {
        try {
        const { id, ...updateData } = updateOrderDto;
        const order = await this.orderModel.findById(id);

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        // If updating to paid status
        if (updateData.isPaid) {
            updateData['paidAt'] = new Date();
        }

        const updatedOrder = await this.orderModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true },
        );

        return updatedOrder;
        } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        throw new BadRequestException(`Failed to update order: ${error.message}`);
        }
    }

    async getAllOrders(): Promise<Order[]> {
        try {
        return await this.orderModel.find().sort({ createdAt: -1 });
        } catch (error) {
        throw new BadRequestException(
            `Failed to get all orders: ${error.message}`,
        );
        }
    }

    async handleStripeWebhook(
        signature: string,
        payload: Buffer,
    ): Promise<{ received: boolean }> {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

        try {
        const event = this.stripe.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret,
        );

        // Handle checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const orderId = session.metadata.orderId;

            // Update order status to paid
            await this.orderModel.findByIdAndUpdate(
            orderId,
            {
                isPaid: true,
                paidAt: new Date(),
            },
            { new: true },
            );
        }

        return { received: true };
        } catch (error) {
        throw new BadRequestException(`Webhook error: ${error.message}`);
        }
    }
    }
