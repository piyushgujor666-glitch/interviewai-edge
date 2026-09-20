import os, time, uuid, json
from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .ai.providers.demo_provider import analyze_answer, next_question

app = FastAPI(title="InterviewAI Edge API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROVIDER = os.getenv("AI_PROVIDER", "demo").lower()
sessions = {}

QUESTIONS = {
    "C++ / DSA": "Explain polymorphism in C++.",
    "Java": "What is the difference between method overloading and overriding?",
    "JavaScript": "Explain the event loop in JavaScript.",
    "React": "What is the difference between state and props in React?",
    "DBMS": "What is normalization and why is it used?",
    "OS": "What is the difference between a process and a thread?",
    "Computer Networks": "What is the difference between TCP and UDP?",
    "Full Stack": "Explain how a browser communicates with a backend API.",
    "HR": "Tell me about yourself and a project you are proud of.",
    "Behavioral": "Tell me about a difficult problem you solved and how you approached it.",
}

class StartRequest(BaseModel):
    interviewType: str
    difficulty: str = "Medium"
    mode: str = "text"

class AnswerRequest(BaseModel):
    answer: str

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "InterviewAI Edge"}

@app.get("/api/ai/status")
def ai_status():
    if PROVIDER == "local":
        return {
            "mode": "LOCAL AI",
            "provider": "LOCAL_PROVIDER",
            "executionProvider": "configured-local-runtime",
            "message": "Local provider selected. Verify the runtime on the target Snapdragon device."
        }
    return {
        "mode": "DEMO MODE",
        "provider": "DEMO_PROVIDER",
        "executionProvider": "deterministic-rubric",
        "message": "Demo mode is active. No Snapdragon/NPU claim is made."
    }

@app.post("/api/interview/start")
def start_interview(req: StartRequest):
    sid = str(uuid.uuid4())
    question = QUESTIONS.get(req.interviewType, QUESTIONS["Full Stack"])
    sessions[sid] = {
        "id": sid,
        "type": req.interviewType,
        "difficulty": req.difficulty,
        "mode": req.mode,
        "startedAt": datetime.now(timezone.utc).isoformat(),
        "questions": [{"question": question, "answer": None, "analysis": None}],
    }
    return {"sessionId": sid, "question": question, "inferenceMode": "DEMO MODE" if PROVIDER != "local" else "LOCAL AI"}

@app.post("/api/interview/{sid}/answer")
def submit_answer(sid: str, req: AnswerRequest):
    session = sessions.get(sid)
    if not session:
        raise HTTPException(404, "Interview session not found")
    current = session["questions"][-1]
    analysis = analyze_answer(current["question"], req.answer)
    current["answer"] = req.answer
    current["analysis"] = analysis
    follow = next_question(current["question"], analysis, session["difficulty"])
    session["questions"].append({"question": follow, "answer": None, "analysis": None})
    return {"analysis": analysis, "nextQuestion": follow}

@app.get("/api/interview/{sid}/report")
def report(sid: str):
    session = sessions.get(sid)
    if not session:
        raise HTTPException(404, "Interview session not found")
    answered = [q for q in session["questions"] if q["analysis"]]
    if answered:
        avg = lambda k: round(sum(q["analysis"][k] for q in answered) / len(answered))
        metrics = {
            "technicalRelevance": avg("technicalRelevance"),
            "completeness": avg("completeness"),
            "conceptCoverage": avg("conceptCoverage"),
            "clarity": avg("clarity"),
        }
    else:
        metrics = {"technicalRelevance": 0, "completeness": 0, "conceptCoverage": 0, "clarity": 0}
    return {
        "session": session,
        "metrics": metrics,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    }

@app.get("/api/performance")
def performance():
    return {
        "mode": "DEMO MODE" if PROVIDER != "local" else "LOCAL AI",
        "device": "Not detected in demo environment",
        "model": "Deterministic answer-analysis provider",
        "executionProvider": "deterministic-rubric",
        "modelLoadMs": None,
        "inferenceMs": None,
        "memoryMb": None,
        "message": "Run the Snapdragon benchmark on compatible hardware for measured values."
    }
