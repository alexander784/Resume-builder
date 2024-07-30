## Resume Builder

<p> A web app for creating resumes.Built with React for the frontend and Flask backend, this app allow user to  edit, preview your resume and download the  resume. </p>

## Features

<p> User Authentication: Secure login and registration using JWT.</p>
<p>Resume Editor: Create and customize resumes with sections like Education Experience,Skills</p>
<p>Preview and Download: Preview resumes in real time and dowbload them as PDF</p>

# Demo:

## Getting Started with Rseume Builder

1. Clone the Repo: <br>
`git clone https://github.com/yourusername/resume-builder.git`
`cd resume-builder`

2. ## Backend Setup:

   <p> Navigate to the server directory and create your virtual env</p>

    `cd server` <br>
    `pipenv install && pipenv shell`

    <p>Install the required packages: </p>

    `pip install -r requirements.txt`

    <p>Setup your db:</p>
    `flask db init` <br>
    `flask db migrate`<br>
    `flask db upgrade`<br>


3. ## Frontend Setup:

 <p>Navigate to the client DIR:</p>

  `cd client` <br>
  `npm install`<br>


  ## Running the App

  1. Start the backend server

        cd server
        flask run

  2. Start the frontend server
   
    `cd client`
    `npm start`

  3. Access your App: Open your browser and go to: <br>
    `http://localhost:3000/` 


## Usage

1. Signup: Create an account using your email and password.

2. Edit a Resume Template 

3. Preview and Downlaod: Review your resume and downlaod as PDF.

## API Documentation
## The API provides endpoints for user authentication, resume management, and more. 
 ## Detailed API documentation is available here:https://resume-builder-lrvo.onrender.com/


## Contributing 

 All Contributions are welcome! 

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author 
 Alexander Nyaga.
 ## ga.nyaga7@gmail.com
















