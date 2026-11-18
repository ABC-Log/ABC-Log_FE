document.addEventListener("DOMContentLoaded", function () {
  var items = getExperiences();
  var counts = {};
  items.forEach(function (item) {
    (item.skills || "").split(",").forEach(function (raw) {
      var skill = raw.trim();
      if (skill) counts[skill] = (counts[skill] || 0) + 1;
    });
  });
  var names = Object.keys(counts).sort(function (a, b) {
    return counts[b] - counts[a];
  });
  var summary = document.getElementById("skill-summary");
  summary.innerHTML = names.length
    ? names
        .map(function (name) {
          return (
            '<div class="panel skill-card"><span>✦</span><h3>' +
            escapeHtml(name) +
            "</h3><p>" +
            counts[name] +
            "개 경험에서 사용</p></div>"
          );
        })
        .join("")
    : '<div class="empty"><strong>아직 정리할 역량이 없어요</strong><p>경험 기록에서 사용한 역량을 입력해 주세요.</p><a class="button primary" href="experience.html">경험 기록하기</a></div>';
  var list = document.getElementById("skill-experiences");
  list.innerHTML = items.length
    ? items
        .map(function (item) {
          return (
            '<article class="panel"><h3>' +
            escapeHtml(item.workplace) +
            "</h3><p>" +
            escapeHtml(item.role) +
            "</p><div>" +
            (item.skills || "")
              .split(",")
              .filter(function (skill) {
                return skill.trim();
              })
              .map(function (skill) {
                return (
                  '<span class="badge">' + escapeHtml(skill.trim()) + "</span>"
                );
              })
              .join("") +
            "</div></article>"
          );
        })
        .join("")
    : '<div class="empty"><p>기록된 경험이 없습니다.</p></div>';
});
