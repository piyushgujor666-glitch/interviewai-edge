# Snapdragon Setup

This project is designed so the web product can run in demo mode on any development machine while the local inference layer can be configured on a compatible Snapdragon Windows PC.

## Recommended validation workflow

1. Use a supported Snapdragon Windows device.
2. Install a supported Python version.
3. Install the model/runtime required by the selected Qualcomm AI Hub model.
4. Install the supported ONNX Runtime/QNN/Qualcomm AI Runtime components according to the current Qualcomm documentation.
5. Set `AI_PROVIDER=local`.
6. Set the model path.
7. Verify the backend status endpoint.
8. Run the benchmark script.
9. Record only measured latency/memory/device information.

## Do not

- hard-code a model that has not been verified
- claim NPU execution when the execution provider is CPU
- invent benchmark values
- commit API keys or model credentials

## UI behavior

When local inference is unavailable, the application must display `DEMO MODE`. When real local inference is configured, the backend should report the actual execution provider.
