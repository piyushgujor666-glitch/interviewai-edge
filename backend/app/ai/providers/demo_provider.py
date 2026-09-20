import re
from typing import Dict, List

TOPIC_CONCEPTS = {
    "polymorphism": ["polymorphism", "overloading", "overriding", "virtual", "runtime", "compile-time"],
    "inheritance": ["inheritance", "base", "derived", "single", "multiple", "hierarchical"],
    "dbms": ["database", "normalization", "sql", "transaction", "acid", "primary key"],
    "operating systems": ["process", "thread", "memory", "scheduling", "deadlock"],
}

def _find_concepts(answer: str, concepts: List[str]) -> List[str]:
    low = answer.lower()
    return [c for c in concepts if re.search(r"\b" + re.escape(c) + r"\b", low)]

def analyze_answer(question: str, answer: str) -> Dict:
    q = question.lower()
    if "polymorphism" in q:
        topic, concepts = "polymorphism", TOPIC_CONCEPTS["polymorphism"]
    elif "inheritance" in q:
        topic, concepts = "inheritance", TOPIC_CONCEPTS["inheritance"]
    elif "database" in q or "dbms" in q:
        topic, concepts = "dbms", TOPIC_CONCEPTS["dbms"]
    elif "operating system" in q:
        topic, concepts = "operating systems", TOPIC_CONCEPTS["operating systems"]
    else:
        topic, concepts = "general", []

    matched = _find_concepts(answer, concepts)
    coverage = round((len(matched) / len(concepts)) * 100) if concepts else min(95, 45 + len(answer.split()) // 2)
    completeness = min(95, 35 + len(answer.split()) * 2)
    relevance = min(96, 50 + len(matched) * 8 + (12 if answer.strip() else 0))
    clarity = min(94, 55 + (10 if 15 <= len(answer.split()) <= 100 else 0) + (5 if "." in answer else 0))

    missing = [c for c in concepts if c not in matched]
    if not answer.strip():
        feedback = "No answer was provided. Give a concise definition, explain the key concept, and add one example."
    elif missing:
        feedback = f"Good start. Strengthen the answer by covering: {', '.join(missing[:3])}."
    else:
        feedback = "Good coverage. Add a concrete example and explain when the concept is useful."

    return {
        "topic": topic,
        "technicalRelevance": relevance,
        "completeness": completeness,
        "conceptCoverage": coverage,
        "clarity": clarity,
        "matchedConcepts": matched,
        "missingConcepts": missing,
        "feedback": feedback,
    }

def next_question(question: str, analysis: Dict, difficulty: str) -> str:
    topic = analysis.get("topic", "general")
    if topic == "polymorphism":
        if analysis.get("conceptCoverage", 0) < 60:
            return "Can you explain the difference between compile-time and runtime polymorphism?"
        return "What is the role of virtual functions in runtime polymorphism?"
    if topic == "inheritance":
        if analysis.get("conceptCoverage", 0) < 60:
            return "Can you explain the difference between a base class and a derived class?"
        return "What is the diamond problem in multiple inheritance?"
    if topic == "dbms":
        return "Can you explain one ACID property with a practical example?"
    if topic == "operating systems":
        return "What is the difference between a process and a thread?"
    return f"Give a practical example related to {difficulty.lower()}-level software engineering."
