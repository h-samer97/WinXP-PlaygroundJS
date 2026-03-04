export default class Network {
    async getNetworkInformations() {
        try {
            const res = await fetch('https://ipapi.co/json/');
            
            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            return data;

        } catch (error) {
            console.error("Network Info Error:", error);
            
            return {
                ip: "127.0.0.1",
                city: "Localhost",
                country_name: "localhost",
                org: "None (Too many requests - 429)",
                region: "N/A"
            };
        }
    }
}