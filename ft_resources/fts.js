/*
    🐟🥇 Fish Token's Site Resources (FTS)
    -----------------------------------------------------------------------------
    Wait! Before you use this, check out my site: https://niche-site.netlify.app/
    It's got more cool stuff and projects I'm working on.
    -----------------------------------------------------------------------------
    Version     : 1.1.0
    Author      : Fish Token
    GitHub      : https://github.com/fish-token/LIB/tree/Main/ft_resources/fts.js
    Raw         : https://niche-site.netlify.app/js/external/fts.js
    License     : MIT (Just keep my name in there, okay?)
    --------------------------------------------------------------------- --------
      ███████╗████████╗███████╗
      ██╔════╝╚══██╔══╝██╔════╝
      █████╗     ██║   ███████╗
      ██╔══╝     ██║   ╚════██║
      ██║        ██║   ███████║
      ╚═╝        ╚═╝   ╚══════╝
    -----------------------------------------------------------------------------
    A collection of tools I made to make my life easier. Maybe it helps you too!
    It's not a big studio production, just one guy coding.
    If you like what I do, please consider checking out my other projects!
    YouTube: https://www.youtube.com/@FlatFishToken
    GitHub: https://github.com/fish-token
    GitLab: https://gitlab.com/fish-token (Clan: https://gitlab.com/fish-token-clan)
    -----------------------------------------------------------------------------
 */

