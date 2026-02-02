/**
 * Fish Token's Site Resources (FTS)
 * Version: 1.0.0 (initial release)
 * Creator: FISH TOKEN (https://niche-site.netlify.app/)
 * 
 *  _______  ___  _______  __   __    _______  _______  ___  _  _______  __    _ 
 * |       ||   ||       ||  | |  |  |       ||       ||   || ||       ||  |  | |
 * |    ___||   ||  _____||  |_|  |  |_     _||   _   ||   |_| ||    ___||   |_| |
 * |   |___ |   || |_____ |       |    |   |  |  | |  ||      _||   |___ |       |
 * |    ___||   ||_____  ||       |    |   |  |  |_|  ||     |_ |    ___||  _    |
 * |   |    |   | _____| ||   _   |    |   |  |       ||    _  ||   |___ | | |   |
 * |___|    |___||_______||__| |__|    |___|  |_______||___| |_||_______||_|  |__|
 * 
 * A comprehensive utility library for modern web development.
 * Encapsulated, modular, and optimized for performance.
 * 
 * Reference: https://github.com/fish-token/LIB/tree/main/ft_resources/fts.js
 * Usage: Load this script before other application scripts to ensure availability.
 * Credit: Attribution is mandatory. Do not remove this header.
 * 
 * Social Profiles:
 * YouTube: https://www.youtube.com/@FlatFishToken
 * GitHub:  https://github.com/fish-token
 * GitLab:  https://gitlab.com/fish-token (Clan: https://gitlab.com/fish-token-clan)
 */
// -------------------------------------------------------------------------

