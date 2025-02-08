import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Home.css'; // Archivo CSS separado
import logoA from './Audifonoslogo.png';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL, 
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password:"si"
      });

      if (error) throw error;
      window.location.href = '/Pagina1';

    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error de conexión');
    }
  };

  return (
    <div className="container login-container">
      <form onSubmit={handleSubmit} className="login-form">
        
      <div className="logo-container">
        <img src={logoA} className="App-logo" alt="logo" />
      </div>

        <div className="login-card">
          <h4 className="login-title">Acceso a la Plataforma</h4>
          <h5 className="login-disclaimer">Contenido multimedia para aprender con música</h5>
          
          <div className="input-group">
            <label className="input-label">
              
                
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </label>

            
          </div>

          {error && <div className="login-error">{error}</div>}

          <button className="upload-button login-button" type="submit">
            Acceder
          </button>

          <p className="login-disclaimer">
            ¿No tienes acceso? Contacta al administrador
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;