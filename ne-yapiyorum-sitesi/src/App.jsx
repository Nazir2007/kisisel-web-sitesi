import React, { useState, useEffect, useRef } from 'react';

// -----------------------------------------------------------
// 1. GERÇEK API BİLEŞENİ (Daha Büyük ve Belirgin Tasarım)
// -----------------------------------------------------------
const LiveGamingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
        
        if (!apiKey) {
          setNews([{ id: 1, title: "Lütfen .env dosyasına VITE_GNEWS_API_KEY ekleyin!", source: "Sistem Uyarısı", url: "#" }]);
          setLoading(false);
          return;
        }

        const url = `https://gnews.io/api/v4/search?q=gaming OR playstation OR xbox&lang=en&max=3&apikey=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Ağ yanıtı başarısız oldu.");
        }
        
        const data = await response.json();
        
        if (data.articles) {
          const formattedNews = data.articles.map((article, index) => ({
            id: index,
            title: article.title,
            source: article.source.name,
            url: article.url 
          }));
          
          setNews(formattedNews);
        }
      } catch (error) {
        console.error("API'den haber çekilemedi:", error);
        setNews([
          { id: 1, title: "Sistem Çevrimdışı: API Bağlantısı Kurulamadı (Kotan dolmuş olabilir)", source: "Sistem Hata Bildirimi", url: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRealNews();
  }, []);

  if (loading) {
    return (
      <div className="mt-6 p-6 bg-blue-900/30 rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center gap-4 shadow-lg h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-300 text-sm animate-pulse font-mono tracking-widest">AĞA BAĞLANILIYOR...</span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4 w-full">
      {news.map((item) => (
        <a 
          key={item.id} 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative flex flex-col gap-3 bg-blue-950/40 p-5 rounded-2xl border border-blue-500/30 hover:bg-blue-900/60 hover:border-blue-400 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 overflow-hidden"
        >
          {/* Üzerine gelince arkada beliren yatay parlama */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          
          {/* Üst Kısım: Kaynak ve İkon */}
          <div className="flex justify-between items-center relative z-10">
            <span className="text-blue-200 text-xs font-black tracking-wider uppercase bg-blue-600/30 px-3 py-1 rounded-md border border-blue-500/40 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              {item.source}
            </span>
            <span className="text-blue-400/50 group-hover:text-blue-200 font-bold transition-colors">
              ↗
            </span>
          </div>

          {/* Alt Kısım: Büyük ve Okunaklı Haber Başlığı */}
          <span className="text-white text-base md:text-lg font-bold leading-snug relative z-10 group-hover:text-blue-100 transition-colors line-clamp-3">
            {item.title}
          </span>
        </a>
      ))}
    </div>
  );
};

// -----------------------------------------------------------
// 2. İÇERİK BİLGİLERİ (Görseller ve Konular)
// -----------------------------------------------------------
const DATA_SECTIONS = [
  {
    id: 'dead-cells',
    title: 'Dead Cells: Lavlar, Tuzaklar ve Gözyaşı ⚔️',
    description: 'Şu anki ruh halim: Bir elimde kılıç, diğerinde sağlık iksiri (o da bitti bitecek). Cavern biyomundaki o lanet olası dev kapıyı bulana kadar 50 kere öldüm ama pes etmek yok! Graveyard\'dan geçerken hissettiğim o "acaba bu sefer olacak mı?" gerginliği...',
    color: '#701a75', // Canlı Neon Mor
    image: '/deadcells.jpeg', 
    badge: '☠️ Zorluk: Hücre Kaybı',
    extraComponent: (
      <div className="mt-4 p-4 bg-black/40 rounded-xl border border-red-500/30">
        <div className="flex justify-between text-sm mb-1 text-red-300">
          <span>Kalan Can (Tahmini)</span>
          <span>%12</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{ width: '12%' }}></div>
        </div>
        <p className="text-xs text-white/50 mt-2 italic">"Yine zehirlendim..."</p>
      </div>
    )
  },
  {
    id: 'cpu-architecture',
    title: 'İşlemcinin Kalbine Yolculuk ⚡',
    description: 'Sıradan bir oyuncu olmaktan sıkılıp "Bu şaheser nasıl çalışıyor?" dedim. Mantık kapıları (AND, OR, NOT) ile zihnimde satranç oynuyorum. Transistörlerin o nanosaniyelik dansı, saat döngülerinin (clock cycle) kalp atışı gibi donanıma can vermesi... Kodların metale dönüştüğü o büyülü anı anlamaya çalışıyorum.',
    color: '#064e3b', // Zehir Yeşili / Matrix
    image: '/CPU.jpeg', 
    badge: '💻 01000011 01010000 01010101',
    extraComponent: (
      <div className="mt-4 flex items-center gap-4 p-4 bg-black/40 rounded-xl font-mono text-green-400 border border-green-500/30 overflow-hidden relative">
        <div className="w-12 h-12 bg-green-900/50 rounded flex items-center justify-center border border-green-500 relative">
           <div className="absolute inset-0 bg-green-400 opacity-20 animate-ping rounded"></div>
           <span className="text-2xl">💾</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-green-300/70 mb-1">Clock Cycle: 4.2 GHz</p>
          <div className="text-sm truncate w-full flex gap-2">
            <span className="animate-pulse">1010</span>
            <span className="animate-pulse delay-75">1100</span>
            <span className="animate-pulse delay-150">0011</span>
            <span className="animate-pulse delay-300">1001</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'god-of-war-ost',
    title: 'Kratos\'un Öfkesi Arka Planda Çalıyor 🪓',
    description: 'Bear McCreary sen ne yaptın! O derin İskandinav koroları, çellonun damarlara işleyen hüznü... Çalışırken, kod yazarken veya sadece boşluğa bakarken arkada epik bir savaşın müziği dönüyor. "BOY!" diye bağırasım geliyor.',
    color: '#9f1239', // Kan Kırmızısı / Epik
    image: '/GOW3.jpeg', 
    badge: '🎵 Şu An Çalıyor',
    extraComponent: (
      <div className="mt-4 p-4 bg-black/40 rounded-xl border border-red-500/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white">God of War (PlayStation Soundtrack)</h4>
            <p className="text-xs text-white/60">Bear McCreary • Ashes</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center animate-bounce">
            ▶️
          </div>
        </div>
        <div className="flex items-end gap-1 h-8 mt-2 opacity-70">
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className="w-full bg-red-400 rounded-t" 
               style={{ 
                 height: `${Math.random() * 100}%`,
                 animation: `pulse ${0.5 + Math.random()}s infinite alternate` 
               }}
             />
           ))}
        </div>
      </div>
    )
  },
  {
    id: 'gaming-news',
    title: 'Oyun Sektörünün Nabzı Bende 🎮',
    description: 'Hangi stüdyo kime satıldı? Yeni motor (engine) güncellemeleri, ertelenen AAA oyunlar, sürpriz indie hitler... Twitter (X) akışım ve haber kaynaklarım tamamen bunlarla dolu. Geliştirici röportajlarını okumak en büyük zevkim.',
    color: '#1e3a8a', // Parlak Okyanus Mavisi
    image: '/gaming.jpeg', 
    badge: '📰 Son Dakika',
    extraComponent: <LiveGamingNews /> // Haberler Bileşeni Buraya Entegre Edildi
  }
];

// -----------------------------------------------------------
// 3. ANA UYGULAMA (Görünüm ve Scroll Takibi)
// -----------------------------------------------------------
export default function App() {
  const [bgColor, setBgColor] = useState('#0f172a');
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', 
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('id');
          const matched = DATA_SECTIONS.find((s) => s.id === targetId);
          if (matched) {
            setBgColor(matched.color);
            setActiveSection(matched.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="min-h-screen text-white font-sans transition-colors duration-700 ease-in-out selection:bg-white selection:text-black"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-5">
        {DATA_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center justify-end gap-3"
            
          >
            <span className={`text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeSection === section.id ? 'opacity-100' : ''}`}>
               
            </span>
            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 border-2 border-white/20 ${
              activeSection === section.id 
              ? 'bg-white scale-150 shadow-[0_0_15px_rgba(255,255,255,0.7)]' 
              : 'bg-white/20 hover:bg-white/50'
            }`} />
          </a>
        ))}
      </nav>

      <header className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl mix-blend-overlay animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
        </div>
        
        <div className="z-10 bg-black/20 p-8 md:p-16 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <span className="inline-block text-xs md:text-sm font-mono tracking-[0.3em] text-white/80 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            DURUM GÜNCELLEMESİ V2.0
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">
            Ben Bugünlerde <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 drop-shadow-lg">
                Ne Alemdeyim?
            </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
            Oyunlar, donanım mimarisi ve epik müzikler arasında gidip gelen zihnimin güncel bir haritası. Aşağı kaydır ve atmosfere gir.
            </p>
        </div>

        <div className="absolute bottom-10 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-sm font-mono tracking-widest">AŞAĞI KAYDIR</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
             <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-20">
        {DATA_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="min-h-[80vh] flex items-center justify-center py-20 px-4 md:px-16"
          >
            <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 transform ${
              activeSection === section.id ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-10'
            }`}>
              
              <div className={`space-y-6 order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="inline-block">
                  <span className="text-sm font-bold bg-white text-black px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    {section.badge}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                  {section.title}
                </h2>
                <p className="text-lg text-white/80 leading-relaxed font-medium">
                  {section.description}
                </p>
                
                {section.extraComponent}

              </div>

              <div className={`order-1 flex justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="relative group w-full max-w-lg">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/0 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-black/40 shadow-2xl backdrop-blur-sm p-2">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover rounded-2xl transform transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ))}
      </main>
    </div>
  );
}