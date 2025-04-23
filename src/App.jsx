import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [texto, setTexto] = useState('');
  const [userId, setUserId] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Info " + file, texto, userId);
    if (!texto || !userId) {
      return alert('Falta texto o id');
    } else if (!file && texto !== '' && userId !== '') {
      console.log("1");
      try {
        const res = await axios.post(
          'http://localhost:3000/Question/context',
          {
            texto,
            userId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(res.data)
        setResultado(res.data.resultado);
        alert('Procesado con éxito');
      } catch (err) {
        console.error(err);
        alert('Error al enviar al backend');
      }
    } else {
      console.log("2");
      const formData = new FormData();
      formData.append('imagen', file);
      formData.append('texto', texto);
      formData.append('userId', userId);
      try {
        const res = await axios.post(
          'http://localhost:3000/Question/process',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(res.data)
        setResultado(res.data.resultado);
        alert('Procesado con éxito');
      } catch (err) {
        console.error(err);
        alert('Error al enviar al backend');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subir imagen y texto</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Id de usuario"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Texto a enviar"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Enviar al backend
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: '2rem' }}>
          <p>Resultado:</p>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;
