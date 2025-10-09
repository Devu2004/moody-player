# Moody Player 🎵

Moody Player is a **mood-based music player** that detects the user's mood using facial expressions via **FaceAPI.js** and suggests songs accordingly. It combines **React** on the frontend and **Node.js/Express** on the backend, with **MongoDB** for storing song data and **ImageKit** for handling images.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)

## Features
- Detects **user mood** through webcam using **FaceAPI.js**.
- Suggests **songs** based on detected mood.
- Smooth **React frontend** interface with easy-to-use music player.
- Songs and images served via **ImageKit** for fast delivery.
- Stores song and user data in **MongoDB**.
- Handles **file uploads** using Multer.
- Secure environment variables using **dotenv**.
- Cross-origin requests handled with **CORS**.

## Technologies Used

### Frontend
- **React** `^19.1.1`
- **React DOM** `^19.1.1`
- **FaceAPI.js** `^0.22.2` — for facial expression detection
- **Axios** `^1.12.2` — for API requests

### Backend
- **Node.js / Express** `^5.1.0`
- **Mongoose** `^8.19.0` — MongoDB ODM
- **Multer** `^2.0.2` — for file uploads
- **ImageKit / @imagekit/nodejs** `^7.1.1` — for image hosting
- **dotenv** `^17.2.3` — for environment variables
- **CORS** `^2.8.5` — to handle cross-origin requests

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/devu2004/moody-player.git
cd moody-player

cd backend
npm install

cd ../frontend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

cd backend
npm run start

cd frontend
npm start


```
## Contributing
Contributions are welcome!  
1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add YourFeature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Create a pull request

## Author
**Devansh Gupta**  
- GitHub: [Github](https://github.com/Devu2004)  
- LinkedIn: [LinkedIn](https://linkedin.com/in/devansh-techie)



