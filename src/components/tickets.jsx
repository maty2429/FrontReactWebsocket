import { format } from 'date-fns';
import PropTypes from 'prop-types';

function Tickets({ tickets }) {
    return (
        <div>
            <h2>Tickets</h2>
            {tickets.length === 0 ? (
                <p>No tickets available</p>
            ) : (
                <ul>
                    {tickets.map((ticket) => (
                        <li key={ticket.id}>
                            <strong>Person:</strong> {ticket.nombre_persona} | <strong>Box:</strong> {ticket.nro_box} |{' '}
                            <strong>Created:</strong> {format(new Date(ticket.fecha_creacion), 'dd/MM/yyyy HH:mm')}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Tickets.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombre_persona: PropTypes.string.isRequired,
            nro_box: PropTypes.number.isRequired,
            fecha_creacion: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Tickets;