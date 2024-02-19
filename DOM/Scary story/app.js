window.addEventListener("load", solve);

function solve() {

  const info = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    storyTitle: document.getElementById('story-title'),
    genre: document.getElementById('genre'),
    story: document.getElementById('story')
  }

  const publishBtn = document.getElementById('form-btn');
  publishBtn.addEventListener('click', nextForm);

  const infoList = document.getElementById('preview-list');
  const main = document.getElementById("main");

  function nextForm(event) {
    event.preventDefault();

    if (info.firstName.value === '' ||
      info.lastName.value === '' ||
      info.age.value === '' ||
      info.storyTitle.value === '' ||
      info.genre.value === '' ||
      info.story.value === '') {
      return;
    }

    const firstName = info.firstName.value;
    const lastName = info.lastName.value;
    const age = info.age.value;
    const storyTitle = info.storyTitle.value;
    const genre = info.genre.value;
    const story = info.story.value;

    info.firstName.value = '';
    info.lastName.value = '';
    info.age.value = '';
    info.storyTitle.value = '';
    info.genre.value = '';
    info.story.value = '';

    publishBtn.disabled = true;

    const result = nextFormPreview(firstName, lastName, age, storyTitle, genre, story);
    infoList.appendChild(result);
  }

  function createInfo(firstName, lastName, age, storyTitle, genre, story) {
    const list = el('li');
    list.className = 'story-info';
    const info = el('article');

    info.appendChild(el('h4', `Name: ${firstName} ${lastName}`));
    info.appendChild(el('p', `Age: ${age}`));
    info.appendChild(el('p', `Title: ${storyTitle}`));
    info.appendChild(el('p', `Genre: ${genre}`));
    info.appendChild(el('p', story));

    list.appendChild(info);

    return list;
  }

  function nextFormPreview(firstName, lastName, age, storyTitle, genre, story) {
    const list = createInfo(firstName, lastName, age, storyTitle, genre, story);

    const saveBtn = el('button', "Save");
    saveBtn.className = "save-btn";
    saveBtn.addEventListener('click', onSaveClick);

    const editBtn = el('button', "Edit");
    editBtn.className = "edit-btn";
    editBtn.addEventListener('click', () => onEdinClick(firstName, lastName, age, storyTitle, genre, story));

    const deleteBtn = el('button', "Delete");
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener('click', onDeleteClick);

    list.appendChild(saveBtn);
    list.appendChild(editBtn);
    list.appendChild(deleteBtn);

    return list;
  }

  function onSaveClick() {
    const message = el('h1', 'Your scary story is saved!');

    main.textContent = '';
    main.appendChild(message);

    return main;
  }

  function onEdinClick(firstName, lastName, age, storyTitle, genre, story) {
    info.firstName.value = firstName;
    info.lastName.value = lastName;
    info.age.value = age;
    info.storyTitle.value = storyTitle;
    info.genre.value = genre;
    info.story.value = story;

    const allList = document.getElementsByClassName("story-info")[0];

    infoList.removeChild(allList);

    publishBtn.disabled = false;
  }

  function onDeleteClick() {
    location.reload();
  }

  function el(type, content) {
    const element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }

    return element;
  }
}