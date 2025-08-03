import React, { useState } from 'react';
import { UserPreferences } from '../types';
import OnboardingQuestion from '../components/OnboardingQuestion';
import TopicInput from '../components/TopicInput';
import ProgressIndicator from '../components/ProgressIndicator';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

const TOTAL_STEPS = 5; // Toplam adım sayısı sabit kalabilir veya Türkçeleştirilebilir (örn: `TOPLAM_ADIMLAR`)

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningStyle: 'detailed',
    visualsPreference: 'necessary',
    timePreference: 'medium',
    examplesPreference: 'basic',
    topic: '',
  });

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Son adımda topic girildikten sonra onComplete çağrılacak,
      // bu yüzden burada doğrudan çağırmaya gerek yok.
      // TopicInput component'i handleTopicSubmit ile onComplete'i tetikleyecek.
      // Ancak, eğer 5. adımda "İleri" butonu hala görünüyorsa (TopicInput'tan sonra)
      // ve bu butona basıldığında onComplete çağrılmalıysa, bu mantık kalabilir.
      // Mevcut yapıda 5. adımda TopicInput var ve onun submit'i onComplete'i çağırıyor.
      // Bu yüzden step < 5 ise "İleri" butonu görünmeli.
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  // handleNext'i soru adımları için kullanalım
  const handleQuestionNext = () => {
    if (step < TOTAL_STEPS) {
        setStep(step + 1);
    }
  }

  const handleTopicSubmit = (topic: string) => {
    const finalPreferences = { ...preferences, topic };
    setPreferences(finalPreferences); // State'i güncelleyelim (opsiyonel, çünkü hemen onComplete çağrılıyor)
    onComplete(finalPreferences);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div 
          className="w-full max-w-2xl mx-auto opacity-0 animate-fadeIn"
          style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
        >
          {step === 1 && (
            <OnboardingQuestion
              question="Öğrenme içeriğinizin nasıl sunulmasını istersiniz?"
              options={[
                {
                  value: 'detailed',
                  label: 'Adım adım, çok detaylı',
                  description: 'Konu hakkında hiçbir şey bilmiyormuşum gibi kapsamlı açıklamalar',
                },
                {
                  value: 'technical',
                  label: 'Teknik detaylara odaklanılsın',
                  description: 'Biraz bilgisi olanlar için detaylı teknik bilgiler',
                },
                {
                  value: 'concise',
                  label: 'Kısa ve öz',
                  description: 'Sadece kilit bilgileri içeren, sonuç odaklı özetler',
                },
              ]}
              value={preferences.learningStyle}
              onChange={(value) => updatePreference('learningStyle', value as UserPreferences['learningStyle'])}
            />
          )}

          {step === 2 && (
            <OnboardingQuestion
              question="İçeriğe görseller dahil edilsin mi?"
              options={[
                {
                  value: 'always',
                  label: 'Mümkün olduğunca fazla',
                  description: 'Yardımcı olacağı her durumda diyagramlar, grafikler ve görseller eklensin',
                },
                {
                  value: 'necessary',
                  label: 'Sadece gerektiğinde',
                  description: 'Sadece açıklama gerektiren karmaşık kavramlar için görseller eklensin',
                },
                {
                  value: 'none',
                  label: 'Görsel gerekmiyor',
                  description: 'Sadece metin tabanlı açıklamaları tercih ederim',
                },
              ]}
              value={preferences.visualsPreference}
              onChange={(value) => updatePreference('visualsPreference', value as UserPreferences['visualsPreference'])}
            />
          )}

          {step === 3 && (
            <OnboardingQuestion
              question="Okumaya ne kadar zaman ayırmayı planlıyorsunuz?"
              options={[
                {
                  value: 'short',
                  label: '5–10 dakika',
                  description: 'Birkaç dakikada okuyabileceğim hızlı açıklamalar',
                },
                {
                  value: 'medium',
                  label: '10–20 dakika',
                  description: 'Önemli noktaları kapsayan dengeli içerik',
                },
                {
                  value: 'long',
                  label: '20+ dakika',
                  description: 'Konuları derinlemesine işleyen kapsamlı içerik',
                },
              ]}
              value={preferences.timePreference}
              onChange={(value) => updatePreference('timePreference', value as UserPreferences['timePreference'])}
            />
          )}

          {step === 4 && (
            <OnboardingQuestion
              question="İçeriğin örnekler içermesini ister misiniz?"
              options={[
                {
                  value: 'many',
                  label: 'Evet, bolca pratik örnek',
                  description: 'En iyi birden fazla gerçek dünya örneğiyle öğreniyorum',
                },
                {
                  value: 'basic',
                  label: 'Sadece temel örnekler yeterli',
                  description: 'Kavramları açıklamak için birkaç basit örnek',
                },
                {
                  value: 'none',
                  label: 'Örnek gerekmiyor',
                  description: 'Örneksiz, odaklanmış açıklamaları tercih ederim',
                },
              ]}
              value={preferences.examplesPreference}
              onChange={(value) => updatePreference('examplesPreference', value as UserPreferences['examplesPreference'])}
            />
          )}

          {step === 5 && (
            <TopicInput onSubmit={handleTopicSubmit} />
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="w-full max-w-2xl mx-auto flex justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Geri
            </button>
          ) : (
            <div></div> // Geri butonu için yer tutucu
          )}
          
          {/* Sadece soru adımlarında "İleri" butonunu göster */}
          {step < TOTAL_STEPS && step !== 5 && ( 
            <button
              onClick={handleQuestionNext} // handleNext yerine handleQuestionNext
              className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            >
              İleri
              <ChevronRight size={20} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;