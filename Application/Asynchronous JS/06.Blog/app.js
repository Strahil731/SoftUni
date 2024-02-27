function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", loadPost);
    document.getElementById("btnViewPost").addEventListener("click", viewPost);
    const selectRef = document.getElementById("posts");
    const postTitleRef = document.getElementById("post-title");
    const bodyRef = document.getElementById("post-body");
    const postCommentsRef = document.getElementById("post-comments");

    const endPoints = {
        allPost: "http://localhost:3030/jsonstore/blog/posts",
        allComments: "http://localhost:3030/jsonstore/blog/comments"
    }

    async function loadPost() {
        const response = await fetch(endPoints.allPost);
        const data = await response.json();
        selectRef.innerHTML = "";
        Object.values(data).forEach(post => {
            selectRef.innerHTML += createOptionElement(post);
        });
    }

    function createOptionElement(data) {
        return `<option value=${data.id}>${data.title}</option>`
    }

    async function viewPost() {
        const currentPostId = selectRef.value;
        const responseWithSinglePost = await fetch(endPoints.allPost + "/" + currentPostId);
        const dataSinglePost = await responseWithSinglePost.json();
        const responseComments = await fetch(endPoints.allComments);
        const dataComments = await responseComments.json();
        const filteredComments = Object.values(dataComments).filter(x => x.postId === currentPostId);
        postTitleRef.textContent = dataSinglePost.title;
        bodyRef.textContent = dataSinglePost.body;
        postCommentsRef.innerHTML = "";
        filteredComments.forEach(x => {
            const li = document.createElement("li");
            li.id = x.id;
            li.textContent = x.text;
            postCommentsRef.appendChild(li);
        });
    }
}

attachEvents();