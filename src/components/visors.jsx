import { useState } from 'react';
import PropTypes from 'prop-types';
import webSocketService from '../websocket';

function Visors({ visors }) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState(false);
    const [serviceId, setServiceId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newVisor = {
            Nombre: name,
            Ubicacion: location,
            Estado: status,
            ServicioID: parseInt(serviceId, 10),
        };
        webSocketService.sendMessage({ event: 'create_visor', data: newVisor });
    };

    return (
        <div>
            <h2>Visors</h2>
            {visors.length === 0 ? (
                <p>No visors available</p>
            ) : (
                <ul>
                    {visors.map((visor) => (
                        <li key={visor.ID}>
                            <strong>Name:</strong> {visor.Nombre} | <strong>Location:</strong> {visor.Ubicacion} |{' '}
                            <strong>Status:</strong> {visor.Estado ? 'Active' : 'Inactive'}
                        </li>
                    ))}
                </ul>
            )}
            <h3>Create New Visor</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Status:
                        <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} />
                    </label>
                </div>
                <div>
                    <label>
                        Service ID:
                        <input type="text" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Create Visor</button>
            </form>
        </div>
    );
}

Visors.propTypes = {
    visors: PropTypes.arrayOf(
        PropTypes.shape({
            ID: PropTypes.number.isRequired,
            Nombre: PropTypes.string.isRequired,
            Ubicacion: PropTypes.string.isRequired,
            Estado: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Visors;