async function checkServer() {
    const serverIP = document.getElementById("serverIP").value.trim();
    if (!serverIP) {
        alert("Please enter a server IP!");
        return;
    }

    document.getElementById("result").innerHTML = '<div class="loader"></div>';
    document.getElementById("result-separator").style.display = 'none';

    const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.online) {
            document.getElementById("result").innerHTML = `
                <div class="server-info">
                    <img src="https://via.placeholder.com/64" alt="Server Icon" class="server-icon">
                    <div class="server-details">
                        <div class="server-name">${serverIP}</div>
                        <div class="server-status offline">⛔ Server Offline</div>
                    </div>
                </div>
                <p><strong>Host:</strong> ${serverIP}</p>
                <p><strong>Port:</strong> ${data.port || "25565"}</p>
            `;
            document.getElementById("result-separator").style.display = 'block';
            return;
        }
        let serverType = "Unknown";
        if (data.software) {
            serverType = data.software;
        } else if (data.version) {
            if (data.version.includes("Paper")) {
                serverType = "Paper";
            } else if (data.version.includes("Spigot")) {
                serverType = "Spigot";
            } else if (data.version.includes("Fabric")) {
                serverType = "Fabric";
            } else if (data.version.includes("Forge")) {
                serverType = "Forge";
            } else if (data.version.includes("Vanilla")) {
                serverType = "Vanilla";
            }
        }

        document.getElementById("result").innerHTML = `
            <div class="server-info">
                <img src="${data.icon || 'https://via.placeholder.com/64'}" alt="Server Icon" class="server-icon">
                <div class="server-details">
                    <div class="server-name">${data.hostname || serverIP}</div>
                    <div class="server-status online">✅ Server Online</div>
                </div>
            </div>
            <p><strong>Host:</strong> ${serverIP}</p>
            <p><strong>Port:</strong> ${data.port || "25565"}</p>
            <p><strong>Players:</strong> ${data.players.online} / ${data.players.max}</p>
            <p><strong>Version:</strong> ${data.version || "Unknown"}</p>
            <p><strong>Server Type:</strong> ${serverType}</p>
        `;
        document.getElementById("result-separator").style.display = 'block';
    } catch (error) {
        document.getElementById("result").innerHTML = "⚠️ Error fetching server data.";
        document.getElementById("result-separator").style.display = 'block';
    }
}
