# Phone Sync SignalR Demo

This sample implements the **QR pairing flow**:

Desktop browser shows a QR code -> phone scans it -> phone captures/uploads images -> desktop receives them live.

## Projects

- `server/PhoneSyncApi` - .NET SignalR API
- `client` - React + Vite app

## Run locally

### 1. Start backend

```bash
cd server/PhoneSyncApi
dotnet restore
dotnet run
```

Backend runs on:

```text
http://localhost:5055
```

For a dev tunnel, expose the same port the API actually listens on:

```bash
devtunnel host -p 5055 --allow-anonymous
```

### 2. Start React app

Open another terminal:

```bash
cd client
npm install
npm run dev
```

React runs on:

```text
http://localhost:5173
```

## Test from same laptop

1. Open `http://localhost:5173`.
2. Click **Create Pairing Session**.
3. Scan the QR code with your phone.
4. Use phone page to open camera or select gallery image.
5. Uploaded image appears live on desktop.

## Test from real phone

Your phone must reach both the React app and backend.

For real mobile testing, use one of these:

- Deploy both client and API to HTTPS.
- Use ngrok / Cloudflare Tunnel for both apps.
- Run both devices on the same Wi-Fi and replace `localhost` URLs with your laptop IP.

Example:

```text
React:  http://192.168.1.10:5173
API:    http://192.168.1.10:5055
```

Then create `client/.env.local` with:

```text
VITE_API_BASE_URL=https://your-api-tunnel-host
```

Example:

```text
VITE_API_BASE_URL=https://dx4w3x3g-5055.inc1.devtunnels.ms
```

The client now defaults to `http://localhost:5055` when `VITE_API_BASE_URL` is not set.

## Notes

- Direct camera access requires HTTPS or localhost.
- Mobile browser still requires user permission before using camera.
- This does not silently sync a phone. The phone user selects/captures the image and uploads it.
