import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Pago1.css'; // Importamos los estilos CSS
import Navbar from '../Navbar/Navbar';

const MetaMaskPayment = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  };

  const connectMetaMask = async () => {
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error('Por favor instala MetaMask primero');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      setAccount(accounts[0]);
      setError('');
    } catch (err) {
      setError('No se pudo conectar a MetaMask');
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955';
      const usdtAbi = [
        "function transfer(address to, uint256 value) returns (bool)"
      ];

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const usdtContract = new ethers.Contract(usdtContractAddress, usdtAbi, signer);
      const amount = ethers.parseUnits('1', 6);
      const recipientAddress = import.meta.env.VITE_RECIPIENT_ADDRESS;

      const tx = await usdtContract.transfer(recipientAddress, amount);
      await tx.wait();

      setTxHash(tx.hash);
      window.location.href = '/Registro';
    } catch (err) {
      setError('Transacción cancelada'); // Mostrar solo este mensaje genérico
    } finally {
      setLoading(false);
    }
  };

  const contactAdminOnWhatsApp = () => {
    const phoneNumber = '+584126779652';
    window.open(`https://web.whatsapp.com/send/?phone=${phoneNumber}`, '_blank');
  };

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || '');
      });
    }
  }, []);

  return (
    <div className="container">
    <header className="header">
                <Navbar />
                
      </header>
    <div className="container card2">
      <h1 className="header-title">Pago con MetaMask</h1>
      
      {!isMetaMaskInstalled() ? (
        <div className="error-install">
          MetaMask no está instalado.{" "}
          <a href="https://metamask.io/download/" target="_blank" rel="noreferrer" className="download-link">
            Descargar MetaMask
          </a>
        </div>
      ) : (
        <>
          {!account ? (
            <button 
              onClick={connectMetaMask}
              className="button button--primary"
            >
              Conectar MetaMask
            </button>
          ) : (
            <div className="payment-content">
              <p className="account-info">Cuenta conectada: {account.slice(0, 6)}...{account.slice(-4)}</p>
              <button 
                onClick={handlePayment}
                disabled={loading}
                className={`button button--payment ${loading ? 'button--disabled' : ''}`}
              >
                {loading ? 'Procesando...' : 'Pagar 1 USDT'}
              </button>
              
              {txHash && (
                <div className="transaction-success">
                  Transacción exitosa!{" "}
                  <a 
                    href={`https://bscscan.com/tx/${txHash}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="transaction-link"
                  >
                    Ver en BscScan
                  </a>
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              
            </div>
          )}
        </>
      )}

            <div className="alternative-payment">
                <p className="payment-instruction">
                  ¿Prefieres pagar por pago móvil o quieres hacer canciones de temas específicos? Contáctanos en WhatsApp:
                </p>
                <button 
                  onClick={contactAdminOnWhatsApp}
                  className="button button--whatsapp"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="WhatsApp" 
                    className="whatsapp-icon" 
                  />
                  Contactar por WhatsApp
                </button>
              </div>
    </div>
    </div>
  );
};

export default MetaMaskPayment;