# Overlook Hotel 



## Project Repo
https://github.com/Logandv3/overlook-hotel


## Deployable link
N/A


## Technologies Used
* Code: HTML, SCSS, JavaScript
* TDD: Mocha, Chai
* Compiler: Webpack
* Accessibility: Lighthouse & Wave
* Linter: eslint
* Debugging: Chrome Dev Tools
* Version Control/Management: Git/Github/Github Projects


## Setup
- Fork this web app to your own Github account
- Clone the repository to your local machine
- `cd` into the file
- run `npm install`.
- Run `npm start` and visit `localhost:8080`


## Project Overview
The goal of the project was to build a hotel management tool for hotel customers and staff to manage room bookings and calculate customer bills.


## Learning Goals
* Use OOP to drive the design of the application and the code
* Work with an API to send and receive data
* Solidify the code review process
* Create a robust test suite that thoroughly tests all functionality of a client-side application


## How to Use

- Upon loading the user will be shown a login page.  If the credentials match that of the API then the user will be directed to a dashboard showing their name, total money spent thus far and upcoming stays.
- The user can search for future stay options by selecting a checkin and checkout date.  They can also filter those results further by selecting room types to search by. 
- After searching for available rooms the user will be shown a list of rooms that match the criteria entered.  Each item includes the details about the room including cost, type, bed size, number of beds, room number and if a bidet is available in that room.
- If the user is interested in a particular room they can click on the room to be taken to a view showing the details and giving an option to book that room for that date. If the user wishes to return to their search results or view their booked stays they can do so by clicking on the corresponding buttons.
- Once the user books a stay the API will be updated and their total money spent, upcoming stays and what appears on the page will all be updated.


![Customer Login](https://user-images.githubusercontent.com/81990507/135199418-2b36ab09-85a0-4014-b4ef-414d1d587187.png)


![Customer Dashboard](https://user-images.githubusercontent.com/81990507/135199599-93d043a4-cb6c-4631-9803-41d7902b43ed.png)

![Search Recording.gif.zip](https://github.com/Logandv3/overlook-hotel/files/7248727/Search.Recording.gif.zip)


## Wins
Most of project went smoothly and I felt like I wrote good code.  It wasn't until the end(short on time) where I started writing code that wasn't very good and started causing me issues.

Successfully using the Fetch API (GET & POST)


## Challenges
I think there was bit of asynchronous activity that was throwing me off a bit.  I definitely need to go back in a make sure the order of things is correct.   

I didn't have as much time for this as I would have liked so I began to write sloppy code at the end when I didn't have as much time.  As a result I wasn't able to spend as much time setting up my SCSS as I wanted.


## Reflections
There is a lot of organization anbd reusabilty I would would change about this.  I think it taught me a lot about the importance of coming up with a good plan before I start laying out code.


## Future Plans
I would like to make sure API and DOM are updating at the appropriate time.  Would like to make older stays show up in a different section and do something about how old the info in the API is compared to todays date and make it more relevant.  I would also like to get to a manager dashboard and functionality from their standpoint.



## Contributors
- [Logan Vincent](https://github.com/Logandv3)

