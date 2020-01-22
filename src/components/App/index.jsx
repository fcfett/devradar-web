import React, { useState, useEffect } from 'react';
import './styles.css';

import DevItem from '../DevItem';
import DevForm from '../DevForm';
import { getDevs, createDev } from '../../services/api';
import NoDevs from '../NoDevs';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getDevs();
      if (data) setDevs(data);
    })();
  }, []);

  const addNewDev = async (devData) => {
    const { data: newDev } = await createDev(devData);
    if (newDev) {
      setDevs([...devs, newDev]);
    } else {
      alert('Usuário não encontrado');
    }
  };

  return (
    <div id="app">
      <header>DevRadar</header>
      <aside>
        <h1>Cadastrar</h1>
        <DevForm onSubmit={addNewDev}></DevForm>
      </aside>
      <main>
        {(devs.length === 0 && <NoDevs />) || (
          <ul>
            {devs.map((dev) => (
              <DevItem key={dev._id} data={dev} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
