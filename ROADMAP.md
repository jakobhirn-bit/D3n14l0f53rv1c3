# Roadmap

## Q1 2026

### Completed ✅
- [x] German keyboard layout
- [x] Basic recon payloads
- [x] Persistence payloads
- [x] Social engineering payloads
- [x] Mission Control dashboard
- [x] WiFi deauth payload
- [x] Bluetooth reconnaissance
- [x] RFID/NFC support
- [x] WiFi handshake capture
- [x] Bluetooth OUI lookup
- [x] **Windows 10/11 payloads (5 new)**
- [x] **Linux payloads (5 new)**
- [x] **Network sniffing payloads**

### In Progress 🚧
- [ ] USB Ethernet emulation
- [ ] Auto-exfiltration on plug
- [ ] GUI configurator

### Planned
- [ ] WiFi evil twin
- [ ] Bluetooth spoofing
- [ ] RFID cloning
- [ ] Mac-specific payloads
- [ ] Android payloads

## Q2 2026

### Planned
- [ ] GUI configurator
- [ ] Payload builder
- [ ] Remote C2 integration
- [ ] Mobile app
- [ ] macOS payloads
- [ ] Cloud exfiltration

## Q3 2026

### Planned
- [ ] Multi-device orchestration
- [ ] Auto-persistence
- [ ] Exfiltration encryption
- [ ] Cloud sync
- [ ] AI-assisted payloads

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
| **Windows Passwords** | ✅ Done | `windows/exfil/passwords_quick.ds` |
| **Windows Browser** | ✅ Done | `windows/exfil/browser_full.ds` |
| **Windows Files** | ✅ Done | `windows/exfil/files_quick.ds` |
| **Windows Privesc** | ✅ Done | `windows/privilege/privesc_check.ds` |
| **Windows Sniff** | ✅ Done | `windows/sniffing/network_sniff.ds` |
| **Linux Passwords** | ✅ Done | `linux/exfil/passwords_quick.ds` |
| **Linux Files** | ✅ Done | `linux/exfil/files_quick.ds` |
| **Linux Privesc** | ✅ Done | `linux/privilege/privesc_check.ds` |
| **Linux Sniff** | ✅ Done | `linux/sniffing/network_sniff.ds` |
| **Linux Persist** | ✅ Done | `linux/persistence/cron_persist.ds` |

## Realistic Scenarios

### 15-Second Grab (Plug → Run → Leave)
```
1. Plug in USB
2. Passwords extracted (10s)
3. Files copied (5s)
4. Unplug and leave
```

### 60-Second Full Extraction
```
1. Plug in USB
2. Browser data (30s)
3. Interesting files (20s)
4. Privilege check (10s)
5. Unplug
```

### Persistent Backdoor
```
1. Plug in USB
2. Backdoor installed (5s)
3. Cron job created
4. Unplug
5. Remote access established
```

## Contributing

To add new payloads:
1. Create file in appropriate directory under `payloads/missions/`
2. Follow existing format (DuckScript)
3. Include header with purpose, author, requirements
4. Test on target hardware
5. Submit pull request
