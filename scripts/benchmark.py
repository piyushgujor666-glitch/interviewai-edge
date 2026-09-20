import json, platform
from datetime import datetime, timezone
from pathlib import Path

result = {
    "device": platform.platform(),
    "model": "",
    "runtime": "",
    "executionProvider": "",
    "modelLoadMs": None,
    "inferenceMs": None,
    "memoryMb": None,
    "timestamp": datetime.now(timezone.utc).isoformat(),
    "note": "Populate measured values only after running a real local inference provider on target hardware."
}

Path("data").mkdir(exist_ok=True)
Path("data/benchmark-results.json").write_text(json.dumps(result, indent=2))
print(json.dumps(result, indent=2))
