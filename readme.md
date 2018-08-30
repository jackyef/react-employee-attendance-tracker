# react-employee-attendance-tracker
This is a simple Employees Attendance Tracker web-app developed using React!

Try it live here: https://employee-attendance-tracker.herokuapp.com/

This is NOT a full-featured Employee Attendance Tracker. Some notable points:

  - There are no logins as of now, just use the app right away
  - The app currently does not log check-in and check-out time  
  - The codebase probably needs to be refactored

Because the project has a 3 days deadline, I only included some main features.
            
## Features
- CRUD operations on employees data - 
- Marking employee as "Present", "Sick", "Vacation", or "Absent" 
- Shows employee statistics for the past 30 and 365 days 
- Displays a graph of employee stats for the past 12 months 
- Fully responsive design to fit every screen-size (try rotating your device!) 
- Backed by ExpressJS and MongoDB (hosted on mLab) 

## Libraries used
- axios
- moment
- mongoose
- express + body-parser
- dotenv

## Third-party react component used
- react-highcharts
- react-spinners
- react-router-dom
- react-datepicker (because firefox doesn't support HTML5 date inputs)

Built with React + <3