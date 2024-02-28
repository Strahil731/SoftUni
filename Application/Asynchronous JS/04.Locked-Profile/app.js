function lockedProfile() {
    const url = "http://localhost:3030/jsonstore/advanced/profiles";

    const checkBtn = document.getElementsByName("user1Locked");
    const divSection = document.getElementsByClassName("user1Username");
    const main = document.getElementById("main");

    const showMore = document.getElementsByTagName("button")[0];
    showMore.addEventListener("click", showInfo);

    let clicked = false;

    function showInfo() {
        if (clicked) {
            clicked = false;

            divSection[0].style.display = "none";
            showMore.textContent = "Show more";
        }
        else {
            clicked = true;

            if (checkBtn[1].checked) {
                divSection[0].style.display = "block";
                showMore.textContent = "Hide it";
            }
        }
    }

    if (checkBtn[0].checked) {
        divSection[0].style.display = "none";
    }

    async function showName() {
        const response = await fetch(url);
        const data = await response.json();

        main.innerHTML = "";

        for (let el of Object.values(data)) {
            
            main.innerHTML += `
            <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock">
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${el.username}" disabled readonly />
				<div class="user1Username">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${el.email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user1Age" value="${el.age}" disabled readonly />
				</div>
				<button>Show more</button>
			</div>`
            divSection[divSection.length - 1].style.display = "none";
        }
    }

    showName();
}