const FTS = (() => {
    "use strict";

    // -------------------------------------------------------------------------
    // MATH UTILITIES
    // -------------------------------------------------------------------------
    const math = (() => {
        // Generates a random integer between min and max. Example: math.random(1, 10)
        const random = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Snaps a value to the nearest step. Example: math.snap(7, 5) -> 5
        const snap = (value, snapValue = 1) => Math.round(value / snapValue) * snapValue;

        // Clamps a value between min and max. Example: math.clamp(15, 0, 10) -> 10
        const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

        // Clamps a value between 0 and 1. Example: math.clamp01(1.5) -> 1
        const clamp01 = (value) => clamp(value, 0, 1);

        // Checks if a value is between min and max. Example: math.isBetween(5, 1, 10) -> true
        const isBetween = (value, min, max) => value >= min && value <= max;

        // Wraps a value within a range. Example: math.wrap(370, 0, 360) -> 10
        const wrap = (value, min = 0, max = 1) => {
            const range = max - min;
            return ((((value - min) % range) + range) % range) + min;
        };

        // Linear interpolation between a and b. Example: math.lerp(0, 100, 0.5) -> 50
        const lerp = (a, b, t = 0.5) => a + (b - a) * t;

        // Linear interpolation between angles. Example: math.lerpAngle(0, Math.PI, 0.5)
        const lerpAngle = (a, b, t = 0.5) => {
            const dt = wrap(b - a, -Math.PI, Math.PI);
            return a + dt * t;
        };

        // Inverse linear interpolation. Example: math.invLerp(0, 100, 50) -> 0.5
        const invLerp = (a, b, v) => (v - a) / (b - a);

        // Maps a value from one range to another. Example: math.map(5, 0, 10, 0, 100) -> 50
        const map = (value, inMin, inMax, outMin, outMax) => invLerp(inMin, inMax, value) * (outMax - outMin) + outMin;

        // Smoothly interpolates between a and b. Example: math.smoothStep(0, 10, 5)
        const smoothStep = (a, b, t = 0.5) => {
            const v = clamp01(invLerp(a, b, t));
            return v * v * (3 - 2 * v);
        };

        // Calculates distance between two points. Example: math.dist({x:0,y:0}, {x:3,y:4}) -> 5
        const dist = (a = { x: 0, y: 0 }, b = { x: 0, y: 0 }) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

        // Converts angle between degrees and radians. Example: math.convertAngle(180, 'rad')
        const convertAngle = (angle, to = 'deg') => to === 'deg' ? angle * (180 / Math.PI) : angle * (Math.PI / 180);

        // Calculates angle between two points. Example: math.angleTo({x:0,y:0}, {x:1,y:1})
        const angleTo = (a = { x: 0, y: 0 }, b = { x: 0, y: 0 }) => Math.atan2(b.y - a.y, b.x - a.x);

        // Rounds a value to specified precision. Example: math.round(Math.PI, 2) -> 3.14
        const round = (value, precision = 0) => {
            const multiplier = 10 ** precision;
            return Math.round(value * multiplier) / multiplier;
        };

        // Trigonometric sine with optional degree support. Example: math.sin(90, true) -> 1
        const sin = (a, isDegree = false) => Math.sin(isDegree ? convertAngle(a, 'rad') : a);
        // Trigonometric cosine with optional degree support. Example: math.cos(0, true) -> 1
        const cos = (a, isDegree = false) => Math.cos(isDegree ? convertAngle(a, 'rad') : a);
        // Trigonometric tangent with optional degree support. Example: math.tan(45, true) -> 1
        const tan = (a, isDegree = false) => Math.tan(isDegree ? convertAngle(a, 'rad') : a);
        // Inverse sine with optional degree support. Example: math.asin(1, true) -> 90
        const asin = (v, isDegree = false) => isDegree ? convertAngle(Math.asin(v), 'deg') : Math.asin(v);
        // Inverse cosine with optional degree support. Example: math.acos(1, true) -> 0
        const acos = (v, isDegree = false) => isDegree ? convertAngle(Math.acos(v), 'deg') : Math.acos(v);
        // Inverse tangent with optional degree support. Example: math.atan(1, true) -> 45
        const atan = (v, isDegree = false) => isDegree ? convertAngle(Math.atan(v), 'deg') : Math.atan(v);
        // Two-argument inverse tangent with optional degree support. Example: math.atan2(1, 1, true) -> 45
        const atan2 = (y, x, isDegree = false) => isDegree ? convertAngle(Math.atan2(y, x), 'deg') : Math.atan2(y, x);

        // Compares two angles and returns the shortest distance. Example: math.angleCompare(0, 90, true) -> 90
        const angleCompare = (a, b, isDegree = false) => {
            const wrapVal = isDegree ? 360 : Math.PI * 2;
            const diff = (b - a + wrapVal) % wrapVal;
            return diff > wrapVal / 2 ? diff - wrapVal : diff;
        };

        // Calculates power of a base. Example: math.pow(2, 3) -> 8
        const pow = (b, e) => Math.pow(b, e);
        // Calculates square root of a value. Example: math.sqrt(16) -> 4
        const sqrt = (v) => Math.sqrt(v);
        // Calculates absolute value. Example: math.abs(-5) -> 5
        const abs = (v) => Math.abs(v);
        // Returns the minimum value from arguments. Example: math.min(1, 2, 3) -> 1
        const min = (...args) => Math.min(...args);
        // Returns the maximum value from arguments. Example: math.max(1, 2, 3) -> 3
        const max = (...args) => Math.max(...args);

        return {
            random, snap, clamp, clamp01, isBetween, wrap,
            lerp, lerpAngle, invLerp, map, smoothStep,
            dist, convertAngle, angleTo, round,
            sin, cos, tan, asin, acos, atan, atan2, angleCompare,
            pow, sqrt, abs, min, max
        };
    })();

    // -------------------------------------------------------------------------
    // VISUAL UTILITIES
    // -------------------------------------------------------------------------
    const visual = (() => {
        // Parses a color string into an RGBA object. Example: visual.parseColor('#ff0000')
        const parseColor = (color) => {
            if (typeof color !== 'string') return null;
            if (color.startsWith('#')) return hexToRgb(color);
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            return match ? { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]), a: match[4] ? parseFloat(match[4]) : 1 } : null;
        };

        // Formats an RGBA object into a string. Example: visual.formatColor({r:255,g:0,b:0,a:1}, 'hex')
        const formatColor = (rgb, format = 'hex') => {
            if (!rgb) return null;
            const { r, g, b, a } = rgb;
            if (format === 'rgb') return `rgb(${r}, ${g}, ${b})`;
            if (format === 'rgba') return `rgba(${r}, ${g}, ${b}, ${a})`;
            return rgbToHex(r, g, b, a);
        };

        // Generates a random color string. Example: visual.randomColor('rgba')
        const randomColor = (format = 'hex') => {
            const r = math.random(0, 255), g = math.random(0, 255), b = math.random(0, 255);
            const a = math.round(math.random(0, 100) / 100, 2);
            return formatColor({ r, g, b, a }, format);
        };

        // Converts a hex color string to an RGBA object. Example: visual.hexToRgb('#f00')
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex) || /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
            if (!result) return null;
            if (result[0].length <= 4 && !hex.includes('rgba')) {
                return { r: parseInt(result[1] + result[1], 16), g: parseInt(result[2] + result[2], 16), b: parseInt(result[3] + result[3], 16), a: 1 };
            }
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                a: result[4] ? parseInt(result[4], 16) / 255 : 1
            };
        };

        // Converts RGB values to a hex color string. Example: visual.rgbToHex(255, 0, 0)
        const rgbToHex = (r, g, b, a = 1) => {
            const toHex = (v) => v.toString(16).padStart(2, '0');
            const alpha = a < 1 ? toHex(Math.round(a * 255)) : '';
            return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
        };

        // Brightens or darkens a color. Example: visual.brighten('#007AFF', 0.2)
        const brighten = (color, amount = 0.1, format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return color;
            const factor = 1 + amount;
            return formatColor({
                r: math.clamp(Math.round(rgb.r * factor), 0, 255),
                g: math.clamp(Math.round(rgb.g * factor), 0, 255),
                b: math.clamp(Math.round(rgb.b * factor), 0, 255),
                a: rgb.a
            }, format);
        };

        // Returns a contrasting color (black or white) for readability. Example: visual.contrast('#000') -> '#ffffff'
        const contrast = (color, format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return format === 'hex' ? '#000000' : 'rgb(0,0,0)';
            const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
            const res = luminance > 0.5 ? { r: 0, g: 0, b: 0, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
            return formatColor(res, format);
        };

        // Converts a color to grayscale. Example: visual.grayscale('#007AFF')
        const grayscale = (color, format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return color;
            const avg = Math.round((rgb.r + rgb.g + rgb.b) / 3);
            return formatColor({ r: avg, g: avg, b: avg, a: rgb.a }, format);
        };

        // Generates a color scheme based on a seed color. Example: visual.getColorScheme('#007AFF', 'triadic')
        const getColorScheme = (color, type = 'complementary', format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return [];

            const hslToRgb = (h, s, l) => {
                s /= 100; l /= 100;
                const k = n => (n + h / 30) % 12;
                const a = s * Math.min(l, 1 - l);
                const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
                return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)), a: rgb.a };
            };

            const rgbToHsl = (r, g, b) => {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if (max === min) h = s = 0;
                else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return { h: h * 360, s: s * 100, l: l * 100 };
            };

            const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
            const schemes = {
                'complementary': [hslToRgb((h + 180) % 360, s, l)],
                'analogous': [hslToRgb((h + 30) % 360, s, l), hslToRgb((h - 30) % 360, s, l)],
                'triadic': [hslToRgb((h + 120) % 360, s, l), hslToRgb((h + 240) % 360, s, l)],
                'tetradic': [hslToRgb((h + 90) % 360, s, l), hslToRgb((h + 180) % 360, s, l), hslToRgb((h + 270) % 360, s, l)],
                'monochromatic': [hslToRgb(h, s, Math.max(0, l - 20)), hslToRgb(h, s, Math.min(100, l + 20))]
            };

            const result = (schemes[type.toLowerCase()] || []).map(c => formatColor(c, format));
            return [formatColor(rgb, format), ...result];
        };

        // Checks if a color is fully transparent. Example: visual.isTransparent('rgba(0,0,0,0)') -> true
        const isTransparent = (color) => {
            const rgb = hexToRgb(color);
            return rgb ? rgb.a === 0 : false;
        };

        // Checks if the user's system is in dark mode. Example: visual.isDarkMode()
        const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Animates a numeric property of an object. Example: visual.animate(el.style, 'opacity', 1, 1000)
        const animate = (obj, prop, target, duration = 500, easing = 'smooth', callback = null) => {
            const start = obj[prop];
            const startTime = performance.now();

            const step = (now) => {
                const elapsed = now - startTime;
                const progress = math.clamp01(elapsed / duration);
                const t = easing === 'linear' ? progress : math.smoothStep(0, 1, progress);

                obj[prop] = math.lerp(start, target, t);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else if (callback) {
                    callback();
                }
            };
            requestAnimationFrame(step);
        };

        // Checks if an element is currently within the viewport. Example: visual.inView(document.body)
        const inView = (el) => {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Displays a styled log message in a dedicated container. Example: visual.log('Hello World')
        const log = (msg, opts = {}) => {
            const {
                target = null,
                id = 'fts-log-container',
                maxLogs = 50,
                color = '#00CCFF',
                background = 'rgba(26, 26, 26, 0.9)',
                position = 'bottom-right',
                font = 'monospace',
                fontSize = '12px',
                style = {}
            } = opts;

            let container = typeof target === 'string' ? dom.$(target) : target;
            
            if (!container) {
                container = document.getElementById(id);
                if (!container) {
                    container = dom.create('div', { id, class: 'fts-log-container' });
                    const posStyles = {
                        'bottom-right': 'bottom: 20px; right: 20px;',
                        'bottom-left': 'bottom: 20px; left: 20px;',
                        'top-right': 'top: 20px; right: 20px;',
                        'top-left': 'top: 20px; left: 20px;'
                    };
                    const css = `
                        #${id} {
                            position: fixed; ${posStyles[position] || posStyles['bottom-right']}
                            width: 300px; max-height: 250px; overflow-y: auto;
                            background: ${background}; color: ${color};
                            padding: 12px; border-radius: 10px; font-family: ${font};
                            font-size: ${fontSize}; z-index: 9999; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                            display: flex; flex-direction: column-reverse; gap: 4px;
                            scrollbar-width: thin; scrollbar-color: ${color} transparent;
                            backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.1);
                        }
                        #${id}::-webkit-scrollbar { width: 4px; }
                        #${id}::-webkit-scrollbar-thumb { background: ${color}; border-radius: 10px; }
                        .fts-log-item { border-left: 2px solid ${color}; padding-left: 8px; animation: ftsLogFade 0.3s ease; word-break: break-all; }
                        @keyframes ftsLogFade { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
                    `;
                    const styleEl = dom.create('style');
                    styleEl.textContent = css;
                    document.head.appendChild(styleEl);
                    document.body.appendChild(container);
                }
            } else {
                if (!container.classList.contains('fts-log-custom')) {
                    container.classList.add('fts-log-custom');
                    Object.assign(container.style, {
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        gap: '4px',
                        fontFamily: font,
                        fontSize: fontSize,
                        color: color,
                        ...style
                    });
                }
            }

            const timestamp = time.getTime('hh:mm:ss');
            const item = dom.create('div', { class: 'fts-log-item' }, [`[${timestamp}] ${msg}`]);
            
            const rect = container.getBoundingClientRect();
            const availableHeight = window.innerHeight - rect.top - (parseFloat(getComputedStyle(container).marginBottom) || 0);
            if (container.scrollHeight > availableHeight && !target) {
                container.style.maxHeight = `${availableHeight - 40}px`;
            }

            container.appendChild(item);
            if (container.children.length > maxLogs) container.removeChild(container.firstChild);
            container.scrollTop = container.scrollHeight;
        };

        const banner = (opts = {}) => {
            const {
                title = '',
                message = '',
                icon = '',
                duration = 5000,
                onDismiss = null,
                styles = {},
                className = '',
                id = `fts-banner-${Date.now()}`,
                position = 'top-right',
                stacking = 'below',
                offset = { x: 20, y: 20 }
            } = typeof opts === 'string' ? { title: opts } : opts;

            const colors = { white: '#FFFFFF', black: '#1A1A1A', blue: '#007AFF', cyan: '#00CCFF', gray: '#F5F5F7' };
            
            const getPosStyles = (pos, off) => {
                if (typeof pos === 'object') return `top: ${pos.y}px; left: ${pos.x}px;`;
                const s = {
                    'top-right': `top: ${off.y}px; right: ${off.x}px;`,
                    'top-left': `top: ${off.y}px; left: ${off.x}px;`,
                    'bottom-right': `bottom: ${off.y}px; right: ${off.x}px;`,
                    'bottom-left': `bottom: ${off.y}px; left: ${off.x}px;`,
                    'top-center': `top: ${off.y}px; left: 50%; transform: translateX(-50%);`,
                    'bottom-center': `bottom: ${off.y}px; left: 50%; transform: translateX(-50%);`
                };
                return s[pos] || s['top-right'];
            };

            const containerId = `fts-banner-container-${typeof position === 'string' ? position : 'custom'}`;
            let container = document.getElementById(containerId);
            if (!container) {
                container = dom.create('div', { id: containerId, class: 'fts-banner-container' });
                container.style.cssText = `position: fixed; z-index: 10000; display: flex; pointer-events: none; gap: 10px; ${getPosStyles(position, offset)}`;
                
                const isBottom = typeof position === 'string' && position.startsWith('bottom');
                const isRight = typeof position === 'string' && position.endsWith('right');
                
                if (stacking === 'below' || (stacking === 'smart' && !isBottom)) container.style.flexDirection = 'column';
                else if (stacking === 'above' || (stacking === 'smart' && isBottom)) container.style.flexDirection = 'column-reverse';
                else if (stacking === 'right') container.style.flexDirection = 'row';
                else if (stacking === 'left') container.style.flexDirection = 'row-reverse';
                else if (stacking === 'layered') {
                    container.style.display = 'block';
                    container.style.width = '350px';
                }

                document.body.appendChild(container);
            }

            const css = `
                @keyframes ftsSlideIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes ftsSlideOut { from { transform: scale(1); opacity: 1; } to { transform: scale(0.9); opacity: 0; } }
                .fts-banner {
                    pointer-events: auto; background: ${colors.white}; color: ${colors.black};
                    padding: 16px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    border: 1px solid rgba(0,0,0,0.05); animation: ftsSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: start;
                    width: 350px; max-width: calc(100vw - 40px); margin-bottom: 10px;
                }
                .fts-banner-layered { position: absolute; top: 0; left: 0; margin-bottom: 0; }
                .fts-banner-icon { font-size: 20px; }
                .fts-banner-content { display: flex; flex-direction: column; gap: 4px; }
                .fts-banner-title { font-weight: 700; font-size: 15px; margin: 0; color: ${colors.blue}; }
                .fts-banner-message { font-size: 13px; color: #555; margin: 0; line-height: 1.4; }
                .fts-banner-close {
                    cursor: pointer; background: ${colors.gray}; border: none; width: 24px; height: 24px;
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    font-size: 14px; transition: background 0.2s;
                }
                .fts-banner-close:hover { background: #E5E5E7; }
            `;

            if (!document.getElementById('fts-banner-styles')) {
                const styleEl = dom.create('style', { id: 'fts-banner-styles' });
                styleEl.textContent = css;
                document.head.appendChild(styleEl);
            }

            const bannerEl = dom.create('div', { class: `fts-banner ${className}`, id });
            if (stacking === 'layered') {
                bannerEl.classList.add('fts-banner-layered');
                const count = container.children.length;
                bannerEl.style.transform = `translate(${count * 5}px, ${count * 5}px)`;
                bannerEl.style.zIndex = 10000 + count;
            }
            if (styles) Object.assign(bannerEl.style, styles);

            bannerEl.innerHTML = `
                ${icon ? `<div class="fts-banner-icon">${icon}</div>` : '<div></div>'}
                <div class="fts-banner-content">
                    ${title ? `<p class="fts-banner-title">${title}</p>` : ''}
                    ${message ? `<p class="fts-banner-message">${message}</p>` : ''}
                </div>
                <button class="fts-banner-close" aria-label="Dismiss">&times;</button>
            `;

            const dismiss = () => {
                bannerEl.style.animation = 'ftsSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                setTimeout(() => {
                    bannerEl.remove();
                    if (container.children.length === 0) container.remove();
                    if (typeof onDismiss === 'function') onDismiss();
                }, 300);
            };

            bannerEl.querySelector('.fts-banner-close').onclick = dismiss;
            container.appendChild(bannerEl);

            if (duration > 0) setTimeout(dismiss, duration);
            return { id, dismiss };
        };

        const overlay = (opts = {}) => {
            const {
                title = '',
                body = '',
                media = null,
                buttons = [],
                background = 'rgba(0,0,0,0.5)',
                blur = '5px',
                id = `fts-overlay-${Date.now()}`,
                onClose = null,
                closeOnBackdrop = true
            } = opts;

            const container = dom.create('div', { id, class: 'fts-overlay-backdrop' });
            container.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: ${background}; backdrop-filter: blur(${blur});
                display: flex; align-items: center; justify-content: center;
                z-index: 20000; opacity: 0; transition: opacity 0.3s ease;
            `;

            const modal = dom.create('div', { class: 'fts-overlay-modal' });
            modal.style.cssText = `
                background: white; width: 90%; max-width: 500px; padding: 24px;
                border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                transform: translateY(20px); transition: transform 0.3s ease;
                font-family: -apple-system, system-ui, sans-serif;
            `;

            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h2 style="margin: 0; font-size: 20px; color: #333;">${title}</h2>
                    <button class="fts-overlay-close" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">&times;</button>
                </div>
                ${media ? `<div style="margin-bottom: 16px;">${media}</div>` : ''}
                <div style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">${body}</div>
                <div class="fts-overlay-buttons" style="display: flex; gap: 12px; justify-content: flex-end;"></div>
            `;

            const btnContainer = modal.querySelector('.fts-overlay-buttons');
            buttons.forEach(btn => {
                const b = dom.create('button', { class: btn.className || '' }, [btn.text]);
                b.style.cssText = `
                    padding: 10px 20px; border-radius: 10px; border: none;
                    cursor: pointer; font-size: 14px; font-weight: 600;
                    transition: opacity 0.2s;
                    ${btn.style || 'background: #007AFF; color: white;'}
                `;
                b.onclick = (e) => {
                    if (btn.callback) btn.callback(e);
                    if (btn.close !== false) dismiss();
                };
                btnContainer.appendChild(b);
            });

            const dismiss = () => {
                container.style.opacity = '0';
                modal.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    container.remove();
                    if (onClose) onClose();
                }, 300);
            };

            modal.querySelector('.fts-overlay-close').onclick = dismiss;
            if (closeOnBackdrop) {
                container.onclick = (e) => { if (e.target === container) dismiss(); };
            }

            container.appendChild(modal);
            document.body.appendChild(container);

            requestAnimationFrame(() => {
                container.style.opacity = '1';
                modal.style.transform = 'translateY(0)';
            });

            return { id, dismiss };
        };

        return {
            randomColor, hexToRgb, rgbToHex, brighten,
            contrast, grayscale, getColorScheme, isTransparent, isDarkMode, animate, inView, log, banner, overlay
        };
    })();

    // -------------------------------------------------------------------------
    // TIME & FLOW CONTROL
    // -------------------------------------------------------------------------
    const time = (() => {
        // Gets the current date in a specified format. Example: time.getDate('dd/mm/yyyy', '/')
        const getDate = (format = 'dd-mm-yyyy', sep = '-') => {
            const d = new Date();
            const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
            return format.replace('yyyy', y).replace('mm', m).replace('dd', dd).replace(/-/g, sep);
        };

        // Gets the current time in a specified format. Example: time.getTime('hh-mm-ss', '-')
        const getTime = (format = 'hh:mm:ss', sep = ':') => {
            const d = new Date();
            const h = String(d.getHours()).padStart(2, '0'), m = String(d.getMinutes()).padStart(2, '0'), s = String(d.getSeconds()).padStart(2, '0');
            return format.replace('hh', h).replace('mm', m).replace('ss', s).replace(/:/g, sep);
        };

        // Formats a date relative to now. Example: time.formatRelative(new Date(Date.now() - 60000)) -> '1 minute ago'
        const formatRelative = (date, locale = 'en') => {
            const diff = Math.floor((date - new Date()) / 1000);
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
            const units = [
                { u: 'year', s: 31536000 }, { u: 'month', s: 2592000 },
                { u: 'week', s: 604800 }, { u: 'day', s: 86400 },
                { u: 'hour', s: 3600 }, { u: 'minute', s: 60 }, { u: 'second', s: 1 }
            ];

            for (const { u, s } of units) {
                if (Math.abs(diff) >= s || u === 'second') {
                    return rtf.format(Math.round(diff / s), u);
                }
            }
        };

        // Limits the rate at which a function can fire. Example: time.debounce(() => console.log('Hi'), 500)
        const debounce = (fn, delay = 250) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn(...args), delay);
            };
        };

        // Ensures a function is called at most once in a specified period. Example: time.throttle(() => console.log('Hi'), 500)
        const throttle = (fn, limit = 250) => {
            let lastCall = 0;
            return (...args) => {
                const now = Date.now();
                if (now - lastCall >= limit) {
                    lastCall = now;
                    fn(...args);
                }
            };
        };

        // Pauses execution for a specified duration. Example: await time.sleep(1000)
        const sleep = (ms = 1000) => new Promise(res => setTimeout(res, ms));

        return { getDate, getTime, formatRelative, debounce, throttle, sleep };
    })();

    // -------------------------------------------------------------------------
    // DOM MANIPULATION
    // -------------------------------------------------------------------------
    const dom = (() => {
        // Selects the first element matching a CSS selector. Example: dom.$('.my-class')
        const $ = (s, root = document) => root.querySelector(s);

        // Selects all elements matching a CSS selector as an array. Example: dom.$$('div')
        const $$ = (s, root = document) => [...root.querySelectorAll(s)];

        // Creates a new HTML element with attributes and children. Example: dom.create('div', { class: 'box' }, ['Hello'])
        const create = (tag = 'div', attrs = {}, children = []) => {
            const el = document.createElement(tag);
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            children.forEach(child => {
                if (typeof child === 'string') el.appendChild(document.createTextNode(child));
                else if (child instanceof HTMLElement) el.appendChild(child);
            });
            return el;
        };

        // Adds one or more event listeners to an element. Example: dom.on(el, 'click focus', () => console.log('Hi'))
        const on = (el, events, fn, opts = {}) => {
            events.split(' ').forEach(e => el.addEventListener(e, fn, opts));
        };

        // Removes one or more event listeners from an element. Example: dom.off(el, 'click', myFunc)
        const off = (el, events, fn, opts = {}) => {
            events.split(' ').forEach(e => el.removeEventListener(e, fn, opts));
        };

        // Attaches an event listener to a parent for delegated child events. Example: dom.delegate(list, 'click', 'li', (e, target) => console.log(target))
        const delegate = (root, type, selector, fn) => {
            on(root, type, (e) => {
                const target = e.target.closest(selector);
                if (target && root.contains(target)) fn.call(target, e, target);
            });
        };

        // Gets or sets an attribute on an element. Example: dom.attr(el, 'data-id', '123')
        const attr = (el, name, value) => {
            if (value === undefined) return el.getAttribute(name);
            if (value === null) el.removeAttribute(name);
            else el.setAttribute(name, value);
        };

        // Toggles a CSS class on an element. Example: dom.toggleClass(el, 'active')
        const toggleClass = (el, cls, force) => el.classList.toggle(cls, force);

        // Toggles full-screen mode for an element. Example: dom.toggleFullscreen()
        const toggleFullscreen = (el = document.documentElement) => {
            if (!document.fullscreenElement) el.requestFullscreen().catch(() => {});
            else document.exitFullscreen();
        };

        // Triggers a file download from a URL. Example: dom.download('https://example.com/file.png', 'my-image.png')
        const download = async (url, name = 'download', useBlob = false) => {
            let href = url;
            if (useBlob) {
                const res = await fetch(url);
                const blob = await res.blob();
                href = URL.createObjectURL(blob);
            }
            const a = create('a', { href, download: name });
            a.click();
            if (useBlob) URL.revokeObjectURL(href);
        };

        // Provides methods for interacting with the system clipboard. Example: dom.clipboard.copy('Hello')
        const clipboard = {
            // Copies text to the clipboard. Example: dom.clipboard.copy('Hello')
            copy: (val) => navigator.clipboard.writeText(val),
            // Reads text from the clipboard. Example: await dom.clipboard.read()
            read: () => navigator.clipboard.readText(),
            // Copies rich data to the clipboard. Example: dom.clipboard.copyOther(data)
            copyOther: (val) => navigator.clipboard.write(val),
            // Reads rich data from the clipboard. Example: await dom.clipboard.readOther()
            readOther: () => navigator.clipboard.read(),
        };

        // Provides methods for local and session storage. Example: dom.storage.set('key', 'value')
        const storage = {
            _getStore: (type) => type === 'session' ? window.sessionStorage : window.localStorage,
            // Sets an item in storage. Example: dom.storage.set('user', {name: 'Fish'}, 'session')
            set: (k, v, type = 'local') => storage._getStore(type).setItem(k, JSON.stringify(v)),
            // Gets an item from storage. Example: dom.storage.get('user')
            get: (k, type = 'local') => {
                const item = storage._getStore(type).getItem(k);
                try { return JSON.parse(item); } catch { return item; }
            },
            // Removes an item from storage. Example: dom.storage.remove('user')
            remove: (k, type = 'local') => storage._getStore(type).removeItem(k),
            // Clears all items from storage. Example: dom.storage.clear('local')
            clear: (type = 'local') => storage._getStore(type).clear()
        };

        // Provides methods for cookie management. Example: dom.cookie.set('theme', 'dark')
        const cookie = {
            // Sets a cookie with optional configuration. Example: dom.cookie.set('pref', 'val', { days: 30 })
            set: (name, val, config = {}) => {
                const d = new Date();
                d.setTime(d.getTime() + (config.days || 7) * 864e5);
                document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/;SameSite=${config.sameSite || 'Lax'};Secure=${config.secure || false}`;
            },
            // Gets a cookie by name. Example: dom.cookie.get('theme')
            get: (name) => {
                const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
                return v ? v[2] : null;
            },
            // Deletes a cookie by name. Example: dom.cookie.remove('theme')
            remove: (name) => cookie.set(name, '', { days: -1 }),
        };

        // Waits for an element to appear in the DOM. Example: await dom.wait('#target')
        const wait = (selector, timeout = 5000) => new Promise((res, rej) => {
            const el = $(selector);
            if (el) return res(el);
            
            const observer = new MutationObserver(() => {
                const el = $(selector);
                if (el) {
                    observer.disconnect();
                    res(el);
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => {
                observer.disconnect();
                rej(new Error(`Timeout waiting for ${selector}`));
            }, timeout);
        });

        // Executes a function when an element becomes visible in the viewport. Example: dom.onVisible(el, () => console.log('Visible!'))
        const onVisible = (el, fn, threshold = 0.1) => {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    fn(el);
                    observer.disconnect();
                }
            }, { threshold });
            observer.observe(el);
        };

        // Executes a function when a click occurs outside the specified element(s). Example: dom.onClickOutside(el, () => el.hide())
        const onClickOutside = (el, fn) => {
            const handler = (e) => {
                const elements = Array.isArray(el) ? el : [el];
                const isInside = elements.some(element => element.contains(e.target));
                if (!isInside) {
                    fn(e);
                    off(document, 'click', handler);
                }
            };
            on(document, 'click', handler);
        };

        // Fades an element in by transitioning its opacity. Example: dom.fadeIn(el, 500)
        const fadeIn = (el, duration = 400, display = 'block') => {
            el.style.opacity = 0;
            el.style.display = display;
            el.style.transition = `opacity ${duration}ms`;
            setTimeout(() => el.style.opacity = 1, 10);
        };

        // Fades an element out by transitioning its opacity. Example: dom.fadeOut(el, 500)
        const fadeOut = (el, duration = 400) => {
            el.style.opacity = 1;
            el.style.transition = `opacity ${duration}ms`;
            el.style.opacity = 0;
            setTimeout(() => el.style.display = 'none', duration);
        };

        // Opens a URL in a centered popup window or a new tab. Example: dom.popup('https://google.com', { w: 800, h: 600 })
        const popup = (url, target = '_blank', features = {}) => {
            if (typeof target === 'object') {
                features = target;
                target = '_blank';
            }
            const { w = 600, h = 400, tab = false } = features;
            if (tab) return window.open(url, '_blank');
            const left = (window.screen.width / 2) - (w / 2);
            const top = (window.screen.height / 2) - (h / 2);
            return window.open(url, target, `width=${w},height=${h},top=${top},left=${left},scrollbars=yes,resizable=yes`);
        };

        // Appends HTML strings or elements to a parent element. Example: dom.append('#container', '<p>New</p>', el)
        const append = (parent, ...children) => {
            const p = typeof parent === 'string' ? $(parent) : parent;
            if (!p) return;
            children.forEach(child => {
                if (typeof child === 'string') {
                    if (child.trim().startsWith('<')) p.insertAdjacentHTML('beforeend', child);
                    else p.appendChild(document.createTextNode(child));
                } else if (child instanceof HTMLElement) {
                    p.appendChild(child);
                }
            });
            return p;
        };

        // Removes elements from the DOM based on a selector or element reference. Example: dom.remove('.ad-banner')
        const remove = (s, root = document) => {
            const elements = typeof s === 'string' ? $$(s, root) : [s];
            elements.forEach(el => el?.remove());
        };

        return {
            $, $$, create, on, off, delegate, attr, toggleClass,
            toggleFullscreen, download, clipboard, storage, cookie,
            wait, onVisible, onClickOutside, fadeIn, fadeOut, popup, append, remove
        };
    })();

    // -------------------------------------------------------------------------
    // DATA UTILITIES
    // -------------------------------------------------------------------------
    const data = (() => {
        // Sets the document title and meta tags. Example: data.setMeta('Home', { description: 'Welcome' })
        const setMeta = (title, tags = {}) => {
            if (title) document.title = title;
            Object.entries(tags).forEach(([k, v]) => {
                let el = $(`meta[name="${k}"], meta[property="${k}"]`);
                if (!el) {
                    el = dom.create('meta', k.startsWith('og:') ? { property: k } : { name: k });
                    document.head.appendChild(el);
                }
                el.setAttribute('content', v);
            });
        };

        // Creates a deep copy of an object or array. Example: data.clone({ a: 1, b: { c: 2 } })
        const clone = (obj) => {
            if (obj === null || typeof obj !== 'object') return obj;
            if (Array.isArray(obj)) return obj.map(clone);
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, clone(v)]));
        };

        // Deeply merges multiple objects into one. Example: data.mergeDeep({ a: 1 }, { b: { c: 2 } })
        const mergeDeep = (...objs) => {
            const result = {};
            objs.forEach(obj => {
                Object.entries(obj).forEach(([k, v]) => {
                    if (v && typeof v === 'object' && !Array.isArray(v)) {
                        result[k] = mergeDeep(result[k] || {}, v);
                    } else {
                        result[k] = v;
                    }
                });
            });
            return result;
        };

        // Checks if two values are deeply equal. Example: data.deepEqual({ a: 1 }, { a: 1 }) -> true
        const deepEqual = (a, b) => {
            if (a === b) return true;
            if (a && b && typeof a === 'object' && typeof b === 'object') {
                if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
                const keys = Object.keys(a);
                return keys.length === Object.keys(b).length && keys.every(k => deepEqual(a[k], b[k]));
            }
            return false;
        };

        // Returns an array of unique elements. Example: data.unique([1, 1, 2]) -> [1, 2]
        const unique = (arr) => [...new Set(arr)];

        // Randomly shuffles an array. Example: data.shuffle([1, 2, 3])
        const shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = math.random(0, i);
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };

        // Groups an array of objects by a key. Example: data.groupBy([{type:'a'}, {type:'b'}], 'type')
        const groupBy = (arr, key) => arr.reduce((acc, obj) => {
            const k = obj[key];
            (acc[k] = acc[k] || []).push(obj);
            return acc;
        }, {});

        // Checks if a value is empty (null, empty string, array, or object). Example: data.isEmpty({}) -> true
        const isEmpty = (val) => {
            if (val == null) return true;
            if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
            if (typeof val === 'object') return Object.keys(val).length === 0;
            return false;
        };

        // Picks specific keys from an object. Example: data.pick({a:1, b:2}, ['a']) -> {a:1}
        const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));

        // Omits specific keys from an object. Example: data.omit({a:1, b:2}, ['a']) -> {b:2}
        const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

        // Chunks an array into smaller arrays of a specified size. Example: data.chunk([1, 2, 3, 4], 2) -> [[1,2], [3,4]]
        const chunk = (arr, size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, (i + 1) * size));

        // Formats a number of bytes into a human-readable string. Example: data.formatBytes(1024) -> '1 KB'
        const formatBytes = (bytes, decimals = 2) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024, dm = Math.max(0, decimals);
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
        };

        return {
            setMeta, clone, mergeDeep, deepEqual, unique, shuffle,
            groupBy, isEmpty, pick, omit, chunk, formatBytes
        };
    })();

    // -------------------------------------------------------------------------
    // STRING UTILITIES
    // -------------------------------------------------------------------------
    const string = (() => {
        // Capitalizes the first letter of a string. Example: string.capitalize('hello') -> 'Hello'
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        // Converts a string to title case. Example: string.titleCase('hello world') -> 'Hello World'
        const titleCase = (str) => str.replace(/\w\S*/g, (txt) => capitalize(txt.toLowerCase()));

        // Converts a string to camel case. Example: string.camelCase('hello-world') -> 'helloWorld'
        const camelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

        // Converts a string to snake case. Example: string.snakeCase('helloWorld') -> 'hello_world'
        const snakeCase = (str) => str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_');

        // Converts a string to a URL-friendly slug. Example: string.slugify('Hello World!') -> 'hello-world'
        const slugify = (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

        // Formats a number as a currency string. Example: string.currency(1234.56, 'USD') -> '$1,234.56'
        const currency = (val, symbol = '$', locale = 'en-US') => new Intl.NumberFormat(locale, { style: 'currency', currency: symbol === '$' ? 'USD' : symbol }).format(val);

        // Formats a 10-digit string into a US phone number. Example: string.formatPhone('1234567890') -> '(123) 456-7890'
        const formatPhone = (str) => {
            const cleaned = ('' + str).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            return match ? `(${match[1]}) ${match[2]}-${match[3]}` : str;
        };

        return { capitalize, titleCase, camelCase, snakeCase, slugify, currency, formatPhone };
    })();

    // -------------------------------------------------------------------------
    // NETWORK UTILITIES
    // -------------------------------------------------------------------------
    const net = (() => {
        // Performs an asynchronous HTTP request with retry logic. Example: await net.request({ url: '...' })
        const request = async ({ url, method = 'GET', headers = {}, body = null, retries = 2, interval = 1000, delay = 0 }) => {
            if (delay) await time.sleep(delay);
            let lastErr;
            for (let i = 0; i <= retries; i++) {
                try {
                    const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return await res.json();
                } catch (err) {
                    lastErr = err;
                    if (i < retries) await time.sleep(interval);
                }
            }
            throw lastErr;
        };

        // Provides a collection of common validation functions. Example: net.validate.email('test@test.com')
        const validate = {
            // Validates an email address format. Example: net.validate.email('me@home.com')
            email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
            // Validates a URL format. Example: net.validate.url('https://google.com')
            url: (s) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(s),
            // Validates a phone number format. Example: net.validate.phone('123-456-7890')
            phone: (s) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(s),
            // Validates a hex color code. Example: net.validate.hex('#007AFF')
            hex: (s) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(s),
            // Validates an IPv4 address. Example: net.validate.ip('192.168.1.1')
            ip: (s) => /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(s),
            // Validates if a string is valid JSON. Example: net.validate.json('{"a":1}')
            json: (s) => { try { JSON.parse(s); return true; } catch { return false; } },
            // Validates if a value is a number. Example: net.validate.number('123.45')
            number: (s) => !isNaN(parseFloat(s)) && isFinite(s),
            // Validates if a string is alphanumeric. Example: net.validate.alphanumeric('User123')
            alphanumeric: (s) => /^[a-z0-9]+$/i.test(s),
            // Validates if a string is a valid date. Example: net.validate.date('2025-01-01')
            date: (s) => !isNaN(Date.parse(s)),
            // Evaluates password strength and validity. Example: net.validate.password('MyStrongP@ss1')
            password: (s) => ({
                score: (s.length > 8) + (/[A-Z]/.test(s)) + (/[0-9]/.test(s)) + (/[^A-Za-z0-9]/.test(s)),
                valid: s.length >= 8
            }),
            // Validates a credit card number using the Luhn algorithm. Example: net.validate.creditCard('4111...')
            creditCard: (s) => {
                const arr = (s + '').split('').reverse().map(x => parseInt(x));
                const sum = arr.reduce((acc, val, i) => i % 2 !== 0 ? acc + (val * 2 > 9 ? val * 2 - 9 : val * 2) : acc + val, 0);
                return sum % 10 === 0;
            }
        };

        // Serializes an object into a URL query string. Example: net.serialize({ a: 1, b: 2 }) -> 'a=1&b=2'
        const serialize = (obj) => new URLSearchParams(obj).toString();

        // Parses query parameters from a URL into an object. Example: net.getParams('?id=123') -> { id: '123' }
        const getParams = (url = window.location.href) => Object.fromEntries(new URL(url).searchParams);

        // Checks if a URL has the same origin as the current page. Example: net.isSameOrigin('/api') -> true
        const isSameOrigin = (url) => new URL(url, window.location.origin).origin === window.location.origin;

        // Attempts to detect if an ad blocker is active. Example: await net.detectAdblock()
        const detectAdblock = async () => {
            const networkCheck = async () => {
                const adScripts = [
                    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    'https://googleads.g.doubleclick.net/pagead/adsbygoogle.js',
                    'https://static.ads-twitter.com/uwt.js',
                    'https://www.google-analytics.com/analytics.js',
                    'https://connect.facebook.net/en_US/fbevents.js'
                ];
                for (const url of adScripts) {
                    try {
                        const controller = new AbortController();
                        const timeout = setTimeout(() => controller.abort(), 2000);
                        await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store', signal: controller.signal });
                        clearTimeout(timeout);
                        return false;
                    } catch (e) { continue; }
                }
                return true;
            };

            const domCheck = () => {
                const adClasses = ['ad-banner', 'ads-manager', 'pub_300x250', 'ad-unit', 'ad-zone'];
                const dummy = dom.create('div', {
                    class: adClasses.join(' '),
                    style: 'position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; display: block !important;'
                });
                document.body.appendChild(dummy);
                const styles = window.getComputedStyle(dummy);
                const isBlocked = styles.display === 'none' || styles.visibility === 'hidden' || dummy.offsetHeight === 0;
                document.body.removeChild(dummy);
                return isBlocked;
            };

            const results = await Promise.all([networkCheck(), domCheck()]);
            return results.includes(true) || !!(window.canRunAds === false || !window.adsbygoogle);
        };

        return { request, validate, serialize, getParams, isSameOrigin, detectAdblock };
    })();

    // -------------------------------------------------------------------------
    // DEVICE UTILITIES
    // -------------------------------------------------------------------------
    const device = (() => {
        // Identifies the current operating system platform. Example: device.getPlatform() -> 'Desktop'
        const getPlatform = () => {
            const ua = navigator.userAgent;
            if (/Android/i.test(ua)) return 'Android';
            if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
            if (/Windows Phone/i.test(ua)) return 'Windows Phone';
            return 'Desktop';
        };

        // Checks if the user is on a mobile device. Example: device.isMobile() -> true
        const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Checks if the app is running in standalone (PWA) mode. Example: device.isStandalone() -> false
        const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        // Returns various screen and viewport metrics. Example: device.getMetrics()
        const getMetrics = () => ({
            screen: {
                w: window.screen.width,
                h: window.screen.height,
                ratio: window.devicePixelRatio || 1
            },
            viewport: {
                w: window.innerWidth,
                h: window.innerHeight,
                isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
            },
            isMobile: isMobile(),
            isStandalone: isStandalone()
        });

        return { getPlatform, isMobile, isStandalone, getMetrics };
    })();

    // -------------------------------------------------------------------------
    // FUN & EASTER EGGS
    // -------------------------------------------------------------------------
    const fun = (() => {
        // Calculates the intersection point of two lines (Minecraft stronghold style). Example: fun.stronghold(0, 0, 45, 100, 100, 135)
        const stronghold = (x1, z1, angle1, x2, z2, angle2) => {
            const toRad = (deg) => deg * (Math.PI / 180);
            const m1 = -Math.tan(toRad(angle1 - 90));
            const m2 = -Math.tan(toRad(angle2 - 90));
            const x = (z2 - z1 + m1 * x1 - m2 * x2) / (m1 - m2);
            const z = z1 + (x - x1) * m1;
            return { x: Math.round(x), z: Math.round(z) };
        };

        // Returns the current status of the Doomsday Clock. Example: fun.doomsday()
        const doomsday = () => {
            const status = "85 seconds to midnight";
            const lastUpdated = "January 27, 2026";
            return { status, lastUpdated, warning: "It is the closest the world has ever been to catastrophe." };
        };

        // Returns a random developer joke. Example: fun.getJoke()
        const getJoke = () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs.",
                "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
                "!false (It's funny because it's true.)",
                "A SQL query walks into a bar, walks up to two tables, and asks, 'Can I join you?'",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "Why did the developer go broke? Because he used up all his cache.",
                "A programmer's wife tells him, 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' He returns with 12 loaves of bread.",
                "What's the object-oriented way to become wealthy? Inheritance.",
                "How do you tell an introverted computer scientist from an extroverted one? The extrovert looks at *your* shoes when he's talking to you.",
                "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
                "A user interface is like a joke. If you have to explain it, it's not that good.",
                "Software and cathedrals are much the same — first we build them, then we pray.",
                "Hardware: The part of a computer that you can kick.",
                "Debugging is like being the detective in a crime movie where you are also the murderer.",
                "Knock, knock. Who's there? (Very long pause...) Java.",
                "An optimist says: 'The glass is half full.' A pessimist says: 'The glass is half empty.' A programmer says: 'The glass is twice as large as it needs to be.'",
                "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
                "Real programmers count from 0.",
                "Why do C# and Java developers keep wearing glasses? Because they don't C#.",
                "I've got a crappy DNS joke, but be warned, it might take up to 24 hours to get it."
            ];
            return jokes[math.random(0, jokes.length - 1)];
        };

        // Performs a virtual coin flip. Example: fun.coinFlip() -> 'Heads'
        const coinFlip = () => math.random(0, 1) === 0 ? 'Heads' : 'Tails';

        // Shakes the viewport for a specified duration and intensity. Example: fun.funShake(10, 1000)
        const funShake = (intensity = 5, duration = 500) => {
            const body = document.body;
            const originalStyle = body.style.transition;
            body.style.transition = 'none';
            const startTime = performance.now();
            const animate = (now) => {
                const elapsed = now - startTime;
                if (elapsed < duration) {
                    const x = math.random(-intensity, intensity);
                    const y = math.random(-intensity, intensity);
                    body.style.transform = `translate(${x}px, ${y}px)`;
                    requestAnimationFrame(animate);
                } else {
                    body.style.transform = '';
                    body.style.transition = originalStyle;
                }
            };
            requestAnimationFrame(animate);
        };

        return { stronghold, doomsday, getJoke, coinFlip, funShake };
    })();

    // -------------------------------------------------------------------------
    // PUBLIC API
    // -------------------------------------------------------------------------
    return {
        math,
        visual,
        time,
        dom,
        data,
        string,
        net,
        device,
        fun,
        // Initializes the library and performs post-load tasks.
        init: () => {
            setTimeout(() => {
                const hasSeenPopup = dom.storage.get('fts_init_popup');
                
                console.clear();
                
                const brand = `
  ███████╗████████╗███████╗
  ██╔════╝╚══██╔══╝██╔════╝
  █████╗     ██║   ███████╗
  ██╔══╝     ██║   ╚════██║
  ██║        ██║   ███████║
  ╚═╝        ╚═╝   ╚══════╝
                `;
                console.log(`%c${brand}`, 'color: #007AFF; font-weight: bold;');
                console.log(
                    `%c FTS %c v1.0.0 %c Site enhanced by Fish Token %c\n%c Reference: %c https://niche-site.netlify.app/ %c`,
                    'background: #007AFF; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;',
                    'color: #888; font-size: 10px;',
                    'color: #555; font-style: italic;',
                    '',
                    'color: #00CCFF; font-weight: bold;',
                    'color: #00CCFF; text-decoration: underline;',
                    ''
                );

                if (!hasSeenPopup) {
                    visual.banner({
                        title: 'FTS Enhanced',
                        message: 'This site is powered by Fish Token\'s Site Resources.',
                        icon: '🐟🥇',
                        duration: 6000,
                        onDismiss: () => console.log('%c FTS Banner Dismissed ', 'background: #333; color: #0cf;')
                    });
                    dom.storage.set('fts_init_popup', true);
                }
            }, 100);
        },
        // Convenience aliases
        $: dom.$,
        $$: dom.$$
    };
})();

// Module exports for different environments
if (typeof module !== 'undefined' && module.exports) module.exports = FTS;
else if (typeof define === 'function' && define.amd) define([], () => FTS);

// Automatic initialization on DOM load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => FTS.init());
}