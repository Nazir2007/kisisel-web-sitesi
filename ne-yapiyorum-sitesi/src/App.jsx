import { useEffect, useMemo, useRef, useState } from "react";

const asset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

const MOODS = [
  {
    id: "focus",
    icon: "◎",
    label: "Odak",
    line: "Bugün modum: notlar, kod ve sakin ama net ilerleme.",
    accent: "#22c55e",
  },
  {
    id: "adrenaline",
    icon: "▶",
    label: "Adrenalin",
    line: "Bugün modum: Dead Cells turu, hızlı kararlar ve biraz kaos.",
    accent: "#fb7185",
  },
  {
    id: "cinematic",
    icon: "♪",
    label: "Sinematik",
    line: "Bugün modum: arkada epik müzik, ekranda planlı çalışma.",
    accent: "#38bdf8",
  },
];

const TOPICS = [
  {
    id: "dead-cells",
    nav: "Dead Cells",
    icon: "DC",
    kicker: "Run günlüğü",
    title: "Dead Cells'te rota, refleks ve sabır testi",
    summary:
      "Şu aralar Dead Cells oynarken sadece bölüm geçmeye çalışmıyorum; hangi silah hangi mutasyonla daha iyi çalışıyor, riskli odalara ne zaman girilir, boss öncesi kaynak nasıl korunur gibi küçük kararları da takip ediyorum.",
    image: asset("deadcells.jpeg"),
    accent: "#fb7185",
    background: "from-zinc-950 via-rose-950 to-slate-950",
    stats: [
      { label: "Hedef", value: "Cavern rotası" },
      { label: "Stil", value: "Hızlı kaçış" },
      { label: "Risk", value: "Yüksek" },
    ],
    log: [
      "Yeni build denemesi: hızlı silah, güvenli mesafe, kritik hasar.",
      "En zor kısım: panik yapmadan tuzakları okumak.",
      "Kazanım: aynı bölümü tekrar oynarken daha iyi karar vermek.",
    ],
  },
  {
    id: "cpu",
    nav: "CPU",
    icon: "01",
    kicker: "Donanım merakı",
    title: "İşlemcinin içinde kodun elektriğe dönüşmesini anlamak",
    summary:
      "Oyunların arkasındaki sistemi merak edince iş mantık kapılarına, saat döngülerine ve komutların işlemcide nasıl ilerlediğine geldi. AND, OR, XOR gibi kapılar küçük görünüyor ama bütün makinenin dilini kuruyor.",
    image: asset("CPU.jpeg"),
    accent: "#34d399",
    background: "from-slate-950 via-emerald-950 to-zinc-950",
    stats: [
      { label: "Konu", value: "Logic gates" },
      { label: "Tempo", value: "4.2 GHz" },
      { label: "Not", value: "Derinleşiyor" },
    ],
    log: [
      "Bit seviyesinde düşünmek kod yazarken farklı bir bakış veriyor.",
      "Saat döngüsü fikri, performans konusunu daha somut hale getiriyor.",
      "Bir sonraki adım: basit ALU mantığını çizmek.",
    ],
  },
  {
    id: "soundtrack",
    nav: "OST",
    icon: "♪",
    kicker: "Arka plan sesi",
    title: "God of War müzikleriyle çalışma atmosferi",
    summary:
      "Kod yazarken ya da ders notlarına bakarken arkada ağır, sinematik ve ritimli müzikler dönüyor. Özellikle God of War soundtrack'i çalışmayı daha ciddi bir sahneye çeviriyor.",
    image: asset("GOW3.jpeg"),
    accent: "#f59e0b",
    background: "from-zinc-950 via-amber-950 to-stone-950",
    stats: [
      { label: "Tür", value: "Epik OST" },
      { label: "Etki", value: "Motivasyon" },
      { label: "Kullanım", value: "Kod + not" },
    ],
    log: [
      "Ritim hızlanınca odak artıyor, dikkat dağıtan şeyler azalıyor.",
      "Sözsüz müzik ders çalışırken daha iyi gidiyor.",
      "En iyi kullanım: kısa ve yoğun çalışma blokları.",
    ],
  },
  {
    id: "gaming-news",
    nav: "Haberler",
    icon: "NW",
    kicker: "Sektör takibi",
    title: "Oyun haberlerini geliştirici gözüyle okumak",
    summary:
      "Yeni oyun duyuruları, motor güncellemeleri, stüdyo kararları ve bağımsız oyunların yükselişi ilgimi çekiyor. Sadece oyuncu olarak değil, bu iş nasıl tasarlanıyor diye bakmaya çalışıyorum.",
    image: asset("gaming.jpeg"),
    accent: "#60a5fa",
    background: "from-slate-950 via-blue-950 to-zinc-950",
    stats: [
      { label: "Radar", value: "Oyun sektörü" },
      { label: "Odak", value: "Tasarım" },
      { label: "Kaynak", value: "Güncel akış" },
    ],
    log: [
      "Bir oyunun ertelenmesi bazen kötü haber değil, kalite kararı olabilir.",
      "Indie oyunlar küçük ekiplerle büyük fikirlerin çıkabildiğini gösteriyor.",
      "Motor teknolojisi değiştikçe tasarım seçenekleri de genişliyor.",
    ],
  },
];

