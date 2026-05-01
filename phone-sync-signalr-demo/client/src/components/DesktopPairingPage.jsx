import { useMemo, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { MonitorSmartphone, Plus, Wifi } from 'lucide-react';
import { createPhoneSyncConnection } from '../services/phoneSyncConnection';

function createSessionId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function DesktopPairingPage() {
  const [sessionId, setSessionId] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Not connected');
  const [joinedDevices, setJoinedDevices] = useState([]);
  const [images, setImages] = useState([]);
  const connectionRef = useRef(null);

  const mobileUrl = useMemo(() => {
    if (!sessionId) return '';
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('mode', 'mobile');
    url.searchParams.set('sessionId', sessionId);
    return url.toString();
  }, [sessionId]);

  async function startPairing() {
    const newSessionId = createSessionId();
    setSessionId(newSessionId);
    setImages([]);
    setJoinedDevices([]);
    setConnectionStatus('Connecting...');

    const connection = createPhoneSyncConnection();
    connectionRef.current = connection;

    connection.on('DeviceJoined', device => {
      setJoinedDevices(prev => [device, ...prev].slice(0, 10));
    });

    connection.on('ImageReceived', image => {
      setImages(prev => [image, ...prev]);
    });

    connection.onreconnecting(() => setConnectionStatus('Reconnecting...'));
    connection.onreconnected(() => setConnectionStatus('Connected'));
    connection.onclose(() => setConnectionStatus('Disconnected'));

    await connection.start();
    await connection.invoke('JoinSession', newSessionId, 'desktop');
    setConnectionStatus('Connected');
  }

  return (
    <main className="page">
      <section className="card hero-card">
        <div className="hero-icon"><MonitorSmartphone size={36} /></div>
        <h1>Phone Sync Demo</h1>
        <p>
          Create a pairing session on desktop, scan the QR code from your phone,
          then send camera/gallery images back to this screen live.
        </p>
        <button className="primary-btn" onClick={startPairing}>
          <Plus size={18} /> Create Pairing Session
        </button>
      </section>

      {sessionId && (
        <section className="grid two-col">
          <div className="card center-card">
            <h2>Scan from phone</h2>
            <div className="qr-wrap">
              <QRCodeCanvas value={mobileUrl} size={230} includeMargin />
            </div>
            <p className="small-break">{mobileUrl}</p>
          </div>

          <div className="card">
            <h2><Wifi size={20} /> Session status</h2>
            <p><strong>Status:</strong> {connectionStatus}</p>
            <p><strong>Session:</strong> {sessionId}</p>
            <h3>Joined devices</h3>
            {joinedDevices.length === 0 ? (
              <p className="muted">No phone connected yet.</p>
            ) : (
              <ul>
                {joinedDevices.map((d, index) => (
                  <li key={`${d.connectionId}-${index}`}>{d.deviceType} joined</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {sessionId && (
        <section className="card">
          <h2>Received images</h2>
          {images.length === 0 ? (
            <p className="muted">Images from phone will appear here.</p>
          ) : (
            <div className="image-grid">
              {images.map((img, index) => (
                <figure key={`${img.uploadedAtUtc}-${index}`} className="image-card">
                  <img src={img.dataUrl} alt={img.fileName || 'Uploaded from phone'} />
                  <figcaption>{img.fileName || 'phone-image.jpg'}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
