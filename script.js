document.addEventListener("DOMContentLoaded", () => {
    // Function is used to simulate an asynchronous operation with a delay
    
    function asyncOperation() {
        return new Promise((resolve) => {
            // introducing  a delay of 2 seconds before resolving the promise.
            setTimeout(() => {
                
                resolve("Operation successful!");
            }, 2000);
        });
    }

    console.log("Before async operation");
    asyncOperation()
        .then((message) => console.log(message))
        .catch((error) => console.error(" Any Error in async operation:", error));
    console.log("After async operation completed");

    // Function to get cat breed data from the API
    async function fetchCatBreeds() {
        try {
            const response = await fetch("https://catfact.ninja/breeds");
            if (!response.ok) {
                throw new Error("Unable to retrieve cat breeds");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Unable to fetch cat breeds:", error);
            return null;
        }
    }
    // This Calls fetchCatBreeds and log the result
    fetchCatBreeds().then((data) => console.log(data));

    // Function to get  the choosen value from the dropdown menu.
    function getSelectedValue() {
        const dropdown = document.getElementById("factCount"); 
        return dropdown ? parseInt(dropdown.value, 10) || 5 : 5; 
    }

    // Function to fetch and display cat facts based on dropdown selection
    async function displayCatFacts() {
        const limit = getSelectedValue();
        try {
            const response = await fetch(`https://catfact.ninja/facts?limit=${limit}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cat facts");
            }
            const data = await response.json();

            const factsContainer = document.getElementById("factsContainer");
            if (!factsContainer) {
                console.error(" Not able to find the container for displaying facts in the DOM.");
                return;
            }

            factsContainer.innerHTML = ""; 
            data.data.forEach((factObj) => {
                const p = document.createElement("p");
                p.textContent = factObj.fact;
                factsContainer.appendChild(p);
            });
        } catch (error) {
            console.error("Error fetching cat facts:", error);
        }
    }

    // Attach event listener to button for fetching and displaying cat facts
    const factsButton = document.getElementById("showFactsButton");
    if (factsButton) {
        factsButton.addEventListener("click", displayCatFacts);
    } else {
        console.error("Error: Button with ID 'showFactsButton' not found.");
    }

    // Object representing the Samurai Pizza Cats team
    const samuraiPizzaCats = {
        leader: "Speedy Cerviche",
        members: 3,
        base: {
            baselocation: "Little Tokyo",
            name: "Pizza Cat Restaurant",
        },
        catchphrase: "It's cheese time!",
    };

    // Destructuring  extract the team leader and base location
    const { leader, base: { baselocation } } = samuraiPizzaCats;
    console.log("Samurai Pizza Cats team leader:", leader);
    console.log("Samurai Pizza Cats Headquarters Location:", baselocation);
});

