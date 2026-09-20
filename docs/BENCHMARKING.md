# Benchmarking

The benchmark page is intentionally honest.

Run the benchmark after configuring a real local model:

```bash
python scripts/benchmark.py
```

Results are written to:

```text
data/benchmark-results.json
```

The result schema includes:

- device
- model
- runtime
- executionProvider
- modelLoadMs
- inferenceMs
- memoryMb
- timestamp

Do not fill missing measurements with invented numbers.
