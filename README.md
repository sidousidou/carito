# carito
# Carito Parts Request Form

This repository provides a lightweight form for requesting car parts and spares. It consists of a Node.js backend and static frontend files under `public/`. The form is designed to be embedded on any website and supports English and Arabic.

## Features

- Mobile‑first, black‑and‑white design with the Carito logo.
- Fetches car brands and models from the NHTSA API with manual fallback inputs.
- Upload up to 10 images (5 MB each).
- Auto-detects phone/WhatsApp country code from the visitor's IP.
- Sends an email notification to `challengedsns@gmail.com` (changeable via environment variable `NOTIFY_EMAIL`).
- English and Arabic translations are automatically selected from the browser language.

## Running Locally

```bash
npm install
node server.js
```

The form will be available at `http://localhost:3000/`.

## Deploying on Hostinger

1. **Upload files** – upload all repository files to your Node.js hosting space. Place your desired `carito-logo.png` inside `public/` to replace the placeholder logo.
2. **Install dependencies** – run `npm install` in the project directory.
3. **Environment variables** – optionally set `PORT` and `NOTIFY_EMAIL` in your hosting control panel to change the listening port and notification email.
4. **Start the app** – use Hostinger’s Node.js manager (or PM2) to run `npm start`.
5. **Embed the form** – include the following snippet where you want the form:

```html
<iframe src="https://yourdomain.example.com/" style="border:0;width:100%;height:600px"></iframe>
```

Replace `yourdomain.example.com` with your domain.

## Changing the Notification Email

Set the environment variable `NOTIFY_EMAIL` before starting the application or edit `server.js` to change the default address.

```bash
export NOTIFY_EMAIL=youraddress@example.com
npm start
```

## Folder Structure

- `public/` – static assets and the form.
- `uploads/` – uploaded files (created automatically).
- `server.js` – Express backend handling form submission and sending emails.
