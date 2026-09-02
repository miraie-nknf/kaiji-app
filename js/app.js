// app.js - メインアプリケーションロジック (iPad/iPhone完全対応 & コメントモーダル入力完備版)

class DaycareReportApp {
  constructor() {
    this.state = {
      formType: 'form1', // 'form1' (標準) or 'form2' (吹き出し)
      className: 'ぱんだ', // ぱんだ, きりん, ぞう, きりんぞう, ぱんだきりんぞう
      dateString: this.formatDate(new Date()),
      photos: [], // Array of { id, url, name, objectPosition: 'center center' }
      comment: '',
      layoutStyle: 'balanced', // 'balanced' or 'uniform'
    };

    this.saveTimeout = null;
    this.init();
  }

  async init() {
    this.initElements();
    this.initEventListeners();
    this.initModalListeners();
    
    // IndexedDBから前回保存されたデータを復元
    await this.restoreSavedState();
    
    this.render();
  }

  // 日付フォーマット: △月×日(曜日)
  formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    return `${month}月${day}日(${weekday})`;
  }

  initElements() {
    // 操作パネル要素
    this.formTypeSelect = document.getElementById('form-type-select');
    this.classSelect = document.getElementById('class-select');
    this.datePicker = document.getElementById('date-picker');
    this.dateTextInput = document.getElementById('date-text-input');
    this.photoInput = document.getElementById('photo-input');
    this.btnUpload = document.getElementById('btn-upload');
    this.btnDemoData = document.getElementById('btn-demo-data');
    this.btnClear = document.getElementById('btn-clear');
    this.btnLayoutToggle = document.getElementById('btn-layout-toggle');
    this.btnPrint = document.getElementById('btn-print');
    this.btnDownloadPdf = document.getElementById('btn-download-pdf');
    this.photoCountBadge = document.getElementById('photo-count-badge');

    // A4 プレビュー要素
    this.a4PageContainer = document.getElementById('a4-page-container');
    this.a4Sheet = document.getElementById('a4-sheet');
    this.a4Header = document.getElementById('a4-header');
    this.a4Grid = document.getElementById('a4-grid');

    // コメント編集モーダル要素
    this.commentModal = document.getElementById('comment-modal');
    this.modalTextarea = document.getElementById('modal-comment-textarea');
    this.modalCharCount = document.getElementById('modal-char-count');
    this.btnCloseModal = document.getElementById('btn-close-modal');
    this.btnSaveComment = document.getElementById('btn-save-comment');

    // 日付ピッカー初期値（YYYY-MM-DD）
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    if (this.datePicker) this.datePicker.value = `${yyyy}-${mm}-${dd}`;
  }

  initEventListeners() {
    // デザイン（フォーム1 / フォーム2）選択
    this.formTypeSelect?.addEventListener('change', (e) => {
      this.state.formType = e.target.value;
      this.renderHeader();
      this.autoSave();
    });

    // クラス選択
    this.classSelect?.addEventListener('change', (e) => {
      this.state.className = e.target.value;
      this.renderHeader();
      this.autoSave();
    });

    // 日付ピッカー変更
    this.datePicker?.addEventListener('change', (e) => {
      if (e.target.value) {
        const [y, m, d] = e.target.value.split('-');
        const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
        const formatted = this.formatDate(date);
        this.state.dateString = formatted;
        if (this.dateTextInput) this.dateTextInput.value = formatted;
        this.renderHeader();
        this.autoSave();
      }
    });

    // 日付手動入力
    this.dateTextInput?.addEventListener('input', (e) => {
      this.state.dateString = e.target.value;
      this.renderHeader();
      this.autoSave();
    });

    // 写真アップロードトリガー
    this.btnUpload?.addEventListener('click', (e) => {
      e.preventDefault();
      this.photoInput?.click();
    });

    // 写真ファイル選択（iPad写真アプリから複数選択）
    this.photoInput?.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files.length > 0) {
        await this.handlePhotoUpload(e.target.files);
      }
      e.target.value = ''; // 次回同じファイルを選べるようにリセット
    });

    // A4シートへのファイルドラッグ＆ドロップ対応
    if (this.a4PageContainer) {
      ['dragenter', 'dragover'].forEach(eventName => {
        this.a4PageContainer.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.a4PageContainer.classList.add('ring-4', 'ring-orange-400');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        this.a4PageContainer.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.a4PageContainer.classList.remove('ring-4', 'ring-orange-400');
        }, false);
      });

      this.a4PageContainer.addEventListener('drop', async (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          await this.handlePhotoUpload(dt.files);
        }
      });
    }

    // レイアウトスタイル切替
    this.btnLayoutToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      this.state.layoutStyle = this.state.layoutStyle === 'balanced' ? 'uniform' : 'balanced';
      this.btnLayoutToggle.textContent = this.state.layoutStyle === 'balanced' ? '✨ メリハリ' : '📐 均等';
      this.renderGrid();
      this.autoSave();
    });

    // デモデータ読み込み
    this.btnDemoData?.addEventListener('click', (e) => {
      e.preventDefault();
      this.loadDemoData();
    });

    // 全クリア（ユーザーが明示的に押した時のみ初期化）
    this.btnClear?.addEventListener('click', async (e) => {
      e.preventDefault();
      if (confirm('写真とコメントをクリアしますか？')) {
        this.state.photos = [];
        this.state.comment = '';
        await AppStorage.clearState();
        this.render();
      }
    });

    // 印刷 (AirPrint) - 画面の再読み込みやデータ消失を防止
    this.btnPrint?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.autoSave();
      PdfExporter.printA4();
    });

    // PDFダウンロード
    this.btnDownloadPdf?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.autoSave();
      const filename = `${this.getTitleText()}_${this.state.dateString}.pdf`;
      PdfExporter.downloadPdf('a4-sheet', filename);
    });
  }

  // コメント編集モーダルの初期化（iPad/iPhoneで確実にキーボードを呼び出す）
  initModalListeners() {
    if (!this.commentModal) return;

    // モーダル内の文字数カウント
    this.modalTextarea?.addEventListener('input', (e) => {
      if (this.modalCharCount) {
        this.modalCharCount.textContent = `${e.target.value.length} 文字`;
      }
    });

    // 完了ボタン
    this.btnSaveComment?.addEventListener('click', () => {
      this.saveModalComment();
    });

    // 閉じるボタン
    this.btnCloseModal?.addEventListener('click', () => {
      this.saveModalComment();
    });

    // モーダル背景タップで保存＆閉じる
    this.commentModal.addEventListener('click', (e) => {
      if (e.target === this.commentModal) {
        this.saveModalComment();
      }
    });
  }

  // モーダルを開く
  openCommentModal() {
    if (!this.commentModal || !this.modalTextarea) return;
    this.modalTextarea.value = this.state.comment || '';
    if (this.modalCharCount) {
      this.modalCharCount.textContent = `${this.modalTextarea.value.length} 文字`;
    }
    this.commentModal.classList.remove('hidden');
    
    // iPadで確実にキーボードを表示
    setTimeout(() => {
      this.modalTextarea.focus();
    }, 80);
  }

  // モーダルの内容を反映して閉じる
  saveModalComment() {
    if (!this.commentModal || !this.modalTextarea) return;
    this.state.comment = this.modalTextarea.value;
    this.commentModal.classList.add('hidden');
    
    // A4プレビュー上のテキストエリアを更新
    const a4Textarea = document.querySelector('.comment-box textarea');
    if (a4Textarea) {
      a4Textarea.value = this.state.comment;
      this.adjustCommentFontSize(a4Textarea);
    }
    this.autoSave();
  }

  // 編集内容の自動保存（IndexedDBに安全に保存）
  autoSave() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(async () => {
      await AppStorage.saveState(this.state);
    }, 150);
  }

  // 保存されたデータの復元
  async restoreSavedState() {
    const saved = await AppStorage.loadState();
    if (saved) {
      if (saved.formType) this.state.formType = saved.formType;
      if (saved.className) this.state.className = saved.className;
      if (saved.dateString) this.state.dateString = saved.dateString;
      if (Array.isArray(saved.photos)) this.state.photos = saved.photos;
      if (typeof saved.comment === 'string') this.state.comment = saved.comment;
      if (saved.layoutStyle) this.state.layoutStyle = saved.layoutStyle;

      // UIコントロールの同期
      if (this.formTypeSelect) this.formTypeSelect.value = this.state.formType;
      if (this.classSelect) this.classSelect.value = this.state.className;
      if (this.dateTextInput) this.dateTextInput.value = this.state.dateString;
      if (this.btnLayoutToggle) {
        this.btnLayoutToggle.textContent = this.state.layoutStyle === 'balanced' ? '✨ メリハリ' : '📐 均等';
      }
    }
  }

  // クラス名表記の取得（すべてひらがな表記）
  getTitleText() {
    switch (this.state.className) {
      case 'ぱんだ':
        return 'ぱんだぐみ 今日の活動';
      case 'きりん':
        return 'きりんぐみ 今日の活動';
      case 'ぞう':
        return 'ぞうぐみ 今日の活動';
      case 'きりんぞう':
        return 'きりん・ぞうぐみ 今日の活動';
      case 'ぱんだきりんぞう':
        return 'ぱんだ・きりん・ぞうぐみ 今日の活動';
      default:
        return `${this.state.className}ぐみ 今日の活動`;
    }
  }

  // 写真ファイル群の処理（自動リサイズ＆DataURL化で印刷後も永続保持）
  async handlePhotoUpload(files) {
    if (!files || files.length === 0) return;

    // ローディング表示
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      const textSpan = loadingOverlay.querySelector('span');
      if (textSpan) textSpan.textContent = '写真を読み込み中...';
      loadingOverlay.classList.remove('hidden');
    }

    const fileArray = Array.from(files);
    const newPhotos = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      if (!file.type || file.type.startsWith('image/') || file.name.match(/\.(jpe?g|png|heic|heif|webp|gif)$/i)) {
        try {
          const optimizedDataUrl = await this.optimizeImage(file);
          if (optimizedDataUrl) {
            newPhotos.push({
              id: 'photo_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substring(2, 7),
              url: optimizedDataUrl,
              name: file.name || `写真 ${i + 1}`,
              objectPosition: 'center center'
            });
          }
        } catch (e) {
          console.error('画像最適化失敗:', file.name, e);
        }
      }
    }

    if (loadingOverlay) loadingOverlay.classList.add('hidden');

    if (newPhotos.length > 0) {
      this.state.photos = [...this.state.photos, ...newPhotos];
      this.render();
      this.autoSave();
    }
  }

  // 画像の最適化（A4高画質300DPI相当を維持しつつメモリ負荷を大幅軽減）
  optimizeImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600; // A4写真グリッドに最適な解像度
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 高画質JPEGとしてBase64 DataURL化
          resolve(canvas.toDataURL('image/jpeg', 0.88));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  // デモデータ読み込み
  loadDemoData() {
    this.state.className = 'きりんぞう';
    if (this.classSelect) this.classSelect.value = 'きりんぞう';
    this.state.dateString = '8月26日(木)';
    if (this.dateTextInput) this.dateTextInput.value = '8月26日(木)';

    const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb7185', '#a3e635', '#34d399'];
    const activities = ['プール遊び♪', 'お面作り', 'ヨーヨー釣り', '水鉄砲合戦', 'お絵描き', '粘土あそび', 'かけっこ', 'お歌の時間', 'しゃぼん玉', '積み木遊び', 'みんなで手をつなごう', 'おいしい給食'];

    this.state.photos = colors.map((color, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 450;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 600, 450);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(80 + i * 90, 60 + (i % 2) * 50, 25, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`写真 ${idx + 1}: ${activities[idx]}`, 300, 225);
      
      return {
        id: 'demo_' + idx,
        url: canvas.toDataURL('image/jpeg', 0.85),
        name: `photo_${idx + 1}.jpg`,
        objectPosition: 'center center'
      };
    });

    this.state.comment = '今日は3人のスペシャルゲストと一緒に、夏祭りで使うお面とヨーヨーの制作をしました！お面では自分の担当のお店の絵や文字を書いています。ぜひ当日はオリジナルお面にも注目してくださいね♪\nヨーヨーではマスキングテープやシールを貼って飾り付け！コツが分かるととても上手に貼ることが出来ました☆その後は希望制で水遊びと室内遊びに分かれて遊んでいます！';

    this.render();
    this.autoSave();
  }

  // フォーム1のヘッダーHTML生成（標準デザイン：左イラスト・タイトル・右日付・下線）
  renderHeaderForm1() {
    const title = this.getTitleText();
    const date = this.state.dateString;
    const imageHtml = Illustrations.getImageHtml(this.state.className);

    return `
      <div class="header-form1">
        <div class="flex items-center gap-1.5 sm:gap-3 md:gap-4 h-full min-w-0">
          <div class="class-icon-slot flex items-center justify-center shrink-0">
            ${imageHtml}
          </div>
          <h1 class="report-title-text font-black tracking-tight text-slate-800 select-none">
            ${title}
          </h1>
        </div>
        <div class="report-date-text flex items-center font-bold tracking-tight text-slate-800 select-none shrink-0 pl-1 sm:pl-2">
          <span>${date}</span>
        </div>
      </div>
    `;
  }

  // フォーム2のヘッダーHTML生成（吹き出しデザイン：左吹き出しタイトル・右イラスト・右下日付）
  renderHeaderForm2() {
    const title = this.getTitleText();
    const date = this.state.dateString;
    const imageHtml = Illustrations.getImageHtml(this.state.className);

    return `
      <div class="header-form2">
        <!-- 左側：吹き出しタイトル -->
        <div class="speech-bubble flex-1 flex items-center justify-center mr-1.5 sm:mr-3 min-w-0">
          <h1 class="report-title-text font-black text-slate-800 tracking-wide text-center select-none truncate">
            ${title}
          </h1>
          <div class="speech-tail"></div>
        </div>
        <!-- 右側：動物イラスト ＆ 日付 -->
        <div class="header-right-side flex flex-col items-center justify-center shrink-0">
          <div class="class-icon-slot flex items-center justify-center">
            ${imageHtml}
          </div>
          <div class="report-date-text font-bold tracking-tight text-slate-800 text-center select-none">
            ${date}
          </div>
        </div>
      </div>
    `;
  }

  // ヘッダーの描画（フォームタイプに応じて切り替え）
  renderHeader() {
    if (!this.a4Header) return;
    if (this.state.formType === 'form2') {
      this.a4Header.innerHTML = this.renderHeaderForm2();
    } else {
      this.a4Header.innerHTML = this.renderHeaderForm1();
    }
  }

  // メインのグリッド描画
  renderGrid() {
    if (!this.a4Grid) return;
    this.a4Grid.innerHTML = '';

    const photoCount = this.state.photos.length;
    if (this.photoCountBadge) {
      this.photoCountBadge.textContent = `${photoCount}枚 (推奨 10〜20枚)`;
      if (photoCount >= 10 && photoCount <= 20) {
        this.photoCountBadge.className = 'text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-700';
      } else if (photoCount === 0) {
        this.photoCountBadge.className = 'text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 text-slate-600';
      } else {
        this.photoCountBadge.className = 'text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-700';
      }
    }

    // 写真が0枚の時の空状態ガイダンス
    if (photoCount === 0) {
      this.a4Grid.style.gridTemplateColumns = '1fr';
      this.a4Grid.style.gridTemplateRows = '1fr';
      this.a4Grid.innerHTML = `
        <div class="flex flex-col items-center justify-center p-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/60 no-print cursor-pointer" onclick="document.getElementById('btn-upload').click()">
          <svg class="w-16 h-16 mb-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p class="text-base font-bold text-slate-600 mb-1">写真がまだ追加されていません</p>
          <p class="text-xs text-slate-400 mb-4">写真アプリから10〜20枚の写真を選択してください</p>
          <button class="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md text-sm transition">
            📷 写真を追加する
          </button>
        </div>
      `;
      return;
    }

    // レイアウト定義を取得
    const layout = LayoutEngine.getLayout(photoCount, this.state.layoutStyle);

    // CSS Gridの行・列を設定
    this.a4Grid.style.gridTemplateColumns = `repeat(${layout.cols}, minmax(0, 1fr))`;
    this.a4Grid.style.gridTemplateRows = `repeat(${layout.rows}, minmax(0, 1fr))`;

    // 写真スロットの生成
    this.state.photos.forEach((photo, index) => {
      const slotDef = layout.photoSlots[index] || { colSpan: 1, rowSpan: 1 };
      const slotEl = this.createPhotoSlotElement(photo, index, slotDef);
      this.a4Grid.appendChild(slotEl);
    });

    // コメントボックスの生成（右下に配置）
    const commentEl = this.createCommentBoxElement(layout.commentSlot);
    this.a4Grid.appendChild(commentEl);
  }

  // 写真スロット要素の作成
  createPhotoSlotElement(photo, index, slotDef) {
    const slot = document.createElement('div');
    slot.className = 'photo-slot group';
    slot.style.gridColumn = `span ${slotDef.colSpan}`;
    slot.style.gridRow = `span ${slotDef.rowSpan}`;
    slot.dataset.index = index;

    // 画像
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = `写真 ${index + 1}`;
    img.style.objectPosition = photo.objectPosition || 'center center';
    slot.appendChild(img);

    // 並び順バッジ
    const badge = document.createElement('div');
    badge.className = 'index-badge';
    badge.textContent = index + 1;
    slot.appendChild(badge);

    // 操作ツールバー
    const actions = document.createElement('div');
    actions.className = 'slot-actions no-print';

    // 左へ移動
    if (index > 0) {
      const btnLeft = document.createElement('button');
      btnLeft.className = 'slot-action-btn';
      btnLeft.title = '前へ';
      btnLeft.innerHTML = '◀';
      btnLeft.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.swapPhotos(index, index - 1);
      };
      actions.appendChild(btnLeft);
    }

    // 右へ移動
    if (index < this.state.photos.length - 1) {
      const btnRight = document.createElement('button');
      btnRight.className = 'slot-action-btn';
      btnRight.title = '次へ';
      btnRight.innerHTML = '▶';
      btnRight.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.swapPhotos(index, index + 1);
      };
      actions.appendChild(btnRight);
    }

    // 位置微調整（上・中央・下）
    const btnPos = document.createElement('button');
    btnPos.className = 'slot-action-btn';
    btnPos.title = '位置調整';
    btnPos.innerHTML = '↕';
    btnPos.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.cyclePhotoPosition(index);
    };
    actions.appendChild(btnPos);

    // 削除
    const btnDel = document.createElement('button');
    btnDel.className = 'slot-action-btn text-rose-300 hover:text-rose-100';
    btnDel.title = '削除';
    btnDel.innerHTML = '✕';
    btnDel.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.deletePhoto(index);
    };
    actions.appendChild(btnDel);

    slot.appendChild(actions);

    // ドラッグ＆ドロップ対応（デスクトップ）
    slot.draggable = true;
    slot.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index);
    });

    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      if (!isNaN(fromIndex) && fromIndex !== index) {
        this.movePhoto(fromIndex, index);
      }
    });

    // タッチデバイス用トグル
    slot.addEventListener('click', () => {
      document.querySelectorAll('.photo-slot').forEach(s => s.classList.remove('touch-active'));
      slot.classList.add('touch-active');
    });

    return slot;
  }

  // 写真の入れ替え
  swapPhotos(i, j) {
    const temp = this.state.photos[i];
    this.state.photos[i] = this.state.photos[j];
    this.state.photos[j] = temp;
    this.renderGrid();
    this.autoSave();
  }

  // 写真の移動
  movePhoto(fromIndex, toIndex) {
    const photo = this.state.photos.splice(fromIndex, 1)[0];
    this.state.photos.splice(toIndex, 0, photo);
    this.renderGrid();
    this.autoSave();
  }

  // 写真の位置調整
  cyclePhotoPosition(index) {
    const photo = this.state.photos[index];
    const positions = ['center top', 'center center', 'center bottom'];
    const currentIdx = positions.indexOf(photo.objectPosition || 'center center');
    const nextIdx = (currentIdx + 1) % positions.length;
    photo.objectPosition = positions[nextIdx];
    this.renderGrid();
    this.autoSave();
  }

  // 写真削除
  deletePhoto(index) {
    this.state.photos.splice(index, 1);
    this.renderGrid();
    this.autoSave();
  }

  // コメントボックスの作成（右下に配置）
  createCommentBoxElement(slotDef) {
    const box = document.createElement('div');
    box.className = 'comment-box cursor-pointer group';
    box.style.gridColumn = `${slotDef.colStart} / span ${slotDef.colSpan}`;
    box.style.gridRow = `${slotDef.rowStart} / span ${slotDef.rowSpan}`;
    box.title = 'タップしてコメントを入力';

    // ドット装飾ヘッダー
    const dotHeader = document.createElement('div');
    dotHeader.innerHTML = Illustrations.dotDecoration;
    box.appendChild(dotHeader);

    // テキストエリア
    const textarea = document.createElement('textarea');
    textarea.placeholder = '';
    textarea.value = this.state.comment;

    // 文字入力時の処理 & フォントサイズ自動調整 & 自動保存
    textarea.addEventListener('input', (e) => {
      this.state.comment = e.target.value;
      this.adjustCommentFontSize(textarea);
      this.autoSave();
    });

    // タップ時に快適な入力モーダルを開く（iPad PWAで確実にキーボードを出す）
    box.addEventListener('click', (e) => {
      this.openCommentModal();
    });

    // 編集誘導バッジ（印刷時は非表示）
    const editBadge = document.createElement('div');
    editBadge.className = 'no-print absolute bottom-1 right-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm opacity-80 group-hover:opacity-100 transition';
    editBadge.innerHTML = '✏️ 入力';
    box.appendChild(editBadge);

    box.appendChild(textarea);

    setTimeout(() => this.adjustCommentFontSize(textarea), 10);

    return box;
  }

  // 文字数に応じたフォントサイズ自動調整（1.2倍拡大版・スマホ・タブレット完全レスポンシブ）
  adjustCommentFontSize(textarea) {
    if (!textarea) return;
    const textLength = textarea.value.length;
    
    if (textLength < 60) {
      textarea.style.fontSize = 'clamp(10.5px, 2.15cqi, 17px)';
    } else if (textLength < 120) {
      textarea.style.fontSize = 'clamp(9px, 1.8cqi, 14.5px)';
    } else if (textLength < 200) {
      textarea.style.fontSize = 'clamp(8.5px, 1.55cqi, 12.5px)';
    } else if (textLength < 300) {
      textarea.style.fontSize = 'clamp(8px, 1.3cqi, 11px)';
    } else {
      textarea.style.fontSize = 'clamp(7.5px, 1.15cqi, 10px)';
    }
  }

  // 全体再描画
  render() {
    this.renderHeader();
    this.renderGrid();
  }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DaycareReportApp();
});
