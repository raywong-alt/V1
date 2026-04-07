const s = (body: string): string => {
  const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(full)}`;
};

export const IMAGE_ASSETS: Record<string, string> = {
  'image-cat': s(
    `<circle cx="100" cy="100" r="75" fill="#f5a623"/>` +
    `<polygon points="42,70 58,22 80,68" fill="#f5a623"/>` +
    `<polygon points="120,68 142,22 158,70" fill="#f5a623"/>` +
    `<polygon points="48,68 62,28 78,66" fill="#ffdba4"/>` +
    `<polygon points="122,66 138,28 152,68" fill="#ffdba4"/>` +
    `<ellipse cx="78" cy="100" rx="10" ry="12" fill="#1a1a1a"/>` +
    `<ellipse cx="122" cy="100" rx="10" ry="12" fill="#1a1a1a"/>` +
    `<circle cx="81" cy="96" r="3" fill="white"/>` +
    `<circle cx="125" cy="96" r="3" fill="white"/>` +
    `<ellipse cx="100" cy="118" rx="7" ry="5" fill="#ff9fb3"/>` +
    `<path d="M93,123 Q100,130 107,123" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
    `<line x1="45" y1="114" x2="88" y2="117" stroke="#555" stroke-width="1.5"/>` +
    `<line x1="45" y1="121" x2="88" y2="121" stroke="#555" stroke-width="1.5"/>` +
    `<line x1="112" y1="117" x2="155" y2="114" stroke="#555" stroke-width="1.5"/>` +
    `<line x1="112" y1="121" x2="155" y2="121" stroke="#555" stroke-width="1.5"/>`,
  ),

  'image-apple': s(
    `<ellipse cx="100" cy="112" rx="65" ry="62" fill="#e74c3c"/>` +
    `<ellipse cx="70" cy="85" rx="28" ry="18" fill="#c0392b" opacity="0.3"/>` +
    `<rect x="97" y="45" width="7" height="24" rx="3.5" fill="#795548"/>` +
    `<path d="M100,60 Q118,40 138,48 Q130,70 112,68 Q100,66 100,60Z" fill="#27ae60"/>` +
    `<ellipse cx="76" cy="106" rx="14" ry="22" fill="white" opacity="0.15"/>`,
  ),

  'image-ball': s(
    `<circle cx="100" cy="100" r="78" fill="#e74c3c"/>` +
    `<path d="M22,100 Q100,45 178,100" stroke="white" stroke-width="5" fill="none"/>` +
    `<path d="M22,100 Q100,155 178,100" stroke="white" stroke-width="5" fill="none"/>` +
    `<path d="M100,22 Q55,100 100,178" stroke="white" stroke-width="4" fill="none"/>` +
    `<path d="M100,22 Q145,100 100,178" stroke="white" stroke-width="4" fill="none"/>` +
    `<circle cx="100" cy="100" r="78" fill="none" stroke="#c0392b" stroke-width="2"/>`,
  ),

  'image-dog': s(
    `<ellipse cx="63" cy="108" rx="24" ry="44" fill="#c9956c" transform="rotate(-15,63,108)"/>` +
    `<ellipse cx="137" cy="108" rx="24" ry="44" fill="#c9956c" transform="rotate(15,137,108)"/>` +
    `<circle cx="100" cy="100" r="66" fill="#d4a574"/>` +
    `<ellipse cx="79" cy="93" rx="10" ry="11" fill="#1a1a1a"/>` +
    `<ellipse cx="121" cy="93" rx="10" ry="11" fill="#1a1a1a"/>` +
    `<circle cx="82" cy="89" r="3" fill="white"/>` +
    `<circle cx="124" cy="89" r="3" fill="white"/>` +
    `<ellipse cx="100" cy="118" rx="20" ry="14" fill="#bf8c5c"/>` +
    `<ellipse cx="100" cy="120" rx="10" ry="6" fill="#e07b7b"/>` +
    `<ellipse cx="87" cy="110" rx="6" ry="4" fill="#1a1a1a"/>` +
    `<ellipse cx="113" cy="110" rx="6" ry="4" fill="#1a1a1a"/>` +
    `<path d="M90,126 Q100,133 110,126" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  ),

  'image-fish': s(
    `<polygon points="158,58 188,100 158,142" fill="#2471a3"/>` +
    `<ellipse cx="92" cy="100" rx="66" ry="42" fill="#3498db"/>` +
    `<ellipse cx="70" cy="91" rx="11" ry="13" fill="#1a5276"/>` +
    `<circle cx="66" cy="87" r="3.5" fill="white"/>` +
    `<circle cx="66" cy="96" r="2" fill="#1a5276"/>` +
    `<path d="M92,58 Q96,100 92,142" stroke="#2471a3" stroke-width="2.5" fill="none"/>` +
    `<path d="M110,72 Q134,100 110,128" stroke="#2471a3" stroke-width="2" fill="none"/>`,
  ),

  'image-cup': s(
    `<path d="M52,62 L68,162 L132,162 L148,62 Z" fill="#f39c12"/>` +
    `<ellipse cx="100" cy="62" rx="48" ry="13" fill="#f5b942"/>` +
    `<ellipse cx="100" cy="162" rx="38" ry="9" fill="#d68910"/>` +
    `<path d="M148,86 Q178,96 172,126 Q166,148 148,140" stroke="#d68910" stroke-width="12" stroke-linecap="round" fill="none"/>` +
    `<path d="M66,90 Q100,84 134,90" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M70,112 Q100,106 130,112" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.4"/>`,
  ),

  'image-bus': s(
    `<rect x="18" y="68" width="164" height="90" rx="14" fill="#f1c40f"/>` +
    `<rect x="30" y="80" width="35" height="32" rx="5" fill="#aed6f1"/>` +
    `<rect x="72" y="80" width="35" height="32" rx="5" fill="#aed6f1"/>` +
    `<rect x="114" y="80" width="35" height="32" rx="5" fill="#aed6f1"/>` +
    `<rect x="152" y="78" width="22" height="34" rx="3" fill="#f39c12"/>` +
    `<rect x="18" y="115" width="164" height="7" fill="#e6b800"/>` +
    `<circle cx="52" cy="162" r="18" fill="#2c3e50"/>` +
    `<circle cx="52" cy="162" r="10" fill="#7f8c8d"/>` +
    `<circle cx="148" cy="162" r="18" fill="#2c3e50"/>` +
    `<circle cx="148" cy="162" r="10" fill="#7f8c8d"/>` +
    `<rect x="18" y="148" width="6" height="10" rx="3" fill="#e74c3c"/>` +
    `<text x="100" y="148" text-anchor="middle" font-size="12" font-weight="bold" fill="#333" font-family="Arial,sans-serif">SCHOOL BUS</text>`,
  ),

  'image-teacher': s(
    `<circle cx="100" cy="52" r="30" fill="#fad7a0"/>` +
    `<path d="M62,175 Q62,120 100,114 Q138,120 138,175" fill="#3498db"/>` +
    `<rect x="78" y="110" width="44" height="50" rx="4" fill="#2980b9"/>` +
    `<line x1="62" y1="132" x2="78" y2="116" stroke="#fad7a0" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="138" y1="132" x2="122" y2="116" stroke="#fad7a0" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="82" y1="160" x2="82" y2="196" stroke="#1a252f" stroke-width="13" stroke-linecap="round"/>` +
    `<line x1="118" y1="160" x2="118" y2="196" stroke="#1a252f" stroke-width="13" stroke-linecap="round"/>` +
    `<ellipse cx="89" cy="48" rx="5" ry="6" fill="#2d2d2d"/>` +
    `<ellipse cx="111" cy="48" rx="5" ry="6" fill="#2d2d2d"/>` +
    `<path d="M90,62 Q100,68 110,62" stroke="#e74c3c" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<rect x="136" y="104" width="30" height="22" rx="2" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1.5"/>` +
    `<line x1="140" y1="111" x2="163" y2="111" stroke="#95a5a6" stroke-width="2"/>` +
    `<line x1="140" y1="117" x2="163" y2="117" stroke="#95a5a6" stroke-width="2"/>` +
    `<line x1="140" y1="122" x2="158" y2="122" stroke="#95a5a6" stroke-width="2"/>`,
  ),

  'image-book': s(
    `<path d="M100,38 Q56,40 35,54 L35,168 Q56,155 100,158 Z" fill="#3498db"/>` +
    `<path d="M100,38 Q144,40 165,54 L165,168 Q144,155 100,158 Z" fill="#2980b9"/>` +
    `<rect x="96" y="38" width="8" height="120" fill="#f39c12"/>` +
    `<path d="M52,72 Q76,69 96,72" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>` +
    `<path d="M52,85 Q76,82 96,85" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M52,98 Q76,95 96,98" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M52,111 Q76,108 96,111" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M104,72 Q124,69 148,72" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>` +
    `<path d="M104,85 Q124,82 148,85" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M104,98 Q124,95 148,98" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M104,111 Q124,108 148,111" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>`,
  ),

  'image-flower': s(
    `<rect x="94" y="118" width="12" height="66" rx="6" fill="#27ae60"/>` +
    `<path d="M106,152 Q130,138 136,115 Q120,112 106,135 Z" fill="#27ae60"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#ff9ff3"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#ff9ff3" transform="rotate(60,100,100)"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#ff9ff3" transform="rotate(120,100,100)"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#fd79a8" transform="rotate(30,100,100)"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#fd79a8" transform="rotate(90,100,100)"/>` +
    `<ellipse cx="100" cy="68" rx="20" ry="32" fill="#fd79a8" transform="rotate(150,100,100)"/>` +
    `<circle cx="100" cy="100" r="28" fill="#f1c40f"/>` +
    `<circle cx="100" cy="100" r="20" fill="#f39c12"/>` +
    `<circle cx="92" cy="96" r="3" fill="#d68910"/>` +
    `<circle cx="108" cy="96" r="3" fill="#d68910"/>` +
    `<circle cx="100" cy="107" r="3" fill="#d68910"/>`,
  ),

  'image-clock': s(
    `<circle cx="100" cy="100" r="82" fill="#2c3e50"/>` +
    `<circle cx="100" cy="100" r="74" fill="#ecf0f1"/>` +
    `<circle cx="100" cy="100" r="66" fill="white"/>` +
    `<text x="100" y="48" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50" font-family="Arial,sans-serif">12</text>` +
    `<text x="158" y="106" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50" font-family="Arial,sans-serif">3</text>` +
    `<text x="100" y="166" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50" font-family="Arial,sans-serif">6</text>` +
    `<text x="42" y="106" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50" font-family="Arial,sans-serif">9</text>` +
    `<line x1="100" y1="100" x2="100" y2="54" stroke="#2c3e50" stroke-width="5" stroke-linecap="round"/>` +
    `<line x1="100" y1="100" x2="138" y2="100" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="100" cy="100" r="6" fill="#2c3e50"/>` +
    `<rect x="92" y="12" width="16" height="14" rx="4" fill="#2c3e50"/>`,
  ),

  'image-bird': s(
    `<ellipse cx="92" cy="115" rx="56" ry="44" fill="#3498db"/>` +
    `<circle cx="148" cy="82" r="28" fill="#3498db"/>` +
    `<ellipse cx="158" cy="75" rx="8" ry="9" fill="#1a1a1a"/>` +
    `<circle cx="161" cy="72" r="2.5" fill="white"/>` +
    `<path d="M164,82 L182,76 L175,90 Z" fill="#f1c40f"/>` +
    `<path d="M82,90 Q52,56 28,68 Q32,98 82,98 Z" fill="#2980b9"/>` +
    `<path d="M82,98 Q52,78 28,90 Q32,114 82,112 Z" fill="#2471a3"/>` +
    `<path d="M85,135 Q62,162 52,178 L90,156 Z" fill="#2980b9"/>` +
    `<path d="M110,140 Q134,164 148,174 L112,152 Z" fill="#2980b9"/>`,
  ),

  'image-giraffe': s(
    `<rect x="84" y="28" width="22" height="88" rx="11" fill="#f1c40f"/>` +
    `<ellipse cx="95" cy="118" rx="44" ry="52" fill="#f1c40f"/>` +
    `<ellipse cx="95" cy="42" rx="24" ry="22" fill="#f1c40f"/>` +
    `<ellipse cx="82" cy="26" rx="6" ry="11" fill="#f1c40f"/>` +
    `<ellipse cx="108" cy="26" rx="6" ry="11" fill="#f1c40f"/>` +
    `<ellipse cx="82" cy="18" rx="5" ry="6" fill="#d4a017"/>` +
    `<ellipse cx="108" cy="18" rx="5" ry="6" fill="#d4a017"/>` +
    `<ellipse cx="86" cy="38" rx="5" ry="6" fill="#1a1a1a"/>` +
    `<ellipse cx="104" cy="38" rx="5" ry="6" fill="#1a1a1a"/>` +
    `<circle cx="87" cy="35" r="1.5" fill="white"/>` +
    `<circle cx="105" cy="35" r="1.5" fill="white"/>` +
    `<line x1="95" y1="52" x2="95" y2="56" stroke="#d4a017" stroke-width="3" stroke-linecap="round"/>` +
    `<rect x="76" y="170" width="14" height="28" rx="7" fill="#d4a017"/>` +
    `<rect x="98" y="170" width="14" height="28" rx="7" fill="#d4a017"/>` +
    `<rect x="60" y="162" width="12" height="28" rx="6" fill="#d4a017"/>` +
    `<rect x="113" y="162" width="12" height="28" rx="6" fill="#d4a017"/>` +
    `<circle cx="76" cy="105" r="9" fill="#d4a017" opacity="0.8"/>` +
    `<circle cx="113" cy="118" r="8" fill="#d4a017" opacity="0.8"/>` +
    `<circle cx="88" cy="130" r="10" fill="#d4a017" opacity="0.8"/>` +
    `<circle cx="105" cy="98" r="7" fill="#d4a017" opacity="0.8"/>`,
  ),

  'image-piano': s(
    `<rect x="18" y="58" width="164" height="116" rx="8" fill="#1a252f"/>` +
    `<rect x="28" y="70" width="144" height="82" rx="4" fill="white"/>` +
    `<rect x="28" y="70" width="144" height="6" fill="#bdc3c7"/>` +
    `<rect x="30" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="50" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="70" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="90" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="110" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="130" y="76" width="18" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="150" y="76" width="20" height="70" rx="3" fill="white" stroke="#d5d8dc" stroke-width="1"/>` +
    `<rect x="43" y="76" width="12" height="44" rx="3" fill="#1a252f"/>` +
    `<rect x="63" y="76" width="12" height="44" rx="3" fill="#1a252f"/>` +
    `<rect x="103" y="76" width="12" height="44" rx="3" fill="#1a252f"/>` +
    `<rect x="123" y="76" width="12" height="44" rx="3" fill="#1a252f"/>` +
    `<rect x="143" y="76" width="12" height="44" rx="3" fill="#1a252f"/>` +
    `<rect x="28" y="152" width="144" height="8" rx="2" fill="#0d1b2a"/>`,
  ),

  'image-mountain': s(
    `<rect x="0" y="140" width="200" height="70" fill="#a8d8ea"/>` +
    `<polygon points="38,162 120,28 195,162" fill="#85929e"/>` +
    `<polygon points="0,162 72,58 145,162" fill="#95a5a6"/>` +
    `<polygon points="72,58 120,28 160,72" fill="white"/>` +
    `<polygon points="38,72 72,58 90,86" fill="white" opacity="0.8"/>` +
    `<circle cx="158" cy="50" r="22" fill="white" opacity="0.7"/>` +
    `<circle cx="50" cy="82" r="14" fill="white" opacity="0.6"/>`,
  ),
};

export const resolveImageSrc = (imageKey: string | null, label: string | null): string | null => {
  if (!imageKey) return null;
  return IMAGE_ASSETS[imageKey] ?? null;
};
