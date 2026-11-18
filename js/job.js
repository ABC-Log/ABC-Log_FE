document.addEventListener("DOMContentLoaded", function () {
  var jobs = [
    {
      name: "고객 서비스",
      category: "서비스",
      text: "고객의 질문을 듣고 문제를 해결하며 좋은 이용 경험을 만드는 일",
      skills: ["소통", "문제 해결", "고객 응대"],
    },
    {
      name: "매장 운영",
      category: "운영",
      text: "재고와 일정, 현장 업무를 관리해 매장이 원활히 돌아가게 하는 일",
      skills: ["책임감", "시간 관리", "협업"],
    },
    {
      name: "사무 지원",
      category: "사무",
      text: "자료를 정리하고 문서를 작성하며 팀의 업무를 지원하는 일",
      skills: ["문서 작성", "꼼꼼함", "정리"],
    },
    {
      name: "콘텐츠 기획",
      category: "기획",
      text: "고객이 필요로 하는 정보를 찾아 콘텐츠와 홍보 방식을 구상하는 일",
      skills: ["기획", "창의력", "소통"],
    },
    {
      name: "행사 운영",
      category: "운영",
      text: "행사 준비부터 현장 안내까지 여러 사람과 협력해 진행하는 일",
      skills: ["협업", "문제 해결", "소통"],
    },
    {
      name: "교육 운영 지원",
      category: "서비스",
      text: "학습자 안내와 일정, 자료 관리를 맡아 교육을 돕는 일",
      skills: ["설명", "책임감", "정리"],
    },
  ];
  var mySkills = [];
  getExperiences().forEach(function (item) {
    (item.skills || "").split(",").forEach(function (raw) {
      var skill = raw.trim();
      if (skill && mySkills.indexOf(skill) === -1) mySkills.push(skill);
    });
  });
  document.getElementById("match-note").textContent = mySkills.length
    ? "내가 기록한 역량: " +
      mySkills.join(", ") +
      " · 겹치는 역량이 있는 직무를 먼저 보여줍니다."
    : "경험을 기록하면 입력한 역량과 겹치는 직무를 먼저 볼 수 있습니다.";
  function overlap(job) {
    return job.skills.filter(function (skill) {
      return mySkills.indexOf(skill) !== -1;
    }).length;
  }
  function render() {
    var query = document
      .getElementById("job-search")
      .value.trim()
      .toLowerCase();
    var filter = document.getElementById("job-filter").value;
    var results = jobs
      .filter(function (job) {
        return (
          (filter === "all" || job.category === filter) &&
          (job.name + job.text + job.skills.join(" "))
            .toLowerCase()
            .indexOf(query) !== -1
        );
      })
      .sort(function (a, b) {
        return overlap(b) - overlap(a);
      });
    document.getElementById("job-list").innerHTML = results.length
      ? results
          .map(function (job) {
            var count = overlap(job);
            return (
              '<article class="panel job-card"><span class="category">' +
              job.category +
              "</span><h3>" +
              job.name +
              "</h3><p>" +
              job.text +
              "</p><div>" +
              job.skills
                .map(function (skill) {
                  return '<span class="badge">' + skill + "</span>";
                })
                .join("") +
              "</div>" +
              (count
                ? '<strong class="match">내 역량 ' + count + "개 연결</strong>"
                : "") +
              "</article>"
            );
          })
          .join("")
      : '<div class="empty"><strong>검색 결과가 없어요</strong><p>다른 검색어나 분야를 선택해 주세요.</p></div>';
  }
  document.getElementById("job-search").addEventListener("input", render);
  document.getElementById("job-filter").addEventListener("change", render);
  render();
});
