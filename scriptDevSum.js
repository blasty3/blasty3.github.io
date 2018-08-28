function OpenDevSumm() {
    var open = $("#side3").data("open");
    close();
    if (!open) {
      $("#side3").show();
      $("#side3").data("open", 1);
    }
  };