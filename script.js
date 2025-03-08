async function checkServer() {
    const serverIP = document.getElementById("serverIP").value;
    if (!serverIP) {
        alert("Please enter a server IP!");
        return;
    }

    const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;
    document.getElementById("result").innerHTML = "Checking...";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.online) {
            document.getElementById("result").innerHTML = `
                <div class="status-box offline">⛔ Server is Offline</div>
                <p><strong>Host:</strong> ${serverIP}</p>
                <p><strong>Port:</strong> ${data.port || "25565"}</p>
            `;
            return;
        }

        document.getElementById("result").innerHTML = `
            <img src="${data.icon || 'https://via.placeholder.com/64'}" alt="Server Icon" class="server-icon">
            <div class="status-box online">✅ Server is Online</div>
            <p><strong>Host:</strong> ${serverIP}</p>
            <p><strong>Port:</strong> ${data.port || "25565"}</p>
            <p><strong>Players:</strong> ${data.players.online} / ${data.players.max}</p>
            <p><strong>Version:</strong> ${data.version || "Unknown"}</p>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "⚠️ Error fetching server data.";
    }
}
