// illustrations.js - クラス名連動イラスト（PNG画像対応）＆水玉ドット装飾フレーム

const Illustrations = {
  // 画像パス定義
  images: {
    panda: 'panda.png',
    giraffe: 'kirin.png',
    elephant: 'zou.png'
  },

  /**
   * クラス名に応じた画像HTMLを生成
   * @param {string} className 'ぱんだ', 'きりん', 'ぞう', 'きりんぞう', 'ぱんだきりんぞう'
   * @returns {string} HTML文字列
   */
  getImageHtml: function(className) {
    switch (className) {
      case 'ぱんだ':
        return `
          <img src="${this.images.panda}" alt="ぱんだ" class="h-full w-auto max-w-full object-contain drop-shadow-sm select-none pointer-events-none" />
        `;
      case 'きりん':
        return `
          <img src="${this.images.giraffe}" alt="きりん" class="h-full w-auto max-w-full object-contain drop-shadow-sm select-none pointer-events-none" />
        `;
      case 'ぞう':
        return `
          <img src="${this.images.elephant}" alt="ぞう" class="h-full w-auto max-w-full object-contain drop-shadow-sm select-none pointer-events-none" />
        `;
      case 'きりんぞう':
        return `
          <div class="flex items-center justify-center gap-2 h-full w-full">
            <img src="${this.images.giraffe}" alt="きりん" class="h-full w-auto max-w-[48%] object-contain drop-shadow-sm select-none pointer-events-none" />
            <img src="${this.images.elephant}" alt="ぞう" class="h-full w-auto max-w-[48%] object-contain drop-shadow-sm select-none pointer-events-none" />
          </div>
        `;
      case 'ぱんだきりんぞう':
        return `
          <div class="flex items-center justify-center gap-1.5 h-full w-full">
            <img src="${this.images.panda}" alt="ぱんだ" class="h-full w-auto max-w-[32%] object-contain drop-shadow-sm select-none pointer-events-none" />
            <img src="${this.images.giraffe}" alt="きりん" class="h-full w-auto max-w-[32%] object-contain drop-shadow-sm select-none pointer-events-none" />
            <img src="${this.images.elephant}" alt="ぞう" class="h-full w-auto max-w-[32%] object-contain drop-shadow-sm select-none pointer-events-none" />
          </div>
        `;
      default:
        return `
          <img src="${this.images.panda}" alt="ぱんだ" class="h-full w-auto max-w-full object-contain drop-shadow-sm select-none pointer-events-none" />
        `;
    }
  },

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
