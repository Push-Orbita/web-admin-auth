import 'primereact/toast';

declare module 'primereact/toast' {
    export interface ToastMessage {
        severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
    }
}
