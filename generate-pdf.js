const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('clinicflowac-ovwi-overview.pdf'));

const content = `
ClinicFlowAC + OVWI Overview

Project Overview
ClinicFlowAC is an open healthcare workflow automation platform.
OVWI provides API verification, usage tracking, and monetization.

Live:
https://www.cyzora.com
https://ovwi.cyzora.com

Architecture
User → ClinicFlowAC → OVWI → API → Billing

Current Status
- Live frontend
- Working UI
- Authentication
- OVWI API active
- Billing integrated
- Webhook active

Tech Stack
Frontend: React (Vite)
Backend: Node / Dart
Infra: OVWI
Payments: LemonSqueezy
Deploy: Vercel + Railway

Roadmap
- Auth improvements
- Modules
- Infra stabilization
- Docs

Why It Matters
Open alternative to proprietary systems.
Reusable API monetization infrastructure.
`;

doc.fontSize(12).text(content);
doc.end();
