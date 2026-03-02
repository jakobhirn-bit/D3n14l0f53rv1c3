# 🗡️ german-kn1ve

German keyboard layout fork of [USBArmyKnife](https://github.com/i-am-shodan/USBArmyKnife) by [i-am-shodan](https://github.com/i-am-shodan).

## What We Added

### German Keyboard Layout
- Full German keyboard layout support (de_DE)
- Umlauts (ä, ö, ü) working
- Special characters (ß, €, @)
- Tested on TDongle S3

### Example Payloads
Located in `payloads/missions/`:

| Payload | Purpose |
|---------|---------|
| `recon/network_recon.ds` | Network discovery and mapping |
| `recon/hardware_inventory.ds` | Device fingerprinting |
| `exfil/browser_extract.ds` | Browser data extraction |
| `persistence/cron_persist.ds` | Cron-based persistence |
| `social/fake_update.ds` | Social engineering fake update |

### Mission Control (Optional)
WebSocket-based dashboard for managing multiple devices:
- Device management
- Payload library
- Real-time communication
- Exfiltration viewer

```bash
cd projects/mission_control
npm install
npm start
```

## Roadmap

### Q1 2026
- [x] German keyboard layout
- [x] Basic recon payloads
- [x] Persistence payloads
- [x] Social engineering payloads
- [ ] WiFi deauth payload
- [ ] Bluetooth reconnaissance
- [ ] RFID/NFC support

### Q2 2026
- [ ] GUI configurator
- [ ] Payload builder
- [ ] Remote C2 integration
- [ ] Mobile app

### Q3 2026
- [ ] Multi-device orchestration
- [ ] Auto-persistence
- [ ] Exfiltration encryption

## Original Project

This is a minimal fork focused on German keyboard layout support. For the full-featured original project, see:

- **Original:** https://github.com/i-am-shodan/USBArmyKnife
- **Author:** i-am-shodan

## Requirements

- LILYGO T-Dongle S3 or compatible ESP32-S3
- PlatformIO (for building)
- Python 3.x (for Mission Control)

## Building

```bash
# Build with German layout
pio run -e tdongle-s3-de

# Or use the provided script
./build.sh
```

## Usage

1. Plug in device
2. Connect to WiFi access point
3. Open web interface (http://192.168.4.1)
4. Select payload
5. Execute

## Hardware Tested

- ✅ LILYGO T-Dongle S3
- ✅ ESP32-S3 generic boards

## Contributing

Contributions welcome! Please:
- Use example credentials (Password123, 192.168.1.100)
- No sensitive data in commits
- Follow the existing payload structure

## License

Same as original project (see LICENSE file)

## Credits

- **Original Author:** i-am-shodan
- **German Layout & Payloads:** D3n14l0f53rv1c3

---

Made with ❤️ by the D3n14l0f53rv1c3 collective

## Platform-Specific Payloads

### Windows 10/11

| Payload | Purpose | Time |
|---------|---------|------|
| `windows/exfil/passwords_quick.ds` | Password extraction | 10s |
| `windows/exfil/browser_full.ds` | Browser data | 30s |
| `windows/exfil/files_quick.ds` | Interesting files | 20s |
| `windows/privilege/privesc_check.ds` | Privilege escalation check | 30s |
| `windows/sniffing/network_sniff.ds` | Network capture | Continuous |

### Linux

| Payload | Purpose | Time |
|---------|---------|------|
| `linux/exfil/passwords_quick.ds` | Password extraction | 10s |
| `linux/exfil/files_quick.ds` | Interesting files | 15s |
| `linux/privilege/privesc_check.ds` | Privilege escalation check | 20s |
| `linux/sniffing/network_sniff.ds` | Network capture | 60s |
| `linux/persistence/cron_persist.ds` | Backdoor installation | 5s |

## Realistic Scenarios

### Scenario 1: Quick Grab (15 seconds)
1. Plug in USB
2. Payload runs automatically
3. Passwords copied to USB
4. Unplug and leave

### Scenario 2: Full Extraction (60 seconds)
1. Plug in USB
2. Browser data extracted
3. Interesting files copied
4. Network capture started
5. Unplug

### Scenario 3: Persistence (5 seconds)
1. Plug in USB
2. Backdoor installed
3. Cron job created
4. Unplug
5. Remote access established
