# Customized Wedding Card Maker

This project is a **Wedding Card Maker** that allows users to create a personalized wedding card by adding text and images (bride and groom photos). Users can drag, resize, and customize the card's elements.

## Features:
- **Drag-and-drop functionality** for text and image elements.
- Ability to **resize text and images**.
- Input fields to enter details such as the bride’s name, groom’s name, venue, date, and time.
- Upload photos of the bride and groom.
- A download button to download the final wedding card as a PNG image.

## Live Demo
You can try out the live version of the Wedding Card Maker at the following link:

[Live Demo](https://customized-wedding-card-maker-8xn6.vercel.app/)

## Technologies Used
- React.js for the front-end framework.
- HTML2Canvas for capturing the card as an image.
- CSS for styling.

## Setup and Installation

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/VishalMaddheshiya2304/Customized-Wedding-Card-Maker
Install Dependencies
Navigate to the project directory and install the necessary dependencies:

bash
Copy code
cd Customized-Wedding-Card-Maker
npm install
Install html2canvas
This project uses the html2canvas library to convert the wedding card into an image that users can download. To install html2canvas, run the following command:

bash
Copy code
npm install html2canvas
Usage of html2canvas
Import: html2canvas is imported in the main component file (App.js).

Functionality: It captures the card's HTML structure, converts it into a canvas element, and generates a downloadable PNG image.

Integration Example:

javascript
Copy code
import html2canvas from "html2canvas";

const downloadCard = () => {
    const cardElement = document.getElementById("card"); // Reference to the wedding card container
    html2canvas(cardElement).then((canvas) => {
        const link = document.createElement("a");
        link.download = "wedding-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
};
This library powers the "Download Card" feature, allowing users to save their customized wedding card.

Run the Project Locally
To run the project on your local machine, use the following command:

bash
Copy code
npm start
The project will be available at http://localhost:3000/ in your web browser.

How to Use
Enter Text: Fill in the fields for the bride's name, groom's name, venue, date, and time.
Upload Photos: Upload the photos for the bride and groom.
Drag Items: You can drag and drop the text or images to reposition them on the card.
Resize Items: Use the "Increase Size" and "Decrease Size" buttons to adjust the size of the text and images.
Download: Click on the "Download Card" button to download the card as a PNG image.
File Structure
bash
Copy code
/public
  index.html          # The main HTML file
/src
  App.js              # Main React component
  App.css             # Styles for the application
  index.js            # Entry point for the React app
  /Images             # Folder containing template and other images
    template1.jpg     # Template 1 image
    template2.jpg     # Template 2 image
    ...               # Other image files
Potential Upgrades
To enhance the user experience, consider the following upgrades:

Add More Templates: Provide multiple card templates for users to choose from.
Font Customization: Allow users to change fonts, text color, and styles.
Undo/Redo Feature: Add functionality to undo or redo changes made to the card.
Save Progress: Enable saving and loading a user's progress for later edits.
Mobile Responsiveness: Optimize the UI for mobile devices.
Contributing
If you'd like to contribute to this project, feel free to open a pull request. Please make sure to follow the project's coding style and guidelines.
