/**
 * Standard Logger Utility - Enhanced for Production Observability
 */
export const logger = {
    info: (message: string, data?: any) => {
        const payload = { timestamp: new Date().toISOString(), level: 'INFO', message, ...(data && { data }) };
        console.log(process.env.NODE_ENV === 'production' ? JSON.stringify(payload) : `[INFO] ${payload.timestamp}: ${message}`, data || '');
    },
    warn: (message: string, data?: any) => {
        const payload = { timestamp: new Date().toISOString(), level: 'WARN', message, ...(data && { data }) };
        console.warn(process.env.NODE_ENV === 'production' ? JSON.stringify(payload) : `[WARN] ${payload.timestamp}: ${message}`, data || '');
    },
    error: (message: string, error?: any, data?: any) => {
        const payload = { 
            timestamp: new Date().toISOString(), 
            level: 'ERROR', 
            message, 
            error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
            ...(data && { data }) 
        };
        console.error(process.env.NODE_ENV === 'production' ? JSON.stringify(payload) : `[ERROR] ${payload.timestamp}: ${message}`, error, data || '');
    },
    debug: (message: string, data?: any) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`, data || '');
        }
    },
};
