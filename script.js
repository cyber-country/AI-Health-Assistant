async function connectSensor() {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const reader = port.readable.getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const pulseData = new TextDecoder().decode(value);
            document.getElementById("pulse").innerText = pulseData;
        }
    } catch (error) {
        console.error("Serial Connection Error:", error);
    }
}

document.getElementById('connect-btn').addEventListener('click', connectSensor);
