import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/client.queries';
import ClientRow from './ClientRow';

export default function Clients() {
  const { loading, error, data} = useQuery(GET_CLIENTS);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Shomething went wrong</p>

  return (
    <>
    {!loading && !error && (
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.clients.map(client => (
                  <ClientRow key={client.id} client={client} />  
                ))}
            </tbody>
        </table>
    
    
    )}
    
    </>
   
  )
}