const MISSION_BOARD = [
  {
    id: "mission-route",
    topic: "Dead Cells",
    title: "Cavern rotası için mini plan çıkar",
    detail: "Hangi silah, hangi mutasyon, hangi risk?",
  },
  {
    id: "mission-gate",
    topic: "CPU",
    title: "AND, OR, XOR kapılarını örnekle",
    detail: "Her biri için iki bitlik küçük bir tablo hazırla.",
  },
  {
    id: "mission-ost",
    topic: "OST",
    title: "30 dakikalık odak listesi kur",
    detail: "Sözsüz, ritimli ve dikkati dağıtmayan parçalar.",
  },
  {
    id: "mission-news",
    topic: "Haberler",
    title: "Bir oyun haberini yorumla",
    detail: "Haberi sadece okumak değil, arkasındaki kararı anlamak.",
  },
];

const SCHEDULE = [
  { time: "10:30", label: "CPU notları", progress: 72, color: "#34d399" },
  { time: "14:00", label: "Dead Cells denemesi", progress: 48, color: "#fb7185" },
  { time: "18:15", label: "OST ile çalışma", progress: 86, color: "#f59e0b" },
  { time: "21:00", label: "Oyun haberleri", progress: 61, color: "#60a5fa" },
];

const TRACKS = [
  {
    title: "Ashes Mood Loop",
    artist: "Nordic Focus",
    mood: "Epik",
    color: "#f59e0b",
    src: asset("music/ashes-mood-loop.wav"),
  },
  {
    title: "Clock Pulse",
    artist: "CPU Study Mix",
    mood: "Odak",
    color: "#34d399",
    src: asset("music/clock-pulse.wav"),
  },
  {
    title: "Boss Room",
    artist: "Run Energy",
    mood: "Hızlı",
    color: "#fb7185",
    src: asset("music/boss-room.wav"),
  },
];

const RADAR_ITEMS = [
  {
    id: "engine",
    tag: "Teknoloji",
    title: "Yeni motor güncellemeleri oyunların ışık, fizik ve performans tarafını değiştiriyor.",
  },
  {
    id: "indie",
    tag: "Indie",
    title: "Küçük ekiplerin özgün mekanikler üretmesi oyun tasarımını daha cesur hale getiriyor.",
  },
  {
    id: "studio",
    tag: "Sektör",
    title: "Stüdyo kararları bazen bir oyunun kalitesini, çıkış tarihinden daha fazla etkiliyor.",
  },
  {
    id: "design",
    tag: "Tasarım",
    title: "İyi bölüm tasarımı oyuncuya kaybolmadan keşfetme hissi verebiliyor.",
  },
];

const BACKGROUND_THEMES = {
  "dead-cells": {
    base: "#120710",
    a: "#fb7185",
    b: "#7f1d1d",
    c: "#312e81",
  },
  cpu: {
    base: "#03140f",
    a: "#34d399",
    b: "#064e3b",
    c: "#0f766e",
  },
  soundtrack: {
    base: "#170f05",
    a: "#f59e0b",
    b: "#7c2d12",
    c: "#991b1b",
  },
  "gaming-news": {
    base: "#06111f",
    a: "#60a5fa",
    b: "#1d4ed8",
    c: "#0891b2",
  },
};

const WAVE_BARS = [48, 72, 34, 88, 52, 64, 39, 96, 58, 80, 45, 70, 54, 91, 42, 76, 50, 83];
const GATES = ["AND", "OR", "XOR"];

