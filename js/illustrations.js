// illustrations.js - クラス名連動SVGイラスト＆水玉ドット装飾フレーム
const Illustrations = {
  // ぱんだ単体
  panda: `
    <svg viewBox="0 0 100 90" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cheekGradPanda" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff9999" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff9999" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- 耳 -->
      <ellipse cx="23" cy="24" rx="14" ry="14" fill="#333333" />
      <ellipse cx="77" cy="24" rx="14" ry="14" fill="#333333" />
      <!-- 顔の輪郭 -->
      <ellipse cx="50" cy="48" rx="40" ry="34" fill="#ffffff" stroke="#333333" stroke-width="3" />
      <!-- 目の周りの黒模様 -->
      <ellipse cx="33" cy="45" rx="11" ry="14" fill="#333333" transform="rotate(-15 33 45)" />
      <ellipse cx="67" cy="45" rx="11" ry="14" fill="#333333" transform="rotate(15 67 45)" />
      <!-- 目の中の白い光 -->
      <ellipse cx="34" cy="42" rx="4" ry="5" fill="#ffffff" />
      <ellipse cx="66" cy="42" rx="4" ry="5" fill="#ffffff" />
      <ellipse cx="36" cy="46" rx="1.5" ry="1.5" fill="#ffffff" />
      <ellipse cx="64" cy="46" rx="1.5" ry="1.5" fill="#ffffff" />
      <!-- ほっぺ -->
      <circle cx="21" cy="56" r="8" fill="url(#cheekGradPanda)" />
      <circle cx="79" cy="56" r="8" fill="url(#cheekGradPanda)" />
      <!-- 鼻 -->
      <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#333333" />
      <!-- 口 -->
      <path d="M 45 58 Q 50 63 55 58" fill="none" stroke="#333333" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 50 53 L 50 59" stroke="#333333" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,

  // きりん単体
  giraffe: `
    <svg viewBox="0 0 100 110" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cheekGradGiraffe" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff8da1" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff8da1" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- 首 -->
      <path d="M 40 70 L 38 105 L 62 105 L 60 70 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
      <!-- 首の模様 -->
      <rect x="42" y="78" width="8" height="6" rx="2" fill="#d97706" opacity="0.85"/>
      <rect x="52" y="90" width="7" height="6" rx="2" fill="#d97706" opacity="0.85"/>
      <!-- 角（つの） -->
      <line x1="38" y1="28" x2="33" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      <circle cx="32" cy="11" r="5.5" fill="#d97706"/>
      <line x1="62" y1="28" x2="67" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
      <circle cx="68" cy="11" r="5.5" fill="#d97706"/>
      <!-- 耳 -->
      <ellipse cx="22" cy="36" rx="10" ry="5" fill="#ffcc33" stroke="#e09900" stroke-width="2" transform="rotate(-30 22 36)"/>
      <ellipse cx="22" cy="36" rx="6" ry="2.5" fill="#ffaa44" transform="rotate(-30 22 36)"/>
      <ellipse cx="78" cy="36" rx="10" ry="5" fill="#ffcc33" stroke="#e09900" stroke-width="2" transform="rotate(30 78 36)"/>
      <ellipse cx="78" cy="36" rx="6" ry="2.5" fill="#ffaa44" transform="rotate(30 78 36)"/>
      <!-- 頭部 -->
      <path d="M 32 30 C 25 45, 26 62, 36 72 C 45 77, 55 77, 64 72 C 74 62, 75 45, 68 30 C 62 25, 38 25, 32 30 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
      <!-- 鼻口エリア -->
      <ellipse cx="50" cy="65" rx="15" ry="9" fill="#ffe680"/>
      <ellipse cx="44" cy="63" rx="2.5" ry="1.5" fill="#a05a00"/>
      <ellipse cx="56" cy="63" rx="2.5" ry="1.5" fill="#a05a00"/>
      <path d="M 46 68 Q 50 71 54 68" fill="none" stroke="#a05a00" stroke-width="2" stroke-linecap="round"/>
      <!-- 目 -->
      <ellipse cx="38" cy="46" rx="4" ry="5" fill="#333333"/>
      <ellipse cx="62" cy="46" rx="4" ry="5" fill="#333333"/>
      <circle cx="39" cy="44" r="1.5" fill="#ffffff"/>
      <circle cx="63" cy="44" r="1.5" fill="#ffffff"/>
      <!-- まつ毛 -->
      <path d="M 35 42 L 32 40" stroke="#333333" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 65 42 L 68 40" stroke="#333333" stroke-width="1.5" stroke-linecap="round"/>
      <!-- ほっぺ -->
      <circle cx="28" cy="54" r="6" fill="url(#cheekGradGiraffe)"/>
      <circle cx="72" cy="54" r="6" fill="url(#cheekGradGiraffe)"/>
    </svg>
  `,

  // ぞう単体
  elephant: `
    <svg viewBox="0 0 110 90" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cheekGradEle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff99bb" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff99bb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- 大きな耳 -->
      <ellipse cx="25" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
      <ellipse cx="25" cy="42" rx="12" ry="15" fill="#bfdbfe" />
      <ellipse cx="85" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
      <ellipse cx="85" cy="42" rx="12" ry="15" fill="#bfdbfe" />
      <!-- 頭部 -->
      <circle cx="55" cy="44" r="30" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
      <!-- 目 -->
      <ellipse cx="44" cy="40" rx="3.5" ry="4.5" fill="#333333" />
      <ellipse cx="66" cy="40" rx="3.5" ry="4.5" fill="#333333" />
      <circle cx="45" cy="38" r="1.3" fill="#ffffff" />
      <circle cx="67" cy="38" r="1.3" fill="#ffffff" />
      <!-- ほっぺ -->
      <circle cx="36" cy="48" r="6" fill="url(#cheekGradEle)" />
      <circle cx="74" cy="48" r="6" fill="url(#cheekGradEle)" />
      <!-- 鼻（くるんと上向き） -->
      <path d="M 51 47 C 51 60, 48 68, 55 72 C 60 75, 65 72, 66 65 C 67 62, 63 60, 60 62" fill="none" stroke="#60a5fa" stroke-width="7" stroke-linecap="round" />
      <path d="M 51 47 C 51 60, 48 68, 55 72 C 60 75, 65 72, 66 65 C 67 62, 63 60, 60 62" fill="none" stroke="#93c5fd" stroke-width="4.5" stroke-linecap="round" />
      <!-- 水滴ピシャピシャ -->
      <ellipse cx="68" cy="52" rx="2" ry="3" fill="#38bdf8" transform="rotate(30 68 52)"/>
      <ellipse cx="73" cy="59" rx="1.5" ry="2.5" fill="#38bdf8" transform="rotate(60 73 59)"/>
    </svg>
  `,

  // きりん＆ぞう
  kirinzou: `
    <svg viewBox="0 0 150 90" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cheekKz1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff8da1" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff8da1" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="cheekKz2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff99bb" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff99bb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- きりん (左側) -->
      <g transform="translate(5, -5) scale(0.72)">
        <path d="M 40 70 L 38 105 L 62 105 L 60 70 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
        <rect x="42" y="78" width="8" height="6" rx="2" fill="#d97706" opacity="0.85"/>
        <rect x="52" y="90" width="7" height="6" rx="2" fill="#d97706" opacity="0.85"/>
        <line x1="38" y1="28" x2="33" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <circle cx="32" cy="11" r="5.5" fill="#d97706"/>
        <line x1="62" y1="28" x2="67" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <circle cx="68" cy="11" r="5.5" fill="#d97706"/>
        <ellipse cx="22" cy="36" rx="10" ry="5" fill="#ffcc33" stroke="#e09900" stroke-width="2" transform="rotate(-30 22 36)"/>
        <ellipse cx="78" cy="36" rx="10" ry="5" fill="#ffcc33" stroke="#e09900" stroke-width="2" transform="rotate(30 78 36)"/>
        <path d="M 32 30 C 25 45, 26 62, 36 72 C 45 77, 55 77, 64 72 C 74 62, 75 45, 68 30 C 62 25, 38 25, 32 30 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
        <ellipse cx="50" cy="65" rx="15" ry="9" fill="#ffe680"/>
        <ellipse cx="44" cy="63" rx="2.5" ry="1.5" fill="#a05a00"/>
        <ellipse cx="56" cy="63" rx="2.5" ry="1.5" fill="#a05a00"/>
        <path d="M 46 68 Q 50 71 54 68" fill="none" stroke="#a05a00" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="38" cy="46" rx="4" ry="5" fill="#333333"/>
        <ellipse cx="62" cy="46" rx="4" ry="5" fill="#333333"/>
        <circle cx="39" cy="44" r="1.5" fill="#ffffff"/>
        <circle cx="63" cy="44" r="1.5" fill="#ffffff"/>
        <circle cx="28" cy="54" r="6" fill="url(#cheekKz1)"/>
        <circle cx="72" cy="54" r="6" fill="url(#cheekKz1)"/>
      </g>
      <!-- ぞう (右側) -->
      <g transform="translate(68, 5) scale(0.72)">
        <ellipse cx="25" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <ellipse cx="25" cy="42" rx="12" ry="15" fill="#bfdbfe" />
        <ellipse cx="85" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <ellipse cx="85" cy="42" rx="12" ry="15" fill="#bfdbfe" />
        <circle cx="55" cy="44" r="30" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <ellipse cx="44" cy="40" rx="3.5" ry="4.5" fill="#333333" />
        <ellipse cx="66" cy="40" rx="3.5" ry="4.5" fill="#333333" />
        <circle cx="45" cy="38" r="1.3" fill="#ffffff" />
        <circle cx="67" cy="38" r="1.3" fill="#ffffff" />
        <circle cx="36" cy="48" r="6" fill="url(#cheekKz2)" />
        <circle cx="74" cy="48" r="6" fill="url(#cheekKz2)" />
        <path d="M 51 47 C 51 60, 48 68, 55 72 C 60 75, 65 72, 66 65 C 67 62, 63 60, 60 62" fill="none" stroke="#60a5fa" stroke-width="7" stroke-linecap="round" />
        <path d="M 51 47 C 51 60, 48 68, 55 72 C 60 75, 65 72, 66 65 C 67 62, 63 60, 60 62" fill="none" stroke="#93c5fd" stroke-width="4.5" stroke-linecap="round" />
        <ellipse cx="68" cy="52" rx="2" ry="3" fill="#38bdf8" transform="rotate(30 68 52)"/>
        <ellipse cx="73" cy="59" rx="1.5" ry="2.5" fill="#38bdf8" transform="rotate(60 73 59)"/>
      </g>
    </svg>
  `,

  // ぱんだ＆きりん＆ぞう（3匹なかよし）
  pandakirinzou: `
    <svg viewBox="0 0 190 90" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <!-- ぱんだ (左) -->
      <g transform="translate(0, 8) scale(0.68)">
        <ellipse cx="23" cy="24" rx="14" ry="14" fill="#333333" />
        <ellipse cx="77" cy="24" rx="14" ry="14" fill="#333333" />
        <ellipse cx="50" cy="48" rx="40" ry="34" fill="#ffffff" stroke="#333333" stroke-width="3" />
        <ellipse cx="33" cy="45" rx="11" ry="14" fill="#333333" transform="rotate(-15 33 45)" />
        <ellipse cx="67" cy="45" rx="11" ry="14" fill="#333333" transform="rotate(15 67 45)" />
        <ellipse cx="34" cy="42" rx="4" ry="5" fill="#ffffff" />
        <ellipse cx="66" cy="42" rx="4" ry="5" fill="#ffffff" />
        <circle cx="21" cy="56" r="8" fill="#ffb3ba" />
        <circle cx="79" cy="56" r="8" fill="#ffb3ba" />
        <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#333333" />
        <path d="M 45 58 Q 50 63 55 58" fill="none" stroke="#333333" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- きりん (中央) -->
      <g transform="translate(58, -4) scale(0.66)">
        <path d="M 40 70 L 38 105 L 62 105 L 60 70 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
        <line x1="38" y1="28" x2="33" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <circle cx="32" cy="11" r="5.5" fill="#d97706"/>
        <line x1="62" y1="28" x2="67" y2="12" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
        <circle cx="68" cy="11" r="5.5" fill="#d97706"/>
        <path d="M 32 30 C 25 45, 26 62, 36 72 C 45 77, 55 77, 64 72 C 74 62, 75 45, 68 30 C 62 25, 38 25, 32 30 Z" fill="#ffcc33" stroke="#e09900" stroke-width="2.5"/>
        <ellipse cx="50" cy="65" rx="15" ry="9" fill="#ffe680"/>
        <ellipse cx="38" cy="46" rx="4" ry="5" fill="#333333"/>
        <ellipse cx="62" cy="46" rx="4" ry="5" fill="#333333"/>
        <circle cx="28" cy="54" r="6" fill="#ffb3ba"/>
        <circle cx="72" cy="54" r="6" fill="#ffb3ba"/>
      </g>
      <!-- ぞう (右) -->
      <g transform="translate(116, 8) scale(0.66)">
        <ellipse cx="25" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <ellipse cx="85" cy="42" rx="18" ry="22" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <circle cx="55" cy="44" r="30" fill="#93c5fd" stroke="#60a5fa" stroke-width="2.5" />
        <ellipse cx="44" cy="40" rx="3.5" ry="4.5" fill="#333333" />
        <ellipse cx="66" cy="40" rx="3.5" ry="4.5" fill="#333333" />
        <circle cx="36" cy="48" r="6" fill="#ffb3ba" />
        <circle cx="74" cy="48" r="6" fill="#ffb3ba" />
        <path d="M 51 47 C 51 60, 48 68, 55 72 C 60 75, 65 72, 66 65 C 67 62, 63 60, 60 62" fill="none" stroke="#60a5fa" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,

  // カラフルな水玉ドット装飾（コメント欄の上部・周りの飾り）
  dotDecoration: `
    <div class="flex items-center justify-center gap-1.5 py-1 px-2 overflow-hidden opacity-90 select-none">
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
    </div>
  `
};

window.Illustrations = Illustrations;
