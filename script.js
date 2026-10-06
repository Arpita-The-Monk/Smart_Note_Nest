// ========================================
// Smart Note Nest - Note Saving
// ========================================

// Create Note Form
// ========================================
// Create / Edit Note
// ========================================

const noteForm = document.getElementById("note-form");

if (noteForm) {

    // Get edit ID from URL
    const urlParams = new URLSearchParams(window.location.search);

    const editId = urlParams.get("edit");


    // If editing an existing note
    if (editId) {

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        const noteToEdit = notes.find(function(note) {
            return note.id === Number(editId);
        });


        if (noteToEdit) {

            document.getElementById("note-title").value = noteToEdit.title;

            document.getElementById("note-category").value = noteToEdit.category;

            document.getElementById("note-content").value = noteToEdit.content;

        }

    }

    const formTitle = document.querySelector(".create-note-section h1");

const saveButton = document.querySelector(".save-btn");

if (formTitle) {
    formTitle.textContent = "Edit Note";
}

if (saveButton) {
    saveButton.textContent = "Update Note";
}


    // Form Submit
    noteForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const title = document.getElementById("note-title").value;

        const category = document.getElementById("note-category").value;

        const content = document.getElementById("note-content").value;


        let notes = JSON.parse(localStorage.getItem("notes")) || [];


        // EDIT MODE
        if (editId) {

            const noteIndex = notes.findIndex(function(note) {

                return note.id === Number(editId);

            });


            if (noteIndex !== -1) {

                notes[noteIndex].title = title;

                notes[noteIndex].category = category;

                notes[noteIndex].content = content;

            }


            localStorage.setItem("notes", JSON.stringify(notes));

            alert("Note updated successfully!");

        }


        // CREATE MODE
        else {

            const newNote = {

                id: Date.now(),

                title: title,

                category: category,

                content: content,

                favorite: false

            };


            notes.push(newNote);

            localStorage.setItem("notes", JSON.stringify(notes));

            alert("Note saved successfully!");

        }


        // Go back to Home
        window.location.href = "index.html";

    });

}

// ========================================
// Display Notes on Home Page
// ========================================

const notesContainer = document.querySelector(".notes-container");


// Check if the notes container exists
if (notesContainer) {

    // Get saved notes from localStorage
    const notes = JSON.parse(localStorage.getItem("notes")) || [];


    // If there are no notes
    if (notes.length === 0) {

        notesContainer.innerHTML = `
            <div class="empty-message">
                <p>No notes yet.</p>
                <p>Create your first note to get started!</p>
            </div>
        `;

    } 
    
    else {

        // Clear the container
        notesContainer.innerHTML = "";


        // Show each note
        notes.forEach(function(note) {

            const noteCard = document.createElement("div");

            noteCard.classList.add("note-card");


            noteCard.innerHTML = `
    <div class="note-card-header">

        <h3>${note.title}</h3>

        <button 
            class="favorite-btn"
            data-id="${note.id}">
            ${note.favorite ? "★" : "☆"}
        </button>

    </div>

    <p class="note-content">
        ${note.content}
    </p>

    <div class="note-card-footer">

        <span>📂 ${note.category}</span>

        <div>

    <button class="view-btn" data-id="${note.id}">
        View
    </button>

    <button class="edit-btn" data-id="${note.id}">
        Edit
    </button>

    <button class="delete-btn" data-id="${note.id}">
        Delete
    </button>

</div>

    </div>
`;


            // Add the card to the page
            notesContainer.appendChild(noteCard);

        });

    }

}

// ========================================
// View Note from Home Page
// ========================================

const homeViewButtons =
    document.querySelectorAll(".view-btn");

homeViewButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const noteId =
            button.dataset.id;

        window.location.href =
            `note-details.html?id=${noteId}`;

    });

});

// ========================================
// Delete Note
// ========================================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const noteId = Number(button.dataset.id);

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        notes = notes.filter(function(note) {
            return note.id !== noteId;
        });

        localStorage.setItem("notes", JSON.stringify(notes));

        location.reload();

    });

});

// ========================================
// Favorite Note
// ========================================

const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const noteId = Number(button.dataset.id);

        let notes = JSON.parse(localStorage.getItem("notes")) || [];

        notes = notes.map(function(note) {

            if (note.id === noteId) {

                note.favorite = !note.favorite;

            }

            return note;

        });

        localStorage.setItem("notes", JSON.stringify(notes));

        location.reload();

    });

});

// ========================================
// Update Quick Overview
// ========================================

const totalNotesElement = document.getElementById("total-notes");
const totalFavoritesElement = document.getElementById("total-favorites");
const totalCategoriesElement = document.getElementById("total-categories");


if (totalNotesElement) {

    // Get saved notes
    const notes = JSON.parse(localStorage.getItem("notes")) || [];


    // Total Notes
    totalNotesElement.textContent = notes.length;


    // Total Favorites
    const favoriteNotes = notes.filter(function(note) {
        return note.favorite === true;
    });

    totalFavoritesElement.textContent = favoriteNotes.length;


    // Total Categories
    const categories = new Set();

    notes.forEach(function(note) {
        categories.add(note.category);
    });

    totalCategoriesElement.textContent = categories.size;

}

// ========================================
// Edit Note - Open Edit Page
// ========================================

const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const noteId = button.dataset.id;

        window.location.href = `create-note.html?edit=${noteId}`;

    });

});

// ========================================
// My Notes Page
// ========================================

const myNotesContainer =
    document.getElementById("my-notes-container");

const searchInput =
    document.getElementById("search-input");

const categoryFilter =
    document.getElementById("category-filter");


if (myNotesContainer) {

    // Get category from URL
const urlParams =
    new URLSearchParams(window.location.search);

const urlCategory =
    urlParams.get("category");


// If category exists in URL,
// select it in the dropdown
if (urlCategory && categoryFilter) {

    categoryFilter.value = urlCategory;

}

    function displayMyNotes() {

        const notes =
            JSON.parse(localStorage.getItem("notes")) || [];


        const searchText =
            searchInput.value.toLowerCase();


        const selectedCategory =
            categoryFilter.value;


        const filteredNotes =
            notes.filter(function(note) {

                const matchesSearch =
                    note.title
                        .toLowerCase()
                        .includes(searchText)
                    ||
                    note.content
                        .toLowerCase()
                        .includes(searchText);


                const matchesCategory =
                    selectedCategory === "all"
                    ||
                    note.category === selectedCategory;


                return matchesSearch &&
                       matchesCategory;

            });


        myNotesContainer.innerHTML = "";


        if (filteredNotes.length === 0) {

            myNotesContainer.innerHTML = `
                <div class="empty-message">

                    <h3>No notes found</h3>

                    <p>
                        Try another search or category.
                    </p>

                </div>
            `;

            return;
        }


        filteredNotes.forEach(function(note) {

            const noteCard =
                document.createElement("div");


            noteCard.classList.add("note-card");


            noteCard.innerHTML = `

                <div class="note-card-header">

                    <h3>
                        ${note.title}
                    </h3>

                    <span>
                        ${note.favorite ? "★" : "☆"}
                    </span>

                </div>


                <p class="note-content">
                    ${note.content}
                </p>


                <div class="note-card-footer">

                    <span>
                        📂 ${note.category}
                    </span>

                    <div>

                        <button 
                        class="view-btn"
                        data-id="${note.id}">
                        View
                        </button>

                        <button
                            class="edit-btn"
                            data-id="${note.id}">
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            data-id="${note.id}">
                            Delete
                        </button>

                    </div>

                </div>

            `;


            myNotesContainer.appendChild(noteCard);

        });

        // View buttons

const viewButtons =
    document.querySelectorAll(".view-btn");

viewButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const noteId =
            button.dataset.id;

        window.location.href =
            `note-details.html?id=${noteId}`;

    });

});
        // Edit buttons

        const editButtons =
            myNotesContainer
                .querySelectorAll(".edit-btn");


        editButtons.forEach(function(button) {

            button.addEventListener("click", function() {

                const noteId =
                    button.dataset.id;

                window.location.href =
                    `create-note.html?edit=${noteId}`;

            });

        });


        // Delete buttons

        const deleteButtons =
            myNotesContainer
                .querySelectorAll(".delete-btn");


        deleteButtons.forEach(function(button) {

            button.addEventListener("click", function() {

                const noteId =
                    Number(button.dataset.id);


                let notes =
                    JSON.parse(
                        localStorage.getItem("notes")
                    ) || [];


                notes =
                    notes.filter(function(note) {

                        return note.id !== noteId;

                    });


                localStorage.setItem(
                    "notes",
                    JSON.stringify(notes)
                );


                displayMyNotes();

            });

        });

    }


    // Initial display

    displayMyNotes();


    // Search

    searchInput.addEventListener(
        "input",
        displayMyNotes
    );


    // Category filter

    categoryFilter.addEventListener(
        "change",
        displayMyNotes
    );

}

