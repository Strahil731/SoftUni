window.addEventListener('load', solve);

function solve() {

    const reservation = {
        firstName: document.getElementById("first-name"),
        lastName: document.getElementById("last-name"),
        dateIn: document.getElementById("date-in"),
        dateOut: document.getElementById("date-out"),
        peopleCount: document.getElementById("people-count")
    }

    const nextBtn = document.getElementById("next-btn");

    nextBtn.addEventListener('click', nextFormFn);

    const infoList = document.querySelector('.info-list');
    const confirmList = document.querySelector('.confirm-list');
    const output = document.getElementById('verification');

    function nextFormFn(event) {
        event.preventDefault();

        if (reservation.firstName.value === '' ||
            reservation.lastName.value === '' ||
            reservation.dateIn.value === '' ||
            reservation.dateOut.value === '' ||
            reservation.peopleCount.value === '') {
            return;
        }

        const firstName = reservation.firstName.value;
        const lastName = reservation.lastName.value;
        const dateIn = reservation.dateIn.value;
        const dateOut = reservation.dateOut.value;
        const peopleCount = Number(reservation.peopleCount.value);

        if (new Date(dateIn) >= new Date(dateOut)) {
            return;
        }

        reservation.firstName.value = '';
        reservation.lastName.value = '';
        reservation.dateIn.value = '';
        reservation.dateOut.value = '';
        reservation.peopleCount.value = '';

        nextBtn.disabled = true;

        const result = nextFormPreview(firstName, lastName, dateIn, dateOut, peopleCount);
        infoList.appendChild(result);
    }

    function createInfo(firstName, lastName, dateIn, dateOut, peopleCount) {
        const list = e("li");
        list.className = "reservation-content";
        const info = e("article");

        info.appendChild(e('h3', `Name: ${firstName} ${lastName}`));
        info.appendChild(e('p', `From date: ${dateIn}`));
        info.appendChild(e('p', `To date: ${dateOut}`));
        info.appendChild(e('p', `For ${peopleCount} people`));

        list.appendChild(info);

        return list;
    }

    function nextFormPreview(firstName, lastName, dateIn, dateOut, peopleCount) {
        const list = createInfo(firstName, lastName, dateIn, dateOut, peopleCount);

        const editBtn = e('button', "Edit");
        editBtn.className = "edit-btn";
        editBtn.addEventListener('click', () => onEdintClick(firstName, lastName, dateIn, dateOut, peopleCount));

        const continueBtn = e('button', "Continue");
        continueBtn.className = "continue-btn";
        continueBtn.addEventListener('click', () => onContinueClick(firstName, lastName, dateIn, dateOut, peopleCount));

        list.appendChild(editBtn);
        list.appendChild(continueBtn);

        return list;
    }

    function onEdintClick(firstName, lastName, dateIn, dateOut, peopleCount) {
        reservation.firstName.value = firstName;
        reservation.lastName.value = lastName;
        reservation.dateIn.value = dateIn;
        reservation.dateOut.value = dateOut;
        reservation.peopleCount.value = peopleCount;

        infoList.textContent = '';

        nextBtn.disabled = false;
    }

    function onContinueClick(firstName, lastName, dateIn, dateOut, peopleCount) {
        const result = createConfirmation(firstName, lastName, dateIn, dateOut, peopleCount);
        confirmList.appendChild(result);
        infoList.textContent = '';
    }

    function createConfirmation(firstName, lastName, dateIn, dateOut, peopleCount) {
        const list = createInfo(firstName, lastName, dateIn, dateOut, peopleCount);

        const confirmBtn = e('button', "Confirm");
        confirmBtn.className = "confirm-btn";
        confirmBtn.addEventListener('click', onFinishClick.bind(null, true));
        const cancelBtn = e('button', "Cancel");
        cancelBtn.className = "cancel-btn";
        cancelBtn.addEventListener('click', onFinishClick.bind(null, false));

        list.appendChild(confirmBtn);
        list.appendChild(cancelBtn);

        return list;
    }

    function onFinishClick(confirmed) {
        const className = confirmed ? 'reservation-confirmed' : 'reservation-cancelled';
        const text = confirmed ? 'Confirmed.' : 'Cancelled.';

        output.className = className;
        output.textContent = text;

        confirmList.textContent = '';

        nextBtn.disabled = false;
    }

    function e(type, content) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        return element;
    }
}