# Awtrix3 controller (Web version)

A web-based control panel and API service for **AWTRIX 3** devices.  
This project provides a full-stack solution (Go backend + Web frontend) for interacting with AWTRIX 3 via HTTP APIs.

---

## 📌 Overview

**awtrix3web** is a self-hosted web application designed to communicate with **AWTRIX 3 smart pixel clocks**.  
It exposes backend APIs and a browser-based UI to manage device status, display data, and integrations.

The project is suitable for:
- Local network device management
- Custom dashboards for AWTRIX
- Extending AWTRIX functionality with your own UI and APIs

---

## TODO
### Home Assistant Support
### Docker Deployment

## 🧱 Tech Stack

### Backend
- **Go**
- HTTP API server
- WebSocket support (event subscriptions)
- Modular middleware design

### Frontend
- **TypeScript**
- **Vue 3**
- Axios-based request abstraction
- Responsive UI

---

## 🚀 Getting Started

### Prerequisites

- Go 1.20+
- Node.js 18+
- An AWTRIX 3 device on the same network

---

### Backend

```bash
cd server
go run main.go
```

The backend will start an HTTP server that handles:
- Device detection
- API proxying
- WebSocket subscriptions

### Frontend
```bash
cd src
npm install
npm run dev
```

### 🔌 AWTRIX 3 Compatibility

AWTRIX 3 is an ESP32-based smart display platform that supports HTTP APIs for dynamic content rendering such as time, notifications, and custom apps.

This project communicates with AWTRIX 3 primarily through its HTTP interface and is intended to run inside the same local network.


### ✨ Features
- AWTRIX device detection
- Web-based control interface
- API abstraction layer
- WebSocket event subscriptions
- Extensible backend architecture
- Frontend-backend separation


### 🛠 Development Notes
- Backend APIs are written in Go with clear controller separation
- Frontend uses strongly-typed request definitions
- Designed to be easy to extend with new AWTRIX endpoints

### 🤝 Contributing

Contributions are welcome.
You can:
- Add new AWTRIX API integrations
- Improve UI/UX
- Optimize performance
- Add Docker or deployment scripts
- Please open an issue or submit a pull request.

### 📄 License
MIT License

### 🔗 References
AWTRIX 3 Official Project
- https://github.com/Blueforcer/awtrix3