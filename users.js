const userList = document.getElementById("userList");
const postList = document.getElementById("postList");
const postsTitle = document.getElementById("postsTitle");

// Kullanıcıları listele
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Şirket:</strong> ${user.company.name}</p>
        <button class="view-details-btn" data-userid="${user.id}">Detayları Göster</button>
        <div class="extra-info" style="display: none; margin-top: 10px;"></div>
      `;

      document.getElementById("userList").appendChild(card);
    });

    // Detay gösterme butonları
    document.querySelectorAll(".view-details-btn").forEach(button => {
      button.addEventListener("click", function () {
        const card = this.parentElement;
        const userId = this.getAttribute("data-userid");
        const extraInfoDiv = card.querySelector(".extra-info");

        // Eğer daha önce gösterildiyse toggle gibi kapat
        if (extraInfoDiv.style.display === "block") {
          extraInfoDiv.style.display = "none";
          this.textContent = "Detayları Göster";
          return;
        }

        // API'den ilgili kullanıcıyı tekrar çek (alternatif: users dizisinden bulabilirsin)
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then(res => res.json())
          .then(user => {
            extraInfoDiv.innerHTML = `
              <p><strong>Telefon:</strong> ${user.phone}</p>
              <p><strong>Website:</strong> ${user.website}</p>
              <p><strong>Adres:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
              <p><strong>Şirket Açıklama:</strong> ${user.company.catchPhrase}</p>
            `;
            extraInfoDiv.style.display = "block";
            button.textContent = "Detayları Gizle";
          });
      });
    });
  });
