const homeSection = document.querySelector("div[data-view-name='home']");

export function showHomeView(context) {
    context.render(homeSection);
}