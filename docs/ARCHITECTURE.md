# Architecture

```text
React + TypeScript
        |
        v
Interview UI
        |
        v
FastAPI AI Service
        |
        +--------------------+
        |                    |
        v                    v
   Demo Provider       Local Provider
        |                    |
        |             ONNX Runtime
        |             QNN / Qualcomm
        |             runtime where supported
        |                    |
        +---------+----------+
                  |
                  v
          Interview Engine
                  |
                  v
          Answer Analysis
                  |
                  v
          Adaptive Follow-up
                  |
                  v
             Final Report
```

## Provider contract

The backend exposes an AI provider abstraction. `demo` is deterministic and transparent. A production Snapdragon deployment should provide a real local model/runtime implementation and report the actual execution provider.

No benchmark or NPU claim should be made unless measured on the target device.
