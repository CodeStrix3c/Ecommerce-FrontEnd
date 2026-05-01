import { useEffect, useRef, useState } from 'react';
import { Camera, ImagePlus, Send, StopCircle } from 'lucide-react';
import { createPhoneSyncConnection } from '../services/phoneSyncConnection';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function canvasToDataUrl(video) {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.9);
}

export default function MobileUploadPage({ sessionId }) {
  const [status, setStatus] = useState('Connecting...');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const connectionRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const connection = createPhoneSyncConnection();
    connectionRef.current = connection;

    async function connect() {
      try {
        await connection.start();
        await connection.invoke('JoinSession', sessionId, 'phone');
        setStatus('Connected to desktop');
      } catch (error) {
        console.error(error);
        setStatus('Could not connect to desktop');
      }
    }

    connect();

    return () => {
      stopCamera();
      connection.stop();
    };
  }, [sessionId]);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (error) {
      console.error(error);
      alert('Camera could not be opened. Use HTTPS/localhost and allow camera permission.');
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }

  function capturePhoto() {
    if (!videoRef.current) return;
    const dataUrl = canvasToDataUrl(videoRef.current);
    setPreview(dataUrl);
    setFileName(`camera-${Date.now()}.jpg`);
  }

  async function handleGalleryPick(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setFileName(file.name);
  }

  async function sendToDesktop() {
    if (!preview) {
      alert('Capture or select an image first.');
      return;
    }

    if (!connectionRef.current) {
      alert('Desktop connection is not ready.');
      return;
    }

    await connectionRef.current.invoke('SendImageToDesktop', {
      sessionId,
      fileName: fileName || `phone-image-${Date.now()}.jpg`,
      contentType: 'image/jpeg',
      dataUrl: preview
    });

    setStatus('Image sent to desktop');
  }

  return (
    <main className="page mobile-page">
      <section className="card hero-card">
        <h1>Phone Upload</h1>
        <p><strong>Status:</strong> {status}</p>
        <p className="small-break"><strong>Session:</strong> {sessionId}</p>
      </section>

      <section className="card">
        <h2>Camera</h2>
        <video ref={videoRef} className="camera-view" autoPlay playsInline muted />
        <div className="button-row">
          {!cameraActive ? (
            <button className="primary-btn" onClick={startCamera}><Camera size={18} /> Open Camera</button>
          ) : (
            <button className="secondary-btn" onClick={stopCamera}><StopCircle size={18} /> Stop Camera</button>
          )}
          <button className="secondary-btn" onClick={capturePhoto} disabled={!cameraActive}>Capture</button>
        </div>
      </section>

      <section className="card">
        <h2>Pick from phone</h2>
        <label className="file-label">
          <ImagePlus size={18} /> Select Image from Gallery
          <input type="file" accept="image/*" onChange={handleGalleryPick} />
        </label>
      </section>

      {preview && (
        <section className="card">
          <h2>Preview</h2>
          <img className="preview-img" src={preview} alt="Selected preview" />
          <button className="primary-btn full-btn" onClick={sendToDesktop}><Send size={18} /> Send to Desktop</button>
        </section>
      )}
    </main>
  );
}
