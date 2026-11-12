var STORAGE_KEY = "careerlog_experiences";

function getExperiences() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveExperiences(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function escapeHtml(value) {
  var div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  var headerSlot = document.getElementById("site-header");
  if (headerSlot)
    headerSlot.innerHTML =
      '<a class="skip-link" href="#main">본문 바로가기</a><header class="site-header"><div class="header-inner"><a class="brand" href="index.html">Career<span>Log</span></a><nav aria-label="주 메뉴"><a href="index.html">홈</a><a href="experience.html">경험 기록</a><a href="competency.html">역량 정리</a><a href="job.html">직무 탐색</a><a href="labor.html">노동권 확인</a></nav><div class="auth-links"><a href="login.html">로그인</a><a class="header-action" href="signup.html">회원가입</a></div><button class="menu-button" type="button" aria-label="메뉴 열기" aria-expanded="false">☰</button></div></header>';
  var footerSlot = document.getElementById("site-footer");
  if (footerSlot)
    footerSlot.innerHTML =
      '<footer class="site-footer"><div class="wrap footer-inner"><strong>CareerLog</strong><p>오늘의 경험을 내일의 경력으로</p><span>노동 정보는 일반 안내입니다. 개별 사안은 고용노동부에 문의하세요.</span></div></footer>';
  var current = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".site-header nav a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") === current)
      links[i].setAttribute("aria-current", "page");
  }
  var menu = document.querySelector(".menu-button");
  var nav = document.querySelector(".site-header nav");
  if (menu && nav)
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
});
