# 사내 LLM 구축 가이드

> 외부 API(Claude·OpenAI·Gemini) 차단 환경에서 자체 LLM을 호스팅해 chatbot·routing·embedding 용도로 활용하는 방법.
> 대상 워크로드: 도구 라우팅(JSON 분류), 단답 응답 보조, 한국어 회화.

## 1. 결정 흐름

| 질문 | YES → | NO → |
|---|---|---|
| GPU(VRAM 16GB+) 확보 가능한가 | vLLM (운영급) | Ollama·llama.cpp (CPU+소형 모델) |
| 동시 사용자 50명+ | vLLM (배치·페이지드 KV 캐시) | Ollama로도 충분 |
| 모델 자주 교체할 예정 | Ollama (`ollama pull` 1줄) | vLLM (성능 우선) |
| 한국어 비중 80%+ | Qwen2.5·EXAONE·Llama-3.1-Korean | Llama-3.1·Mistral |

**현장 권장 출발점:** vLLM + Qwen2.5-14B-Instruct (한국어 잘함, 도구 호출 안정) + 단일 A100 40GB / H100 80GB / RTX 6000 Ada 48GB 1장.

---

## 2. 배포 스택 비교

| 항목 | vLLM | Ollama | TGI (Hugging Face) | LM Studio |
|---|---|---|---|---|
| 처리량 | ★★★★★ (PagedAttention·연속 배치) | ★★ | ★★★★ | ★ |
| 설치 난이도 | 중 (Python·CUDA) | 매우 쉬움 | 중 (Docker) | GUI 클릭 |
| OpenAI 호환 API | ✅ (`/v1/chat/completions`) | ✅ (`/v1/...`) | ✅ | ✅ |
| 한국어 모델 지원 | HF 거의 다 됨 | 공식 라이브러리 + 사용자 등록 | HF 거의 다 됨 | GGUF 모델 |
| 멀티 GPU | ✅ (tensor_parallel_size) | 제한적 | ✅ | ❌ |
| 운영 권장 | ✅ 운영 | 개발·POC | ✅ 운영 (Docker 선호 시) | 데스크톱 데모 |

**선택 가이드**
- POC·도구 라우터 1대로 검증 → **Ollama**
- 실제 운영 (동시 사용자·SLA) → **vLLM** 또는 **TGI**
- 모델 비교 빠르게 → LM Studio (단, 운영 부적합)

---

## 3. 하드웨어 요구사항

VRAM 추정값 (FP16 기준, KV 캐시 별도). 양자화 시 1/2 ~ 1/4로 줄어듦.

| 모델 크기 | FP16 VRAM | INT4(GPTQ/AWQ) VRAM | 적정 GPU 1장 | 비고 |
|---|---|---|---|---|
| 3B  | 6 GB  | 2~3 GB  | RTX 3060 12GB·T4 | 라우터 전용 추천 |
| 7B  | 14 GB | 5~6 GB  | RTX 4090 24GB·A10 24GB | 응답 보조까지 가능 |
| 14B | 28 GB | 9~11 GB | A100 40GB·RTX 6000 Ada 48GB | 운영 추천(범용) |
| 32B | 64 GB | 20~22 GB | A100 80GB·H100 80GB | 답변 품질 최상 |
| 70B | 140 GB | 40~45 GB | A100/H100 2장 | 답변 보조 전용 |

**룰**
- **라우터 전용**: 3B~7B + INT4 양자화로 충분 (분류 정확도는 모델 크기보다 시스템 프롬프트·예제 영향이 큼)
- **응답 생성**: 14B 이상 권장 (7B는 표 정리·한국어 표현력 떨어짐)
- VRAM은 모델 + KV 캐시 + 배치 여유로 **공칭값의 1.5배**를 잡을 것

---

## 4. 모델 추천

라우팅·한국어·도구 호출 우선.

