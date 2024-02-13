window.addEventListener('load', solve);

function solve() {

    const skiLift = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        peopleCount: document.getElementById('people-count'),
        dateIn: document.getElementById('from-date'),
        numberDays: document.getElementById('days-count')
    }

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', nextForm);

    const infoList = document.querySelector('.ticket-info-list');
    const confirmList = document.querySelector('.confirm-ticket');
    const body = document.getElementById('body');

    function nextForm(event) {
        event.preventDefault();

        if (skiLift.firstName.value === '' ||
            skiLift.lastName.value === '' ||
            skiLift.peopleCount.value === '' ||
            skiLift.dateIn.value === '' ||
            skiLift.numberDays.value === '') {
            return;
        }

        const firstName = skiLift.firstName.value;
        const lastName = skiLift.lastName.value;
        const peopleCount = skiLift.peopleCount.value;
        const dateIn = skiLift.dateIn.value;
        const numberDays = skiLift.numberDays.value;

        skiLift.firstName.value = '';
        skiLift.lastName.value = '';
        skiLift.peopleCount.value = '';
        skiLift.dateIn.value = '';
        skiLift.numberDays.value = '';

        nextBtn.disabled = true;

        const result = nextFormPreview(firstName, lastName, peopleCount, dateIn, numberDays);
        infoList.appendChild(result);
    }

    function createInfo(firstName, lastName, peopleCount, dateIn, numberDays) {
        const list = e('li');
        list.className = "ticket";
        const info = e('article');

        info.appendChild(e('h3', `Name: ${firstName} ${lastName}`));
        info.appendChild(e('p', `From date: ${dateIn}`));
        info.appendChild(e('p', `For ${numberDays} days`));
        info.appendChild(e('p', `For ${peopleCount} people`));

        list.appendChild(info);

        return list;
    }

    function nextFormPreview(firstName, lastName, peopleCount, dateIn, numberDays) {
        const list = createInfo(firstName, lastName, peopleCount, dateIn, numberDays);

        const editBtn = e('button', "Edit");
        editBtn.className = "edit-btn";
        editBtn.addEventListener('click', () => onEditClick(firstName, lastName, peopleCount, dateIn, numberDays));

        const continueBtn = e('button', "Continue");
        continueBtn.className = "continue-btn";
        continueBtn.addEventListener('click', () => onContinueClick(firstName, lastName, peopleCount, dateIn, numberDays));

        list.appendChild(editBtn);
        list.appendChild(continueBtn);

        return list;
    }

    function onEditClick(firstName, lastName, peopleCount, dateIn, numberDays) {
        skiLift.firstName.value = firstName;
        skiLift.lastName.value = lastName;
        skiLift.peopleCount.value = peopleCount;
        skiLift.dateIn.value = dateIn;
        skiLift.numberDays.value = numberDays;

        infoList.textContent = '';

        nextBtn.disabled = false;
    }

    function onContinueClick(firstName, lastName, peopleCount, dateIn, numberDays) {
        const result = createConfirmation(firstName, lastName, peopleCount, dateIn, numberDays);
        confirmList.appendChild(result);
        infoList.textContent = '';
    }

    function createConfirmation(firstName, lastName, peopleCount, dateIn, numberDays) {
        const list = createInfo(firstName, lastName, peopleCount, dateIn, numberDays);

        const confirmBtn = e('button', "Confirm");
        confirmBtn.className = "confirm-btn";
        confirmBtn.addEventListener('click', onConfirmClick);


        const cancelBtn = e('button', "Cancel");
        cancelBtn.className = "cancel-btn";
        cancelBtn.addEventListener('click', onCancelClick);

        list.appendChild(confirmBtn);
        list.appendChild(cancelBtn);

        return list;
    }

    function onCancelClick() {
        location.reload();
    }

    function onConfirmClick() {
        const element = document.getElementById('main');
        element.remove();

        const finishText = e('h1', 'Thank you, have a nice day!');
        finishText.id = 'thank-you';

        const backBtn = e('button', "Back");
        backBtn.id = "back-btn";
        backBtn.addEventListener('click', reloadedPage);

        body.appendChild(finishText);
        body.appendChild(backBtn);
    }

    function reloadedPage() {
        location.reload();
    }

    function e(type, content) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        return element;
    }
}