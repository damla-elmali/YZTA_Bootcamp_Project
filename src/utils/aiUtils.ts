// aiUtils.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserPreferences, Message } from '../types'; // types.ts dosyanızın doğru yolda olduğundan emin olun

// API anahtarını ortam değişkeninden al
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY ortam değişkeni bulunamadı veya boş.");
  // Geliştirme ortamında bir uyarı veya varsayılan bir davranış eklenebilir.
  // Üretimde bu durum uygulamanın çalışmamasına neden olmalı.
}
const genAIInstance = new GoogleGenerativeAI(apiKey || "FALLBACK_API_KEY_IF_ANY_DEV_PURPOSE"); // apiKey yoksa hata verir, fallback göstermelik.

// --- Yardımcı Fonksiyonlar (Kullanıcı Tercihlerini Açıklamak İçin) ---
function getStyleDescription(style: UserPreferences['learningStyle']): string {
  switch (style) {
    case 'detailed':
      return 'kapsamlı, adım adım detaylı açıklamalar';
    case 'technical':
      return 'teknik detaylara, terimlere ve uygulamaya odaklanan açıklamalar';
    case 'concise':
      return 'kısa ve öz, yalnızca anahtar noktaları içeren özet açıklamalar';
    default:
      return 'belirtilmemiş';
  }
}

function getTimeDescription(time: UserPreferences['timePreference']): string {
  switch (time) {
    case 'short':
      return 'yaklaşık 5-10 dakikalık okuma süresine uygun uzunlukta';
    case 'medium':
      return 'yaklaşık 10-20 dakikalık okuma süresine uygun uzunlukta';
    case 'long':
      return 'yaklaşık 20+ dakikalık okuma süresine uygun, derinlemesine içerik';
    default:
      return 'belirtilmemiş';
  }
}

function getVisualsDescription(visuals: UserPreferences['visualsPreference']): string {
  // Bu bilgi prompt'ta doğrudan kullanılmıyor ama gelecekte Markdown içinde [açıklama](link) gibi yönlendirmeler için saklanabilir.
  // Şimdilik AI'nın genel farkındalığı için.
  switch (visuals) {
    case 'always':
      return 'mümkün olduğunca fazla görselle (diyagram, grafik vb.) desteklenmesi bekleniyor (AI metin ürettiği için bunu dolaylı olarak teşvik etmeli)';
    case 'necessary':
      return 'sadece karmaşık kavramlar için, gerektiğinde görsellerle desteklenmesi bekleniyor (AI metin ürettiği için bunu dolaylı olarak teşvik etmeli)';
    case 'none':
      return 'görsel kullanılmadan, sadece metin tabanlı olması tercih ediliyor';
    default:
      return 'belirtilmemiş';
  }
}

function getExamplesDescription(examples: UserPreferences['examplesPreference']): string {
  switch (examples) {
    case 'many':
      return 'bolca pratik ve gerçek dünya örneği içermesi bekleniyor';
    case 'basic':
      return 'kavramları açıklamak için birkaç basit örnek içermesi bekleniyor';
    case 'none':
      return 'örnek kullanılmaması tercih ediliyor';
    default:
      return 'belirtilmemiş';
  }
}
// --- Yardımcı Fonksiyonlar Sonu ---

