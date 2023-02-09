# Drone-Simulator

* To start the application

  -> Open index.html and add your Google Api key in the script.
      key=YOUR_GOOGLE_API_KEY
      
  -> Run ````npm install```` to install all the dependency in user's local.
      
  -> Run the application using command ````ng serve```` and application will be running on http://localhost:4200/
      
  <img width="1470" alt="Screenshot 2023-02-09 at 11 48 42 AM" src="https://user-images.githubusercontent.com/29457947/217733825-87a5831e-71c6-4003-b24b-7b64a8dbc8d7.png">

* User can upload json file with inputs or can add data in the input fields, as shown.
  ```json
    [{
        "time": 0,
        "x_lat": 37.1,
        "y_long": -122.1
    },
    {
        "time": 20,
        "x_lat": 37.3,
        "y_long": -122.3
    },
    {
        "time": 15,
        "x_lat": 38.4,
        "y_long": -122.4
    },
    {
        "time": 30,
        "x_lat": 37.6,
        "y_long": -122.6
    },
    {
        "time": 50,
        "x_lat": 37.9,
        "y_long": -122.9
    }]



* Click on simulate button to simulate a drone and track the path.
<img width="1470" alt="Screenshot 2023-02-09 at 11 53 46 AM" src="https://user-images.githubusercontent.com/29457947/217734433-dbd0125c-b874-4e12-839f-29ab6b729145.png">

* User can click on Pause/Resume button to pause and resume the simulation. Additionally, a seek bar is provided to scroll the drone to desired location during simulation.
<img width="1470" alt="Screenshot 2023-02-09 at 11 54 02 AM" src="https://user-images.githubusercontent.com/29457947/217734605-e8292d10-6ad9-4e7a-9984-ffc1f74675b7.png">

