document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("experience-form");
  var list = document.getElementById("experience-list");
  var fields = ["workplace", "role", "period", "detail", "skills"];
  function render() {
    var items = getExperiences();
    document.getElementById("experience-count").textContent = items.length;
    if (!items.length) {
      list.innerHTML =
        '<div class="empty"><strong>아직 기록이 없어요</strong><p>첫 아르바이트 경험을 왼쪽에 적어 보세요.</p></div>';
      return;
    }
    list.innerHTML = items
      .map(function (item) {
        var badges = (item.skills || "")
          .split(",")
          .filter(function (skill) {
            return skill.trim();
          })
          .map(function (skill) {
            return (
              '<span class="badge">' + escapeHtml(skill.trim()) + "</span>"
            );
          })
          .join("");
        return (
          '<article class="panel experience-card"><div class="card-top"><div><small>' +
          escapeHtml(item.period || "근무 기간 미입력") +
          "</small><h3>" +
          escapeHtml(item.workplace) +
          "</h3><strong>" +
          escapeHtml(item.role) +
          "</strong></div></div><p>" +
          escapeHtml(item.detail).replace(/\n/g, "<br>") +
          "</p><div>" +
          badges +
          '</div><div class="card-actions"><button class="button small secondary" type="button" data-action="edit" data-id="' +
          item.id +
          '">수정</button><button class="button small danger" type="button" data-action="delete" data-id="' +
          item.id +
          '">삭제</button></div></article>'
        );
      })
      .join("");
  }
  function reset() {
    form.reset();
    document.getElementById("edit-id").value = "";
    document.getElementById("save-button").textContent = "경험 저장하기";
    document.getElementById("cancel-button").hidden = true;
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var item = {};
    fields.forEach(function (name) {
      item[name] = document.getElementById(name).value.trim();
    });
    var items = getExperiences();
    var editId = document.getElementById("edit-id").value;
    if (editId) {
      for (var i = 0; i < items.length; i++)
        if (String(items[i].id) === editId) {
          item.id = items[i].id;
          items[i] = item;
          break;
        }
    } else {
      item.id = Date.now();
      items.unshift(item);
    }
    saveExperiences(items);
    reset();
    render();
    document.getElementById("form-status").textContent = "경험을 저장했어요.";
  });
  list.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;
    var items = getExperiences();
    var item = items.find(function (entry) {
      return String(entry.id) === button.dataset.id;
    });
    if (!item) return;
    if (button.dataset.action === "delete") {
      if (!confirm("이 경험을 삭제할까요?")) return;
      saveExperiences(
        items.filter(function (entry) {
          return entry.id !== item.id;
        }),
      );
      render();
      return;
    }
    fields.forEach(function (name) {
      document.getElementById(name).value = item[name] || "";
    });
    document.getElementById("edit-id").value = item.id;
    document.getElementById("save-button").textContent = "수정 저장하기";
    document.getElementById("cancel-button").hidden = false;
    form.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("cancel-button").addEventListener("click", reset);
  render();
});
