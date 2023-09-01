# Image Gallery


*This repository contains a simple Image Gallery web application that allows users to upload images from their local storage to the server. 
The uploaded images are stored in the **'public/images'** folder, and they can be accessed through API endpoints. 
This project demonstrates the use of npm packages like multer for handling file uploads, axios for communication with the server, and various <b>middleware</b> on the server.*

  <img  align="center" src="https://github.com/aswintrikkur/Image_gallery/assets/125629462/83e53c66-188a-4a2d-8769-2741435b6a90" 
    alt="user-interface" width="700"  >

<br>

<!--
## Table of Contents

- [Project Title](#Image Gallery with Image Upload Demonstration)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Starting the Client](#starting-the-client)
  - [Uploading Images](#uploading-images)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [License](#license)
- [Contributing](#contributing)

-->


## Technologies Used

- **Client**: React
- **Server**: Node.js, Express
- **Image Upload**: npm multer
- **API Communication**: Axios
- **Middleware**: Application level Middleware, Router level Middleware, Specific Middleware

## Dependencies

- [cors](https://www.npmjs.com/package/cors): CORS middleware for Express.
- [nodemon](https://www.npmjs.com/package/nodemon): A utility that automatically restarts the server during development.
- [uuid](https://www.npmjs.com/package/uuid): For generating unique identifiers.
- [multer](https://www.npmjs.com/package/multer): Middleware for handling multipart/form-data, used for image uploads. 
- [express](https://www.npmjs.com/package/express): Web application framework for Node.js.
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js.
- [typeface-roboto](https://www.npmjs.com/package/typeface-roboto): A font package for the Roboto font family.

## Installation

1. Clone this repository to your local machine:
   
          git clone https://github.com/aswintrikkur/Image_gallery.git
          
2. Navigate to the project directory:

        cd Image_gallery

3. Install the dependencies for both the client and server:

       cd client
       npm install
   <br>

       cd ../server
       npm install


<!--
![image](https://github.com/aswintrikkur/Image_gallery/assets/125629462/83e53c66-188a-4a2d-8769-2741435b6a90)
-->
