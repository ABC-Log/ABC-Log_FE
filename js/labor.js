document.addEventListener("DOMContentLoaded", function () {
  var checks = document.querySelectorAll(".labor-check");
  function updateChecks() {
    var count = 0;
    checks.forEach(function (box) {
      if (box.checked) count++;
    });
    document.getElementById("check-result").textContent =
      count === checks.length
        ? "4개 항목을 모두 확인했어요. 근무기록은 계속 보관해 두세요."
        : count +
          "/4개 확인 · 확인하지 못한 항목이 있다면 계약서와 급여·근무기록을 살펴보세요.";
  }
  checks.forEach(function (box) {
    box.addEventListener("change", updateChecks);
  });
  document
    .getElementById("wage-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var wage = Number(document.getElementById("hourly-wage").value);
      var hours = Number(document.getElementById("hours-worked").value);
      var result = document.getElementById("wage-result");
      if (wage <= 0 || hours <= 0) {
        result.textContent = "시급과 근무시간을 확인해 주세요.";
        return;
      }
      result.textContent =
        "예상 기본급: " +
        Math.round(wage * hours).toLocaleString("ko-KR") +
        "원" +
        (wage < 10320 ? " · 입력한 시급이 2026년 최저임금보다 낮습니다." : "");
    });
});
