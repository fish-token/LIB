/*
    🐟🥇 Fish Token's System Purge (FTSP)
    -----------------------------------------------------------------------------
    Hold on! This script is meant for cleaning up junk on other sites.
    If you're looking for my main project, head over to: https://niche-site.netlify.app/
    -----------------------------------------------------------------------------
    Version     : 1.1.0
    Author      : Fish Token
    Powered By  : My library, FTS (https://niche-site.netlify.app/js/lib/fts.js)
    GitHub      : https://github.com/fish-token
    GitLab      : https://gitlab.com/fish-token (Clan: https://gitlab.com/fish-token-clan)
    -----------------------------------------------------------------------------
      ███████╗████████╗███████╗██████╗ 
      ██╔════╝╚══██╔══╝██╔════╝██╔══██╗
      █████╗     ██║   ███████╗██████╔╝
      ██╔══╝     ██║   ╚════██║██╔═══╝ 
      ██║        ██║   ███████║██║     
      ╚═╝        ╚═╝   ╚══════╝╚═╝
    -----------------------------------------------------------------------------
    A handy little tool to nuke timeouts, variables, storage, and nasty CSS
    that stops you from clicking or selecting things. 
    It's not 100% professional, but it helps make the web a bit more usable! ≽(◕ ‿ ◕)≼
    -----------------------------------------------------------------------------
*/

(function() {
    const _window = window;
    const _document = document;
    const _setTimeout = _window.setTimeout;
    const _clearTimeout = _window.clearTimeout;
    const _clearInterval = _window.clearInterval;
    const _console = _window.console;

    const run = () => {
        if (_window.location.hostname === 'niche-site.netlify.app') {
            _setTimeout(() => {
                _console.log('%c[ NICHE PROTECTION ACTIVE ]\nHey! No need to purge our own home. ≽(◕ ‿ ◕)≼', 'color: #ff4444; font-weight: bold; font-size: 14px;');
                FTS.visual.banner({
                    title: 'SAFE ZONE',
                    message: 'Protection Active - No purging here!',
                    icon: '≽(◕ ‿ ◕)≼',
                    duration: 5000,
                    styles: { background: 'rgba(20, 0, 0, 0.98)', border: '2px solid #ff4444', color: '#ff4444', fontFamily: 'monospace' }
                });
            }, 500);
            return;
        }

        _setTimeout(() => {
            const pt = new Set();
            const highest = _setTimeout(() => {}, 0);
            for (let i = 0; i <= highest; i++) { if (!pt.has(i)) { _clearTimeout(i); _clearInterval(i); } }
            FTS.dom.storage.clear('local');
            FTS.dom.storage.clear('session');
            _document.cookie.split(";").forEach(c => FTS.dom.cookie.remove(c.split("=")[0].trim()));
            _document.querySelectorAll('script').forEach(s => {
                const src = s.getAttribute('src') || '';
                const isExcluded = s === _document.currentScript || src.includes('fts.js') || src.includes('remove_harmful.js');
                if (!isExcluded) s.remove();
            });
            const style = _document.createElement('style');
            style.innerHTML = `
                * { pointer-events: auto !important; user-select: auto !important; -webkit-user-select: auto !important; -moz-user-select: auto !important; -ms-user-select: auto !important; }
                iframe, div[class*="overlay"], div[id*="overlay"], div[class*="popup"], div[id*="popup"] { pointer-events: auto !important; }
                body, html { overflow: auto !important; cursor: auto !important; }
            `;
            _document.head.appendChild(style);
            const np = new Set(['window', 'document', 'location', 'history', 'chrome', 'console', 'navigator', 'top', 'frames', 'self', 'performance', 'localStorage', 'sessionStorage', 'indexedDB', 'requestAnimationFrame', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'FTS']);
            Object.keys(_window).forEach(k => { if (!np.has(k)) { try { _window[k] = null; delete _window[k]; } catch(e) {} } });

            const bS = 'background: #000; color: #00ff41; padding: 15px; border: 2px solid #00ff41; font-family: monospace; font-weight: bold; font-size: 10px; line-height: 1.1;';
            const bS2 = 'background: #000; color: #00ff41; padding: 0px; font-family: monospace; font-weight: bold; font-size: 10px; line-height: 1.1;';
            const b = [
                '      ███████╗████████╗███████╗██████╗ ',
                '      ██╔════╝╚══██╔══╝██╔════╝██╔══██╗',
                '      █████╗     ██║   ███████╗██████╔╝',
                '      ██╔══╝     ██║   ╚════██║██╔═══╝ ',
                '      ██║        ██║   ███████║██║     ',
                '      ╚═╝        ╚═╝   ╚══════╝╚═╝     '
            ].join('\n');
            _console.log(`%c${b}`, bS2);
            _console.log(`%c[ SYSTEM PURGE COMPLETE ]\nScripts terminated. Storage wiped. Harmful CSS neutralized.`, bS);
            _console.log('');
            _console.log(`%cCreated by Fish Token\nPowered by FTS (fts.js)\nGitHub: https://github.com/fish-token\nGitLab: https://gitlab.com/fish-token\n≽(◕ ‿ ◕)≼`, bS);
            FTS.visual.banner({
                title: 'PURGED',
                message: 'System Cleanup Successful! Enjoy the freedom. ≽(◕ ‿ ◕)≼',
                icon: '≽(◕ ‿ ◕)≼',
                duration: 5000,
                styles: { background: 'rgba(0, 10, 0, 0.98)', border: '2px solid #00ff41', color: '#00ff41', fontFamily: 'monospace' }
            });
        }, 500);
    };

    if (typeof FTS === 'undefined') {
        const s = _document.createElement('script');
        s.src = 'https://niche-site.netlify.app/js/lib/fts.js';
        s.onload = run;
        _document.head.appendChild(s);
    } else {
        run();
    }
})();