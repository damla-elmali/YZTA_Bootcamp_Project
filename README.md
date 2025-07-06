# YZTA_Bootcamp_Project


---

# 📌 SympTrack: AI Destekli Semptom Takip ve Risk Sınıflandırma Sistemi

## 🎯 Proje Amacı

Bu projenin temel amacı, kullanıcıların metin olarak girdiği semptom açıklamalarını analiz ederek sağlık riski seviyesini belirlemek ve uygun öneriler sunmaktır. Doğal dil işleme (NLP) teknikleri kullanılarak semptomlar; **düşük**, **orta** ve **yüksek** risk kategorilerine sınıflandırılır.

---

## 🧠 Veri Bilimi - Sprint 1

### ✅ Gerçekleştirilenler

* **Veri seti tespiti:** Hugging Face üzerinde bulunan, hasta semptomları, tıbbi geçmiş ve ilaç bilgilerini içeren veri seti seçildi ve kullanıma hazır hale getirildi.
* **Veri seti analizi:** Aşağıdaki sütunlar detaylıca incelendi:

  * `Age`, `Gender`, `Symptoms`, `Medical_History`, `Medications`, `Lifestyle`, `Doctor_Notes`, `Diagnosis`, `Risk_Level`
* **Etiket sütunu belirlendi:** `Risk_Level`, sınıflandırma modeli için hedef değişken olarak seçildi.
* **Veri anlamlandırma çalışmaları:** Semptomlar ve yaşam alışkanlıkları ile risk seviyeleri arasındaki ilişkiler üzerine ilk analizler yapıldı.
* **Model yaklaşımı netleşti:** NLP tabanlı BERT modeline geçmeden önce veri temizleme ve etiketleme süreçleri planlandı.

---

## 📋 Sprint Notları

* `User Story`ler product backlog’a yazıldı ve önceliklendirildi.
* Sprint 1 süresince özellikle **veri keşfi, temizlik ve ön işleme** adımlarına odaklanıldı.

---

## 📊 Sprint Puanlaması

**Hedeflenen Toplam Puan:** `100`

| Görev                                  | Puan    |
| -------------------------------------- | ------- |
| Veri setinin bulunması ve analizi      | 15      |
| Sütunların sınıflandırılması           | 10      |
| Hedef değişkenin belirlenmesi          | 5       |
| Kategorik değişken analizleri          | 10      |
| Medikal içerik değerlendirmesi         | 10      |
| Risk seviyelerinin dağılım analizi     | 10      |
| Veri temizlik stratejisi oluşturulması | 20      |
| NLP model yaklaşımı seçimi (BERT)      | 20      |
| **Toplam**                             | **100** |

> Not: Backlog toplam 300 puan olarak planlanmıştır. Sprint 1, temel hazırlık süreci olarak değerlendirilmiş ve bu nedenle 100 puan hedeflenmiştir.

---

## 🗓 Daily Scrum

* Daily Scrum toplantıları **her 3 günde bir, saat 20:00'de** WhatsApp üzerinden **yazılı olarak** gerçekleştirilmiştir.

---

## 🖥 Ürün Durumu - Sprint 1 Sonu

* Veri seti hazırlandı, analiz edildi ve hedef değişken belirlendi.
* Proje için BERT tabanlı bir NLP modelinin uygun olacağına karar verildi.
* Bir sonraki sprintte embedding üretimi ve ilk model eğitimi yapılacaktır.

---

## 🔍 Sprint Review

* Sprint kapsamında planlanan görevler başarıyla tamamlandı.
* Tüm ekip üyeleri sürece aktif katkı sağladı.
* Veri setinin kapsamı ve içeriği, proje için anlamlı çıktıların elde edilmesine olanak sağladı.

---

## 🔄 Sprint Retrospective

### ✅ İyi Gidenler

* Ekip, veri bilimi süreçlerinde ortak bir yön belirledi.
* Görevler zamanında ve eksiksiz tamamlandı.

### 🛠️ Geliştirilecek Noktalar

* BERT entegrasyonu öncesi deneme amaçlı mini testler yapılmalı.
* Veri seti açıklamaları daha detaylı dokümante edilmeli.

---

## 🚀 Bir Sonraki Sprintte Hedefler (Sprint 2 Preview)

* `Symptoms` metinleri BERT tokenizer ile işlenecek.
* Hugging Face üzerinden uygun model çağrılacak ve denemeler yapılacak.
* İlk sınıflandırma modeli eğitilecek ve performansı değerlendirilecek.

---

