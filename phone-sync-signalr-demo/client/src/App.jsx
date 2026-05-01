import DesktopPairingPage from './components/DesktopPairingPage.jsx';
import MobileUploadPage from './components/MobileUploadPage.jsx';

function App() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const sessionId = params.get('sessionId');

  if (mode === 'mobile' && sessionId) {
    return <MobileUploadPage sessionId={sessionId} />;
  }

  return <DesktopPairingPage />;
}

export default App;
