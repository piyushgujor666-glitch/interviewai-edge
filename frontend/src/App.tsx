import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  ArrowRight, BrainCircuit, Check, ChevronRight, CircleDot, Cpu, Gauge,
  Github, Headphones, LayoutDashboard, Mic, Moon, Play, Radio, ShieldCheck,
  Sparkles, Sun, Terminal, Trophy, Volume2, X, Zap
} from "lucide-react";

const API = "http://localhost:8000";

type Status = { mode:string; provider:string; executionProvider:string; message:string };

async function getStatus(): Promise<Status> {
  try { const r = await fetch(`${API}/api/ai/status`); return await r.json(); }
  catch { return {mode:"DEMO MODE",provider:"DEMO_PROVIDER",executionProvider:"browser-demo",message:"Backend unavailable — browser demo mode is active."}; }
}

const navItems = [
  ["Dashboard","/dashboard",LayoutDashboard],
  ["Interview","/interview",Mic],
  ["Technology","/technology",Cpu],
  ["Performance","/performance",Gauge],
];

function Shell({children}:{children:React.ReactNode}) {
  const [status,setStatus] = useState<Status|null>(null);
  const [light,setLight] = useState(false);
  useEffect(()=>{getStatus().then(setStatus)},[]);
  return <div className={light ? "min-h-screen bg-slate-50 text-slate-900" : "min-h-screen bg-[#07080b] text-white"}>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080b]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e53232] shadow-[0_0_28px_rgba(229,50,50,.35)]"><BrainCircuit size={20}/></div>
          <div><div className="font-bold tracking-tight">InterviewAI <span className="text-[#ef4444]">Edge</span></div><div className="text-[10px] uppercase tracking-[.25em] text-white/40">On-device interview lab</div></div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(([label,path,Icon]:any)=><Link key={path} to={path} className="rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"><Icon size={15} className="mr-2 inline"/>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#e53232]/25 bg-[#e53232]/10 px-3 py-1.5 text-xs text-red-200 sm:flex"><span className="h-2 w-2 rounded-full bg-[#ef4444] shadow-[0_0_10px_#ef4444]"/>{status?.mode ?? "CHECKING AI"}</div>
          <button onClick={()=>setLight(v=>!v)} className="rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/5">{light?<Sun size={17}/>:<Moon size={17}/>}</button>
          <a href="https://github.com" target="_blank" className="hidden rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/5 sm:block"><Github size={17}/></a>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-white/10 px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-white/40 md:flex-row"><span>InterviewAI Edge © 2026</span><span>Practice Interviews. Run AI Locally.</span></div></footer>
  </div>
}

function Landing(){
  return <Shell><section className="noise relative overflow-hidden border-b border-white/10"><div className="absolute inset-0 grid-bg opacity-50"/><div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:py-28">
    <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200"><Sparkles size={14}/> SNAPDRAGON AI LAB · EDGE AI</div>
      <h1 className="max-w-3xl text-5xl font-black leading-[.96] tracking-[-.04em] sm:text-7xl">Practice interviews.<br/><span className="text-[#ef4444]">Run AI locally.</span></h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">An adaptive AI interview coach designed for Snapdragon-powered PCs — with voice practice, explainable feedback, and a local-first inference architecture.</p>
      <div className="mt-9 flex flex-wrap gap-3"><Link to="/interview" className="group inline-flex items-center gap-2 rounded-xl bg-[#e53232] px-5 py-3.5 font-semibold shadow-[0_0_35px_rgba(229,50,50,.25)] transition hover:bg-red-500">Start Interview <ArrowRight size={18} className="transition group-hover:translate-x-1"/></Link><Link to="/technology" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold hover:bg-white/10">Explore Edge AI <Cpu size={18}/></Link></div>
      <div className="mt-10 flex gap-8 text-xs text-white/35"><span><b className="text-white">LOCAL-FIRST</b><br/>AI architecture</span><span><b className="text-white">ADAPTIVE</b><br/>question engine</span><span><b className="text-white">MEASURABLE</b><br/>performance</span></div>
    </div>
    <div className="relative"><div className="absolute -inset-10 rounded-full bg-red-500/10 blur-3xl"/><div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0f14] p-3 shadow-2xl glow">
      <div className="rounded-[20px] border border-white/10 bg-[#090a0d] p-5">
        <div className="mb-6 flex items-center justify-between"><div><div className="text-xs text-white/40">TECHNICAL INTERVIEW</div><div className="mt-1 font-semibold">C++ / DSA · Medium</div></div><div className="rounded-full bg-red-500/10 px-3 py-1 text-[10px] text-red-200">LOCAL AI</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="text-xs text-white/35">AI INTERVIEWER</div><div className="mt-3 text-xl font-semibold leading-8">Explain polymorphism in C++.</div><div className="mt-5 flex items-center gap-3 text-sm text-white/45"><span className="grid h-9 w-9 place-items-center rounded-full bg-red-500/15 text-red-300"><Volume2 size={17}/></span>AI is ready for your answer</div></div>
        <div className="mt-4 grid grid-cols-2 gap-3"><Metric n="82%" t="Technical relevance"/><Metric n="74%" t="Concept coverage"/></div>
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/[.06] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-red-200"><Zap size={14}/> NEXT QUESTION</div><p className="mt-2 text-sm text-white/70">What is the role of virtual functions in runtime polymorphism?</p></div>
      </div>
    </div></div>
  </div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><div className="mb-10 max-w-2xl"><div className="text-xs font-bold uppercase tracking-[.22em] text-red-400">Why edge AI</div><h2 className="mt-3 text-4xl font-bold tracking-tight">The interview loop stays close to the device.</h2></div><div className="grid gap-4 md:grid-cols-4">{[
    ["LOWER DEPENDENCY","Design the core experience without requiring constant cloud access.",Zap],
    ["PRIVACY","Local processing can keep sensitive interview data closer to the user.",ShieldCheck],
    ["ADAPTIVE","Questions respond to what the candidate actually says.",BrainCircuit],
    ["MEASURABLE","Benchmark the real model/runtime on target hardware.",Gauge]
  ].map(([t,d,I]:any)=><div key={t} className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><I className="text-red-400" size={21}/><div className="mt-5 text-sm font-bold">{t}</div><p className="mt-2 text-sm leading-6 text-white/45">{d}</p></div>)}</div></section></Shell>
}

