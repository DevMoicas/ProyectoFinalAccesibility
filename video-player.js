/**
 * Video Player for Pink Panther Website
 * Handles YouTube video embedding with cassette button and retro TV
 */

document.addEventListener('DOMContentLoaded', () => {
    initCassettePlayer();
});

/**
 * Initialize Cassette Player
 */
function initCassettePlayer() {
    console.log('🎬 Inicializando reproductor de cassette...');

    const btnCassette = document.getElementById('btn-cassette');
    const tvContainer = document.getElementById('tv-container');
    const videoPlayer = document.getElementById('video-player');

    console.log('Elementos encontrados:', {
        btnCassette: !!btnCassette,
        tvContainer: !!tvContainer,
        videoPlayer: !!videoPlayer
    });

    if (!btnCassette || !tvContainer || !videoPlayer) {
        console.error('❌ Error: No se encontraron todos los elementos necesarios');
        return;
    }

    // Pink Panther video URL - Video verificado que funciona
    const videoURL = 'https://youtu.be/6ZSIwUwbITM';

    console.log('✅ Reproductor inicializado correctamente');
    console.log('Video URL:', videoURL);

    // Event listener for cassette button
    btnCassette.addEventListener('click', () => {
        console.log('🎯 Botón cassette clickeado');
        loadVideoInTV(videoURL);
    });
}

/**
 * Load Video in TV Screen
 * @param {string} videoURL - URL del video de YouTube
 */
function loadVideoInTV(videoURL) {
    console.log('📺 Cargando video en TV...');
    console.log('URL recibida:', videoURL);

    const tvContainer = document.getElementById('tv-container');
    const videoPlayer = document.getElementById('video-player');

    if (!videoURL || videoURL === '') {
        console.error('❌ Error: No se proporcionó URL de video');
        return;
    }

    // Extract YouTube video ID
    console.log('🔍 Extrayendo ID del video...');
    const videoId = extractYouTubeID(videoURL);

    if (!videoId) {
        console.error('❌ Error: URL de YouTube inválida');
        console.error('URL que falló:', videoURL);
        return;
    }

    console.log('✅ ID del video extraído:', videoId);

    // Create YouTube iframe
    console.log('🎥 Creando iframe de YouTube...');
    const iframe = createYouTubeIframe(videoId);

    // Clear video player and add iframe
    console.log('🧹 Limpiando reproductor y agregando iframe...');
    videoPlayer.innerHTML = '';
    videoPlayer.appendChild(iframe);

    // Show TV container
    console.log('📺 Mostrando contenedor de TV...');
    tvContainer.classList.remove('hidden');
    console.log('Clase "hidden" removida:', !tvContainer.classList.contains('hidden'));

    // Announce to screen readers
    announceToScreenReader('Reproduciendo fragmento de La Pantera Rosa');

    // Smooth scroll to TV
    console.log('📜 Haciendo scroll al TV...');
    tvContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    console.log('✅ Video cargado exitosamente');
}

/**
 * Extract YouTube Video ID from URL
 * @param {string} url - URL de YouTube
 * @returns {string|null} - ID del video o null si es inválido
 */
function extractYouTubeID(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // ID directo
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

/**
 * Create YouTube Iframe
 * @param {string} videoId - ID del video de YouTube
 * @returns {HTMLIFrameElement} - Elemento iframe
 */
function createYouTubeIframe(videoId) {
    const iframe = document.createElement('iframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = 'La Pantera Rosa - Episodio Clásico';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.setAttribute('aria-label', 'Reproductor de video: La Pantera Rosa');

    return iframe;
}

/**
 * Announce to Screen Reader
 * @param {string} message - Mensaje para anunciar
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}
