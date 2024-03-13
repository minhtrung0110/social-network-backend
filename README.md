# SnapGram - Social Media Platform

SnapGram is a social media platform inspired by Instagram, allowing users to share moments and connect with friends in real-time. The platform is built using NestJs, Socket.io, Redis, JWT Authentication, Prisma, Pactum, and Docker.

## Overview

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Database](#database)
- [Testing](#testing)
- [Contribution](#contribution)
- [License](#license)

## Introduction

SnapGram provides users with a seamless and engaging experience for sharing visual content. The use of real-time communication and modern technologies enhances user interactions.

## Features

- **User Profiles:** Create and personalize profiles.
- **Media Sharing:** Share photos and videos effortlessly.
- **Real-time Updates:** Stay connected with friends through live updates.
- **Secure Authentication:** Use JWT for secure user authentication.
- **Efficient Database Operations:** Utilize Prisma for smooth database interactions.
- **Testing API:** Ensure reliability with Pactum for API testing.
- **Containerization:** Deploy and manage SnapGram using Docker.

## Technologies

- **Backend Framework:** NestJs
- **Real-time Communication:** Socket.io
- **Caching:** Redis
- **Authentication:** JWT Authentication
- **Database ORM:** Prisma
- **API Testing:** Pactum
- **Containerization:** Docker

## Getting Started

1. **Clone the Repository:**

```bash
   git clone https://github.com/minhtrung0110/social-network-backend
````
2. **Install Dependencies:**
````
yarn install
````
3. **Configure Environment:**

- Copy the .env.example file to .env and update the variables accordingly.

4. **Run the Application:**
````
            yarn dev
 ````
- Usage
Visit http://localhost:8888/api/v1 in your browser.
Sign up or log in with existing credentials.
Explore features, upload media, and connect with friends.

5. **Database**
![social-netWork.svg](social-netWork.svg)

6. **Testing**
- Ensure code reliability with Pactum for API testing.

7**Contribution**
- Contributions are welcome! Please follow our Contribution Guidelines.

8**License**
- This project is licensed under the MIT License.