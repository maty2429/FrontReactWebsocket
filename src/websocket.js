class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = [];
    }

    connect(url) {
        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                this.socket.send(JSON.stringify({ event: 'get_all_visors' }));
                this.socket.send(JSON.stringify({ event: 'get_all_tickets' }));
            };

            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.listeners.forEach((listener) => listener(message));
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            this.socket.onclose = (event) => {
                if (!event.wasClean) {
                    setTimeout(() => this.connect(url), 5000);
                }
            };
        }
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;