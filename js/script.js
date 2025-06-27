/**
 * SAGE VINYL EXPERIENCE
 * Projet Valorant - Canvas Interactive Experience
 * IIM Développement Créatif
 * 
 * @author Votre Nom
 * @version 1.0.0
 */

'use strict';

/**
 * Configuration globale de l'application
 */
const CONFIG = {
  // Couleurs Sage Valorant (palette officielle)
  colors: {
    white: '#e8e1ee',
    cyan: '#3be0c3',
    darkCyan: '#16b199',
    grayBlue: '#38646b',
    black: '#151211'
  },
  
  // Paramètres du vinyle
  vinyl: {
    size: 450,
    radius: 200,
    centerRadius: 45,
    rotationSpeed: 0.02,
    grooveSpacing: 4
  },
  
  // Paramètres des particules
  particles: {
    count: 20,
    bgCount: 40,
    burstCount: 12,
    orbitDistance: 240,
    maxSize: 8,
    minSize: 4
  }
};

/**
 * Classe principale de l'expérience Sage Vinyl
 */
class SageVinylExperience {
  /**
   * Constructeur - Initialise l'expérience
   */
  constructor() {
    // Éléments DOM
    this.canvas = document.getElementById('vinylCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.bgCanvas = document.getElementById('bgParticles');
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.playStatus = document.getElementById('playStatus');
    
    // État de l'application
    this.isPlaying = false;
    this.vinylRotation = 0;
    this.particles = [];
    this.bgParticles = [];
    this.animationId = null;
    this.bgAnimationId = null;
    
    // Audio
    this.audioContext = null;
    this.currentAudio = null;
    this.audioFiles = {
      theme: 'assets/audio/sage-theme.mp3',
      click: 'assets/audio/vinyl-click.wav',
      quote: 'assets/audio/sage-quotes/not-kill-allies.mp3'
    };
    
    // Propriétés du canvas
    this.centerX = CONFIG.vinyl.size / 2;
    this.centerY = CONFIG.vinyl.size / 2;
    
    // Initialisation
    this.init();
  }
  
  /**
   * Initialise tous les composants de l'expérience
   */
  async init() {
    try {
      this.setupCanvas();
      this.initParticles();
      this.initBgParticles();
      this.bindEvents();
      this.startAnimations();
      this.drawVinyl();
      
      // Marquer comme chargé
      document.body.classList.add('loaded');
      console.log('🎵 Sage Vinyl Experience initialisée avec succès');
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
    }
  }
  
  /**
   * Configure les canvas et leurs propriétés
   */
  setupCanvas() {
    // Configuration du canvas principal (vinyle)
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.style.width = `${CONFIG.vinyl.size}px`;
    this.canvas.style.height = `${CONFIG.vinyl.size}px`;
    this.canvas.width = CONFIG.vinyl.size * dpr;
    this.canvas.height = CONFIG.vinyl.size * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Configuration du canvas d'arrière-plan
    this.bgCanvas.width = window.innerWidth;
    this.bgCanvas.height = window.innerHeight;
    
    // Optimisations de rendu
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
    this.bgCtx.imageSmoothingEnabled = true;
  }
  
  /**
   * Attache les événements
   */
  bindEvents() {
    // Interaction avec le vinyle
    this.canvas.addEventListener('click', () => this.togglePlay());
    this.canvas.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.togglePlay();
      }
    });
    
    // Redimensionnement de la fenêtre
    window.addEventListener('resize', () => this.handleResize());
    
    // Visibilité de la page (pause quand onglet inactif)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pauseAnimations();
      } else if (!document.hidden && this.isPlaying) {
        this.resumeAnimations();
      }
    });
  }
  
  /**
   * Gère le redimensionnement de la fenêtre
   */
  handleResize() {
    this.bgCanvas.width = window.innerWidth;
    this.bgCanvas.height = window.innerHeight;
  }
  
  /**
   * Toggle lecture/pause du vinyle
   */
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    
    // Son de clic
    this.playClickSound();
    
    if (this.isPlaying) {
      this.playStatus.textContent = 'Now playing...';
      this.createBurst();
      this.playSound();
      
      // Citation de Sage après 2 secondes
      setTimeout(() => {
        if (this.isPlaying) {
          this.playSageQuote();
        }
      }, 2000);
      
    } else {
      this.playStatus.textContent = 'Paused';
      this.stopSound();
    }
    
    // Feedback visuel
    this.canvas.style.transform = this.isPlaying ? 'scale(0.98)' : 'scale(1)';
    setTimeout(() => {
      this.canvas.style.transform = 'scale(1)';
    }, 150);
  }
  
  /**
   * Dessine le vinyle avec tous ses détails
   */
  drawVinyl() {
    // Nettoyer le canvas
    this.ctx.clearRect(0, 0, CONFIG.vinyl.size, CONFIG.vinyl.size);
    
    // Sauvegarder l'état du contexte
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    
    // === ROTATION DU VINYLE ===
    if (this.isPlaying) {
      this.ctx.rotate(this.vinylRotation);
    }
    
    // === DISQUE PRINCIPAL ===
    this.drawVinylDisc();
    
    // === SILLONS ===
    this.drawVinylGrooves();
    
    // === REFLETS ===
    this.drawVinylReflections();
    
    // === LIGNES RADIALES ===
    this.drawRadialLines();
    
    // Restaurer l'état du contexte
    this.ctx.restore();
    
    // === CENTRE FIXE ===
    this.drawVinylCenter();
    
    // === PARTICULES ===
    this.drawParticles();
  }
  
  /**
   * Dessine le disque principal du vinyle
   */
  drawVinylDisc() {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, CONFIG.vinyl.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = CONFIG.colors.black;
    this.ctx.fill();
  }
  
  /**
   * Dessine les sillons du vinyle
   */
  drawVinylGrooves() {
    for (let i = 25; i < CONFIG.vinyl.radius; i += CONFIG.vinyl.grooveSpacing) {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, i, 0, Math.PI * 2);
      
      const opacity = 0.1 + (i / CONFIG.vinyl.radius) * 0.2;
      this.ctx.strokeStyle = `rgba(22, 177, 153, ${opacity})`;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();
    }
  }
  
  /**
   * Dessine les reflets sur le vinyle
   */
  drawVinylReflections() {
    const gradient = this.ctx.createRadialGradient(-40, -40, 0, 0, 0, CONFIG.vinyl.radius);
    gradient.addColorStop(0, 'rgba(59, 224, 195, 0.15)');
    gradient.addColorStop(0.4, 'rgba(59, 224, 195, 0.08)');
    gradient.addColorStop(1, 'rgba(21, 18, 17, 0.3)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
  
  /**
   * Dessine les lignes radiales
   */
  drawRadialLines() {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      
      this.ctx.save();
      this.ctx.rotate(angle);
      this.ctx.beginPath();
      this.ctx.moveTo(30, 0);
      this.ctx.lineTo(180, 0);
      this.ctx.strokeStyle = 'rgba(59, 224, 195, 0.1)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
  
  /**
   * Dessine le centre fixe du vinyle
   */
  drawVinylCenter() {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    
    // Label principal
    this.ctx.beginPath();
    this.ctx.arc(0, 0, CONFIG.vinyl.centerRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = CONFIG.colors.white;
    this.ctx.fill();
    
    // Bordure cyan
    this.ctx.beginPath();
    this.ctx.arc(0, 0, CONFIG.vinyl.centerRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = CONFIG.colors.cyan;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Trou central
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = CONFIG.colors.black;
    this.ctx.fill();
    
    // Texte sur le label
    this.drawCenterText();
    
    this.ctx.restore();
  }
  
  /**
   * Dessine le texte au centre du vinyle
   */
  drawCenterText() {
    this.ctx.fillStyle = CONFIG.colors.black;
    this.ctx.textAlign = 'center';
    
    // Titre principal
    this.ctx.font = 'bold 14px Rajdhani';
    this.ctx.fillText('SAGE', 0, -10);
    
    // Sous-titres
    this.ctx.font = '10px Rajdhani';
    this.ctx.fillText('FOR YOU', 0, 5);
    this.ctx.fillText('VALORANT', 0, 18);
  }
  
  /**
   * Initialise les particules principales
   */
  initParticles() {
    this.particles = [];
    
    for (let i = 0; i < CONFIG.particles.count; i++) {
      const angle = (Math.PI * 2 * i) / CONFIG.particles.count;
      const distance = CONFIG.particles.orbitDistance + Math.random() * 80;
      
      this.particles.push(new Particle({
        x: this.centerX + Math.cos(angle) * distance,
        y: this.centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * CONFIG.particles.maxSize + CONFIG.particles.minSize,
        opacity: Math.random() * 0.7 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        baseX: this.centerX + Math.cos(angle) * distance,
        baseY: this.centerY + Math.sin(angle) * distance,
        orbitAngle: angle,
        orbitSpeed: 0.005 + Math.random() * 0.01
      }));
    }
  }
  
  /**
   * Initialise les particules d'arrière-plan
   */
  initBgParticles() {
    this.bgParticles = [];
    
    for (let i = 0; i < CONFIG.particles.bgCount; i++) {
      this.bgParticles.push(new BackgroundParticle({
        x: Math.random() * this.bgCanvas.width,
        y: Math.random() * this.bgCanvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2
      }));
    }
  }
  
  /**
   * Dessine toutes les particules
   */
  drawParticles() {
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
    });
  }
  
  /**
   * Dessine les particules d'arrière-plan
   */
  drawBgParticles() {
    this.bgCtx.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
    
    this.bgParticles.forEach(particle => {
      particle.draw(this.bgCtx);
    });
  }
  
  /**
   * Met à jour toutes les particules
   */
  updateParticles() {
    this.particles.forEach(particle => {
      particle.update(this.isPlaying, this.centerX, this.centerY);
    });
    
    // Supprimer les particules temporaires
    this.particles = this.particles.filter(particle => {
      if (particle.life !== undefined) {
        return particle.life > 0;
      }
      return true;
    });
  }
  
  /**
   * Met à jour les particules d'arrière-plan
   */
  updateBgParticles() {
    this.bgParticles.forEach(particle => {
      particle.update(this.bgCanvas.width, this.bgCanvas.height);
    });
  }
  
  /**
   * Crée une explosion de particules
   */
  createBurst() {
    for (let i = 0; i < CONFIG.particles.burstCount; i++) {
      const angle = (Math.PI * 2 * i) / CONFIG.particles.burstCount;
      
      this.particles.push(new BurstParticle({
        x: this.centerX,
        y: this.centerY,
        vx: Math.cos(angle) * 4,
        vy: Math.sin(angle) * 4,
        size: Math.random() * 6 + 3,
        opacity: 1,
        pulsePhase: 0,
        life: 100,
        orbitAngle: angle,
        orbitSpeed: 0.01
      }));
    }
  }
  
  /**
   * Boucle d'animation principale
   */
  animate() {
    // Rotation du vinyle
    if (this.isPlaying) {
      this.vinylRotation += CONFIG.vinyl.rotationSpeed;
    }
    
    // Mise à jour des particules
    this.updateParticles();
    
    // Rendu
    this.drawVinyl();
    
    // Prochaine frame
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Boucle d'animation d'arrière-plan
   */
  animateBg() {
    this.updateBgParticles();
    this.drawBgParticles();
    
    this.bgAnimationId = requestAnimationFrame(() => this.animateBg());
  }
  
  /**
   * Démarre les animations
   */
  startAnimations() {
    this.animate();
    this.animateBg();
  }
  
  /**
   * Met en pause les animations
   */
  pauseAnimations() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.bgAnimationId) {
      cancelAnimationFrame(this.bgAnimationId);
      this.bgAnimationId = null;
    }
  }
  
  /**
   * Reprend les animations
   */
  resumeAnimations() {
    if (!this.animationId) {
      this.startAnimations();
    }
  }
  
  /**
   * Son principal (musique de Sage) - avec pause/resume
   */
  async playSound() {
    try {
      // Si pas encore d'audio, le créer une seule fois
      if (!this.currentAudio) {
        this.currentAudio = new Audio(this.audioFiles.theme);
        this.currentAudio.loop = true;
        this.currentAudio.volume = 0.3;
      }
      
      // Si en pause, reprendre là où on s'était arrêté
      if (this.currentAudio.paused) {
        const playPromise = this.currentAudio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('🎵 Sage theme en cours de lecture...');
        }
      }
      
    } catch (error) {
      console.log('Audio non supporté ou pas de fichier:', error);
      // Fallback : son généré
      this.playGeneratedSound();
    }
  }
  
  /**
   * Son de clic sur le vinyle
   */
  playClickSound() {
    try {
      const clickSound = new Audio(this.audioFiles.click);
      clickSound.volume = 0.5;
      clickSound.play();
    } catch (error) {
      console.log('Son de clic non disponible');
    }
  }
  
  /**
   * Citation de Sage
   */
  playSageQuote() {
    try {
      const quote = new Audio(this.audioFiles.quote);
      quote.volume = 0.7;
      quote.play();
    } catch (error) {
      console.log('Citation Sage non disponible');
    }
  }
  
  /**
   * Son généré en fallback
   */
  playGeneratedSound() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 2);
      
    } catch (error) {
      console.log('Web Audio API non supportée');
    }
  }
  
  /**
   * Pause/Resume du son (sans remettre à zéro)
   */
  stopSound() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    console.log('⏸️ Son en pause');
  }
  
  /**
   * Nettoyage des ressources
   */
  destroy() {
    this.pauseAnimations();
    this.canvas.removeEventListener('click', this.togglePlay);
    window.removeEventListener('resize', this.handleResize);
  }
}