function logicGate(a, b, gate) {
  if (gate === "AND") return a && b ? 1 : 0;
  if (gate === "OR") return a || b ? 1 : 0;
  return a !== b ? 1 : 0;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function formatNewsDate(value) {
  if (!value) return "";

  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function AppStyles() {
  return (
    <style>{`
      @property --bg-base {
        syntax: "<color>";
        inherits: false;
        initial-value: #050505;
      }
      @property --bg-a {
        syntax: "<color>";
        inherits: false;
        initial-value: #fb7185;
      }
      @property --bg-b {
        syntax: "<color>";
        inherits: false;
        initial-value: #312e81;
      }
      @property --bg-c {
        syntax: "<color>";
        inherits: false;
        initial-value: #0891b2;
      }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: #050505; }
      @keyframes equalize {
        0% { transform: scaleY(.38); opacity: .55; }
        100% { transform: scaleY(1); opacity: 1; }
      }
      @keyframes trace {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .grain {
        background-image:
          linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
        background-size: 42px 42px;
      }
      .scan::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
        animation: trace 3.8s linear infinite;
        pointer-events: none;
      }
      .dynamic-backdrop {
        background:
          radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--bg-a) 70%, transparent), transparent 32%),
          radial-gradient(circle at 82% 16%, color-mix(in srgb, var(--bg-b) 62%, transparent), transparent 34%),
          radial-gradient(circle at 50% 88%, color-mix(in srgb, var(--bg-c) 52%, transparent), transparent 38%),
          linear-gradient(135deg, var(--bg-base), #050505 62%, #09090b);
        transition:
          --bg-base 900ms ease,
          --bg-a 900ms ease,
          --bg-b 900ms ease,
          --bg-c 900ms ease;
      }
    `}</style>
  );
}

function DynamicBackground({ activeId }) {
  const theme = BACKGROUND_THEMES[activeId] || BACKGROUND_THEMES["dead-cells"];

  return (
    <div
      className="dynamic-backdrop pointer-events-none fixed inset-0 z-0"
      style={{
        "--bg-base": theme.base,
        "--bg-a": theme.a,
        "--bg-b": theme.b,
        "--bg-c": theme.c,
      }}
    />
  );
}

function IconBadge({ children, active = false, accent = "#ffffff" }) {
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-md border text-xs font-black transition ${
        active ? "border-white text-black" : "border-white/20 text-white"
      }`}
      style={{ backgroundColor: active ? accent : "rgba(255,255,255,.08)" }}
    >
      {children}
    </span>
  );
}

function ProgressCircle({ value, accent }) {
  return (
    <div
      className="grid h-24 w-24 place-items-center rounded-full border border-white/15"
      style={{
        background: `conic-gradient(${accent} ${value * 3.6}deg, rgba(255,255,255,.1) 0deg)`,
      }}
    >
      <div className="grid h-20 w-20 place-items-center rounded-full bg-zinc-950 text-center">
        <span className="text-xl font-black text-white">{value}%</span>
        <span className="-mt-3 text-[10px] uppercase tracking-[.2em] text-white/45">tamam</span>
      </div>
    </div>
  );
}

function Hero({ mood, setMood, selectedTopic, setSelectedTopic }) {
  const scrollToTopic = (topicId) => {
    setSelectedTopic(topicId);
    document.getElementById(topicId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
        {TOPICS.map((topic) => (
          <img
            key={topic.id}
            src={topic.image}
            alt=""
            className="h-full w-full object-cover opacity-45 saturate-125"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-zinc-950" />
      <div className="grain absolute inset-0 opacity-35" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-5 py-5 md:px-8">
        <header className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <IconBadge active accent={mood.accent}>
              NY
            </IconBadge>
            <div>
              <p className="text-sm font-black uppercase tracking-[.22em] text-white">Ne Yapıyorum</p>
              <p className="text-xs text-white/55">Canlı durum panosu</p>
            </div>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {MOODS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMood(item)}
                className={`flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                  mood.id === item.id
                    ? "border-white bg-white text-zinc-950"
                    : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-4xl py-16 md:py-20">
          <p className="mb-4 inline-flex rounded-md border border-white/15 bg-black/25 px-3 py-2 text-xs font-black uppercase tracking-[.24em] text-white/80">
            Nazır Mammadov - 2. sınıf bilgisayar mühendisliği
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal md:text-7xl">
            Kodun, animenin ve insan zihninin peşinden gidiyorum.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Merhaba, ben Nazır Mammadov. İkinci sınıf bilgisayar mühendisliği öğrencisiyim.
            Anime izlemeyi, CPU mimarisinin derinliğine hayran kalmayı ve insan ilişkilerinin
            neden bu kadar karmaşık ama değerli olduğunu düşünmeyi seviyorum. Hayallerim için her
            gün biraz daha güçlü, daha bilinçli ve daha kararlı biri olmaya çalışıyorum.
          </p>
          <div className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {["Anime", "CPU mimarisi", "İnsan ilişkileri", "Her gün güçlenmek"].map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm font-black text-white/78"
              >
                {item}
              </span>
            ))}
          </div>
          <div
            className="mt-7 inline-flex max-w-full items-center gap-3 rounded-md border border-white/15 bg-black/30 p-3 text-sm font-semibold text-white/85"
            style={{ boxShadow: `0 0 0 1px ${mood.accent}33` }}
          >
            <IconBadge active accent={mood.accent}>
              {mood.icon}
            </IconBadge>
            <span>{mood.line}</span>
          </div>
        </div>

        <div className="grid gap-3 pb-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => scrollToTopic(topic.id)}
              className={`group min-h-28 rounded-lg border p-4 text-left transition hover:-translate-y-1 ${
                selectedTopic === topic.id
                  ? "border-white bg-white text-zinc-950"
                  : "border-white/15 bg-black/35 text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <IconBadge active={selectedTopic === topic.id} accent={topic.accent}>
                  {topic.icon}
                </IconBadge>
                <span className="text-lg transition group-hover:translate-x-1">↗</span>
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[.16em] opacity-75">{topic.kicker}</p>
              <p className="mt-1 text-lg font-black leading-snug">{topic.nav}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FixedRail({ activeId, scrollProgress, setSelectedTopic }) {
  const activeTopic = TOPICS.find((topic) => topic.id === activeId) || TOPICS[0];

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-1 bg-white/10 right-0">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${scrollProgress}%`, backgroundColor: activeTopic.accent }}
        />
      </div>
      <nav className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {TOPICS.map((topic) => {
          const active = topic.id === activeId;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                setSelectedTopic(topic.id);
                document.getElementById(topic.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="group flex items-center justify-end gap-3"
              aria-label={`${topic.nav} bölümüne git`}
            >
              <span
                className={`rounded-md border px-3 py-2 text-xs font-bold transition ${
                  active
                    ? "border-white bg-white text-zinc-950 opacity-100"
                    : "border-white/10 bg-black/25 text-white/70 opacity-0 group-hover:opacity-100"
                }`}
              >
                {topic.nav}
              </span>
              <span
                className={`h-3 w-3 rounded-full border transition ${
                  active ? "scale-125 border-white bg-white" : "border-white/30 bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}

function Dashboard({ missionProgress, mood }) {
  return (
    <section id="top" className="bg-black/35 px-5 py-16 text-white backdrop-blur-[1px] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-lg border border-white/10 bg-white/[.04] p-5 md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-white/45">Bugünkü rota</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Durum paneli</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                Bu alan sayfanın kalbi gibi çalışıyor: mod, günlük akış ve yapılacaklar tek ekranda
                görünüyor.
              </p>
            </div>
            <ProgressCircle value={missionProgress} accent={mood.accent} />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {SCHEDULE.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-zinc-900 p-4">
                <p className="text-xs font-bold text-white/45">{item.time}</p>
                <p className="mt-2 min-h-12 text-sm font-black leading-snug text-white">{item.label}</p>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scan relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[.24em] text-white/45">Aktif mod</p>
          <h3 className="mt-3 text-2xl font-black">Zihinsel karışım</h3>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {TOPICS.map((topic, index) => (
              <div key={topic.id} className={index === 0 ? "col-span-2 rounded-lg border border-white/10 bg-black/25 p-4" : "rounded-lg border border-white/10 bg-black/25 p-4"}>
                <p className="text-xs font-bold uppercase tracking-[.18em]" style={{ color: topic.accent }}>
                  {topic.nav}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/75">{topic.stats[0].value}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-white/65">
            Sayfada ilerledikçe renkler ve yan navigasyon aktif bölüme göre değişiyor. Böylece site
            sadece okunmuyor, küçük bir kontrol paneli gibi hissediliyor.
          </p>
        </div>
      </div>
    </section>
  );
}

function TopicSection({ topic, index, setSelectedTopic }) {
  return (
    <section
      id={topic.id}
      data-topic-section="true"
      className="relative scroll-mt-6 overflow-hidden px-5 py-20 text-white md:px-8"
      style={{ "--accent": topic.accent }}
      onMouseEnter={() => setSelectedTopic(topic.id)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${topic.background} opacity-55`} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
          <p className="text-xs font-black uppercase tracking-[.24em]" style={{ color: topic.accent }}>
            {topic.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal md:text-5xl">{topic.title}</h2>
          <p className="mt-5 text-base leading-8 text-white/76">{topic.summary}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {topic.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-white/45">{stat.label}</p>
                <p className="mt-2 text-lg font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-3">
            {topic.log.map((line, lineIndex) => (
              <div key={line} className="flex gap-3 rounded-lg border border-white/10 bg-black/20 p-4">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-black text-zinc-950"
                  style={{ backgroundColor: topic.accent }}
                >
                  {lineIndex + 1}
                </span>
                <p className="text-sm leading-7 text-white/78">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={index % 2 === 1 ? "lg:order-1" : ""}>
          <div className="overflow-hidden rounded-lg border border-white/15 bg-black/25 shadow-2xl">
            <img src={topic.image} alt={topic.title} className="aspect-[4/3] w-full object-cover" />
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.2em] text-white/45">Görsel kart</p>
                  <p className="mt-1 text-lg font-black">{topic.nav}</p>
                </div>
                <IconBadge active accent={topic.accent}>
                  {topic.icon}
                </IconBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionBoard({ checked, toggleMission }) {
  return (
    <section className="bg-black/35 px-5 py-18 text-white backdrop-blur-[1px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-white/45">Görev panosu</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Bu hafta yapılacaklar</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/60">
            Kutular işaretlenince ilerleme yüzdesi değişiyor ve sayfa daha kişisel bir günlük gibi
            davranıyor.
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MISSION_BOARD.map((mission) => {
            const done = Boolean(checked[mission.id]);
            return (
              <label
                key={mission.id}
                className={`group min-h-52 cursor-pointer rounded-lg border p-5 transition hover:-translate-y-1 ${
                  done ? "border-emerald-300 bg-emerald-400/15" : "border-white/10 bg-white/[.04] hover:bg-white/[.07]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggleMission(mission.id)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-md border border-white/10 bg-black/25 px-2 py-1 text-xs font-bold text-white/70">
                    {mission.topic}
                  </span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-md border text-sm font-black ${
                      done ? "border-emerald-200 bg-emerald-300 text-zinc-950" : "border-white/15 text-white/50"
                    }`}
                  >
                    {done ? "✓" : "+"}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-black leading-snug">{mission.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{mission.detail}</p>
              </label>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LogicLab() {
  const [bitA, setBitA] = useState(1);
  const [bitB, setBitB] = useState(0);
  const [gate, setGate] = useState("XOR");
  const result = logicGate(bitA, bitB, gate);

  return (
    <section className="bg-emerald-950/45 px-5 py-20 text-white backdrop-blur-[1px] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-emerald-200/70">Mini CPU deneyi</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Mantık kapısı laboratuvarı</h2>
          <p className="mt-4 text-sm leading-7 text-emerald-50/70">
            İki biti değiştir, kapıyı seç ve çıkışın nasıl değiştiğini gör. Küçük bir oyun gibi,
            ama işlemcinin en temel fikirlerinden birini anlatıyor.
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200/20 bg-zinc-950 p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <BitSwitch label="A biti" value={bitA} onChange={() => setBitA(bitA ? 0 : 1)} />
            <BitSwitch label="B biti" value={bitB} onChange={() => setBitB(bitB ? 0 : 1)} />
            <div className="rounded-lg border border-white/10 bg-white/[.04] p-4">
              <p className="text-xs font-black uppercase tracking-[.18em] text-white/45">Çıkış</p>
              <div
                className={`mt-5 grid h-20 place-items-center rounded-md border text-4xl font-black transition ${
                  result ? "border-emerald-300 bg-emerald-300 text-zinc-950" : "border-white/10 bg-black text-white/40"
                }`}
              >
                {result}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {GATES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setGate(item)}
                className={`min-h-11 rounded-md border text-sm font-black transition ${
                  gate === item
                    ? "border-emerald-200 bg-emerald-300 text-zinc-950"
                    : "border-white/10 bg-white/[.04] text-white hover:bg-white/[.08]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm text-emerald-200">
            <span className="text-white/45">if</span> ({bitA} {gate} {bitB}) <span className="text-white/45">then</span>{" "}
            output = {result}
          </div>
        </div>
      </div>
    </section>
  );
}

function BitSwitch({ label, value, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="rounded-lg border border-white/10 bg-white/[.04] p-4 text-left transition hover:bg-white/[.08]"
    >
      <p className="text-xs font-black uppercase tracking-[.18em] text-white/45">{label}</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-4xl font-black">{value}</span>
        <span
          className={`flex h-8 w-16 items-center rounded-full border p-1 transition ${
            value ? "border-emerald-300 bg-emerald-300" : "border-white/15 bg-black"
          }`}
        >
          <span
            className={`h-6 w-6 rounded-full bg-white transition ${value ? "translate-x-8 bg-zinc-950" : ""}`}
          />
        </span>
      </div>
    </button>
  );
}

function SoundConsole() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState("");
  const track = TRACKS[trackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setAudioError("");
  }, [trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.play().catch(() => {
        setPlaying(false);
        setAudioError("Ses başlatılamadı. Play tuşuna tekrar basmayı dene.");
      });
    } else {
      audio.pause();
    }
  }, [playing, trackIndex]);

  const playPreviousTrack = () => {
    setTrackIndex((current) => (current === 0 ? TRACKS.length - 1 : current - 1));
    setPlaying(true);
  };

  const playNextTrack = () => {
    setTrackIndex((current) => (current + 1) % TRACKS.length);
    setPlaying(true);
  };

  const seekTrack = (event) => {
    const nextTime = Number(event.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }

    setCurrentTime(nextTime);
  };

  return (
    <section className="bg-black/35 px-5 py-20 text-white backdrop-blur-[1px] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-lg border border-white/10 bg-white/[.04] p-5 md:p-6">
          <audio
            ref={audioRef}
            src={track.src}
            preload="metadata"
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
            onEnded={playNextTrack}
            onError={() => {
              setPlaying(false);
              setAudioError("Ses dosyası bulunamadı. public/music klasörünü kontrol et.");
            }}
          />

          <p className="text-xs font-black uppercase tracking-[.24em] text-white/45">Müzik konsolu</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Çalışma atmosferi</h2>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-black">{track.title}</p>
              <p className="text-sm text-white/55">
                {track.artist} - {track.mood}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={playPreviousTrack}
                className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-white/[.06] text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[.12]"
                aria-label="Önceki şarkı"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={() => setPlaying((current) => !current)}
                className="grid h-12 w-12 place-items-center rounded-md border border-white/15 bg-white text-xl font-black text-zinc-950 transition hover:-translate-y-0.5"
                aria-label={playing ? "Durdur" : "Başlat"}
              >
                {playing ? "II" : "▶"}
              </button>
              <button
                type="button"
                onClick={playNextTrack}
                className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-white/[.06] text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[.12]"
                aria-label="Sonraki şarkı"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="mt-7 flex h-28 items-end gap-1 rounded-lg border border-white/10 bg-black/30 p-4">
            {WAVE_BARS.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="min-w-[4px] flex-1 rounded-sm"
                style={{
                  height: `${Math.max(10, (height * volume) / 100)}%`,
                  backgroundColor: track.color,
                  transformOrigin: "bottom",
                  animation: playing ? `equalize ${560 + (index % 6) * 95}ms ease-in-out infinite alternate` : "none",
                  animationDelay: `${index * 45}ms`,
                  opacity: playing ? 0.9 : 0.35,
                }}
              />
            ))}
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/45">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={seekTrack}
              className="w-full accent-amber-300"
              aria-label="Şarkı ilerleme çubuğu"
            />
          </div>

          <label className="mt-6 block">
            <span className="text-xs font-black uppercase tracking-[.18em] text-white/45">Ses yoğunluğu</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="mt-3 w-full accent-amber-300"
            />
          </label>

          {audioError && (
            <p className="mt-4 rounded-md border border-amber-300/25 bg-amber-300/10 p-3 text-sm font-semibold text-amber-100">
              {audioError}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          {TRACKS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setTrackIndex(index);
                setPlaying(true);
              }}
              className={`rounded-lg border p-5 text-left transition hover:-translate-y-1 ${
                index === trackIndex ? "border-white bg-white text-zinc-950" : "border-white/10 bg-white/[.04] text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-black">{item.title}</p>
                  <p className="mt-1 text-sm opacity-65">
                    {item.artist} - {item.mood}
                  </p>
                </div>
                <span
                  className="grid h-9 w-9 place-items-center rounded-md text-sm font-black"
                  style={{ backgroundColor: item.color, color: "#09090b" }}
                >
                  {index === trackIndex && playing ? "♪" : index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsRadar() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("Tümü");
  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
    const controller = new AbortController();

    async function loadNews() {
      if (!apiKey) {
        setLoadingNews(false);
        setNewsError(".env içinde VITE_GNEWS_API_KEY bulunamadı. Şimdilik örnek haber notları gösteriliyor.");
        return;
      }

      setLoadingNews(true);
      setNewsError("");

 try {
        // 1. URL'yi temiz bir şekilde başlatıyoruz
        const url = new URL("https://newsdata.io/api/1/news");
        
        // 2. Parametreleri düzgünce ekliyoruz
        url.searchParams.set("q", "gaming");
        url.searchParams.set("language", "en"); // Newsdata.io 'lang' değil 'language' kullanır
        url.searchParams.set("size", "8");
        url.searchParams.set("apikey", apiKey); // .env dosyasından gelen GERÇEK değişkeni kullanıyoruz

        // 3. İsteği gönderiyoruz
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Haber servisi şu an cevap vermedi.");
        }

        const data = await response.json();
        
        // 4. Veriyi işliyoruz
        const newsArray = data.results || data.articles || [];

        const fetchedNews = newsArray.map((article, index) => ({
          id: article.article_id || article.url || `live-news-${index}`,
          tag: article.source_id || article.source?.name || "Haber",
          title: article.title || "Başlıksız haber",
          description: article.description || "",
          source: article.source_id || article.source?.name || "GNews",
          url: article.link || article.url || "",
          publishedAt: article.pubDate || article.publishedAt || "",
        }));

        if (fetchedNews.length === 0) {
          throw new Error("Bu sorguda haber bulunamadı.");
        }

        setNewsItems(fetchedNews);
        setTag("Tümü");

      } catch (error) {
        if (error.name === "AbortError") return;

        setNewsItems([]);
        setNewsError("Gerçek haberler çekilemedi. API limiti, bağlantı veya anahtar sorunu olabilir.");
        
      } finally {
        setLoadingNews(false);
      }
    }

    loadNews();

    return () => controller.abort();
  }, [refreshKey]);

  const displayItems =
    newsItems.length > 0
      ? newsItems
      : RADAR_ITEMS.map((item) => ({
          ...item,
          description: "Canlı haber bağlantısı kurulamazsa bu kart yedek içerik olarak görünür.",
          source: item.tag,
          url: "",
          publishedAt: "",
        }));

  const tags = ["Tümü", ...Array.from(new Set(displayItems.map((item) => item.tag)))];
  const filteredItems = displayItems.filter((item) => {
    const tagMatch = tag === "Tümü" || item.tag === tag;
    const searchableText = `${item.title} ${item.description} ${item.source}`.toLocaleLowerCase("tr-TR");
    const queryMatch = searchableText.includes(query.toLocaleLowerCase("tr-TR"));

    return tagMatch && queryMatch;
  });

  return (
    <section className="bg-blue-950/45 px-5 py-20 text-white backdrop-blur-[1px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-blue-100/65">Haber radarı</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Oyun gündemini süzgeçten geçir</h2>
            <p className="mt-4 text-sm leading-7 text-blue-50/70">
              Bu bölüm .env içindeki API anahtarıyla gerçek oyun haberlerini çeker. Arama ve kaynak
              filtresiyle haber kartlarını hızlıca süzebilirsin.
            </p>
            <button
              type="button"
              onClick={() => setRefreshKey((current) => current + 1)}
              disabled={loadingNews}
              className="mt-5 min-h-11 rounded-md border border-blue-100/20 bg-blue-100/10 px-4 text-sm font-black text-blue-50 transition hover:-translate-y-0.5 hover:bg-blue-100/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingNews ? "Haberler yükleniyor" : "Haberleri yenile"}
            </button>
          </div>

          <div className="rounded-lg border border-blue-100/15 bg-zinc-950 p-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Örn: motor, tasarım, indie"
                className="min-h-12 flex-1 rounded-md border border-white/10 bg-white/[.06] px-4 text-sm font-semibold text-white outline-none placeholder:text-white/35 focus:border-blue-200"
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTag(item)}
                    className={`min-h-12 rounded-md border px-4 text-sm font-black transition ${
                      tag === item
                        ? "border-blue-100 bg-blue-200 text-zinc-950"
                        : "border-white/10 bg-white/[.04] text-white hover:bg-white/[.08]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {newsError && (
              <p className="mt-4 rounded-md border border-amber-300/25 bg-amber-300/10 p-3 text-sm font-semibold text-amber-100">
                {newsError}
              </p>
            )}

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {loadingNews &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="min-h-40 animate-pulse rounded-lg border border-white/10 bg-white/[.04] p-5">
                    <div className="h-3 w-24 rounded bg-white/20" />
                    <div className="mt-5 h-4 w-11/12 rounded bg-white/15" />
                    <div className="mt-3 h-4 w-8/12 rounded bg-white/10" />
                    <div className="mt-6 h-3 w-32 rounded bg-white/10" />
                  </div>
                ))}

              {!loadingNews &&
                filteredItems.map((item) => {
                  const content = (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-xs font-black uppercase tracking-[.18em] text-blue-200">{item.tag}</p>
                        {item.url && <span className="text-sm font-black text-blue-100/60">↗</span>}
                      </div>
                      <h3 className="mt-3 text-lg font-black leading-snug">{item.title}</h3>
                      {item.description && <p className="mt-3 text-sm leading-6 text-white/60">{item.description}</p>}
                      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-white/42">
                        <span>{item.source}</span>
                        {item.publishedAt && <span>{formatNewsDate(item.publishedAt)}</span>}
                      </div>
                    </>
                  );

                  return item.url ? (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-40 rounded-lg border border-white/10 bg-white/[.04] p-5 transition hover:-translate-y-1 hover:border-blue-200/50 hover:bg-white/[.07]"
                    >
                      {content}
                    </a>
                  ) : (
                    <article key={item.id} className="min-h-40 rounded-lg border border-white/10 bg-white/[.04] p-5">
                      {content}
                    </article>
                  );
                })}

              {filteredItems.length === 0 && (
                <div className="rounded-lg border border-white/10 bg-white/[.04] p-5 text-sm text-white/65">
                  Bu filtrede sonuç yok. Başka bir kelime deneyebilirsin.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [mood, setMood] = useState(MOODS[0]);
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [checked, setChecked] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(window.localStorage.getItem("ne-yapiyorum-missions")) || {};
    } catch {
      return {};
    }
  });

  const sectionObserver = useRef(null);

  useEffect(() => {
    window.localStorage.setItem("ne-yapiyorum-missions", JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    const updateScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(documentHeight > 0 ? Math.round((window.scrollY / documentHeight) * 100) : 0);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    sectionObserver.current?.disconnect();
    sectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.05 }
    );

    document.querySelectorAll("[data-topic-section='true']").forEach((section) => {
      sectionObserver.current?.observe(section);
    });

    return () => sectionObserver.current?.disconnect();
  }, []);

  const missionProgress = useMemo(() => {
    const total = MISSION_BOARD.length;
    const done = MISSION_BOARD.filter((mission) => checked[mission.id]).length;
    return Math.round((done / total) * 100);
  }, [checked]);

  const toggleMission = (missionId) => {
    setChecked((current) => ({ ...current, [missionId]: !current[missionId] }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 font-sans text-white selection:bg-white selection:text-zinc-950">
      <AppStyles />
      <DynamicBackground activeId={activeId} />
      <div className="relative z-10">
        <FixedRail
          activeId={activeId}
          scrollProgress={scrollProgress}
          setSelectedTopic={setSelectedTopic}
        />
        <Hero mood={mood} setMood={setMood} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
        <Dashboard missionProgress={missionProgress} mood={mood} />
        {TOPICS.map((topic, index) => (
          <TopicSection key={topic.id} topic={topic} index={index} setSelectedTopic={setSelectedTopic} />
        ))}
        <MissionBoard checked={checked} toggleMission={toggleMission} />
        <LogicLab />
        <SoundConsole />
        <NewsRadar />
        <footer className="border-t border-white/10 bg-black/45 px-5 py-10 text-center text-sm text-white/45 backdrop-blur-sm">
          Ben bugünlerde ne yapıyorum? Oyun oynuyorum, sistemi anlamaya çalışıyorum ve öğrendiklerimi
          daha iyi anlatmanın yollarını deniyorum.
        </footer>
      </div>
    </div>
  );
}
