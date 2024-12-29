import {useState, useEffect} from 'react';
import './App.css';
import Visors from './components/Visors';
import Tickets from './components/Tickets';
import webSocketService from './websocket';

function App() {
    const [visors, setVisors] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        webSocketService.connect('ws://192.168.1.15:8080/ws');

        const handleMessage = (message) => {
            if (message.error) {
                console.error('WebSocket error message:', message.error);
            } else {
                switch (message.event) {
                    case 'visors':
                        setVisors(message.data);
                        break;
                    case 'tickets':
                        setTickets(message.data);
                        break;
                    default:
                        console.warn('Unknown event:', message.event);
                }
            }
        };

        webSocketService.addListener(handleMessage);

        return () => {
            webSocketService.removeListener(handleMessage);
        };
    }, []);

    return (
        <div className="App">
            <h1>Real-Time Data</h1>
            <Visors visors={visors}/>
            <Tickets tickets={tickets}/>
        </div>
    );
}

export default App;