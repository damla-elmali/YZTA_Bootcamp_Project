import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  const suggestedTopics = [
    'Kuantum bilişimi', 
    'Yapay sinir ağları', 
    'Kara delikler', 
    'React hookları', 
    'İklim değişikliği',
    'Blockchain teknolojisi',
    'Fotosentez nasıl çalışır'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto transition-all duration-500 ease-out">
      <h2 className="text-2xl sm:text-3xl font-medium text-white mb-8 text-center"> {/* Boyut ve boşluk ayarı */}
        Ne hakkında öğrenmek istersiniz?
      </h2>
      <form onSubmit={handleSubmit} className="relative mb-8"> {/* Alt boşluk */}
        <input
          type="text"
          className="w-full p-4 pr-16 bg-white/5 border border-white/30 text-white text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all" /* Stil güncellemeleri */
          placeholder="Bir konu girin (örn: 'genetik mühendisliği')"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
            topic.trim() ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
          disabled={!topic.trim()}
          aria-label="Konuyu gönder"
        >
          <ArrowRight size={20} />
        </button>
      </form>
      <div>
        <p className="text-white/70 mb-3 text-sm text-center sm:text-left">Önerilen konular:</p> {/* Renk ve hizalama */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {suggestedTopics.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/90 hover:text-white transition-all"
              onClick={() => {
                setTopic(suggestion);
                // İsteğe bağlı: Öneriye tıklanınca direkt submit edilebilir.
                // onSubmit(suggestion); 
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicInput;