
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-btn");
const searchInput = document.querySelector("#search-input");

fetchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim() || "funny";

    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=12`;

    gifContainer.innerHTML = "<p>Loading GIFs...</p>";

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Failed to fetch GIFs");
        }

        const data = await response.json();

        const images = data.data
            .map(gif => gif.images.original.url);

        console.log(images);

        gifContainer.innerHTML = "";

        images.forEach(imageUrl => {
            gifContainer.innerHTML += `
                <img
                    src="${imageUrl}"
                    class="col-3 mb-3"
                    alt="Search result GIF"
                >
            `;
        });

        if (images.length === 0) {
            gifContainer.innerHTML = "<p>No GIFs found.</p>";
        }

    } catch (error) {
        console.error(error);
        gifContainer.innerHTML =
            "<p>Something went wrong. Please try again.</p>";
    }
});
