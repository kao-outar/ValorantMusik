# ValorantMusik
# 🎵 ValorantMusik - Sage Vinyl Experience

![Moodboard](moodboard.png)

> **Projet Développement Créatif - IIM**  
> Expérience interactive Canvas inspirée de l'agent Sage de Valorant

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas-Interactive-2bffe6?style=for-the-badge)

## 👥 Équipe

**Développé par :**
- **Kaoutar ARARE** 
- **Omar AISSI**

## 🎯 Concept

**ValorantMusik** est une expérience web interactive qui réinvente l'univers de Valorant à travers le prisme de la musique. Le projet met en scène **Sage**, l'agent guérisseuse emblématique, dans un concept d'album musical fictif.

### 💡 L'idée créative

Nous avons imaginé Sage dans une nouvelle vie : après avoir quitté le combat, elle découvre le pouvoir de la musique pour soigner les âmes. Son premier album **"Die For You"** mélange ses anciens pouvoirs de guérison avec des mélodies apaisantes.

### ✨ Fonctionnalités

- **🎨 Vinyle Canvas interactif** : Animation fluide 60fps avec rotation réaliste
- **💫 Particules animées** : Orbes cyan signature de Sage avec effets de lumière
- **🎵 Expérience sonore** : Musique thème avec pause/resume fonctionnel
- **🖼️ Design authentique** : Couleurs et esthétique officielles Valorant/Sage
- **📱 Responsive** : Adapté mobile, tablette et desktop

---

## 🛠️ Technologies

- **HTML5** : Structure sémantique et Canvas API
- **CSS3** : Variables CSS, animations, design responsive  
- **JavaScript ES6+** : Classes, Canvas 2D, Web Audio API
- **Canvas 2D** : Rendu graphique haute performance
- **Web Audio API** : Gestion audio complète

---

## 📁 Structure du projet

```
ValorantMusik/
├── index.html              # Page principale
├── css/
│   ├── destyle.css         # Reset CSS
│   └── style.css           # Styles Valorant/Sage
├── js/
│   └── script.js           # Logique Canvas + interactions
├── assets/
│   ├── audio/
│   │   └── sage-theme.mp3  # Musique principale
│   └── images/             # Images du projet
├── moodboard.png           # Inspiration visuelle
└── README.md               # Documentation
```

---

## 🚀 Installation et lancement
### Lancement simple
```bash
# Cloner le repository
git clone https://github.com/kao-outar/ValorantMusik.git
cd ValorantMusik

# Ouvrir le projet
# Double-cliquer sur index.html
# OU glisser-déposer index.html dans votre navigateur
```

## 🎮 Utilisation

1. **Chargement** : La page se charge avec l'interface Sage et le vinyle statique
2. **Interaction** : Cliquez sur le vinyle pour démarrer l'expérience musicale
3. **Animation** : Le vinyle tourne et les particules s'animent autour
4. **Contrôles** : Cliquez à nouveau pour pause/reprendre la musique

### 🕹️ Contrôles

| Action | Souris  |
|--------|---------|
| Play/Pause | Clic sur vinyle |
| Navigation | Hover effects |

---

## 🎨 Identité visuelle

### Palette de couleurs Sage
```css
--sage-white: #e8e1ee     /* Blanc-gris principal */
--sage-cyan: #3be0c3      /* Cyan signature Sage */
--sage-dark-cyan: #16b199 /* Cyan foncé */
--sage-gray-blue: #38646b /* Gris-bleu */
--sage-black: #151211     /* Noir profond */
```

---

## 🔧 Fonctionnalités techniques

### Animation Canvas
- **Rotation réaliste** : Le vinyle tourne à 33 RPM comme un vrai
- **Système de particules** : Orbes qui orbitent autour du vinyle
- **Double buffering** : Canvas principal + canvas de fond
- **Optimisations** : High DPI, requestAnimationFrame, pause automatique

### Audio interactif  
- **Pause/Resume** : Vrai système de lecture (pas de restart)
- **Fallback** : Son généré si fichier audio indisponible
- **Volume optimisé** : Réglages pour une expérience agréable

### Responsive Design
- **Desktop** (>1200px) : Expérience complète
- **Tablette** (768-1200px) : Layout adapté
- **Mobile** (<768px) : Version verticale optimisée

---

## 🎬 Inspiration

Le projet s'inspire de :
- **L'univers Valorant** : Esthétique, couleurs, personnages
- **La culture vinyle** : Nostalgie, pochettes d'albums, rotation
- **L'art génératif** : Particules, animations procédurales
- **Le design gaming** : UI moderne, effets lumineux


## 📚 Documentation technique

### Classes principales
- `SageVinylExperience` : Classe principale de l'application
- `Particle` : Gestion des particules orbitales  
- `BackgroundParticle` : Particules d'arrière-plan
- `BurstParticle` : Effet d'explosion au clic

### Méthodes clés
- `drawVinyl()` : Rendu du vinyle avec rotation
- `animate()` : Boucle d'animation principale
- `togglePlay()` : Gestion play/pause audio
- `updateParticles()` : Mise à jour du système de particules

---

## 🐛 Support

### Navigateurs supportés
- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 12+
- ✅ Edge 79+

### Résolution de problèmes
- **Le vinyle ne tourne pas** : Vérifiez la console pour les erreurs JS
- **Pas de son** : Autorisez la lecture audio dans votre navigateur
- **Performance lente** : Testez sur un navigateur récent