const FTS = (() => {
    "use strict";

    // -------------------------------------------------------------------------
    // MATH UTILITIES
    // -------------------------------------------------------------------------
    const math = (() => {
        /**
         * @description Generates a random integer between min and max (inclusive).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} [min=0] - The minimum value.
         * @param {number} [max=100] - The maximum value.
         * @returns {number} - A random integer.
         * @example FTS.math.random(1, 10); // -> 7
         */
        const random = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

        /**
         * @description Snaps a value to the nearest step.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to snap.
         * @param {number} [snapValue=1] - The step to snap to.
         * @returns {number} - The snapped value.
         * @example FTS.math.snap(7, 5); // -> 5
         */
        const snap = (value, snapValue = 1) => Math.round(value / snapValue) * snapValue;

        /**
         * @description Clamps a value between a minimum and maximum range.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to clamp.
         * @param {number} [min=0] - The lower bound.
         * @param {number} [max=1] - The upper bound.
         * @returns {number} - The clamped value.
         * @example FTS.math.clamp(15, 0, 10); // -> 10
         */
        const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

        /**
         * @description Clamps a value between 0 and 1.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to clamp.
         * @returns {number} - The clamped value.
         * @example FTS.math.clamp01(1.5); // -> 1
         */
        const clamp01 = (value) => clamp(value, 0, 1);

        /**
         * @description Checks if a value is within a specified range (inclusive).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to check.
         * @param {number} min - The lower bound.
         * @param {number} max - The upper bound.
         * @returns {boolean} - True if the value is within range.
         * @example FTS.math.isBetween(5, 1, 10); // -> true
         */
        const isBetween = (value, min, max) => value >= min && value <= max;

        /**
         * @description Wraps a value within a specified range.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to wrap.
         * @param {number} [min=0] - The lower bound.
         * @param {number} [max=1] - The upper bound.
         * @returns {number} - The wrapped value.
         * @example FTS.math.wrap(370, 0, 360); // -> 10
         */
        const wrap = (value, min = 0, max = 1) => {
            const range = max - min;
            return ((((value - min) % range) + range) % range) + min;
        };

        /**
         * @description Linear interpolation between two values.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} a - The start value.
         * @param {number} b - The end value.
         * @param {number} [t=0.5] - The interpolant (0 to 1).
         * @returns {number} - The interpolated value.
         * @example FTS.math.lerp(0, 100, 0.5); // -> 50
         */
        const lerp = (a, b, t = 0.5) => a + (b - a) * t;

        /**
         * @description Linear interpolation between two angles in radians.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} a - The start angle (radians).
         * @param {number} b - The end angle (radians).
         * @param {number} [t=0.5] - The interpolant (0 to 1).
         * @returns {number} - The interpolated angle.
         * @example FTS.math.lerpAngle(0, Math.PI, 0.5); // -> 1.57...
         */
        const lerpAngle = (a, b, t = 0.5) => {
            const dt = wrap(b - a, -Math.PI, Math.PI);
            return a + dt * t;
        };

        /**
         * @description Inverse linear interpolation.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} a - The start value.
         * @param {number} b - The end value.
         * @param {number} v - The value to find the interpolant for.
         * @returns {number} - The interpolant t.
         * @example FTS.math.invLerp(0, 100, 50); // -> 0.5
         */
        const invLerp = (a, b, v) => (v - a) / (b - a);

        /**
         * @description Maps a value from one range to another.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to map.
         * @param {number} inMin - Lower bound of the input range.
         * @param {number} inMax - Upper bound of the input range.
         * @param {number} outMin - Lower bound of the output range.
         * @param {number} outMax - Upper bound of the output range.
         * @returns {number} - The mapped value.
         * @example FTS.math.map(5, 0, 10, 0, 100); // -> 50
         */
        const map = (value, inMin, inMax, outMin, outMax) => invLerp(inMin, inMax, value) * (outMax - outMin) + outMin;

        /**
         * @description Smoothly interpolates between two values using a sigmoid-like curve.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} a - The start value.
         * @param {number} b - The end value.
         * @param {number} [t=0.5] - The interpolant.
         * @returns {number} - The smooth-stepped value.
         * @example FTS.math.smoothStep(0, 10, 5); // -> 5
         */
        const smoothStep = (a, b, t = 0.5) => {
            const v = clamp01(invLerp(a, b, t));
            return v * v * (3 - 2 * v);
        };

        /**
         * @description Calculates the Euclidean distance between two points.
         * @author Fish Token
         * @version 1.1.0
         * @param {{x:number, y:number}} [a={x:0,y:0}] - The first point.
         * @param {{x:number, y:number}} [b={x:0,y:0}] - The second point.
         * @returns {number} - The distance between points.
         * @example FTS.math.dist({x:0, y:0}, {x:3, y:4}); // -> 5
         */
        const dist = (a = { x: 0, y: 0 }, b = { x: 0, y: 0 }) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

        /**
         * @description Converts angles between different units (deg, rad, grad, turn).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} angle - The angle to convert.
         * @param {string} [to='deg'] - The target unit.
         * @param {string} [from='deg'] - The source unit.
         * @returns {number} - The converted angle.
         * @example FTS.math.convertAngle(180, 'rad', 'deg'); // -> 3.14159...
         */
        const convertAngle = (angle, to = 'deg', from = 'deg') => {
            const toRad = {
                deg: a => a * (Math.PI / 180),
                rad: a => a,
                grad: a => a * (Math.PI / 200),
                turn: a => a * (Math.PI * 2)
            };
            const fromRad = {
                deg: r => r * (180 / Math.PI),
                rad: r => r,
                grad: r => r * (200 / Math.PI),
                turn: r => r / (Math.PI * 2)
            };
            const rad = toRad[from] ? toRad[from](angle) : angle;
            return fromRad[to] ? fromRad[to](rad) : rad;
        };

        /**
         * @description Calculates the angle in radians between two points.
         * @author Fish Token
         * @version 1.1.0
         * @param {{x:number, y:number}} [a={x:0,y:0}] - The start point.
         * @param {{x:number, y:number}} [b={x:0,y:0}] - The target point.
         * @returns {number} - The angle in radians.
         * @example FTS.math.angleTo({x:0, y:0}, {x:1, y:1}); // -> 0.7853...
         */
        const angleTo = (a = { x: 0, y: 0 }, b = { x: 0, y: 0 }) => Math.atan2(b.y - a.y, b.x - a.x);

        /**
         * @description Rounds a value to a specified decimal precision.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} value - The value to round.
         * @param {number} [precision=0] - The number of decimal places.
         * @returns {number} - The rounded value.
         * @example FTS.math.round(Math.PI, 2); // -> 3.14
         */
        const round = (value, precision = 0) => {
            const multiplier = 10 ** precision;
            return Math.round(value * multiplier) / multiplier;
        };

        /**
         * @description Compares two angles and returns the shortest distance between them.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} a - The first angle.
         * @param {number} b - The second angle.
         * @param {boolean} [isDegree=false] - Whether the angles are in degrees.
         * @returns {number} - The shortest difference between angles.
         * @example FTS.math.angleCompare(350, 10, true); // -> 20
         */
        const angleCompare = (a, b, isDegree = false) => {
            const wrapVal = isDegree ? 360 : Math.PI * 2;
            const diff = (b - a + wrapVal) % wrapVal;
            return diff > wrapVal / 2 ? diff - wrapVal : diff;
        };

        return {
            random, snap, clamp, clamp01, isBetween, wrap,
            lerp, lerpAngle, invLerp, map, smoothStep,
            dist, convertAngle, angleTo, round, angleCompare
        };
    })();

    // -------------------------------------------------------------------------
    // UI COMPONENTS
    // -------------------------------------------------------------------------
    const ui = (() => {
        /**
         * @description Displays a customizable cookie consent popup.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} [opts={}] - Configuration options for the popup.
         * @param {string} [opts.head='Cookies & Privacy'] - The header text.
         * @param {string} [opts.body='We use cookies...'] - The body text.
         * @param {string} [opts.icon='🍪'] - The icon to display.
         * @param {Array<object>} [opts.buttons] - Array of button objects {text, callback, className, style}.
         * @param {function} [opts.onShow=null] - Callback function when popup is shown.
         * @param {string} [opts.id='fts-cookie-popup'] - The element ID.
         * @returns {HTMLElement|null} - The popup element or null if consent already exists.
         * @example FTS.ui.cookiePopup({ head: "Privacy", body: "We use cookies." });
         */
        const cookiePopup = (opts = {}) => {
            const {
                head = 'Cookies & Privacy',
                body = 'We use cookies to ensure you get the best experience on our website. By continuing, you agree to our use of cookies.',
                icon = '🍪',
                buttons = [
                    { text: 'Accept All', callback: null, className: 'fts-cookie-accept' },
                    { text: 'Necessary Only', callback: null, className: 'fts-cookie-decline', style: 'background: #f1f1f1; color: #333;' }
                ],
                onShow = null,
                id = 'fts-cookie-popup'
            } = opts;

            if (dom.storage.get('fts_cookie_consent')) return null;

            const popup = visual.overlay({
                title: head,
                body: body,
                media: `<div style="font-size: 48px; text-align: center; margin-bottom: 10px;">${icon}</div>`,
                buttons: buttons.map(btn => ({
                    ...btn,
                    callback: (e) => {
                        if (btn.callback) btn.callback(e);
                        dom.storage.set('fts_cookie_consent', true);
                    }
                })),
                closeOnBackdrop: false,
                id
            });

            if (onShow) onShow();
            return popup;
        };

        return { cookiePopup };
    })();

    // -------------------------------------------------------------------------
    // VISUAL UTILITIES
    // -------------------------------------------------------------------------
    const visual = (() => {
        /**
         * @description Parses a color string into an RGBA object. Supports hex, rgb, rgba, hsl, and hsla formats.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The color string to parse.
         * @returns {object|null} - An object {r, g, b, a} or null if invalid.
         * @example FTS.visual.parseColor("#ff0000"); // -> {r: 255, g: 0, b: 0, a: 1}
         */
        const parseColor = (color) => {
            if (typeof color !== 'string') return null;
            const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i) || color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
            if (hexMatch) {
                if (hexMatch[0].length <= 4) {
                    return { r: parseInt(hexMatch[1] + hexMatch[1], 16), g: parseInt(hexMatch[2] + hexMatch[2], 16), b: parseInt(hexMatch[3] + hexMatch[3], 16), a: 1 };
                }
                return { r: parseInt(hexMatch[1], 16), g: parseInt(hexMatch[2], 16), b: parseInt(hexMatch[3], 16), a: hexMatch[4] ? parseInt(hexMatch[4], 16) / 255 : 1 };
            }
            const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (rgbMatch) return { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]), a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1 };
            const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
            if (hslMatch) {
                const { r, g, b } = hslToRgb(parseInt(hslMatch[1]), parseInt(hslMatch[2]), parseInt(hslMatch[3]));
                return { r, g, b, a: hslMatch[4] ? parseFloat(hslMatch[4]) : 1 };
            }
            return null;
        };

        /**
         * @description Formats an RGB(A) object into a color string.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} rgb - The color object {r, g, b, a}.
         * @param {string} [format='hex'] - Target format ('hex', 'rgb', 'rgba', 'hsl', 'hsla', 'auto').
         * @returns {string|null} - The formatted color string.
         * @example FTS.visual.formatColor({r: 255, g: 0, b: 0, a: 1}, "hex"); // -> "#ff0000"
         */
        const formatColor = (rgb, format = 'hex') => {
            if (!rgb) return null;
            const { r, g, b, a } = rgb;
            if (format === 'auto') {
                if (a < 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
                return rgbToHex(r, g, b, a);
            }
            if (format === 'rgb') return `rgb(${r}, ${g}, ${b})`;
            if (format === 'rgba') return `rgba(${r}, ${g}, ${b}, ${a})`;
            if (format === 'hsl' || format === 'hsla') {
                const { h, s, l } = rgbToHsl(r, g, b);
                return format === 'hsl' ? `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)` : `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`;
            }
            return rgbToHex(r, g, b, a);
        };

        /**
         * @description Converts a color string from one format to another.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The input color string.
         * @param {string} [to='auto'] - The target format.
         * @returns {string|null} - The converted color string.
         * @example FTS.visual.convertColor("#ff0000", "rgb"); // -> "rgb(255, 0, 0)"
         */
        const convertColor = (color, to = 'auto') => {
            const rgb = parseColor(color);
            return formatColor(rgb, to);
        };

        /**
         * @description Generates a random color string in the specified format.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [format='hex'] - The target format.
         * @returns {string} - A random color string.
         * @example FTS.visual.randomColor("rgba"); // -> "rgba(12, 45, 200, 0.45)"
         */
        const randomColor = (format = 'hex') => {
            const r = math.random(0, 255), g = math.random(0, 255), b = math.random(0, 255);
            const a = math.round(math.random(0, 100) / 100, 2);
            return formatColor({ r, g, b, a }, format);
        };

        /**
         * @description Converts a hex color to an RGB object. Alias for FTS.visual.parseColor(hex).
         * @author Fish Token
         * @version 1.1.0
         * @param {string} hex - The hex color string.
         * @returns {object|null} - The color object.
         * @example FTS.visual.hexToRgb("#ff0000"); // -> {r: 255, g: 0, b: 0, a: 1}
         */
        const hexToRgb = (hex) => parseColor(hex);

        /**
         * @description Converts RGB(A) values to a hex string (including alpha if < 1).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} r - Red (0-255).
         * @param {number} g - Green (0-255).
         * @param {number} b - Blue (0-255).
         * @param {number} [a=1] - Alpha (0-1).
         * @returns {string} - The hex color string.
         * @example FTS.visual.rgbToHex(255, 0, 0); // -> "#ff0000"
         */
        const rgbToHex = (r, g, b, a = 1) => {
            const toHex = (v) => v.toString(16).padStart(2, '0');
            const alpha = a < 1 ? toHex(Math.round(a * 255)) : '';
            return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
        };

        /**
         * @description Converts HSL values to an RGB object.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} h - Hue (0-360).
         * @param {number} s - Saturation (0-100).
         * @param {number} l - Lightness (0-100).
         * @returns {object} - The color object {r, g, b}.
         * @example FTS.visual.hslToRgb(0, 100, 50); // -> {r: 255, g: 0, b: 0}
         */
        const hslToRgb = (h, s, l) => {
            s /= 100; l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
        };

        /**
         * @description Converts RGB values to an HSL object.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} r - Red (0-255).
         * @param {number} g - Green (0-255).
         * @param {number} b - Blue (0-255).
         * @returns {object} - The HSL object {h, s, l}.
         * @example FTS.visual.rgbToHsl(255, 0, 0); // -> {h: 0, s: 100, l: 50}
         */
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

        /**
         * @description Brightens or darkens a color by a given amount.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The input color string.
         * @param {number} [amount=0.1] - Positive to brighten, negative to darken.
         * @param {string} [format='hex'] - The target format.
         * @returns {string} - The adjusted color string.
         * @example FTS.visual.brighten("#007AFF", 0.2); // -> "#0092ff"
         */
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

        /**
         * @description Returns a contrasting color (black or white) for readability.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The background color string.
         * @param {string} [format='hex'] - The target format.
         * @returns {string} - Either black or white in the requested format.
         * @example FTS.visual.contrast("#000000"); // -> "#ffffff"
         */
        const contrast = (color, format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return format === 'hex' ? '#000000' : 'rgb(0,0,0)';
            const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
            const res = luminance > 0.5 ? { r: 0, g: 0, b: 0, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
            return formatColor(res, format);
        };

        /**
         * @description Converts a color to its grayscale equivalent.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The input color string.
         * @param {string} [format='hex'] - The target format.
         * @returns {string} - The grayscale color string.
         * @example FTS.visual.grayscale("#007AFF"); // -> "#808080"
         */
        const grayscale = (color, format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return color;
            const avg = Math.round((rgb.r + rgb.g + rgb.b) / 3);
            return formatColor({ r: avg, g: avg, b: avg, a: rgb.a }, format);
        };

        /**
         * @description Generates a color scheme (complementary, analogous, etc.) based on a seed color.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The base color string.
         * @param {string} [type='complementary'] - Scheme type.
         * @param {string} [format='hex'] - The target format.
         * @returns {string[]} - An array of color strings in the scheme.
         * @example FTS.visual.getColorScheme("#ff0000", "complementary"); // -> ["#ff0000", "#00ffff"]
         */
        const getColorScheme = (color, type = 'complementary', format = 'hex') => {
            const rgb = parseColor(color);
            if (!rgb) return [];
            const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
            const schemes = {
                'complementary': [hslToRgb((h + 180) % 360, s, l)],
                'analogous': [hslToRgb((h + 30) % 360, s, l), hslToRgb((h - 30) % 360, s, l)],
                'triadic': [hslToRgb((h + 120) % 360, s, l), hslToRgb((h + 240) % 360, s, l)],
                'tetradic': [hslToRgb((h + 90) % 360, s, l), hslToRgb((h + 180) % 360, s, l), hslToRgb((h + 270) % 360, s, l)],
                'monochromatic': [hslToRgb(h, s, Math.max(0, l - 20)), hslToRgb(h, s, Math.min(100, l + 20))]
            };
            const result = (schemes[type.toLowerCase()] || []).map(c => formatColor({ ...c, a: rgb.a }, format));
            return [formatColor(rgb, format), ...result];
        };

        /**
         * @description Checks if a color is fully transparent.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} color - The color string to check.
         * @returns {boolean} - True if transparent, false otherwise.
         * @example FTS.visual.isTransparent("rgba(0,0,0,0)"); // -> true
         */
        const isTransparent = (color) => {
            const rgb = hexToRgb(color);
            return rgb ? rgb.a === 0 : false;
        };

        /**
         * @description Checks if the user's system is in dark mode.
         * @author Fish Token
         * @version 1.1.0
         * @returns {boolean} - True if dark mode is enabled.
         * @example if (FTS.visual.isDarkMode()) { console.log("Dark mode active"); }
         */
        const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        /**
         * @description Animates a numeric property of an object smoothly.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} obj - The object containing the property.
         * @param {string} prop - The name of the property to animate.
         * @param {number} target - The target value.
         * @param {number} [duration=500] - Animation duration in milliseconds.
         * @param {string} [easing='smooth'] - Easing type ('linear' or 'smooth').
         * @param {function} [callback=null] - Function to call when animation finishes.
         * @example FTS.visual.animate(myObj, "opacity", 1, 1000, "smooth");
         */
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

        /**
         * @description Checks if an element is currently in the viewport.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - The element to check.
         * @returns {boolean} - True if the element is in view.
         * @example if (FTS.visual.inView(myElement)) { console.log("Visible!"); }
         */
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

        /**
         * @description Displays a visual log message on the screen in a customizable container.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} msg - The message to display.
         * @param {object} [opts={}] - Configuration options for the log.
         * @returns {void}
         * @example FTS.visual.log("System initialized", { color: "#00ff00" });
         */
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

        /**
         * @description Creates and displays a notification banner.
         * @author Fish Token
         * @version 1.1.0
         * @param {object|string} [opts={}] - Banner options or just the title string.
         * @returns {object} - An object containing {id, dismiss}.
         * @example FTS.visual.banner({ title: "Success", message: "File saved!", icon: "✅" });
         */
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

        /**
         * @description Creates and displays a modal overlay (dialog) with custom content and buttons.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} [opts={}] - Overlay configuration.
         * @returns {object} - An object containing {id, dismiss}.
         * @example FTS.visual.overlay({ title: "Confirm", body: "Are you sure?", buttons: [{text: "Yes", callback: () => {}}] });
         */
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
            randomColor, hexToRgb, rgbToHex, convertColor, brighten,
            contrast, grayscale, getColorScheme, isTransparent, isDarkMode, animate, inView, log, banner, overlay
        };
    })();

    // -------------------------------------------------------------------------
    // TIME & FLOW CONTROL
    // -------------------------------------------------------------------------
    const time = (() => {
        /**
         * @description Returns the current date in a specified format.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [format='dd-mm-yyyy'] - The date format string.
         * @param {string} [sep='-'] - The separator character.
         * @returns {string} - The formatted date string.
         * @example FTS.time.getDate("dd/mm/yyyy", "/"); // -> "03/02/2026"
         */
        const getDate = (format = 'dd-mm-yyyy', sep = '-') => {
            const d = new Date();
            const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
            return format.replace('yyyy', y).replace('mm', m).replace('dd', dd).replace(/-/g, sep);
        };

        /**
         * @description Returns the current time in a specified format.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [format='hh:mm:ss'] - The time format string.
         * @param {string} [sep=':'] - The separator character.
         * @returns {string} - The formatted time string.
         * @example FTS.time.getTime("hh:mm", ":"); // -> "14:30"
         */
        const getTime = (format = 'hh:mm:ss', sep = ':') => {
            const d = new Date();
            const h = String(d.getHours()).padStart(2, '0'), m = String(d.getMinutes()).padStart(2, '0'), s = String(d.getSeconds()).padStart(2, '0');
            return format.replace('hh', h).replace('mm', m).replace('ss', s).replace(/:/g, sep);
        };

        /**
         * @description Returns a relative time string (e.g., "2 hours ago").
         * @author Fish Token
         * @version 1.1.0
         * @param {Date} date - The date to compare with now.
         * @param {string} [locale='en'] - The locale for formatting.
         * @returns {string} - The relative time string.
         * @example FTS.time.formatRelative(new Date(Date.now() - 3600000)); // -> "1 hour ago"
         */
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

        /**
         * @description Debounces a function execution.
         * @author Fish Token
         * @version 1.1.0
         * @param {function} fn - The function to debounce.
         * @param {number} [delay=250] - Delay in milliseconds.
         * @returns {function} - The debounced function.
         * @example const save = FTS.time.debounce(() => console.log("Saved"), 1000);
         */
        const debounce = (fn, delay = 250) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn(...args), delay);
            };
        };

        /**
         * @description Throttles a function execution.
         * @author Fish Token
         * @version 1.1.0
         * @param {function} fn - The function to throttle.
         * @param {number} [limit=250] - Interval in milliseconds.
         * @returns {function} - The throttled function.
         * @example window.onscroll = FTS.time.throttle(() => console.log("Scroll"), 100);
         */
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

        /**
         * @description Pauses execution for a specified duration.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} [ms=1000] - Time to sleep in milliseconds.
         * @returns {Promise<void>} - A promise that resolves after the duration.
         * @example await FTS.time.sleep(2000);
         */
        const sleep = (ms = 1000) => new Promise(res => setTimeout(res, ms));

        return { getDate, getTime, formatRelative, debounce, throttle, sleep };
    })();

    // -------------------------------------------------------------------------
    // DOM MANIPULATION
    // -------------------------------------------------------------------------
    const dom = (() => {
        /**
         * @description Selects a single element from the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} s - CSS selector.
         * @param {Document|HTMLElement} [root=document] - Root element to search from.
         * @returns {HTMLElement|null} - The matched element or null.
         * @example const header = FTS.dom.$("header");
         */
        const $ = (s, root = document) => root.querySelector(s);

        /**
         * @description Selects multiple elements from the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} s - CSS selector.
         * @param {Document|HTMLElement} [root=document] - Root element to search from.
         * @returns {HTMLElement[]} - Array of matched elements.
         * @example const buttons = FTS.dom.$$(".btn");
         */
        const $$ = (s, root = document) => [...root.querySelectorAll(s)];

        /**
         * @description Creates a new DOM element with attributes and children.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [tag='div'] - HTML tag name.
         * @param {object} [attrs={}] - Attributes to set on the element.
         * @param {Array<string|HTMLElement>} [children=[]] - Child elements or text strings.
         * @returns {HTMLElement} - The created element.
         * @example const div = FTS.dom.create("div", { class: "box" }, ["Hello World"]);
         */
        const create = (tag = 'div', attrs = {}, children = []) => {
            const el = document.createElement(tag);
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            children.forEach(child => {
                if (typeof child === 'string') el.appendChild(document.createTextNode(child));
                else if (child instanceof HTMLElement) el.appendChild(child);
            });
            return el;
        };

        /**
         * @description Attaches one or more event listeners to an element.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {string} events - Space-separated event names.
         * @param {function} fn - Event handler function.
         * @param {object} [opts={}] - Event listener options.
         * @returns {void}
         * @example FTS.dom.on(myBtn, "click touchstart", () => console.log("Pressed"));
         */
        const on = (el, events, fn, opts = {}) => {
            events.split(' ').forEach(e => el.addEventListener(e, fn, opts));
        };

        /**
         * @description Removes one or more event listeners from an element.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {string} events - Space-separated event names.
         * @param {function} fn - Event handler function to remove.
         * @param {object} [opts={}] - Event listener options.
         * @returns {void}
         * @example FTS.dom.off(myBtn, "click", myHandler);
         */
        const off = (el, events, fn, opts = {}) => {
            events.split(' ').forEach(e => el.removeEventListener(e, fn, opts));
        };

        /**
         * @description Sets up event delegation.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} root - Parent element.
         * @param {string} type - Event type.
         * @param {string} selector - CSS selector for child elements.
         * @param {function} fn - Handler function.
         * @returns {void}
         * @example FTS.dom.delegate(myList, "click", "li", (e, target) => console.log(target.innerText));
         */
        const delegate = (root, type, selector, fn) => {
            on(root, type, (e) => {
                const target = e.target.closest(selector);
                if (target && root.contains(target)) fn.call(target, e, target);
            });
        };

        /**
         * @description Gets, sets, or removes an attribute.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {string} name - Attribute name.
         * @param {string|null} [value] - Value to set (or null to remove).
         * @param {string} [action='auto'] - Action to perform ('get', 'set', 'remove', 'auto').
         * @returns {string|null|void} - Attribute value if getting.
         * @example FTS.dom.attr(myEl, "data-id", "123"); // Set
         */
        const attr = (el, name, value, action = 'auto') => {
            if (action === 'remove' || (action === 'auto' && value === null)) {
                el.removeAttribute(name);
                return;
            }
            if (action === 'get' || (action === 'auto' && value === undefined)) {
                return el.getAttribute(name);
            }
            el.setAttribute(name, value);
        };

        /**
         * @description Toggles a CSS class on an element.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {string} cls - Class name.
         * @param {boolean} [force] - Force add/remove.
         * @returns {boolean} - True if class exists after toggle.
         * @example FTS.dom.toggleClass(myEl, "active");
         */
        const toggleClass = (el, cls, force) => el.classList.toggle(cls, force);

        /**
         * @description Toggles fullscreen mode for an element.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} [el=document.documentElement] - Element to make fullscreen.
         * @returns {void}
         * @example FTS.dom.toggleFullscreen(document.body);
         */
        const toggleFullscreen = (el = document.documentElement) => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            }
        };

        /**
         * @description Triggers a file download.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} url - Resource URL.
         * @param {string} [name='download'] - Filename for download.
         * @param {boolean} [useBlob=false] - Whether to fetch as blob first.
         * @returns {Promise<void>}
         * @example FTS.dom.download("image.png", "my-photo.png");
         */
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

        /**
         * @description Clipboard utilities for text and rich data.
         */
        const clipboard = {
            /**
             * @description Copies text to clipboard.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} val - Text to copy.
             * @returns {Promise<void>}
             */
            copy: (val) => navigator.clipboard.writeText(val),
            /**
             * @description Reads text from clipboard.
             * @author Fish Token
             * @version 1.1.0
             * @returns {Promise<string>}
             */
            read: () => navigator.clipboard.readText(),
            /**
             * @description Copies rich data to clipboard.
             * @author Fish Token
             * @version 1.1.0
             * @param {any} val - Data to copy.
             * @returns {Promise<void>}
             */
            copyOther: (val) => navigator.clipboard.write(val),
            /**
             * @description Reads rich data from clipboard.
             * @author Fish Token
             * @version 1.1.0
             * @returns {Promise<any>}
             */
            readOther: () => navigator.clipboard.read(),
        };

        /**
         * @description Storage utilities with JSON support.
         */
        const storage = {
            _getStore: (type) => type === 'session' ? window.sessionStorage : window.localStorage,
            /**
             * @description Sets an item in storage.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} k - Key.
             * @param {any} v - Value (auto-stringified).
             * @param {string} [type='local'] - 'local' or 'session'.
             * @returns {void}
             */
            set: (k, v, type = 'local') => storage._getStore(type).setItem(k, JSON.stringify(v)),
            /**
             * @description Gets an item from storage.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} k - Key.
             * @param {string} [type='local'] - 'local' or 'session'.
             * @returns {any} - Parsed value or raw string.
             */
            get: (k, type = 'local') => {
                const item = storage._getStore(type).getItem(k);
                try { return JSON.parse(item); } catch { return item; }
            },
            /**
             * @description Removes an item from storage.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} k - Key.
             * @param {string} [type='local'] - 'local' or 'session'.
             * @returns {void}
             */
            remove: (k, type = 'local') => storage._getStore(type).removeItem(k),
            /**
             * @description Clears all items from storage.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} [type='local'] - 'local' or 'session'.
             * @returns {void}
             */
            clear: (type = 'local') => storage._getStore(type).clear()
        };

        /**
         * @description Cookie management utilities.
         */
        const cookie = {
            /**
             * @description Sets a cookie.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} name - Cookie name.
             * @param {string} val - Cookie value.
             * @param {object} [config={}] - Cookie configuration.
             * @returns {void}
             */
            set: (name, val, config = {}) => {
                const d = new Date();
                d.setTime(d.getTime() + (config.days || 7) * 864e5);
                document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/;SameSite=${config.sameSite || 'Lax'};Secure=${config.secure || false}`;
            },
            /**
             * @description Gets a cookie.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} name - Cookie name.
             * @returns {string|null} - Cookie value.
             */
            get: (name) => {
                const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
                return v ? v[2] : null;
            },
            /**
             * @description Removes a cookie.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} name - Cookie name.
             * @returns {void}
             */
            remove: (name) => cookie.set(name, '', { days: -1 }),
        };

        /**
         * @description Waits for an element to appear in the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} selector - CSS selector.
         * @param {number} [timeout=5000] - Timeout in milliseconds.
         * @returns {Promise<HTMLElement>} - The element once it appears.
         * @example const el = await FTS.dom.wait("#dynamic-el");
         */
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

        /**
         * @description Executes a callback when an element becomes visible.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Element to watch.
         * @param {function} fn - Callback function.
         * @param {number} [threshold=0.1] - Visibility threshold (0-1).
         * @returns {void}
         * @example FTS.dom.onVisible(myImg, (el) => el.src = "real.jpg");
         */
        const onVisible = (el, fn, threshold = 0.1) => {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    fn(el);
                    observer.disconnect();
                }
            }, { threshold });
            observer.observe(el);
        };

        /**
         * @description Detects clicks outside of specific elements.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement|HTMLElement[]} el - Element(s) to consider "inside".
         * @param {function} fn - Callback for outside clicks.
         * @param {object} [opts={}] - Configuration (interval, lifespan, remove).
         * @returns {function} - Cleanup function to stop listening.
         * @example FTS.dom.onClickOutside(myMenu, () => closeMenu());
         */
        const onClickOutside = (el, fn, opts = {}) => {
            const { interval = null, lifespan = null, remove = false } = opts;
            const elements = Array.isArray(el) ? el : [el];
            let timer = null, expiryTimer = null;

            const handler = (e) => {
                const isInside = elements.some(element => element.contains(e.target));
                if (!isInside) {
                    fn(e);
                    if (!interval) cleanup();
                }
            };

            const cleanup = () => {
                if (timer) clearInterval(timer);
                off(document, 'click', handler);
                if (expiryTimer) clearTimeout(expiryTimer);
            };

            if (remove) return cleanup();

            if (interval) {
                const ms = (interval === 'always' || interval === 'constant') ? 100 : interval;
                timer = setInterval(() => {
                    const isInside = elements.some(element => element.contains(document.activeElement));
                    if (!isInside && document.activeElement !== document.body) fn({ target: document.activeElement });
                }, ms);
            }

            on(document, 'click', handler);
            if (lifespan) expiryTimer = setTimeout(cleanup, lifespan);

            return cleanup;
        };

        /**
         * @description Fades an element in using CSS transitions.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {number} [duration=400] - Duration in milliseconds.
         * @param {string} [display='block'] - Target display property.
         * @returns {void}
         * @example FTS.dom.fadeIn(myEl, 500);
         */
        const fadeIn = (el, duration = 400, display = 'block') => {
            el.style.opacity = 0;
            el.style.display = display;
            el.style.transition = `opacity ${duration}ms`;
            setTimeout(() => el.style.opacity = 1, 10);
        };

        /**
         * @description Fades an element out using CSS transitions.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement} el - Target element.
         * @param {number} [duration=400] - Duration in milliseconds.
         * @returns {void}
         * @example FTS.dom.fadeOut(myEl, 500);
         */
        const fadeOut = (el, duration = 400) => {
            el.style.opacity = 1;
            el.style.transition = `opacity ${duration}ms`;
            el.style.opacity = 0;
            setTimeout(() => el.style.display = 'none', duration);
        };

        /**
         * @description Opens a centered popup window.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} url - URL to open.
         * @param {string|object} [target='_blank'] - Window target or features object.
         * @param {object} [features={}] - Popup features (w, h, tab).
         * @returns {Window|null} - The opened window instance.
         * @example FTS.dom.popup("https://google.com", { w: 800, h: 600 });
         */
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

        /**
         * @description Appends children to a parent element.
         * @author Fish Token
         * @version 1.1.0
         * @param {HTMLElement|string} parent - Parent element or selector.
         * @param {...(string|HTMLElement)} children - Children to append.
         * @returns {HTMLElement|void} - The parent element.
         * @example FTS.dom.append("#container", "<span>New</span>", myDiv);
         */
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

        /**
         * @description Removes element(s) from the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string|HTMLElement} s - Element or CSS selector.
         * @param {Document|HTMLElement} [root=document] - Root to search from.
         * @returns {void}
         * @example FTS.dom.remove(".ad-box");
         */
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
        /**
         * @description Sets the page title and meta tags for SEO and Social Media.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [title] - The page title.
         * @param {object} [tags={}] - Key-value pairs of meta names/properties.
         * @returns {void}
         * @example FTS.data.setMeta("My App", { description: "Best app ever", "og:image": "logo.png" });
         */
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

        /**
         * @description Creates a deep clone of an object or array.
         * @author Fish Token
         * @version 1.1.0
         * @param {any} obj - The object or array to clone.
         * @returns {any} - The cloned data.
         * @example const copy = FTS.data.clone(originalObj);
         */
        const clone = (obj) => {
            if (obj === null || typeof obj !== 'object') return obj;
            if (Array.isArray(obj)) return obj.map(clone);
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, clone(v)]));
        };

        /**
         * @description Deep merges multiple objects recursively.
         * @author Fish Token
         * @version 1.1.0
         * @param {...object} objs - Objects to merge.
         * @returns {object} - The merged object.
         * @example const settings = FTS.data.mergeDeep(defaults, userSettings);
         */
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

        /**
         * @description Performs a deep equality check between two values.
         * @author Fish Token
         * @version 1.1.0
         * @param {any} a - First value.
         * @param {any} b - Second value.
         * @returns {boolean} - True if values are deeply equal.
         * @example if (FTS.data.deepEqual(objA, objB)) { ... }
         */
        const deepEqual = (a, b) => {
            if (a === b) return true;
            if (a && b && typeof a === 'object' && typeof b === 'object') {
                if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
                const keys = Object.keys(a);
                return keys.length === Object.keys(b).length && keys.every(k => deepEqual(a[k], b[k]));
            }
            return false;
        };

        /**
         * @description Removes duplicates from an array and returns unique values.
         * @author Fish Token
         * @version 1.1.0
         * @param {Array} arr - The input array.
         * @returns {Array} - Array with unique elements.
         * @example const uniqueList = FTS.data.unique([1, 1, 2, 3, 3]);
         */
        const unique = (arr) => [...new Set(arr)];

        /**
         * @description Shuffles an array randomly using the Fisher-Yates algorithm.
         * @author Fish Token
         * @version 1.1.0
         * @param {Array} arr - The array to shuffle.
         * @returns {Array} - A new shuffled array.
         * @example const deck = FTS.data.shuffle([1, 2, 3, 4, 5]);
         */
        const shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = math.random(0, i);
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };

        /**
         * @description Groups an array of objects by a specific key.
         * @author Fish Token
         * @version 1.1.0
         * @param {object[]} arr - Array of objects.
         * @param {string} key - Key to group by.
         * @returns {object} - Grouped object.
         * @example FTS.data.groupBy(users, "role");
         */
        const groupBy = (arr, key) => arr.reduce((acc, obj) => {
            const k = obj[key];
            (acc[k] = acc[k] || []).push(obj);
            return acc;
        }, {});

        /**
         * @description Checks if a value is empty (null, undefined, "", [], {}).
         * @author Fish Token
         * @version 1.1.0
         * @param {any} val - Value to check.
         * @returns {boolean} - True if empty.
         * @example FTS.data.isEmpty({});
         */
        const isEmpty = (val) => {
            if (val == null) return true;
            if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
            if (typeof val === 'object') return Object.keys(val).length === 0;
            return false;
        };

        /**
         * @description Picks specific keys from an object.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} obj - Source object.
         * @param {string[]} keys - Keys to pick.
         * @returns {object} - New object with picked keys.
         * @example FTS.data.pick(user, ["id", "name"]);
         */
        const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));

        /**
         * @description Omits specific keys from an object.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} obj - Source object.
         * @param {string[]} keys - Keys to omit.
         * @returns {object} - New object with keys omitted.
         * @example FTS.data.omit(user, ["password"]);
         */
        const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

        /**
         * @description Chunks an array into smaller arrays of a fixed size.
         * @author Fish Token
         * @version 1.1.0
         * @param {Array} arr - Array to chunk.
         * @param {number} [size=1] - Chunk size.
         * @returns {Array[]} - Array of chunks.
         * @example FTS.data.chunk([1, 2, 3, 4], 2);
         */
        const chunk = (arr, size = 1) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, (i + 1) * size));

        /**
         * @description Formats bytes into a human-readable string (KB, MB, GB).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} bytes - Number of bytes.
         * @param {number} [decimals=2] - Decimal places.
         * @returns {string} - Formatted size string.
         * @example FTS.data.formatBytes(1048576);
         */
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
        /**
         * @description Capitalizes the first letter of a string.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Capitalized string.
         * @example FTS.string.capitalize("hello");
         */
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        /**
         * @description Converts a string to Title Case.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Title cased string.
         * @example FTS.string.titleCase("hello world");
         */
        const titleCase = (str) => str.replace(/\w\S*/g, (txt) => capitalize(txt.toLowerCase()));

        /**
         * @description Converts a string to camelCase.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Camel cased string.
         * @example FTS.string.camelCase("hello-world");
         */
        const camelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

        /**
         * @description Converts a string to kebab-case.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Kebab cased string.
         * @example FTS.string.kebabCase("Hello World");
         */
        const kebabCase = (str) => str.replace(/\s+/g, '-').toLowerCase();

        /**
         * @description Converts a string to snake_case.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Snake cased string.
         * @example FTS.string.snakeCase("helloWorld");
         */
        const snakeCase = (str) => str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_');

        /**
         * @description Converts a string to a URL-friendly slug.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Input string.
         * @returns {string} - Slugified string.
         * @example FTS.string.slugify("Hello World!");
         */
        const slugify = (str) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

        /**
         * @description Formats a number as a currency string.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} val - Amount.
         * @param {string} [symbol='$'] - Currency symbol or ISO code.
         * @param {string} [locale='en-US'] - Formatting locale.
         * @returns {string} - Formatted currency string.
         * @example FTS.string.currency(1234.56, "USD");
         */
        const currency = (val, symbol = '$', locale = 'en-US') => new Intl.NumberFormat(locale, { style: 'currency', currency: symbol === '$' ? 'USD' : symbol }).format(val);

        /**
         * @description Formats a string as a US phone number.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} str - Raw phone string.
         * @returns {string} - Formatted phone string.
         * @example FTS.string.formatPhone("1234567890");
         */
        const formatPhone = (str) => {
            const cleaned = ('' + str).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            return match ? `(${match[1]}) ${match[2]}-${match[3]}` : str;
        };

        return { capitalize, titleCase, camelCase, kebabCase, snakeCase, slugify, currency, formatPhone };
    })();

    // -------------------------------------------------------------------------
    // NETWORK UTILITIES
    // -------------------------------------------------------------------------
    const net = (() => {
        /**
         * @description Performs an asynchronous HTTP request with retry logic.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} options - Request configuration.
         * @param {string} options.url - The URL to fetch.
         * @param {string} [options.method='GET'] - HTTP method.
         * @param {object} [options.headers={}] - HTTP headers.
         * @param {object} [options.body=null] - Request body (will be stringified).
         * @param {number} [options.retries=2] - Number of retry attempts on failure.
         * @param {number} [options.interval=1000] - Delay between retries in ms.
         * @param {number} [options.delay=0] - Initial delay before first request in ms.
         * @returns {Promise<any>} - The parsed JSON response.
         * @example const data = await FTS.net.request({ url: "https://api.example.com/data" });
         */
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

        /**
         * @description Data validation utilities for common formats.
         */
        const validate = {
            /**
             * @description Validates an email address.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.email("test@example.com");
             */
            email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
            /**
             * @description Validates a URL.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.url("https://google.com");
             */
            url: (s) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(s),
            /**
             * @description Validates a phone number.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.phone("1234567890");
             */
            phone: (s) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(s),
            /**
             * @description Validates a hex color string.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.hex("#ff0000");
             */
            hex: (s) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(s),
            /**
             * @description Validates an IP address (v4).
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.ip("127.0.0.1");
             */
            ip: (s) => /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(s),
            /**
             * @description Validates if a string is valid JSON.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.json('{"a":1}');
             */
            json: (s) => { try { JSON.parse(s); return true; } catch { return false; } },
            /**
             * @description Validates if a value is a number.
             * @author Fish Token
             * @version 1.1.0
             * @param {any} s - Input value.
             * @returns {boolean} - True if numeric.
             * @example FTS.net.validate.number("123");
             */
            number: (s) => !isNaN(parseFloat(s)) && isFinite(s),
            /**
             * @description Validates if a string is alphanumeric.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if alphanumeric.
             * @example FTS.net.validate.alphanumeric("abc123");
             */
            alphanumeric: (s) => /^[a-z0-9]+$/i.test(s),
            /**
             * @description Validates if a string is a valid date.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Input string.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.date("2026-02-03");
             */
            date: (s) => !isNaN(Date.parse(s)),
            /**
             * @description Analyzes password strength and validity.
             * @author Fish Token
             * @version 1.1.0
             * @param {string} s - Password string.
             * @returns {object} - { score, valid }.
             * @example FTS.net.validate.password("P@ssw0rd123");
             */
            password: (s) => ({
                score: (s.length > 8) + (/[A-Z]/.test(s)) + (/[0-9]/.test(s)) + (/[^A-Za-z0-9]/.test(s)),
                valid: s.length >= 8
            }),
            /**
             * @description Validates a credit card number using the Luhn algorithm.
             * @author Fish Token
             * @version 1.1.0
             * @param {string|number} s - Card number.
             * @returns {boolean} - True if valid.
             * @example FTS.net.validate.creditCard("4532...");
             */
            creditCard: (s) => {
                const arr = (s + '').split('').reverse().map(x => parseInt(x));
                const sum = arr.reduce((acc, val, i) => i % 2 !== 0 ? acc + (val * 2 > 9 ? val * 2 - 9 : val * 2) : acc + val, 0);
                return sum % 10 === 0;
            }
        };

        /**
         * @description Serializes an object into a URL query string.
         * @author Fish Token
         * @version 1.1.0
         * @param {object} obj - The object to serialize.
         * @returns {string} - URL-encoded query string.
         * @example FTS.net.serialize({ id: 1, type: "user" });
         */
        const serialize = (obj) => new URLSearchParams(obj).toString();

        /**
         * @description Extracts query parameters from a URL.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} [url=window.location.href] - The URL to parse.
         * @returns {object} - Key-value pairs of parameters.
         * @example const params = FTS.net.getParams();
         */
        const getParams = (url = window.location.href) => Object.fromEntries(new URL(url).searchParams);

        /**
         * @description Checks if a URL has the same origin as the current page.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} url - URL to check.
         * @returns {boolean} - True if same origin.
         * @example FTS.net.isSameOrigin("https://niche-site.netlify.app/");
         */
        const isSameOrigin = (url) => new URL(url, window.location.origin).origin === window.location.origin;

        /**
         * @description Attempts to detect if an adblocker is active using network and DOM checks.
         * @author Fish Token
         * @version 1.1.0
         * @returns {Promise<boolean>} - True if an adblocker is detected.
         * @example const blocked = await FTS.net.detectAdblock();
         */
        const detectAdblock = async () => {
            const networkCheck = async () => {
                const adScripts = [
                    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    'https://googleads.g.doubleclick.net/pagead/adsbygoogle.js',
                    'https://static.ads-twitter.com/uwt.js',
                    'https://www.google-analytics.com/analytics.js',
                    'https://connect.facebook.net/en_US/fbevents.js',
                    'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
                    'https://c.amazon-adsystem.com/aax2/amzn_ads.js',
                    'https://adservice.google.com/adsid/integrator.js',
                    'https://tpc.googlesyndication.com/pagead/js/adsbygoogle.js'
                ];
                for (const url of adScripts) {
                    try {
                        const controller = new AbortController();
                        const timeout = setTimeout(() => controller.abort(), 1500);
                        await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store', signal: controller.signal });
                        clearTimeout(timeout);
                        return false;
                    } catch (e) { continue; }
                }
                return true;
            };

            const domCheck = () => {
                const adClasses = [
                    'ad-banner', 'ads-manager', 'pub_300x250', 'ad-unit', 'ad-zone', 
                    'ad-sidebar', 'ad-wrapper', 'ad-container', 'ad-placement',
                    'text-ad-links', 'sponsor-link', 'promoted-content', 'ad_box',
                    'adsbygoogle', 'trc_rbox_container', 'trc_rbox_fixed'
                ];
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

            const pixelCheck = () => {
                return new Promise((res) => {
                    const img = new Image();
                    img.src = 'https://www.google-analytics.com/__utm.gif';
                    img.onload = () => res(false);
                    img.onerror = () => res(true);
                    setTimeout(() => res(true), 2000);
                });
            };

            const results = await Promise.all([networkCheck(), domCheck(), pixelCheck()]);
            return results.includes(true) || !!(window.canRunAds === false || !window.adsbygoogle || !window.googletag);
        };

        return { request, validate, serialize, getParams, isSameOrigin, detectAdblock };
    })();

    // -------------------------------------------------------------------------
    // DEVICE UTILITIES
    // -------------------------------------------------------------------------
    const device = (() => {
        /**
         * @description Identifies the current operating system platform.
         * @author Fish Token
         * @version 1.1.0
         * @returns {string} - Platform name ('Android', 'iOS', 'Windows Phone', or 'Desktop').
         * @example const os = FTS.device.getPlatform();
         */
        const getPlatform = () => {
            const ua = navigator.userAgent;
            if (/Android/i.test(ua)) return 'Android';
            if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
            if (/Windows Phone/i.test(ua)) return 'Windows Phone';
            return 'Desktop';
        };

        /**
         * @description Checks if the current device is a mobile device.
         * @author Fish Token
         * @version 1.1.0
         * @returns {boolean} - True if mobile.
         * @example if (FTS.device.isMobile()) { ... }
         */
        const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        /**
         * @description Checks if the app is running in standalone mode (PWA).
         * @author Fish Token
         * @version 1.1.0
         * @returns {boolean} - True if standalone.
         * @example if (FTS.device.isStandalone()) { ... }
         */
        const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        /**
         * @description Retrieves a comprehensive set of device and viewport metrics.
         * @author Fish Token
         * @version 1.1.0
         * @returns {object} - Object containing screen, viewport, and device status.
         * @example const stats = FTS.device.getMetrics();
         */
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
        /**
         * @description Calculates the intersection of two lines (Stronghold triangulation).
         * @author Fish Token
         * @version 1.1.0
         * @param {number} x1 - X coordinate of first point.
         * @param {number} z1 - Z coordinate of first point.
         * @param {number} angle1 - Angle of first throw.
         * @param {number} x2 - X coordinate of second point.
         * @param {number} z2 - Z coordinate of second point.
         * @param {number} angle2 - Angle of second throw.
         * @returns {object} - { x, z } intersection point.
         * @example const loc = FTS.fun.stronghold(100, 100, 45, 200, 100, 135);
         */
        const stronghold = (x1, z1, angle1, x2, z2, angle2) => {
            const toRad = (deg) => deg * (Math.PI / 180);
            const m1 = -Math.tan(toRad(angle1 - 90));
            const m2 = -Math.tan(toRad(angle2 - 90));
            const x = (z2 - z1 + m1 * x1 - m2 * x2) / (m1 - m2);
            const z = z1 + (x - x1) * m1;
            return { x: Math.round(x), z: Math.round(z) };
        };

        /**
         * @description Gets the current Doomsday Clock status.
         * @author Fish Token
         * @version 1.1.0
         * @returns {object} - { status, lastUpdated, warning }.
         * @example const clock = FTS.fun.doomsday();
         */
        const doomsday = () => {
            const status = "85 seconds to midnight";
            const lastUpdated = "January 27, 2026";
            return { status, lastUpdated, warning: "It is the closest the world has ever been to catastrophe." };
        };

        /**
         * @description Returns a random programmer joke.
         * @author Fish Token
         * @version 1.1.0
         * @returns {string} - A funny joke.
         * @example console.log(FTS.fun.getJoke());
         */
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
                "I've got a crappy DNS joke, but be warned, it might take up to 24 hours to get it.",
                "What do you call a programmer from Finland? Nerdic.",
                "Why did the programmer quit his job? Because he didn't get arrays.",
                "A programmer was found dead in the shower. The instructions on the shampoo said: Lather, Rinse, Repeat.",
                "To understand what recursion is, you must first understand what recursion is.",
                "My attitude is not a bug, it's a feature.",
                "In order to understand recursion, you must first understand recursion.",
                "Wait, I already said that one. That's the joke.",
                "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
                "A CSS developer walks into a bar and immediately walks into a different bar on a different floor.",
                "Why did the web developer walk out of the restaurant? Because of the table layout.",
                "What's a programmer's favorite place to hang out? The Foo Bar.",
                "I would love to tell you a joke about UDP, but you might not get it.",
                "Why was the developer unhappy with their job? They didn't get arrays.",
                "A web developer walks into a restaurant and sits at a table. The waiter asks: 'Would you like a menu?' The developer replies: 'No thanks, I'll just look at the source.'",
                "Why do programmers hate nature? It has too many bugs and no documentation.",
                "How do you comfort a JavaScript bug? You console it.",
                "Why did the functional programmer get thrown out of the bar? He had too many side effects.",
                "What is a programmer's favorite snack? Microchips.",
                "Why did the private class break up with the public class? It was too exposed.",
                "How many developers does it take to screw in a lightbulb? Zero. They'll just declare 'Darkness is the new industry standard.'",
                "Why did the database administrator leave his wife? She had one too many relations.",
                "What's the best thing about being a programmer? You can work in your pajamas and still be 'developing'.",
                "Why was the computer cold? It left its Windows open.",
                "A programmer's favorite hangout spot? The break point.",
                "Why did the developer go to the beach? To improve their sandbox.",
                "Why was the mobile developer always tired? Because they had too many background processes running.",
                "What do you call a group of 8 hobbits? A hobbyte.",
                "Why did the browser go to therapy? It had too many tabs open.",
                "A programmer is a machine that turns coffee into code.",
                "Why do Java developers wear glasses? Because they don't C#.",
                "There's no place like 127.0.0.1.",
                "Why was the front-end developer so stressed? Because they were constantly losing focus.",
                "A programmer's life: 10% writing code, 90% wondering why it doesn't work."
            ];
            return jokes[math.random(0, jokes.length - 1)];
        };

        /**
         * @description Flips a coin and returns the result.
         * @author Fish Token
         * @version 1.1.0
         * @returns {string} - 'Heads' or 'Tails'.
         * @example const result = FTS.fun.coinFlip();
         */
        const coinFlip = () => math.random(0, 1) === 0 ? 'Heads' : 'Tails';

        /**
         * @description Shakes the screen (body element) for a set duration.
         * @author Fish Token
         * @version 1.1.0
         * @param {number} [intensity=5] - Pixels to shake.
         * @param {number} [duration=500] - Duration in ms.
         * @returns {void}
         * @example FTS.fun.screenShake(10, 1000);
         */
        const screenShake = (intensity = 5, duration = 500) => {
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

        return { stronghold, doomsday, getJoke, coinFlip, screenShake };
    })();

    // -------------------------------------------------------------------------
    // PUBLIC API
    // -------------------------------------------------------------------------
    return {
        math,
        visual,
        ui,
        time,
        dom,
        data,
        string,
        net,
        device,
        fun,
        /**
         * @description Checks if the script is running on a local environment.
         * @author Fish Token
         * @version 1.1.0
         * @returns {boolean} - True if localhost, 127.0.0.1, .local, or file://.
         * @example if (FTS.isLocal()) { ... }
         */
        isLocal: () => {
            const h = window.location.hostname;
            return h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local') || window.location.protocol === 'file:';
        },
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
                    `%c FTS %c v1.1.0 %c Site enhanced by Fish Token %c\n%c Reference: %c https://niche-site.netlify.app/ %c`,
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
                        title: 'FTS Notice',
                        message: 'This site is powered by Fish Token\'s Site Resources.',
                        icon: '🐟🥇',
                        duration: 6000,
                        onDismiss: () => {}
                    });
                    dom.storage.set('fts_init_popup', true);
                }
            }, 100);
        },
        /**
         * @description Selects a single element from the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} s - CSS selector.
         * @param {Document|HTMLElement} [root=document] - Root element.
         * @returns {HTMLElement|null}
         * @example const el = FTS.$("#my-id");
         */
        $: dom.$,
        /**
         * @description Selects multiple elements from the DOM.
         * @author Fish Token
         * @version 1.1.0
         * @param {string} s - CSS selector.
         * @param {Document|HTMLElement} [root=document] - Root element.
         * @returns {HTMLElement[]}
         * @example const list = FTS.$$(".items");
         */
        $$: dom.$$
    };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = FTS;
else if (typeof define === 'function' && define.amd) define([], () => FTS);
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => FTS.init());
}