| 모델 | 크기 | 특징 | HF Path |
|---|---|---|---|
| Qwen2.5-Instruct | 3B / 7B / 14B / 32B / 72B | 한국어 양호, 도구 호출 안정, JSON 출력 잘함 | `Qwen/Qwen2.5-14B-Instruct` |
| EXAONE 3.5 | 2.4B / 7.8B / 32B | LG AI Research, 한국어 특화 | `LGAI-EXAONE/EXAONE-3.5-7.8B-Instruct` |
| Llama-3.1-Korean-Bllossom | 8B / 70B | 라마3 한국어 파인튜닝 | `Bllossom/llama-3.1-Korean-Bllossom-8B` |
| Solar-Pro | 22B | Upstage, 한국어 균형 | `upstage/SOLAR-10.7B-Instruct-v1.0` |
| Llama-3.1-Instruct | 8B / 70B | 도구 호출 native 지원 | `meta-llama/Llama-3.1-8B-Instruct` |

**현재 (2026-05 기준) 추천**
- 라우터 전용: **Qwen2.5-7B-Instruct-AWQ** (INT4) — VRAM 6GB, JSON 분류 성능 우수
- 답변 생성: **Qwen2.5-14B-Instruct** (FP16) 또는 **EXAONE-3.5-32B-Instruct** (INT4)

> 라이선스 주의 — 사내 사용/상용 가능 여부는 모델 카드의 라이선스 항목을 확인. Llama 3.1 Community License, Qwen 라이선스는 상용 허용(특정 조건). EXAONE은 자체 라이선스(비상용/연구는 OK, 사내 운영은 별도 확인).

---

## 5. 설치 — vLLM 예시 (Ubuntu 22.04)

### 5-1. 사전 요구
- NVIDIA Driver 535+, CUDA 12.1+
- Python 3.10~3.11
- 디스크 100GB+ (모델 다운로드 캐시)

### 5-2. 설치

```bash
python -m venv /opt/vllm/.venv
source /opt/vllm/.venv/bin/activate
pip install --upgrade pip
pip install vllm==0.6.*           # 2026-05 기준 안정버전
```

### 5-3. 실행 (OpenAI 호환 서버)

```bash
# 14B FP16 (A100 40GB 1장)
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-14B-Instruct \
  --served-model-name qwen-14b \
  --host 0.0.0.0 --port 8001 \
  --max-model-len 8192 \
  --gpu-memory-utilization 0.90

# 7B-AWQ INT4 (RTX 4090 1장)
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-7B-Instruct-AWQ \
  --quantization awq \
  --served-model-name qwen-7b-router \
  --host 0.0.0.0 --port 8002 \
  --max-model-len 4096
```

### 5-4. 헬스 체크

```bash
curl http://localhost:8001/v1/models
curl -X POST http://localhost:8001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen-14b","messages":[{"role":"user","content":"안녕"}],"max_tokens":64}'
```

### 5-5. systemd 등록 (운영)

`/etc/systemd/system/vllm-qwen14b.service`:
```ini
[Unit]
Description=vLLM Qwen 14B
After=network.target

[Service]
User=vllm
WorkingDirectory=/opt/vllm
ExecStart=/opt/vllm/.venv/bin/python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-14B-Instruct --served-model-name qwen-14b \
  --host 0.0.0.0 --port 8001 --max-model-len 8192
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now vllm-qwen14b
sudo journalctl -u vllm-qwen14b -f
```

---

## 6. 설치 — Ollama 보조 (Windows / Linux 공통)

POC·라우터 단독 운영에 적합.

```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh
# Windows: ollama.com/download → 설치

# 모델 받기 (라이브러리 목록은 ollama.com/library)
ollama pull qwen2.5:14b-instruct-q4_K_M
ollama pull qwen2.5:7b-instruct-q4_K_M

# OpenAI 호환 API: 기본 11434 포트
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5:14b-instruct-q4_K_M","messages":[{"role":"user","content":"안녕"}]}'
```

서버 외부 노출 시 `OLLAMA_HOST=0.0.0.0:11434` 환경변수 + 방화벽 설정.

---

## 7. eacct_chatbot 연동

사내 LLM을 라우터로 쓰는 경우 — `chat_handler.py`에 OpenAI 호환 클라이언트 핸들러를 추가하거나, 기존 Miso 라우터 자리에 사내 LLM을 끼워 넣는 방식.

