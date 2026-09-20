# InterviewAI Edge

**Practice Interviews. Run AI Locally.**

InterviewAI Edge is a premium mock-interview web application designed around on-device/edge AI for Snapdragon-powered Windows PCs.

## What is included

- React + TypeScript + Vite frontend
- Premium dark/light responsive UI
- Adaptive interview engine
- Text and browser voice-input demo
- Explainable answer analysis
- Speaking metrics UI
- Interview history using localStorage
- Technology / Snapdragon architecture page
- Performance/benchmark page
- Local AI provider abstraction in the backend
- Deterministic DEMO MODE
- Optional cloud fallback interface
- Documentation for Snapdragon/ONNX/QNN integration

## Important technical note

The repository does **not** fake Snapdragon/NPU execution. The default demo works without special hardware. Actual Qualcomm/QNN/NPU execution must be validated on a compatible Snapdragon Windows PC and configured runtime.

## Run

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Create `backend/.env` from `.env.example`.

## Environment

```env
AI_PROVIDER=demo
MODEL_PATH=
QNN_ENABLED=false
PORT=8000
```

The UI clearly labels DEMO MODE until a real local inference provider is configured.

## Project structure

```text
interviewai-edge/
├── frontend/
├── backend/
├── docs/
├── data/
├── .gitignore
└── README.md
```

## Snapdragon integration path

See:

- `docs/SNAPDRAGON_SETUP.md`
- `docs/ARCHITECTURE.md`
- `docs/BENCHMARKING.md`

The inference service is intentionally separated from the product UI so that a supported ONNX Runtime/QNN/Qualcomm AI Runtime provider can be added without rewriting the application.

## License

MIT
