Project Name: Windows XP Web Simulation
Description: A web-based recreation of the Windows XP desktop environment using modern JavaScript and CSS.

Key Features:
- Class-based Architecture: Built using OOP principles for Windows, Network, and Desktop management.
- Dynamic Window System: Supports rendering multiple windows with custom titles and messages.
- Network Integration: Fetches IP, City, and Country data via API with a fallback "Offline Mode" (Error 429 handling).
- Persistent Storage: Saves user country data in LocalStorage to optimize API calls.
- Classic UI/UX: Faithful recreation of the Luna theme, Taskbar, Start Menu, and System Clock.
- System Sounds: Integration of original XP audio for startup, errors, and notifications.

Technical Stack:
- Logic: JavaScript ES6 (Async/Await, Promises, Template Literals).
- Styling: CSS3 (Bevel effects, Linear gradients, Fixed positioning).
- Data: JSON for application listing and API responses.

How it works:
- The system initializes the desktop and taskbar on load.
- Icons are draggable and support double-click to launch apps.
- A background process fetches network info after a delay and notifies the user via a system window.