import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseService } from 'libs/service/base.service';
import { RegisterOrgWebhhookEndpointDto, SendNotificationDto } from './dtos/notification.dto';
import { INotification } from './interfaces/notification.interfaces';
import { NATSClient } from '@credebl/common/NATSClient';

@Injectable()
export class NotificationService extends BaseService {
    constructor(@Inject('NATS_CLIENT') private readonly serviceProxy: ClientProxy, private readonly natsClient : NATSClient) {
        super('NotificationService');
    }

    /**
     * Register organization webhook endpoint
     * @param registerOrgWebhhookEndpointDto 
     * @returns Stored notification data
     */
    async registerOrgWebhookEndpoint(registerOrgWebhhookEndpointDto: RegisterOrgWebhhookEndpointDto): Promise<INotification> {
        return this.natsClient.sendNatsMessage(this.serviceProxy, 'register-org-webhook-endpoint-for-notification', registerOrgWebhhookEndpointDto);
    }

    /**
     * Send notification for holder
     * @param sendNotificationDto 
     * @returns Get notification details
     */
    async sendNotification(notificationRequestBody: SendNotificationDto): Promise<INotification> {
        return this.natsClient.sendNatsMessage(this.serviceProxy, 'send-notification', notificationRequestBody);
    }
}