function Metric({n,t}:{n:string,t:string}){return <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><div className="text-2xl font-bold">{n}</div><div className="mt-1 text-xs text-white/35">{t}</div></div>}

function Dashboard(){
  const [history,setHistory] = useState<any[]>([]);
  useEffect(()=>setHistory(JSON.parse(localStorage.getItem("interview-history")||"[]")),[]);
  return <Shell><section className="mx-auto max-w-7xl px-5 py-12"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="text-xs uppercase tracking-[.22em] text-red-400">Workspace</div><h1 className="mt-2 text-4xl font-bold">Hello, Developer <span className="text-red-400">👋</span></h1><p className="mt-2 text-white/45">Ready for your next interview?</p></div><Link to="/interview" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold">Start interview <ArrowRight size={17}/></Link></div>
    <div className="mt-10 grid gap-4 md:grid-cols-4">{[["TOTAL INTERVIEWS",history.length,""],["PRACTICE TIME",history.length?"18m":"0m",""],["TECHNICAL",history.filter(x=>x.type?.includes("C++")||x.type==="Java").length,""],["AVG CONCEPT COVERAGE",history.length?"76%":"—",""]].map(([a,b,c])=><div className="rounded-2xl border border-white/10 bg-white/[.025] p-5" key={String(a)}><div className="text-xs text-white/35">{a}</div><div className="mt-3 text-3xl font-bold">{b}{c}</div></div>)}</div>
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]"><div className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><div className="flex justify-between"><div><h2 className="font-semibold">Interview history</h2><p className="mt-1 text-sm text-white/40">Your recent practice sessions.</p></div><Trophy className="text-red-400" size={20}/></div>{history.length===0?<div className="mt-12 rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-white/35">No interviews yet. Start your first session.</div>:<div className="mt-6 space-y-2">{history.slice(0,5).map((x,i)=><div key={i} className="flex items-center justify-between rounded-xl border border-white/10 p-4"><div><div className="font-medium">{x.type}</div><div className="mt-1 text-xs text-white/35">{new Date(x.date).toLocaleString()}</div></div><span className="text-sm text-red-300">{x.score ?? "—"}%</span></div>)}</div>}</div>
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[.06] p-6"><Radio className="text-red-400" size={22}/><h2 className="mt-5 text-xl font-semibold">Edge AI status</h2><p className="mt-2 text-sm leading-6 text-white/45">This build starts in deterministic demo mode. Configure a supported local runtime on Snapdragon hardware before claiming local NPU execution.</p><Link to="/technology" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-red-300">View architecture <ChevronRight size={16}/></Link></div></div>
  </section></Shell>
}

