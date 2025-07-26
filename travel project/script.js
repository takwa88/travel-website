// === Liste des chemins des vidéos (1 vidéo par lieu) ===
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4"
];

// === Liste des chemins des audios (1 audio par lieu) ===
const audios = [
  "audios/audio1.mp3",
  "audios/audio2.mp3",
  "audios/audio3.mp3",
  "audios/audio4.mp3",
  "audios/audio5.mp3"
];

// === Texte à afficher pour chaque lieu ===
const slides = [
  {
    place: "Seaside Paradise",
    title: "A Heart in the Sand",
    desc: "Write your dreams in the sand while the ocean sings behind you. A peaceful moment where sky meets sea."
  },
  {
    place: "Mystic Forest Trail",
    title: "Hiking Into Silence",
    desc: "Wander deep into emerald woods, where every step reveals mystery, serenity, and freedom."
  },
  {
    place: "Golden Desert Route",
    title: "Riding the Horizon",
    desc: "Travel with power across vast sands. Silence, sun, and survival mark this endless journey."
  },
  {
    place: "Forest Curves",
    title: "Nature's Road",
    desc: "A snake-like road through thick trees — where speed and calm coexist beautifully."
  },
  {
    place: "Edge of Wonder",
    title: "The Watchful Spirit",
    desc: "One man. One mountain. One view to remind us how tiny we are before nature’s wonders."
  }
];

let current = 0; // index du slide affiché

// === Fonction pour afficher une slide (vidéo + audio + texte) ===
function showSlide(index) {
  const video = document.getElementById("bgVideo");
  const audio = document.getElementById("bgAudio");
  const place = document.getElementById("place");
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const bar = document.getElementById("bar");

  // Met à jour la vidéo
  video.style.opacity = "0"; // effet de fondu sortant

  video.src = videos[index];
  video.play();
  

  setTimeout(() => {
  video.style.opacity = "1"; // effet de fondu entrant
}, 300);


  // Met à jour l’audio
  audio.pause();             // stop le précédent
  audio.src = audios[index]; // nouveau son
  audio.load();              // recharge le son
  audio.play().catch((err) => {
    console.log("Erreur audio :", err); // si erreur
  });

  // Met à jour les textes
  place.textContent = slides[index].place;
  title.textContent = slides[index].title;
  desc.textContent = slides[index].desc;
  const slideNumber = document.getElementById("slideNumber");
slideNumber.textContent = `Lieu ${index + 1} / ${slides.length}`;

  // Reset animation fadeInUp sur tous les textes
place.style.animation = "none";
title.style.animation = "none";
desc.style.animation = "none";

// Force le redémarrage de l'animation
void place.offsetWidth;
void title.offsetWidth;
void desc.offsetWidth;

// Réactive l'animation
place.style.animation = "fadeInUp 1s ease forwards";
title.style.animation = "fadeInUp 1.2s ease forwards";
desc.style.animation = "fadeInUp 1.4s ease forwards";


  // Redémarre l’animation de la barre
  bar.style.animation = "none";     // stop l’animation
  void bar.offsetWidth;             // hack pour forcer le redémarrage
  bar.style.animation = "fill 10s linear infinite";
}
const startBtn = document.getElementById("startBtn");
const hour = new Date().getHours();

if(hour < 12) startBtn.textContent = "☀️ Bonjour, lance l'expérience";
else if(hour < 18) startBtn.textContent = "🌤️ Bon après-midi, lance l'expérience";
else startBtn.textContent = "🌙 Bonne soirée, lance l'expérience";






// ✅ Lancement après clic sur le bouton "Lancer l'expérience"
document.getElementById("startBtn").addEventListener("click", () => {
  // Cache l’overlay de démarrage
  document.getElementById("startOverlay").style.display = "none";

  // Active le son
  const audio = document.getElementById("bgAudio");
  audio.muted = false; // désactive le mute
  audio.play();        // joue l’audio

  // Affiche la première slide
  showSlide(current);

  // Commence à changer automatiquement toutes les 10s
  setInterval(() => {
    current = (current + 1) % videos.length;
    showSlide(current);
  }, 10000);
});