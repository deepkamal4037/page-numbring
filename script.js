let userData = users;

const usersPerPage = 10;

const totalUserElement = document.querySelector("#total-users");
const contactListElement = document.getElementById("contact-list");
const paginationElement = document.getElementById("pagination");

function updateTotalUsersCount() {
    totalUserElement.textContent = userData.length;
}

function renderUserList(usersArray) {
    contactListElement.innerHTML = "";

    for (let i = 0; i < usersArray.length; i++) {
        const userElement = createUserListItem(usersArray[i]);
        contactListElement.appendChild(userElement);
    }
}

function createUserListItem(user) {
    const listItem = document.createElement("li");
    listItem.className = "contact-item cf";
    listItem.innerHTML = `
      <div class="contact-details">
        <img class="avatar" src="${user.image}">
        <h3>${user.name}</h3>
        <span class="email">${user.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${user.joined}</span>
      </div>`;
    return listItem;
}

function calculateTotalPages() {
    return Math.ceil(userData.length / usersPerPage);
}

function renderPaginationControls() {
    const totalPages = calculateTotalPages();
    paginationElement.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = createPageLink(i);
        const listItem = document.createElement("li");
        listItem.appendChild(pageLink);
        paginationElement.appendChild(listItem);
    }
}

function createPageLink(pageNumber) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = pageNumber;

    pageLink.addEventListener("click", function () {
        displayUsersForPage(pageNumber, usersPerPage);
    });

    return pageLink;
}

function displayUsersForPage(pageNumber, usersPerPage) {
    const startIndex = (pageNumber - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const usersForPage = userData.slice(startIndex, endIndex);
    renderUserList(usersForPage);
}

function initializePage() {
    updateTotalUsersCount();
    renderUserList(userData.slice(0, usersPerPage));
    renderPaginationControls();
}

document.addEventListener("DOMContentLoaded", initializePage);