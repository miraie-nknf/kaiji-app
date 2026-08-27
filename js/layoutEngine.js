// layoutEngine.js - 1〜24枚（特に10〜20枚）の写真と右下コメント欄の自動最適配置エンジン

const LayoutEngine = {
  /**
   * 写真の枚数に応じたグリッド定義とスロット配置を生成
   * @param {number} photoCount 写真の枚数
   * @param {string} layoutStyle 'balanced' (メリハリ配置) または 'uniform' (均等グリッド)
   * @returns {Object} { cols, rows, photoSlots: Array<{colSpan, rowSpan}>, commentSlot: {colStart, colSpan, rowStart, rowSpan} }
   */
  getLayout: function (photoCount, layoutStyle = 'balanced') {
    const count = Math.max(1, photoCount || 1);

    // 均等配置モード
    if (layoutStyle === 'uniform') {
      return this.getUniformLayout(count);
    }

    // メリハリ配置
    return this.getBalancedLayout(count);
  },

  getBalancedLayout: function (count) {
    // 1〜9枚の場合の最適レイアウト（追加中の途中経過でも綺麗に表示）
    if (count === 1) {
      return {
        cols: 1,
        rows: 3,
        commentSlot: { colStart: 1, colSpan: 1, rowStart: 3, rowSpan: 1 },
        photoSlots: [{ colSpan: 1, rowSpan: 2 }]
      };
    }
    if (count === 2) {
      return {
        cols: 2,
        rows: 2,
        commentSlot: { colStart: 2, colSpan: 1, rowStart: 2, rowSpan: 1 },
        photoSlots: [{ colSpan: 2, rowSpan: 1 }, { colSpan: 1, rowSpan: 1 }]
      };
    }
    if (count === 3) {
      return {
        cols: 2,
        rows: 2,
        commentSlot: { colStart: 2, colSpan: 1, rowStart: 2, rowSpan: 1 },
        photoSlots: [
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 }
        ]
      };
    }
    if (count === 4) {
      return {
        cols: 2,
        rows: 3,
        commentSlot: { colStart: 2, colSpan: 1, rowStart: 3, rowSpan: 1 },
        photoSlots: [
          { colSpan: 2, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 }
        ]
      };
    }
    if (count <= 6) {
      return {
        cols: 3,
        rows: 3,
        commentSlot: { colStart: 3, colSpan: 1, rowStart: 3, rowSpan: 1 },
        photoSlots: [
          { colSpan: 2, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 },
          { colSpan: 1, rowSpan: 1 }
        ].slice(0, count)
      };
    }
    if (count <= 9) {
      return {
        cols: 3,
        rows: 4,
        commentSlot: { colStart: 2, colSpan: 2, rowStart: 4, rowSpan: 1 },
        photoSlots: [
          { colSpan: 2, rowSpan: 1 },
          ...Array(count - 1).fill({ colSpan: 1, rowSpan: 1 })
        ]
      };
    }

    // 10〜20枚（メイン要件）
    switch (count) {
      case 10:
        // 4行3列 (12セル) : 1枚目が横長2マス、残り9枚が1マス、右下1マスがコメント欄
        return {
          cols: 3,
          rows: 4,
          commentSlot: { colStart: 3, colSpan: 1, rowStart: 4, rowSpan: 1 },
          photoSlots: [
            { colSpan: 2, rowSpan: 1 }, // 写真1 (上部メイン写真)
            { colSpan: 1, rowSpan: 1 }, // 写真2
            { colSpan: 1, rowSpan: 1 }, // 写真3
            { colSpan: 1, rowSpan: 1 }, // 写真4
            { colSpan: 1, rowSpan: 1 }, // 写真5
            { colSpan: 1, rowSpan: 1 }, // 写真6
            { colSpan: 1, rowSpan: 1 }, // 写真7
            { colSpan: 1, rowSpan: 1 }, // 写真8
            { colSpan: 1, rowSpan: 1 }, // 写真9
            { colSpan: 1, rowSpan: 1 }, // 写真10
          ]
        };

      case 11:
        // 4行3列 (12セル) : 11枚の写真 ＋ 右下1マスがコメント欄
        return {
          cols: 3,
          rows: 4,
          commentSlot: { colStart: 3, colSpan: 1, rowStart: 4, rowSpan: 1 },
          photoSlots: Array(11).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 12:
        // 4行4列 (16セル) : 写真1が横長2マス + 写真6が横長2マス + 他10枚 + 右下4マス(2x2)コメント欄
        return {
          cols: 4,
          rows: 4,
          commentSlot: { colStart: 3, colSpan: 2, rowStart: 3, rowSpan: 2 },
          photoSlots: [
            { colSpan: 2, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 2, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 }
          ]
        };

      case 13:
        // 5行3列 (15セル) : 13枚の写真 ＋ 右下2マス(1x2縦)がコメント欄
        return {
          cols: 3,
          rows: 5,
          commentSlot: { colStart: 3, colSpan: 1, rowStart: 4, rowSpan: 2 },
          photoSlots: Array(13).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 14:
        // 5行3列 (15セル) : 14枚の写真 ＋ 右下1マスがコメント欄
        return {
          cols: 3,
          rows: 5,
          commentSlot: { colStart: 3, colSpan: 1, rowStart: 5, rowSpan: 1 },
          photoSlots: Array(14).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 15:
        // 4行4列 (16セル) : 15枚の写真 ＋ 右下1マスがコメント欄
        return {
          cols: 4,
          rows: 4,
          commentSlot: { colStart: 4, colSpan: 1, rowStart: 4, rowSpan: 1 },
          photoSlots: Array(15).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 16:
        // 5行4列 (20セル) : 16枚の写真 ＋ 右下4マス(2x2)がコメント欄
        return {
          cols: 4,
          rows: 5,
          commentSlot: { colStart: 3, colSpan: 2, rowStart: 4, rowSpan: 2 },
          photoSlots: Array(16).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 17:
        // 5行4列 (20セル) : 1枚目が横長2マス + 16枚(1マス) + 右下2マス(2x1)コメント欄
        return {
          cols: 4,
          rows: 5,
          commentSlot: { colStart: 3, colSpan: 2, rowStart: 5, rowSpan: 1 },
          photoSlots: [
            { colSpan: 2, rowSpan: 1 },
            ...Array(16).fill({ colSpan: 1, rowSpan: 1 })
          ]
        };

      case 18:
        // 5行4列 (20セル) : 18枚の写真 ＋ 右下2マス(2x1)がコメント欄
        return {
          cols: 4,
          rows: 5,
          commentSlot: { colStart: 3, colSpan: 2, rowStart: 5, rowSpan: 1 },
          photoSlots: Array(18).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 19:
        // 5行4列 (20セル) : 19枚の写真 ＋ 右下1マスがコメント欄
        return {
          cols: 4,
          rows: 5,
          commentSlot: { colStart: 4, colSpan: 1, rowStart: 5, rowSpan: 1 },
          photoSlots: Array(19).fill({ colSpan: 1, rowSpan: 1 })
        };

      case 20:
        // 6行4列 (24セル) : 20枚の写真 ＋ 右下4マス(2x2)がゆったりコメント欄
        return {
          cols: 4,
          rows: 6,
          commentSlot: { colStart: 3, colSpan: 2, rowStart: 5, rowSpan: 2 },
          photoSlots: Array(20).fill({ colSpan: 1, rowSpan: 1 })
        };

      default:
        return this.getUniformLayout(count);
    }
  },

  getUniformLayout: function (count) {
    let cols = 3;
    let rows = 4;
    let commentSpan = { colSpan: 1, rowSpan: 1 };

    if (count <= 3) {
      cols = 2;
      rows = 2;
    } else if (count <= 6) {
      cols = 3;
      rows = 3;
    } else if (count <= 11) {
      cols = 3;
      rows = 4;
    } else if (count <= 14) {
      cols = 3;
      rows = 5;
    } else if (count <= 15) {
      cols = 4;
      rows = 4;
    } else if (count <= 19) {
      cols = 4;
      rows = 5;
      if (count <= 18) commentSpan = { colSpan: 2, rowSpan: 1 };
    } else {
      cols = 4;
      rows = 6;
      commentSpan = { colSpan: 2, rowSpan: 2 };
    }

    const colStart = cols - commentSpan.colSpan + 1;
    const rowStart = rows - commentSpan.rowSpan + 1;

    return {
      cols: cols,
      rows: rows,
      commentSlot: {
        colStart: colStart,
        colSpan: commentSpan.colSpan,
        rowStart: rowStart,
        rowSpan: commentSpan.rowSpan
      },
      photoSlots: Array(count).fill({ colSpan: 1, rowSpan: 1 })
    };
  }
};

window.LayoutEngine = LayoutEngine;