/**
 * Classe Particle - Particule principale
 */
class Particle {
  constructor(config) {
    Object.assign(this, config);
  }
  
  update(isPlaying, centerX, centerY) {
    if (isPlaying) {
      // Orbite autour du vinyle
      this.orbitAngle += this.orbitSpeed;
      const distance = CONFIG.particles.orbitDistance + Math.sin(this.pulsePhase) * 20;
      this.x = centerX + Math.cos(this.orbitAngle) * distance;
      this.y = centerY + Math.sin(this.orbitAngle) * distance;
    } else {
      // Mouvement libre
      this.x += this.vx;
      this.y += this.vy;
      
      // Rebond sur les bords
      if (this.x < 0 || this.x > CONFIG.vinyl.size) this.vx *= -1;
      if (this.y < 0 || this.y > CONFIG.vinyl.size) this.vy *= -1;
    }
    
    this.pulsePhase += 0.04;
  }
  
  draw(ctx) {
    const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
    
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = CONFIG.colors.cyan;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 224, 195, ${this.opacity * pulse})`;
    ctx.fill();
    
    // Double glow
    ctx.shadowBlur = 30;
    ctx.fill();
    
    ctx.restore();
  }
}

/**
 * Classe BackgroundParticle - Particule d'arrière-plan
 */
class BackgroundParticle {
  constructor(config) {
    Object.assign(this, config);
  }
  
  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;
    this.pulsePhase += 0.02;
    
    // Wrap around edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }
  
  draw(ctx) {
    const pulse = Math.sin(this.pulsePhase) * 0.4 + 0.6;
    
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = CONFIG.colors.cyan;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 224, 195, ${this.opacity * pulse})`;
    ctx.fill();
    
    ctx.restore();
  }
}

/**
 * Classe BurstParticle - Particule d'explosion
 */
class BurstParticle extends Particle {
  update(isPlaying, centerX, centerY) {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.opacity = this.life / 100;
    this.pulsePhase += 0.1;
  }
}

/**
 * Initialisation de l'application
 */
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier le support Canvas
  if (!document.createElement('canvas').getContext) {
    console.error('❌ Canvas non supporté');
    return;
  }
  
  // Initialiser l'expérience
  window.sageExperience = new SageVinylExperience();
  
  console.log('🚀 Application Sage Vinyl Experience démarrée');
});

/**
 * Gestion des erreurs globales
 */
window.addEventListener('error', (event) => {
  console.error('❌ Erreur application:', event.error);
});

// Export pour utilisation en module (optionnel)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SageVinylExperience, CONFIG };
}