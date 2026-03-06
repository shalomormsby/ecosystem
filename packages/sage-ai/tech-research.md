# Sage AI — Tech Research

> Running log of hardware, infrastructure, and architectural research questions relevant to Sage AI development.

---

## 2026-03-06

### Question

How well could the new MacBook Pro with the M5 chip (released the week of March 3, 2026) with 64GB of RAM perform serving the big Apertus model (70B) compared to my Dell XPS 8950 with an RTX 3090?

---

### Context

The M5 Pro and M5 Max MacBook Pros were announced March 3, 2026, and are available starting March 11. This question evaluates whether switching the Sage AI inference server from the Dell XPS 8950 workstation (RTX 3090, 64GB DDR5) to an M5 Pro MacBook Pro (64GB Unified Memory) would be a meaningful upgrade for the 70B Apertus model specifically.

---

### Research Findings

#### The Core Constraint: Model Size vs. Memory Architecture

The Apertus 70B model, quantized to Q4_K_M (a practical serving quality), requires approximately **40–42GB of memory**. This single fact drives the entire comparison.

**Dell XPS 8950 (RTX 3090 + 64GB DDR5):**
- RTX 3090 VRAM: **24GB** at **936 GB/s** bandwidth
- System DDR5 RAM: **64GB** at **~51–76 GB/s** bandwidth (dual-channel DDR5-5200)
- 70B Q4_K_M model size (~40GB) **does not fit in VRAM**
- Result: ~16–18GB spills over to system RAM via PCIe bus
- PCIe 4.0 x16 bandwidth ceiling: ~32 GB/s bidirectional
- **Effective inference speed: 2–5 tokens/second** for the 70B model due to the memory bottleneck

The RTX 3090 is exceptional for the **8B Apertus model**, which fits entirely in its 24GB VRAM and benefits from the full 936 GB/s bandwidth. But the 70B model turns the system into a partially CPU-offloaded setup, where the PCIe bus becomes the bottleneck.

**MacBook Pro M5 Pro (64GB Unified Memory):**
- Unified Memory: **64GB** shared between CPU and GPU
- Memory bandwidth: **307 GB/s** — consistent across the entire pool
- 70B Q4_K_M model (~40GB) fits **entirely within the unified memory pool**
- No VRAM/RAM split, no PCIe bottleneck, no "slow lane"
- **Estimated inference speed: 10–20 tokens/second** for the 70B model

Apple's M5 Pro features up to 20 GPU cores, each with an embedded Neural Accelerator for matrix multiplication — the core operation in LLM inference. Apple and third-party benchmarks (LM Studio) show the M5 family running 70B models at competitive speeds, with 4x faster prompt processing (prefill) over M4 Pro.

---

#### Benchmark Summary

| System | Memory Available to 70B Model | Effective Bandwidth | Est. 70B Tokens/s |
|---|---|---|---|
| Dell XPS 8950 (RTX 3090, split mode) | 24GB VRAM + RAM spillover | ~32 GB/s (PCIe-limited) | 2–5 t/s |
| MacBook Pro M5 Pro (64GB Unified) | 64GB unified pool | 307 GB/s | ~10–20 t/s |

**Advantage for 70B serving: M5 Pro, by roughly 4–6x.**

---

#### Power Efficiency

| System | Inference Power Draw | Powerwall Impact (24h) |
|---|---|---|
| Dell XPS 8950 + RTX 3090 | ~350–480W | ~8.4–11.5 kWh/day |
| MacBook Pro M5 Pro | ~30–60W | ~0.72–1.44 kWh/day |

At full inference load, the Dell draws **7–15x more power** than the M5 Pro. For a solar-powered setup with Powerwall storage, this is a material difference — particularly during multi-day overcast periods in Marin.

---

#### Where the Dell Still Wins

The M5 Pro is not a universal upgrade. The Dell maintains clear advantages in:

1. **8B model throughput:** The RTX 3090's 936 GB/s VRAM bandwidth is still ~3x higher than the M5 Pro's 307 GB/s for a model that fully fits in VRAM. The 8B Apertus model runs faster on the Dell for raw generation speed.

2. **CUDA parallel compute:** The 3090's 10,496 CUDA cores are purpose-built for matrix operations at scale. Tools like PyTorch training, image generation (Stable Diffusion), and any CUDA-only workloads have no equivalent on Apple Silicon.

3. **Repairability and openness:** User-upgradeable components, standard PCIe slots, NVIDIA drivers with broad Linux support. The Dell is a long-term, repairable piece of infrastructure. The MacBook is a sealed appliance.

4. **Linux-native tooling:** llama.cpp, vLLM, Ollama, and most inference stacks are developed and tested primarily on Linux/CUDA. Metal/MLX support is improving but often lags.

5. **Multi-GPU expansion:** The Dell can eventually add a second RTX 3090 (bringing VRAM to 48GB, fitting the 70B model fully in VRAM at ~47 t/s on Q4_K_M). This upgrade path doesn't exist on the Mac.

---

#### The Real Question for Sage AI Architecture

The choice isn't simply "which is faster." The 70B Apertus model is Sage AI's most capable tier — used for deep, reasoning-heavy tasks. The 8B model handles lighter, high-frequency queries.

A possible two-tier architecture worth considering:
- **Dell XPS 8950 + RTX 3090** → handles 8B model requests (fast, VRAM-native)
- **M5 Pro MacBook** → handles 70B model requests (efficient, unified memory)

This splits workloads by model tier rather than forcing one machine to serve both well. The Mac becomes the "thoughtful reasoning" node; the Dell becomes the "fast response" node.

