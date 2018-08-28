function OpenDevSumm() {
    var open = $("#side3").data("open");
    close();
    if (!open) {
      $("#side3").show();
      $("#side3").data("open", 1);
  
    } else {
      $("#side3").hide();
      $("#side3").data("open", 0);
    }
  };