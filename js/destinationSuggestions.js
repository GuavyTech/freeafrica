document.getElementById('searchInput').addEventListener('input', function() {
    const input = this.value.trim();  // Trim the input to remove any accidental spaces
    const suggestionBox = document.getElementById('suggestion-box');

    console.log("Current input:", input); // Log the current user input

    if (input.length > 0) {
        fetch('../php/getDestinations.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'query=' + encodeURIComponent(input)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log("Data received:", data); // Log the data to see what's received
            suggestionBox.innerHTML = ''; // Clear previous suggestions
            if (data.length) {
                suggestionBox.style.display = 'block';
                data.forEach(item => {
                    let div = document.createElement('div');
                    div.className = 'list-group-item list-group-item-action';
                    div.textContent = item;
                    div.onclick = function() {
                        document.getElementById('searchInput').value = this.textContent;
                        suggestionBox.style.display = 'none'; // Hide after selection
                    };
                    suggestionBox.appendChild(div);
                });
            } else {
                suggestionBox.style.display = 'none';
                console.log("No data to show."); // Log when no data is available
            }
        })
        .catch(error => {
            console.error('Error fetching suggestions:', error);
            suggestionBox.style.display = 'none';
        });
    } else {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
        console.log("Input cleared or empty."); // Log when input is cleared
    }
});
