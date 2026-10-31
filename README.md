# ResumeCraft

ResumeCraft is a full-stack resume builder. Create and edit resumes, choose from multiple templates, customize accent colors, upload an existing PDF for AI-assisted extraction, and share public resumes.

## Features

- Account registration and login
- Resume creation, editing, and PDF upload
- Four resume templates with customizable accent colors
- AI-assisted professional summaries and experience descriptions
- Public resume links and print-to-PDF

## Tech stack

- **Client:** React, Vite, Redux Toolkit, Tailwind CSS
- **Server:** Node.js, Express, MongoDB Atlas, Mongoose
- **Integrations:** Google Gemini API, ImageKit

## Run locally

### Requirements

- Node.js (20 or later recommended)
- MongoDB Atlas cluster or a MongoDB-compatible connection URI
- API credentials for the integrations you plan to use

### 1. Configure the server

Create `server/.env` with these variables. Do not commit this file or share its values.

```env
PORT=3000
JWT_SECRET=replace-with-a-long-random-secret
MONGODB_URI=your-mongodb-connection-string
IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
OPENAI_API_KEY=your-google-ai-api-key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173
```

The server selects the `resume-builder` database from the connection URI. In MongoDB Atlas, allow your current public IP under **Security → Network Access**.

Install dependencies and start the API:

```powershell
cd server
npm install
npm run server
```

The API listens on `http://localhost:3000`.

### 2. Configure and run the client

The development environment file at `client/.env.development` points the client to the local API. If it is missing, create `client/.env.local`:

```env
VITE_BASE_URL=http://localhost:3000
```

In another terminal:

```powershell
cd client
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Deploy

### Backend on Render

The root `render.yaml` configures a Render Blueprint for the API.

1. In Render, choose **New → Blueprint** and connect this repository.
2. Set the Blueprint's `CLIENT_URL` to your Vercel site origin, such as `https://your-site.vercel.app`.
3. Enter `MONGODB_URI`, `JWT_SECRET`, `IMAGEKIT_PRIVATE_KEY`, and `OPENAI_API_KEY` as Render environment secrets.
4. Confirm the configured `OPENAI_BASE_URL` and `OPENAI_MODEL` values, then deploy.
5. In MongoDB Atlas, allow the outbound IP addresses shown for the Render service under **Security → Network Access**.

Render provides the `PORT` environment variable automatically.

### Frontend on Vercel

1. Import this repository into Vercel.
2. Set **Root Directory** to `client` and use the Vite framework preset.
3. Add `VITE_BASE_URL` with the deployed Render API URL, for example `https://your-api.onrender.com`.
4. Deploy the site.
5. Set Render's `CLIENT_URL` to the exact Vercel site origin and redeploy the API if needed.

`client/vercel.json` configures client-side route rewrites.

## Scripts

Run commands from the relevant directory.

| Directory | Command | Description |
| --- | --- | --- |
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Create the production client build |
| `client` | `npm run lint` | Run ESLint |
| `server` | `npm run server` | Start the API with Nodemon |
| `server` | `npm start` | Start the API |

## Security

- Never commit `.env` files, API keys, database credentials, or JWT secrets.
- Configure production secrets in Render's environment settings.
- If a credential is exposed, revoke or rotate it and update the deployment environment.
