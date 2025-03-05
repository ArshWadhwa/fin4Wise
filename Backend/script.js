document.getElementById('fetchInsights').addEventListener('click', async () => {
    const insightsDiv = document.getElementById('insights');
    insightsDiv.textContent = 'Loading...';

    try {
        const response = await fetch('http://localhost:5001/get-insights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: "Provide some money-saving tips." }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch insights.");
        }

        // Ensure the response has the expected structure
        if (data.choices && data.choices.length > 0) {
            insightsDiv.textContent = data.choices[0].message.content;
        } else {
            throw new Error("No insights found in the response.");
        }
    } catch (error) {
        console.error('Error fetching insights:', error);
        insightsDiv.textContent = 'Error: ' + error.message;
    }
});