### 옵션 1 — 사내 LLM이 OpenAI 호환 API 제공 (vLLM·Ollama·TGI)

`chat_handler.py` 의 `_detect_intent`를 다음과 같이 교체 가능:

```python
import openai

class OnpremRouterHandler:
    def __init__(self, base_url: str, model: str, api_key: str = "EMPTY"):
        self._client = openai.OpenAI(base_url=base_url, api_key=api_key)
        self._model = model

    def detect_intent(self, prompt: str) -> dict | None:
        resp = self._client.chat.completions.create(
            model=self._model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0,
            max_tokens=512,
        )
        text = resp.choices[0].message.content
        m = re.search(r"\{.*\}", text, re.DOTALL)
        return json.loads(m.group()) if m else None
```

환경변수 예시:
```ini
ONPREM_LLM_BASE_URL=http://onprem-llm.intra:8002/v1
ONPREM_LLM_MODEL=qwen-7b-router
ONPREM_LLM_API_KEY=EMPTY   # vLLM/Ollama 기본은 인증 없음
```

`AI_BACKEND=onprem` 같은 새 분기를 `create_handler()`에 추가하거나, `MisoChatHandler`의 라우터 자리만 OnpremRouterHandler로 교체하는 하이브리드 구성 가능.

### 옵션 2 — 사내 LLM을 Miso 백엔드 모델로 등록

미소(Dify) 콘솔 → 모델 공급자 → OpenAI Compatible 추가 → base_url에 vLLM 주소 입력 → 라우터/답변 앱이 사내 LLM을 쓰게 됨. **챗봇 코드 무수정.**

이 방식이 가장 적은 변경으로 사내 LLM 전환 가능. 단, 미소 인프라가 사내 LLM 엔드포인트에 접근 가능해야 함.

---

## 8. 운영 체크리스트

| 항목 | 체크 |
|---|---|
| GPU·VRAM 용량과 모델 크기 매칭 | □ |
| 모델 라이선스 사내 사용 적합성 | □ |
| API 인증 토큰 적용 (외부 노출 시) — vLLM `--api-key` | □ |
| 로그 보관 (요청·응답) — 개인정보 마스킹 정책 | □ |
| 컨텍스트 길이(max-model-len)와 KV 캐시 메모리 산정 | □ |
| 동시 요청 한도(max-num-seqs) 설정 | □ |
| 모니터링 (GPU 사용률·요청 큐·OOM) — `nvidia-smi`·Prometheus exporter | □ |
| systemd 자동 재시작·로그 로테이션 | □ |
| 디스크 캐시 정리 정책 (모델 교체 시 미사용 캐시 삭제) | □ |
| 백업 모델 1개 — 메인 모델 OOM·hang 시 폴백 | □ |

---

## 9. 비용·성능 참고

- **단일 RTX 4090 (24GB) 1대 / Qwen2.5-7B-AWQ / vLLM**: 약 150 tok/s 출력, 동시 16~32 요청 처리. 라우터 전용으로 충분.
- **A100 40GB 1대 / Qwen2.5-14B / FP16 / vLLM**: 약 80 tok/s 출력, 동시 8~16 요청 처리. 답변 + 라우터 겸용.
- **EXAONE 32B INT4 / A100 80GB 1대**: 약 40 tok/s 출력. 답변 품질 우선 시.

응답 지연 SLA가 중요한 챗봇이라면 라우터/답변을 **2대로 분리** 권장 (라우터 = 작은 모델 빠르게, 답변 = 큰 모델 품질). 단일 GPU에서 둘 다 동시에 띄우려면 양자화 + KV 캐시 메모리 충돌 주의.

---

## 10. 참고 자료

- vLLM 공식: https://docs.vllm.ai
- Ollama: https://ollama.com
- Hugging Face 모델 카드 (각 모델 라이선스·벤치마크 확인)
- vLLM Quantization 가이드: AWQ/GPTQ/SqueezeLLM/FP8 비교
