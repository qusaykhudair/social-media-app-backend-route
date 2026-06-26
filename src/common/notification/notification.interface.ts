export interface NotificationProvider {
    sendNotification(data:{title:string , body:string}, token: string): Promise<void>;
    
}
    