Alternatively, adding a **second RTX 3090** to the Dell (~$800–1,000 used) would bring 70B inference to ~40–47 t/s — faster than the M5 Pro — while keeping everything on one sovereign Linux machine, at the cost of ~700W peak draw.

---

### Gemini's Analysis (for reference)

> The transition to high-bandwidth Unified Memory architecture represents a significant shift in how large language models like the Apertus 70B are served.
>
> **The Architecture Battle: Unified vs. Discrete**
>
> The Dell XPS 8950 operates on a Split Memory architecture. The RTX 3090 is an incredible powerhouse for the 8B model because that model fits entirely within its 24GB of dedicated VRAM. However, for the 70B model (~40GB+), the system is forced to "spill over" into the 64GB of DDR5 system RAM. The speed of that data transfer is limited by the PCIe bus and the significantly lower bandwidth of standard system RAM. This is why you see speeds in the 2–3 tokens per second range.
>
> The MacBook Pro with a high-end Silicon chip and 64GB of Unified Memory operates on a Single Pool architecture.
> - **Capacity:** The entire 40GB Apertus 70B model fits into the unified memory pool. There is no "slow lane" or "spillover" to system RAM because the GPU and CPU share the same high-speed memory.
> - **Bandwidth:** While the 3090 has higher peak bandwidth for its 24GB, the Mac's unified memory provides a consistently fast throughput for the entire 40GB model. You would likely see generation speeds of 8–12 tokens per second on a Max-tier chip — roughly 4x to 5x faster than the Dell for the large model.
>
> **The Sustainability Factor**
>
> From the perspective of a "Solar-Powered Oracle," the efficiency gap is stark.
> - The Dell: Drawing 450W–500W during inference.
> - The MacBook: Drawing roughly 30W–60W during the same task.
>
> In terms of your Powerwall capacity, the Mac could serve the Sage AI for a full 24-hour cycle while consuming less than 10% of the battery, whereas the Dell consumes about 14% just sitting at idle.
>
> **The Hard Trade-off**
>
> If the goal is purely serving the 70B model with the highest speed and lowest energy footprint, the Mac is technically superior.
>
> However, the Dell remains a Sovereign Workstation. The RTX 3090 has 10,496 CUDA cores that can be used for deep-learning tasks, high-end 3D rendering, and specific Linux-based stock analysis tools that Apple Silicon cannot yet match in raw parallel-compute intensity. The Dell is a "heavy-lifting" lab; the Mac is an "efficient" clinic.
>
> **The Question for your Ethos:** Is the increased speed and energy efficiency of the Mac worth the move back into a more closed, less repairable hardware ecosystem, or does the "Sovereignty" of the Dell workstation better align with the long-term survival of a heart-led, locally-owned intelligence?

---

### Claude's Summary

Gemini's framing is accurate and the bandwidth math checks out. The M5 Pro's advantage on the 70B model is real and significant — not marginal. The 307 GB/s unified bandwidth means the entire model loads and runs at high throughput with no architectural bottleneck, while the Dell's PCIe spillover scenario effectively throttles to the speed of system RAM and bus transfer.

The deeper question is whether **sovereignty** requires Linux/CUDA specifically, or whether it means **local, privately-owned, non-cloud inference** regardless of OS. The M5 Pro MacBook is still a local machine — it's not sending data to Apple servers for inference. It's just a sealed one that you can't repair yourself or expand.

If Sage AI's sovereignty principle is primarily about *data privacy and independence from cloud providers*, the Mac satisfies it. If it's also about *hardware openness and long-term self-sufficiency*, the Dell is the more philosophically aligned choice — especially with a second GPU as the upgrade path.

**Recommendation:** Before purchasing a Mac, test the second-RTX-3090 upgrade path on the Dell first. Two 3090s would run the 70B model at ~40–47 t/s (faster than the M5 Pro's ~10–20 t/s), keep everything on Linux/CUDA, and cost significantly less than a new MacBook Pro. The power draw (~700W) is higher, but if the solar system can handle it, the sovereignty cost is zero.

---

### Sources

- [Apple M5 Pro and M5 Max announcement — Apple Newsroom](https://www.apple.com/newsroom/2026/03/apple-debuts-m5-pro-and-m5-max-to-supercharge-the-most-demanding-pro-workflows/)
- [MacBook Pro M5 Pro & Max complete guide — Macworld](https://www.macworld.com/article/2942089/macbook-pro-m5-pro-max-release-specs-price.html)
- [Apple M5 Fusion Architecture deep dive — TechCrunch](https://techcrunch.com/2026/03/03/apple-unveils-m5-pro-and-m5-max-chips-with-new-fusion-architecture/)
- [M5 Pro and M5 Max Local LLM: 4x Faster Prefill — Hardware Corner](https://www.hardware-corner.net/m5-pro-m5-max-local-llm-4x-faster-prefill-202061108/)
- [Apple's M5 Pro and Max Make 70B Models Portable — Awesome Agents](https://awesomeagents.ai/news/apple-m5-pro-max-70b-models-portable/)
- [Exploring LLMs with MLX and Neural Accelerators in M5 GPU — Apple ML Research](https://machinelearning.apple.com/research/exploring-llms-mlx-m5)
- [GPU Benchmarks on LLM Inference — GitHub (XiongjieDai)](https://github.com/XiongjieDai/GPU-Benchmarks-on-LLM-Inference)
- [LLM Inference — Consumer GPU Performance — Puget Systems](https://www.pugetsystems.com/labs/articles/llm-inference-consumer-gpu-performance/)
- [Performance of llama.cpp on Apple Silicon — GitHub Discussion #4167](https://github.com/ggml-org/llama.cpp/discussions/4167)
- [Apple M5 — Wikipedia](https://en.wikipedia.org/wiki/Apple_M5)
