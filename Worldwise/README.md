# 🌍 WorldWise

A beautiful travel tracking application that helps you keep track of your adventures around the world. Visualize your journeys on an interactive map and never forget your wonderful experiences.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet)

## ✨ Features

- 🗺️ **Interactive World Map** - Track your footsteps on an interactive Leaflet map
- 🏙️ **City Tracking** - Add cities you've visited with notes and dates
- 🌍 **Country Overview** - See all countries you've visited at a glance
- 📅 **Date Tracking** - Record when you visited each location
- 🔐 **User Authentication** - Secure login system to protect your travel data
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Worldwise
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the mock API server (in a separate terminal):
```bash
npm run server
```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Modern UI library with hooks and context
- **Vite** - Next-generation frontend tooling
- **React Router v6** - Declarative routing for React
- **Leaflet & React-Leaflet** - Interactive maps
- **React Datepicker** - Date selection component
- **CSS Modules** - Scoped component styling
- **JSON Server** - Mock REST API for development

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Map.jsx         # Interactive map component
│   ├── CityList.jsx    # List of visited cities
│   ├── CityItem.jsx    # Individual city display
│   ├── CountryList.jsx # List of visited countries
│   ├── Form.jsx        # Add new city form
│   └── ...
├── pages/              # Route-level components
│   ├── Homepage.jsx    # Landing page
│   ├── AppLayout.jsx   # Main app layout
│   ├── Login.jsx       # Authentication page
│   ├── Product.jsx     # Product info page
│   └── Pricing.jsx     # Pricing page
├── contexts/           # React contexts
│   ├── citiesContext.jsx    # Cities state management
│   └── fakeAuthContext.jsx  # Authentication state
├── hooks/              # Custom React hooks
│   ├── useGeolocation.jsx   # Geolocation hook
│   └── useUrlPosition.jsx   # URL position params
└── data/               # Mock data
    └── cities.json     # Sample cities data
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start JSON Server mock API

## 🗺️ How to Use

1. **Login** - Use the demo credentials to access the app
2. **Explore the Map** - Click anywhere on the map to add a new city
3. **Add Cities** - Fill in the form with city details and your notes
4. **View Your Travels** - See all your cities in the sidebar and on the map
5. **Track Countries** - Switch to the countries view to see where you've been

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for travelers around the world
