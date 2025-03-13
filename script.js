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