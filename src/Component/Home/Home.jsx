import { Link } from 'react-router-dom';
import './Home.css'; // Reutilizamos los mismos estilos
import logoA from '../Login/Audifonoslogo.png';

function Landing() {
  return (
    <div className="container login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={logoA} className="App-logo" alt="logo" />
        </div>

        <div className="login-card">
          <h1 className="login-title">Bienvenido a SoundLearn</h1>
          
          <div className="landing-content">
            <p className="login-disclaimer" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Descubre un nuevo mundo de aprendizaje a través de la música y el contenido multimedia interactivo.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <h3>🎵 Aprende con Música</h3>
                <p>Contenido educativo integrado en experiencias musicales únicas</p>
              </div>
              
              <div className="feature-item">
                <h3>🎧 Contenido Exclusivo</h3>
                <p>Contactanos para lecciones especializadas y material multimedia premium</p>
              </div>
              
              <div className="feature-item">
                <h3>📱 Multiplataforma</h3>
                <p>Disponible en cualquier dispositivo, cuando y donde lo necesites</p>
              </div>
            </div>

            <a href="/Login" className="upload-button login-button" style={{ maxWidth: '200px', margin: '2rem auto' }} >Comenzar Ahora</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;