export const generateResponse = async (
  userPrompt: string, // Kullanıcının o anki sorusu veya talebi
  preferences: UserPreferences,
  previousMessages: Message[] = [] // Önceki mesajları da alacak şekilde güncellenmiş
): Promise<string> => {
  try {
    const model = genAIInstance.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // --- Sistem Talimatı (System Instruction) ---
    // Sistem talimatını doğrudan API çağrısına eklemek yerine, konuşma geçmişinin
    // ilk kullanıcı mesajına ekleyerek veya chat geçmişine rol ile ekleyerek yönetelim.
    // GoogleGenerativeAI kütüphanesinde en iyi pratik, sistemi ilk kullanıcı
    // mesajıyla veya history içinde 'user' rolüyle göndermektir.
    const systemInstructionText = `
Sen eğitim alanında uzmanlaşmış bir yapay zeka asistanısın.
İsmin EduSona ve görevin, aşağıda belirtilen öğrenme tercihlerine ve formatlama kurallarına uyarak kullanıcıya "${preferences.topic}" konusu hakkında yardımcı olmaktır.
Her zaman Türkçe yanıt ver. Cevaplarını düzgün paragraflar halinde yapılandır.
Maddeler ve başlıklar kullan. Gereksiz tekrarlardan kaçın. Bilgileri doğru ve güvenilir kaynaklara dayandırmaya çalış (kaynak belirtmen istenmiyor, sadece bilgilerin doğruluğuna dikkat et).

--- KULLANICININ ÖĞRENME TERCİHLERİ (Bu tercihleri dikkate alarak aşağıdaki formatta içerik oluştur) ---
- Öğrenme Konusu: ${preferences.topic}
- İstenen Anlatım Tarzı: ${getStyleDescription(preferences.learningStyle)}
- Görsel Kullanım İsteği (Metin tabanlı yanıtlarında bunu dikkate alarak açıklama yap): ${getVisualsDescription(preferences.visualsPreference)}
- Tahmini Okuma Süresine Uygunluk: ${getTimeDescription(preferences.timePreference)}
- İstenen Örnek Kullanımı: ${getExamplesDescription(preferences.examplesPreference)}

--- İÇERİK SUNUM FORMATI VE KURALLARI ---
İçeriği aşağıdaki şekilde formatla:

1.  İçeriği 3-5 ana bölüme ayır ve her bölüm için bir başlık kullan (Ana başlık için #, alt başlıklar için ##).
    İçerik Ana Başlığı: "# ${preferences.topic} Hakkında Kapsamlı Bir Rehber" (Bu başlığı kullan)
    Alt bölüm başlıkları için ## kullan.
2.  Her bölümün sonunda, o bölümde anlatılanları pekiştiren kısa bir **"Bölüm Özeti ve Hatırlatma"** (kalın yazıyla) ekle.
3.  İçeriğin en sonunda, öğrenilenleri genel olarak pekiştirmek için **"Öğrenilenleri Pekiştirme Soruları"** (kalın yazıyla) başlığı altında 3-5 adet soru ekle. Sorular açık uçlu veya konuyu düşündürücü nitelikte olabilir.
4.  Tüm içeriği Türkçe dilinde ve **akademik bir üslup** kullanarak hazırla. Dilin net, anlaşılır ve dilbilgisi kurallarına uygun olmasına özen göster.
5.  Kullanıcının örnek tercihi "${getExamplesDescription(preferences.examplesPreference)}" olduğundan, mümkünse konu ile ilgili günlük hayattan veya pratik uygulamalardan örnekler ver.
6.  Sadece kullanıcının istediği "${preferences.topic}" konusuna dair bilgiler paylaş ve kullanıcının yukarıda belirtilen öğrenme tercihlerine (anlatım tarzı, örnek vb.) özellikle dikkat et.
7.  Kullanıcının örnek tercihi "${getExamplesDescription(preferences.examplesPreference)}". Eğer örnekler sunuyorsan ve kullanıcının tercihi 'bolca pratik ve gerçek dünya örneği içermesi bekleniyor' veya 'kavramları açıklamak için birkaç basit örnek içermesi bekleniyor' ise, bu örneklerin nasıl anlaşılacağı veya çözüleceği konusunda kullanıcıya kısa yönlendirmeler yap. Eğer örnekler karmaşıksa, adım adım çözüm yolları sunabilirsin. Eğer kullanıcı örnek istemiyorsa ("${preferences.examplesPreference === 'none' ? 'evet' : 'hayır'}" şeklinde teyit), örnek verme.

Yanıtını Markdown formatında düzenle, böylece daha okunabilir olacak:
- Başlıklar için # (ana başlık) ve ## (alt başlıklar) kullan.
- Listeler için * (sırasız) veya 1., 2. (sıralı) kullan.
- Önemli noktaları vurgulamak için **kalın yazı** kullan.

Tablo Oluşturma Kuralları (Eğer tablo kullanacaksan BU KURALLARA KESİNLİKLE UY ve AŞAĞIDAKİ ÖRNEK FORMATI BİREBİR KULLAN):
- En fazla 4-5 sütuna sahip tablolar oluştur.
- Her hücrede kısa ve öz bilgiler ver, çok uzun metinlerden kaçın.
- Tablo başlıkları anlamlı olmalıdır.
- Her satır '|' karakteri ile başlamalı ve bitmelidir.
- Hücreler '|' karakteri ile ayrılmalıdır.
- Tablo başlıklarını ayırmak için ikinci satırda HER SÜTUN İÇİN \`| --- |\` (veya sola yaslamak için \`| :--- |\`, ortaya yaslamak için \`| :---: |\`, sağa yaslamak için \`| ---: |\`) formatını kullan. Bu ayırıcı satır zorunludur.
- Örnek tablo formatı:
  \`\`\`markdown
  | Başlık 1 | Başlık 2 | Başlık 3 |
  | :------- | :------- | :------- |
  | Veri 1A  | Veri 2A  | Veri 3A  |
  | Veri 1B  | Veri 2B  | Veri 3B  |
  \`\`\`
ÖNEMLİ: Tablo başlığı ayırıcı satırındaki tire (-) sayısı önemli değildir, ancak her sütun için \`| --- |\` deseni olmalıdır. Boş hücreler için \`|     |\` şeklinde boşluk bırak.
--- SİSTEM TALİMATI SONU ---
`;

    // --- SOHBET GEÇMİŞİ YAPISI ---
    // Sohbet geçmişini oluştur, yalnızca son N mesajı al (token limitini aşmamak için)
    // Gemini'nin `startChat` metodu mesaj geçmişi ile başlar.
    // Sistem talimatını geçmişin ilk mesajı olarak ekleyelim.
    const history = [
      { role: 'user', parts: [{ text: systemInstructionText }] },
      { role: 'model', parts: [{ text: `Anlaşıldı. ${preferences.topic} konusunda size nasıl yardımcı olabilirim?` }] } // Başlangıç mesajı
    ];
    
    // Önceki kullanıcı ve asistan mesajlarını history'ye ekle
    // Son mesajlar daha önemli olduğu için tersten ekleyebiliriz veya token limitine dikkat ederek ekleyebiliriz.
    // Burada basitçe mevcut tüm geçmişi ekleyelim, API token limitini aşarsa hata verecektir.
    for (const msg of previousMessages) {
        // Başlangıç mesajını tekrar eklememek için kontrol
         if (!(msg.role === 'assistant' && msg.content.includes('Anlaşıldı.'))){
             history.push({
                 role: msg.role === 'user' ? 'user' : 'model',
                 parts: [{ text: msg.content }]
             });
         }
    }

    // Gemini API ile konuşma başlat (startChat)
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      }
    });

    // Yeni kullanıcı mesajını gönder
    const result = await chat.sendMessage(userPrompt);
    
    const response = result.response;
    
    if (response.promptFeedback?.blockReason) {
        console.error('Yanıt engellendi:', response.promptFeedback.blockReason, response.promptFeedback.blockReasonMessage);
        const blockReasonMessage = response.promptFeedback.blockReasonMessage || "Belirli bir neden belirtilmedi.";
        return `Üzgünüm, isteğiniz işlenirken bir sorunla karşılaşıldı ve içeriğin bir kısmı veya tamamı engellendi (Sebep: ${response.promptFeedback.blockReason} - ${blockReasonMessage}). Lütfen ifadenizi değiştirip tekrar deneyin veya farklı bir soru sorun.`;
    }
    
    return response.text();

  } catch (error: any) {
    console.error('Yanıt oluşturulurken API hatası:', error);
    let errorMessage = 'Üzgünüm, yanıt oluştururken bir hatayla karşılaştım. Lütfen tekrar deneyin.';
    if (error.message) {
        if (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID')) {
            errorMessage = 'API anahtarınız geçerli değil gibi görünüyor. Lütfen kontrol edin.';
        } else if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
            errorMessage = 'API kotanız dolmuş olabilir. Lütfen daha sonra tekrar deneyin veya kotanızı kontrol edin.';
        } else if (error.message.includes('model`s input token limit')) {
            errorMessage = 'İstek çok uzun olduğu için işlenemedi. Lütfen daha kısa bir istekte bulunun.';
        }
    }
    // Diğer spesifik hatalar burada ele alınabilir.
    return errorMessage;
  }
};