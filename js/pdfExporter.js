// pdfExporter.js - 高解像度PDF生成 & AirPrint印刷制御モジュール

const PdfExporter = {
  /**
   * ブラウザ標準印刷 (iPad AirPrint / PDF保存) をトリガー
   */
  printA4: function () {
    // 印刷ダイアログを起動
    window.print();
  },

  /**
   * html2canvas + jsPDF を使用したダイレクトPDFダウンロード
   * @param {string} elementId A4シートの要素ID
   * @param {string} filename 出力ファイル名
   */
  downloadPdf: async function (elementId, filename = '今日の活動.pdf') {
    const element = document.getElementById(elementId);
    if (!element) return;

    // ローディング表示
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.remove('hidden');

    try {
      // 操作用ボタン等を一時的に隠す
      element.classList.add('exporting-pdf');

      // html2canvasで高精細レンダリング (scale: 3 for A4 print quality)
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      element.classList.remove('exporting-pdf');

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      // jsPDF (A4 縦: 210mm x 297mm)
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(filename);
    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの出力中にエラーが発生しました。印刷ボタンから「PDFとして保存」もお試しください。');
    } finally {
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
    }
  }
};

window.PdfExporter = PdfExporter;
