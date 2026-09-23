# 🍩 Dobişko - Android Mobil Oyun Tanıtım Sayfası (Landing Page)

**Dobişko**, kurabiyeler, donatlar ve tatlıların peşinde koşan sevimli ve tombiş bir kahramanı konu alan bağımsız bir Android sonsuz koşu oyunudur. Bu proje, oyun için modern, dönüşüm odaklı, mobil öncelikli ve yüksek performanslı bir tanıtım / indirme landing page'idir.

---

## 🎨 Tasarım ve Özellikler

- **Tatlı & Neşeli Renk Paleti:** Gökyüzü mavisi (`#E0F2FE`), yumuşak şeker pembesi (`#F43F5E`), altın kurabiye sarısı (`#FDE047`) ve çikolata kahvesi (`#451A03`).
- **Bubbly & Modern Tipografi:** Google Fonts *Fredoka* (başlıklar) ve *Quicksand* (gövde metinleri).
- **Yüksek Dönüşümlü Hero Alanı:** 
  - Dikkat çekici doğrudan APK indirme butonu (v1.0.4, 48 MB, virüssüz sertifikalı).
  - İnteraktif telefon maketi (animasyonlu Dobişko SVG karakteri, şeker seli göstergesi ve parkur görünümü).
  - Arka planda yüzen tatlı parçacıkları (Canvas API).
- **Oyun Hakkında & Karakter Kartı:** Dobişko'nun kurabiye iştahı, çevikliği ve özel yeteneklerini gösteren karakter profil alanı.
- **Özellikler (Features):** Tek elle oynanış, eğlenceli güçlendiriciler, 20+ kostüm ve %100 internetsiz oynanabilirlik vurgusu.
- **Ekran Görüntüleri & Lightbox Galeri:** Tıklandığında açılan klavye destekli (Esc, Sağ/Sol Ok) tam ekran görsel inceleme modali.
- **İndirme ve Mağazalar Bölümü:** Doğrudan APK ve Uptodown kartları ile sistem gereksinimleri tablosu.
- **Sıkça Sorulan Sorular (SSS):** Yumuşak açılıp kapanan interaktif akordeon.
- **İnteraktif Eğlence:** 
  - Web Audio API ile çalışan retro arcade ses efektleri ve ses açma/kapama butonu.
  - İndirme butonlarına basıldığında patlayan tatlı konfeti efekti ve snackbar/toast bildirimi.

---

## 📂 Dosya Yapısı

```
Dobisko/
├── index.html              # Ana HTML5 şablonu (SEO & OpenGraph hazır)
├── netlify.toml            # Netlify hosting ve güvenlik başlıkları konfigürasyonu
├── README.md               # Proje belgelendirmesi
└── assets/
    ├── css/
    │   └── style.css       # Özel animasyonlar, cam efekti (glassmorphism) ve stiller
    ├── js/
    │   └── main.js         # Menü, modal, ses sentezleyici, konfeti ve etkileşimler
    └── img/                # Ek görsel varlıklar (gerektiğinde)
```

---

## 🚀 Netlify'a Canlıya Alma (Deploy) Rehberi

Bu proje tamamen statik (HTML/CSS/JS) olup herhangi bir `npm build` aşamasına ihtiyaç duymaz.

### 1. Yöntem: Sürükle & Bırak (Drag and Drop)
1. [Netlify Sites](https://app.netlify.com/drop) sayfasına gidin.
2. `Dobisko` klasörünü doğrudan tarayıcı penceresine sürükleyip bırakın.
3. Birkaç saniye içinde sayfanız tüm dünyada anında yayına girer!

### 2. Yöntem: GitHub ile Otomatik Dağıtım (Continuous Deployment)
1. Bu klasörü bir GitHub deposuna gönderin (`git init`, `git add .`, `git commit -m "feat: initial landing page"`, `git push`).
2. Netlify panelinden **"Add new site" > "Import an existing project" > "GitHub"** seçin.
3. Depoyu seçtiğinizde `netlify.toml` otomatik algılanacaktır. Her `git push` işleminde siteniz otomatik güncellenir.

---

## 💻 Yerel Önizleme (Local Test)

Herhangi bir statik sunucu veya Python ile anında test edebilirsiniz:

```bash
# Python ile:
python -m http.server 3000

# veya Node / npx ile:
npx serve .
```
Tarayıcınızda `http://localhost:3000` adresini açarak inceleyebilirsiniz.