// ========================================
// Favorites Page
// ========================================

const favoritesContainer =
    document.getElementById("favorites-container");


if (favoritesContainer) {

    function displayFavorites() {

        const notes =
            JSON.parse(localStorage.getItem("notes")) || [];


        // Get only favorite notes

        const favoriteNotes =
            notes.filter(function(note) {

                return note.favorite === true;

            });


        // Clear container

        favoritesContainer.innerHTML = "";


        // If no favorite notes

        if (favoriteNotes.length === 0) {

            favoritesContainer.innerHTML = `

                <div class="empty-message">

                    <h3>No favorite notes yet</h3>

                    <p>
                        Click ☆ on a note to add it
                        to your favorites.
                    </p>

                </div>

            `;

            return;

        }


        // Display favorite notes

        favoriteNotes.forEach(function(note) {

            const noteCard =
                document.createElement("div");


            noteCard.classList.add("note-card");


            noteCard.innerHTML = `

                <div class="note-card-header">

                    <h3>
                        ${note.title}
                    </h3>

                    <button
                        class="favorite-remove-btn"
                        data-id="${note.id}">

                        ★

                    </button>

                </div>


                <p class="note-content">
                    ${note.content}
                </p>


                <div class="note-card-footer">

                    <span>
                        📂 ${note.category}
                    </span>


                    <div>

                        <button
                            class="edit-btn"
                            data-id="${note.id}">

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            data-id="${note.id}">

                            Delete

                        </button>

                    </div>

                </div>

            `;


            favoritesContainer.appendChild(noteCard);

        });


        // Remove from Favorites

        const favoriteButtons =
            favoritesContainer.querySelectorAll(
                ".favorite-remove-btn"
            );


        favoriteButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const noteId =
                        Number(button.dataset.id);


                    let notes =
                        JSON.parse(
                            localStorage.getItem("notes")
                        ) || [];


                    notes = notes.map(
                        function(note) {

                            if (note.id === noteId) {

                                note.favorite = false;

                            }

                            return note;

                        }
                    );


                    localStorage.setItem(
                        "notes",
                        JSON.stringify(notes)
                    );


                    displayFavorites();

                }
            );

        });


        // Edit buttons

        const editButtons =
            favoritesContainer.querySelectorAll(
                ".edit-btn"
            );


        editButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const noteId =
                        button.dataset.id;


                    window.location.href =
                        `create-note.html?edit=${noteId}`;

                }
            );

        });


        // Delete buttons

        const deleteButtons =
            favoritesContainer.querySelectorAll(
                ".delete-btn"
            );


        deleteButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const noteId =
                        Number(button.dataset.id);


                    let notes =
                        JSON.parse(
                            localStorage.getItem("notes")
                        ) || [];


                    notes =
                        notes.filter(
                            function(note) {

                                return note.id !== noteId;

                            }
                        );


                    localStorage.setItem(
                        "notes",
                        JSON.stringify(notes)
                    );


                    displayFavorites();

                }
            );

        });

    }


    // Display favorites when page loads

    displayFavorites();

}

// ========================================
// Categories Page
// ========================================

const categoryCards =
    document.getElementById("category-cards");


if (categoryCards) {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];


    const categories = [
        {
            name: "Study",
            icon: "📚"
        },
        {
            name: "Personal",
            icon: "👤"
        },
        {
            name: "Ideas",
            icon: "💡"
        },
        {
            name: "Projects",
            icon: "💻"
        },
        {
            name: "Others",
            icon: "📁"
        }
    ];


    categories.forEach(function(category) {

        const categoryNotes =
            notes.filter(function(note) {

                return note.category === category.name;

            });


        const card =
            document.createElement("div");


        card.classList.add("category-card");


        card.innerHTML = `

            <div class="category-icon">
                ${category.icon}
            </div>

            <h3>
                ${category.name}
            </h3>

            <p>
                ${categoryNotes.length} 
                ${categoryNotes.length === 1
                    ? "note"
                    : "notes"}
            </p>

            <button
                class="view-category-btn"
                data-category="${category.name}">

                View Notes

            </button>

        `;


        categoryCards.appendChild(card);

    });


    // View category notes

    const categoryButtons =
        document.querySelectorAll(
            ".view-category-btn"
        );


    categoryButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const category =
                    button.dataset.category;


                window.location.href =
                    `my-notes.html?category=${category}`;

            }
        );

    });

}

