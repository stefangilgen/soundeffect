document.addEventListener('DOMContentLoaded', function() {
    console.log('Soundeffect Script geladen');
    
    const figures = document.querySelectorAll('figure[data-sound-effect]');
    console.log('Gefundene Bilder mit Soundeffekten:', figures.length);
    
    // Simuliere einen Benutzerklick
    const simulateUserInteraction = () => {
document.addEventListener('DOMContentLoaded', function() {
    // Debug-Ausgabe
    console.log('Soundeffect Script geladen');
    
    // Suche nach Figures mit Soundeffekt-Attribut
    const figures = document.querySelectorAll('figure[data-sound-effect]');
    console.log('Gefundene Bilder mit Soundeffekten:', figures.length);
    
    figures.forEach(figure => {
        const soundUrl = figure.getAttribute('data-sound-effect');
        console.log('Sound URL gefunden:', soundUrl);
        
        if (!soundUrl) return;
        
        const audio = new Audio();
        audio.src = soundUrl;
        
        // Vorladen des Audios
        audio.load();
        
        // Event-Listener auf das Figure-Element
        figure.addEventListener('mouseenter', () => {
            console.log('Mouseenter - Spiele Sound ab');
            if (audio.readyState >= 2) { // Wenn genug Daten geladen sind
                audio.currentTime = 0;
                audio.play().catch(e => console.error('Fehler beim Abspielen:', e));
            }
        });
        
        figure.addEventListener('mouseleave', () => {
            console.log('Mouseleave - Stoppe Sound');
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    });
}); 