function Interview(){
  const [type,setType]=useState("C++ / DSA"), [difficulty,setDifficulty]=useState("Medium"), [mode,setMode]=useState("text");
  const [sid,setSid]=useState(""), [question,setQuestion]=useState(""), [answer,setAnswer]=useState(""), [analysis,setAnalysis]=useState<any>(null), [recording,setRecording]=useState(false), [loading,setLoading]=useState(false);
  const recognitionRef=useRef<any>(null); const nav=useNavigate();
  const start=async()=>{setLoading(true); try{const r=await fetch(`${API}/api/interview/start`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({interviewType:type,difficulty,mode})}); const d=await r.json(); setSid(d.sessionId);setQuestion(d.question);setAnalysis(null);}catch{setQuestion("Explain polymorphism in C++.");}finally{setLoading(false)}};
  const submit=async()=>{if(!answer.trim())return;setLoading(true);try{const r=await fetch(`${API}/api/interview/${sid}/answer`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer})});const d=await r.json();setAnalysis(d.analysis);setQuestion(d.nextQuestion);setAnswer("");}finally{setLoading(false)}};
  const toggleVoice=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert("Speech recognition is not supported in this browser. Use Chrome/Edge or type your answer.");return;} if(recording){recognitionRef.current?.stop();setRecording(false);return;}const r=new SR();r.continuous=true;r.interimResults=true;r.onresult=(e:any)=>{let out="";for(let i=e.resultIndex;i<e.results.length;i++)out+=e.results[i][0].transcript+" ";setAnswer(v=>(v+" "+out).trim())};r.onend=()=>setRecording(false);recognitionRef.current=r;r.start();setRecording(true)};
  return <Shell><section className="mx-auto max-w-7xl px-5 py-12"><div className="grid gap-6 lg:grid-cols-[.32fr_1fr]">
    <aside className="rounded-2xl border border-white/10 bg-white/[.025] p-5 h-fit"><div className="text-xs uppercase tracking-[.2em] text-red-400">Setup</div><h2 className="mt-2 text-xl font-semibold">Build your interview</h2><label className="mt-6 block text-xs text-white/35">INTERVIEW TYPE</label><select value={type} onChange={e=>setType(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b0c10] p-3 outline-none">{["C++ / DSA","Java","JavaScript","React","DBMS","OS","Computer Networks","Full Stack","HR","Behavioral"].map(x=><option key={x}>{x}</option>)}</select><label className="mt-5 block text-xs text-white/35">DIFFICULTY</label><div className="mt-2 grid grid-cols-3 gap-2">{["Easy","Medium","Hard"].map(x=><button onClick={()=>setDifficulty(x)} className={`rounded-lg border p-2 text-xs ${difficulty===x?"border-red-500/50 bg-red-500/10 text-red-200":"border-white/10 text-white/45"}`} key={x}>{x}</button>)}</div><label className="mt-5 block text-xs text-white/35">ANSWER MODE</label><div className="mt-2 grid grid-cols-2 gap-2">{["text","voice"].map(x=><button onClick={()=>setMode(x)} className={`rounded-lg border p-2 text-xs capitalize ${mode===x?"border-red-500/50 bg-red-500/10 text-red-200":"border-white/10 text-white/45"}`} key={x}>{x}</button>)}</div><button onClick={start} className="mt-6 w-full rounded-xl bg-red-500 py-3 font-semibold">{loading?"Starting…":"Start / Restart"}</button></aside>
    <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5 md:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs text-white/35">AI INTERVIEWER · {type}</div><div className="mt-1 text-sm text-white/45">{difficulty} · {mode} mode</div></div><div className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-200"><CircleDot size={12} className="mr-1 inline"/> DEMO MODE</div></div>
      <div className="mt-7 rounded-2xl border border-white/10 bg-[#090a0d] p-6 md:p-9"><div className="text-xs uppercase tracking-[.18em] text-white/30">Question</div><h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight">{question || "Choose your interview setup and press Start Interview."}</h1></div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090a0d] p-5"><div className="flex items-center justify-between"><span className="text-xs text-white/35">YOUR ANSWER</span><button onClick={toggleVoice} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${recording?"border-red-500/50 bg-red-500/10 text-red-200":"border-white/10 text-white/55"}`}><Mic size={15}/>{recording?"Stop recording":"Voice input"}</button></div><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here or use voice input…" className="mt-4 min-h-36 w-full resize-none bg-transparent text-base leading-7 text-white outline-none placeholder:text-white/20"/><div className="flex items-center justify-between border-t border-white/10 pt-4"><span className="text-xs text-white/30">{answer.trim().split(/\s+/).filter(Boolean).length || 0} words</span><button disabled={!sid||!answer.trim()||loading} onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-30">Submit answer <ArrowRight size={16}/></button></div></div>
      {analysis&&<div className="mt-5 grid gap-4 md:grid-cols-2">{[["Technical relevance",analysis.technicalRelevance],["Completeness",analysis.completeness],["Concept coverage",analysis.conceptCoverage],["Clarity",analysis.clarity]].map(([n,v]:any)=><div className="rounded-xl border border-white/10 p-4" key={n}><div className="flex justify-between text-sm"><span className="text-white/55">{n}</span><b>{v}%</b></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-red-500" style={{width:`${v}%`}}/></div></div>)}<div className="md:col-span-2 rounded-xl border border-red-500/15 bg-red-500/[.05] p-5"><div className="text-xs font-bold uppercase tracking-[.15em] text-red-300">Feedback</div><p className="mt-2 text-sm leading-6 text-white/65">{analysis.feedback}</p>{analysis.missingConcepts?.length>0&&<div className="mt-4 text-xs text-white/35">Missing concepts: <span className="text-white/60">{analysis.missingConcepts.join(" · ")}</span></div>}</div></div>}
    </div></div></section></Shell>
}

function Technology(){
  return <Shell><section className="mx-auto max-w-7xl px-5 py-14"><div className="max-w-3xl"><div className="text-xs uppercase tracking-[.22em] text-red-400">Edge AI architecture</div><h1 className="mt-3 text-5xl font-black tracking-tight">Designed for Snapdragon AI PCs.</h1><p className="mt-5 text-lg leading-8 text-white/50">The product separates the interview experience from the inference provider so a real local model/runtime can be integrated and benchmarked on compatible hardware.</p></div>
    <div className="mt-12 grid gap-4 md:grid-cols-5">{["MICROPHONE","SPEECH PROCESSING","LOCAL AI","ANSWER ANALYSIS","ADAPTIVE QUESTION"].map((x,i)=><div key={x} className="relative rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="text-[10px] font-bold tracking-[.16em] text-red-400">0{i+1}</div><div className="mt-12 font-semibold">{x}</div>{i<4&&<ArrowRight className="absolute -right-3 top-1/2 z-10 hidden text-red-500 md:block" size={20}/>}</div>)}</div>
    <div className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-[#0b0d11] p-7"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-red-500/10 text-red-300"><Cpu/></div><div><div className="font-semibold">Local inference layer</div><div className="text-xs text-white/35">Provider abstraction</div></div></div><div className="mt-7 space-y-3">{["ONNX Runtime","Qualcomm QNN / AI Runtime where supported","Snapdragon NPU execution","Measured performance telemetry"].map((x,i)=><div className="flex items-center gap-3 rounded-xl border border-white/10 p-4" key={x}><Check size={16} className="text-red-400"/><span className="text-sm text-white/65">{x}</span></div>)}</div></div><div className="rounded-2xl border border-red-500/20 bg-red-500/[.05] p-7"><ShieldCheck className="text-red-400"/><h2 className="mt-5 text-2xl font-bold">Technical honesty is a feature.</h2><p className="mt-3 text-sm leading-7 text-white/50">The demo never claims NPU acceleration when it cannot verify it. Snapdragon execution, model choice, latency and memory are reported only after configuration and measurement on compatible hardware.</p><div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-white/45">Current development state: <span className="text-red-300">DEMO MODE</span></div></div></div>
  </section></Shell>
}

function Performance(){
  const [data,setData]=useState<any>(null); useEffect(()=>{fetch(`${API}/api/performance`).then(r=>r.json()).then(setData).catch(()=>setData({mode:"DEMO MODE",device:"Not detected",executionProvider:"browser-demo",modelLoadMs:null,inferenceMs:null,memoryMb:null,message:"Backend unavailable."}))},[]);
  const cards=[["INFERENCE MODE",data?.mode],["EXECUTION PROVIDER",data?.executionProvider],["MODEL",data?.model],["LATENCY",data?.inferenceMs?`${data.inferenceMs} ms`:"Not measured"],["MEMORY",data?.memoryMb?`${data.memoryMb} MB`:"Not measured"],["DEVICE",data?.device||"Not detected"]];
  return <Shell><section className="mx-auto max-w-7xl px-5 py-14"><div className="max-w-3xl"><div className="text-xs uppercase tracking-[.22em] text-red-400">Performance lab</div><h1 className="mt-3 text-5xl font-black tracking-tight">Measure the intelligence.</h1><p className="mt-4 text-lg text-white/45">No invented benchmarks. This page is designed to display measurements collected from the configured local inference runtime.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{cards.map(([a,b])=><div className="rounded-2xl border border-white/10 bg-white/[.025] p-5" key={a as string}><div className="text-[10px] font-bold tracking-[.18em] text-white/30">{a}</div><div className="mt-4 min-h-8 text-lg font-semibold">{String(b??"—")}</div></div>)}</div><div className="mt-5 rounded-2xl border border-red-500/15 bg-red-500/[.04] p-6"><Gauge className="text-red-400"/><h2 className="mt-4 font-semibold">Benchmark status</h2><p className="mt-2 text-sm leading-6 text-white/45">{data?.message||"Run the benchmark on compatible Snapdragon hardware for measured values."}</p></div></section></Shell>
}

function App(){return <Routes><Route path="/" element={<Landing/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/interview" element={<Interview/>}/><Route path="/technology" element={<Technology/>}/><Route path="/performance" element={<Performance/>}/><Route path="*" element={<Landing/>}/></Routes>}
export default App;
