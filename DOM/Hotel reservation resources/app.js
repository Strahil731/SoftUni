window.addEventListener('load', solve);

function solve() {

    const inputs = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        dateIn: document.getElementById('date-in'),
        dateOut: document.getElementById('date-out'),
        peopleCount: document.getElementById('people-count')
    };

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', onNextClick);

    function onNextClick(event) {
        event.preventDefault();

        if (inputs.firstName.value == '' ||
            inputs.lastName.value == '' ||
            inputs.dateIn.value == '' ||
            inputs.dateOut.value == '' ||
            inputs.peopleCount.value == '') {
            return;
        }

        const firstName = inputs.firstName.value;
        const lastName = inputs.lastName.value;
        const dateIn = new Date(inputs.dateIn.value);
        const dateOut = new Date(inputs.dateOut.value);
        const peopleCount = Number(inputs.peopleCount.value);

        // Validate dateIn is before dateOut
        if (dateIn.getTime() >= dateOut.getTime()) {
            return;
        }

        inputs.firstName.value = '';
        inputs.lastName.value = '';
        inputs.dateIn.value = '';
        inputs.dateOut.value = '';
        inputs.peopleCount.value = '';

        nextBtn.disabled = true;
    }

    function createPreview(firstName, lastName, dateIn, dateOut, peopleCount) {
        const element = e('li');
        const article = e('article');
        article.appendChild(e('h3', `Name: ${firstName} ${lastName}`));
        article.appendChild(e('p', `From date: ${dateIn}`));
        article.appendChild(e('p', `To date: ${dateOut}`));
        article.appendChild(e('p', `For ${peopleCount} people`));

        element.appendChild(article);

        const editBtn = e('button', 'Edit');
        editBtn.className = 'edit-btn';
        const continueBtn = e('button', 'Continue');
        continueBtn.className = 'continue-btn';

        article.appendChild(editBtn);
        article.appendChild(continueBtn);

        return element;
    }

    function e(type, content) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        return element;
    }
}