// ========================================
// Note Details
// ========================================

const detailTitle =
    document.getElementById("detail-title");

const detailCategory =
    document.getElementById("detail-category");

const detailContent =
    document.getElementById("detail-content");


if (detailTitle && detailCategory && detailContent) {

    // Get note ID from URL

    const urlParams =
        new URLSearchParams(window.location.search);

    const noteId =
        Number(urlParams.get("id"));


    // Get notes from localStorage

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];


    // Find the selected note

    const note =
        notes.find(function(note) {

            return note.id === noteId;

        });


    // Display note

    if (note) {

        detailTitle.textContent =
            note.title;

        detailCategory.textContent =
            "📂 " + note.category;

        detailContent.textContent =
            note.content;

    }

}

// ========================================
// Note Details Buttons
// ========================================

const detailEditButton =
    document.getElementById("detail-edit-btn");

const backButton =
    document.getElementById("back-btn");


if (detailEditButton) {

    detailEditButton.addEventListener("click", function() {

        const urlParams =
            new URLSearchParams(window.location.search);

        const noteId =
            urlParams.get("id");

        window.location.href =
            `create-note.html?edit=${noteId}`;

    });

}


if (backButton) {

    backButton.addEventListener("click", function() {

        window.location.href =
            "my-notes.html";

    });

}

// ========================================
// Note Details - Favorite & Delete
// ========================================

const detailFavoriteButton =
    document.getElementById("detail-favorite-btn");

const detailDeleteButton =
    document.getElementById("detail-delete-btn");


if (detailFavoriteButton) {

    const urlParams =
        new URLSearchParams(window.location.search);

    const noteId =
        Number(urlParams.get("id"));

    let notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    // Show current favorite status
    const currentNote =
        notes.find(function(note) {
            return note.id === noteId;
        });

    if (currentNote && currentNote.favorite) {
        detailFavoriteButton.textContent = "★ Favorite";
    } else {
        detailFavoriteButton.textContent = "☆ Favorite";
    }


    // Favorite button click
    detailFavoriteButton.addEventListener("click", function() {

        let notes =
            JSON.parse(localStorage.getItem("notes")) || [];

        notes = notes.map(function(note) {

            if (note.id === noteId) {
                note.favorite = !note.favorite;
            }

            return note;

        });

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        // Update button immediately
        const updatedNote =
            notes.find(function(note) {
                return note.id === noteId;
            });

        if (updatedNote.favorite) {
            detailFavoriteButton.textContent = "★ Favorite";
        } else {
            detailFavoriteButton.textContent = "☆ Favorite";
        }

    });

}


if (detailDeleteButton) {

    detailDeleteButton.addEventListener("click", function() {

        const confirmDelete =
            confirm("Are you sure you want to delete this note?");


        if (!confirmDelete) {
            return;
        }


        const urlParams =
            new URLSearchParams(window.location.search);

        const noteId =
            Number(urlParams.get("id"));


        let notes =
            JSON.parse(localStorage.getItem("notes")) || [];


        notes = notes.filter(function(note) {

            return note.id !== noteId;

        });


        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );


        alert("Note deleted successfully!");


        window.location.href =
            "my-notes.html";

    });

}

// ========================================
// Navbar Search Button
// ========================================

const searchButton =
    document.getElementById("search-btn");


if (searchButton) {

    searchButton.addEventListener("click", function() {

        window.location.href =
            "my-notes.html";

    });

}

// ========================================
// Dark Mode
// ========================================

const themeButton =
    document.getElementById("theme-btn");


// Check saved theme

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


if (themeButton) {

    themeButton.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            themeButton.textContent = "☀️";

        }

        else {

            localStorage.setItem("theme", "light");

            themeButton.textContent = "🌙";

        }

    });

}