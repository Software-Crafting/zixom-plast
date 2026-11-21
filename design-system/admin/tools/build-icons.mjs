// Builds admin/assets/icons.js: the admin dashboard sprite of Lucide icons. Same names as the mobile sprite plus desktop ones.
// A script works over file:// where an external <use href="icons.svg#..."> does not.
//
// Usage:
//   npm pack lucide-static@0.460.0 && tar xzf lucide-static-*.tgz
//   node design-system/admin/tools/build-icons.mjs package/icons
//
// Pages use our own names (<use href="#ph-NAME"/>); ICONS maps each to a Lucide file.
// arrow-left renders as a chevron so every back button is a plain "<".
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const STROKE_WIDTH = 1.75;

const ICONS = {
  'house': 'house', 'wrench': 'wrench', 'gear-six': 'settings', 'bell': 'bell', 'magnifying-glass': 'search',
  'sliders-horizontal': 'sliders-horizontal', 'arrow-left': 'chevron-left', 'arrow-right': 'arrow-right',
  'arrow-up-right': 'arrow-up-right', 'caret-right': 'chevron-right', 'caret-down': 'chevron-down',
  'caret-left': 'chevron-left', 'caret-up': 'chevron-up', 'dots-three': 'ellipsis', 'plus': 'plus', 'minus': 'minus',
  'x': 'x', 'check': 'check', 'check-circle': 'circle-check', 'warning': 'triangle-alert', 'warning-circle': 'circle-alert',
  'info': 'info', 'question': 'circle-help', 'chat-circle-dots': 'message-circle-more', 'chat-text': 'message-square-text',
  'phone': 'phone', 'whatsapp-logo': 'message-circle', 'envelope-simple': 'mail', 'map-pin': 'map-pin', 'map-trifold': 'map',
  'calendar-blank': 'calendar', 'calendar-check': 'calendar-check', 'clock': 'clock', 'clock-countdown': 'timer',
  'user': 'user', 'user-circle': 'circle-user', 'users': 'users', 'buildings': 'building-2', 'factory': 'factory',
  'credit-card': 'credit-card', 'receipt': 'receipt', 'file-text': 'file-text', 'file-pdf': 'file-text',
  'download-simple': 'download', 'upload-simple': 'upload', 'share-network': 'share-2', 'camera': 'camera',
  'image': 'image', 'video-camera': 'video', 'microphone': 'mic', 'qr-code': 'qr-code', 'barcode': 'scan-barcode',
  'shield-check': 'shield-check', 'shield-warning': 'shield-alert', 'seal-check': 'badge-check', 'certificate': 'award',
  'toolbox': 'briefcase', 'package': 'package', 'shopping-cart': 'shopping-cart', 'truck': 'truck',
  'currency-inr': 'indian-rupee', 'wallet': 'wallet', 'bank': 'landmark', 'list-checks': 'list-checks',
  'clipboard-text': 'clipboard-list', 'note-pencil': 'notebook-pen', 'pencil-simple': 'pencil', 'trash': 'trash-2',
  'lock-simple': 'lock', 'fingerprint': 'fingerprint', 'wifi-slash': 'wifi-off', 'cloud-arrow-up': 'cloud-upload',
  'arrows-clockwise': 'refresh-cw', 'siren': 'siren', 'first-aid': 'cross', 'lightning': 'zap', 'fire': 'flame',
  'thermometer': 'thermometer', 'gauge': 'gauge', 'timer': 'timer', 'hourglass': 'hourglass', 'star': 'star',
  'funnel': 'filter', 'sort-ascending': 'arrow-down-wide-narrow', 'navigation-arrow': 'navigation', 'sign-out': 'log-out',
  'globe': 'globe', 'headset': 'headset', 'megaphone': 'megaphone', 'book-open': 'book-open', 'cpu': 'cpu',
  'circuitry': 'circuit-board', 'nut': 'nut', 'hard-hat': 'hard-hat', 'hammer': 'hammer', 'paper-plane-tilt': 'send',
  'paperclip': 'paperclip', 'eye': 'eye', 'eye-slash': 'eye-off', 'copy': 'copy', 'briefcase': 'briefcase',
  'signature': 'signature', 'list': 'menu', 'squares-four': 'layout-grid', 'tag': 'tag', 'percent': 'percent',
  'device-mobile': 'smartphone', 'cube': 'box', 'lifebuoy': 'life-buoy', 'path': 'route', 'car-profile': 'car',
  'stack': 'layers', 'handshake': 'handshake', 'chart-line-up': 'trending-up', 'storefront': 'store', 'tray': 'inbox',
  'identification-card': 'id-card', 'thumbs-up': 'thumbs-up', 'smiley-sad': 'frown',
  /* admin dashboard */
  'layout-dashboard': 'layout-dashboard', 'list-todo': 'list-todo', 'user-check': 'user-check', 'user-plus': 'user-plus', 'user-x': 'user-x',
  'calendar-range': 'calendar-range', 'calendar-days': 'calendar-days', 'kanban': 'square-kanban', 'columns': 'columns-3', 'table': 'table',
  'panel-left': 'panel-left', 'panel-right': 'panel-right', 'command': 'command', 'keyboard': 'keyboard', 'activity': 'activity',
  'bar-chart': 'chart-column', 'pie-chart': 'chart-pie', 'line-chart': 'chart-line', 'trending-down': 'trending-down', 'arrow-up': 'arrow-up', 'arrow-down': 'arrow-down',
  'arrow-up-down': 'arrow-up-down', 'file-spreadsheet': 'file-spreadsheet', 'file-plus': 'file-plus', 'file-diff': 'file-diff', 'printer': 'printer',
  'external-link': 'external-link', 'link': 'link', 'plug': 'plug', 'key': 'key-round', 'server': 'server', 'database': 'database',
  'history': 'history', 'archive': 'archive', 'merge': 'merge', 'git-compare': 'git-compare', 'move': 'move', 'grip': 'grip-vertical',
  'bell-off': 'bell-off', 'bell-ring': 'bell-ring', 'volume': 'volume-2', 'smartphone': 'smartphone', 'monitor': 'monitor', 'laptop': 'laptop',
  'boxes': 'boxes', 'warehouse': 'warehouse', 'scan': 'scan-line', 'hand-coins': 'hand-coins', 'banknote': 'banknote', 'undo': 'undo-2',
  'file-minus': 'file-minus', 'scale': 'scale', 'message-square': 'message-square', 'messages': 'messages-square', 'reply': 'reply',
  'sparkles': 'sparkles', 'zap-off': 'zap-off', 'power': 'power', 'toggle': 'toggle-right', 'wrench-screw': 'settings-2', 'clipboard-check': 'clipboard-check',
  'sticky-note': 'sticky-note', 'flag': 'flag', 'pin': 'pin', 'filter-x': 'filter-x', 'columns-settings': 'settings-2', 'save': 'save', 'bookmark': 'bookmark',
  'circle-dot': 'circle-dot', 'circle-pause': 'circle-pause', 'ban': 'ban', 'shield': 'shield', 'shield-off': 'shield-off', 'locate': 'locate-fixed',
  'mail-check': 'mail-check', 'send-horizontal': 'send-horizontal', 'chevrons-left': 'chevrons-left', 'chevrons-right': 'chevrons-right',
  'more-vertical': 'ellipsis-vertical', 'log-in': 'log-in', 'help': 'circle-help', 'upload-cloud': 'cloud-upload', 'lock-open': 'lock-open',
  'inbox': 'inbox', 'phone-incoming': 'phone-incoming', 'phone-missed': 'phone-missed', 'goal': 'goal', 'milestone': 'milestone', 'folder': 'folder',
  'store': 'store', 'receipt-text': 'receipt-text', 'refresh-ccw': 'refresh-ccw', 'gauge-circle': 'gauge', 'radar': 'radar', 'map-pinned': 'map-pinned',
  /* upload states */
  'pause': 'pause', 'play': 'play', 'file-x': 'file-x', 'circle-x': 'circle-x', 'file-search': 'file-search',
  'image-off': 'image-off', 'rotate-ccw': 'rotate-ccw', 'files': 'files', 'file-check': 'file-check', 'circle': 'circle',
};

const iconsDir = process.argv[2];
if (!iconsDir) {
  console.error('Pass the Lucide icons directory, for example: package/icons');
  process.exit(1);
}

const symbol = ([name, file]) => {
  const svg = readFileSync(join(iconsDir, `${file}.svg`), 'utf8');
  const inner = svg.replace(/<!--.*?-->/s, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/\s*\n\s*/g, '');
  return `<symbol id="ph-${name}" viewBox="0 0 24 24" stroke-width="${STROKE_WIDTH}" `
    + `stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`;
};

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:none">${Object.entries(ICONS).map(symbol).join('')}</svg>`;
const out = `/* Generated by tools/build-icons.mjs from lucide-static (ISC). Do not edit by hand. */
document.body.insertAdjacentHTML('afterbegin', ${JSON.stringify(sprite)});
`;

const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'icons.js');
writeFileSync(target, out);
console.log(`Wrote ${Object.keys(ICONS).length} icons to ${target}`);
