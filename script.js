document.getElementById('freelance-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const exp = document.getElementById('exp').value;

    if (exp === 'no') {
        // Show the interest form for new users
        document.getElementById('freelance-form').style.display = 'none';
        document.getElementById('interest-form').style.display = 'block';
    } else {
        // Handle the case where the user is experienced (if needed)
        console.log('Experienced in freelancing');
    }
});

document.querySelectorAll('#interest-form-inner .btn-pill').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        updateSelectedInterests();
    });
});

document.getElementById('interest-form-inner').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const selectedInterests = document.getElementById('selected-interests').value;

    // Send data to the backend to get recommendations
    try {
        const response = await fetch('http://localhost:5500/api/get-recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ interests: selectedInterests.split(',') })
        });

        console.log('Response status:', response.status); // Log the response status

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();
        displayRecommendations(result);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('recommendations').innerText = 'An error occurred while getting recommendations.';
    }
});

function updateSelectedInterests() {
    const selectedButtons = document.querySelectorAll('#interest-form-inner .btn-pill.active');
    const interests = Array.from(selectedButtons).map(button => button.getAttribute('data-value'));
    document.getElementById('selected-interests').value = interests.join(',');
}

function displayRecommendations(result) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<h3>Recommended Learning Resources:</h3>';

    if (Array.isArray(result.recommendations) && result.recommendations.length > 0) {
        result.recommendations.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<p><strong>${item.title}</strong>: ${item.description}</p>`;
            recommendationsDiv.appendChild(div);
        });
    } else {
        recommendationsDiv.innerHTML = '<p>No recommendations available.</p>';
    }
}
