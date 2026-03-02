# Roadmap

## Q1 2026

### Completed ✅
- [x] German keyboard layout
- [x] Basic recon payloads
- [x] Persistence payloads
- [x] Social engineering payloads
- [x] Mission Control dashboard

### In Progress 🚧
- [x] WiFi deauth payload
- [x] Bluetooth reconnaissance
- [x] RFID/NFC support
- [x] WiFi handshake capture
- [x] Bluetooth OUI lookup

### Planned
- [ ] WiFi evil twin
- [ ] Bluetooth spoofing
- [ ] RFID cloning

## Q2 2026

### Planned
- [ ] GUI configurator
- [ ] Payload builder
- [ ] Remote C2 integration
- [ ] Mobile app

## Q3 2026

### Planned
- [ ] Multi-device orchestration
- [ ] Auto-persistence
- [ ] Exfiltration encryption
- [ ] Cloud sync

## Payload Status

| Payload | Status | File |
|---------|--------|------|
| Network Recon | ✅ Done | `recon/network_recon.ds` |
| Hardware Inventory | ✅ Done | `recon/hardware_inventory.ds` |
| Browser Extract | ✅ Done | `exfil/browser_extract.ds` |
| Cron Persistence | ✅ Done | `persistence/cron_persist.ds` |
| Fake Update | ✅ Done | `social/fake_update.ds` |
| WiFi Deauth | ✅ Done | `wifi/deauth.ds` |
| WiFi Handshake | ✅ Done | `wifi/handshake.ds` |
| Bluetooth Recon | ✅ Done | `bluetooth/recon.ds` |
| Bluetooth OUI | ✅ Done | `bluetooth/oui_lookup.ds` |
| NFC Recon | ✅ Done | `rfid/nfc_recon.ds` |

## Contributing

To add new payloads:
1. Create file in appropriate directory under `payloads/missions/`
2. Follow existing format (DuckScript)
3. Include header with purpose, author, requirements
4. Test on target hardware
5. Submit pull request
