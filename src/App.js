import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  InputGroup,
} from "reactstrap";
import "./App.css";
import  DateDisplayer from './Components/DateDisplayer';
import UserFetcher from "./Components/userFetcher";

function App() {
  return (
    <div className="container">
      <h1 className="text-center py-4">Welcome to Resly Coding Challenge</h1>

      <div>
        <p>
          <strong>Instructions</strong>
        </p>
        <p>1. Please use React Hooks for all the tests.</p>
        <p>
          2. We use reactstrap as a front-end UI library. You can find the{" "}
          <a
            href="https://reactstrap.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            documentation here
          </a>
        </p>
      </div>

      <Test1 />
      <Test2 />
      <Test3 />
    </div>
  );
}

const Test1 = () => {
  // TASK
  // 1. Click each fruit button will add 1 for its color in summary result
  // 2. Display the summary in the <div> below. Design it the way how it should look like.
  // Bonus: Try to only use one handleCount function and one state for all buttons

  const [result, setResult] = useState({ red: 0, green: 0, orange: 0 });

  const handleCount = (colorClicked) => {
    
    // the prevState in the setResult function helps update value of a desired property while keeping rest of the property in the result object

    if (colorClicked === "red"){
      setResult((prevState) => {
        return {...prevState, red: result["red"] + 1}
      })
    } else if (colorClicked === "green") {
      setResult((prevState) => {
        return {...prevState, green: result["green"] + 1}
      })
    } else if (colorClicked === "orange") {
      setResult((prevState) => {
        return {...prevState, orange: result["orange"] + 1}
      })
    }

    console.log(result)
  };

  return (
    <Card className="mb-4">
      <CardHeader>Test 1 - Color Count</CardHeader>
      <CardBody className="m-3">

        <h5>Click the buttons below to count the number of red apples, green apples and oranges you have.</h5>

        {/* when the buttons are clicked, the handleCount function is executed based on the value passed */}
        <div>
          <Button onClick={() => handleCount("red")}>🍎</Button>
          <Button  onClick={() => handleCount("green")} className="m-4">🍏</Button>
          <Button onClick={() => handleCount("orange")} >🍊</Button>
        </div>

        <h3 className="mt-4">Result: You've got</h3>
        <div>
          <h4>🍎: {result.red}</h4>
          <h4>🍏: {result.green}</h4> 
          <h4>🍊: {result.orange}</h4>
        </div>
      </CardBody>
    </Card>
  );
};

const Test2 = () => {
  // TASK
  // 1. Click Go and validate if the date entered is in the future, design an error response if the date is invalid.
  // 2. calculate the date difference from today and display to the end user

  const [enteredData, setEnteredData] = useState({userEnteredDate: '', daysLeft: 0})
  
  // turning a day into millisecond 
  let oneDay    = 1000 * 60 * 60 * 24 
  let newDate   = new Date();
  let userDate  = new Date(enteredData.userEnteredDate);

  // Calculating the time difference between the two time
  // getTime() function returns milliseconds of the given date
  const timeDiff = Math.round((userDate.getTime() - newDate.getTime()) / oneDay)

  // adding two-way binding to the input field and the display
  const dateChangeHandler = (event) => {
    setEnteredData((prevState) => {
      return {... prevState, userEnteredDate: event.target.value}
    });
  }

  // the submitHandler function updates the state once the form is submitted
  const submitHandler = (event) => {
    event.preventDefault();

    // condition to handle empty field
    if (enteredData.userEnteredDate === '') {
      setEnteredData({
        userEnteredDate: "YYYY-MM-DD",
        daysLeft: timeDiff 
      })
    } else {
      setEnteredData({
        userEnteredDate: enteredData.userEnteredDate,
        daysLeft: timeDiff 
      })

    }
    
  }

  return (
    <Card className="mb-4">
      <CardHeader>Test 2 - Date</CardHeader>
      <CardBody className="m-3">
        <div className="mb-4">
        <h5>Entered any date and press "Go" to find the date difference from today.</h5>
        <p><strong>Note:</strong> The entered date cannot be in the past.</p>
        <br></br>
          <form onSubmit={submitHandler}>
            <InputGroup>
              <Input type="date" onChange={dateChangeHandler} value={enteredData.userEnteredDate}/>
              <Button>Go</Button>
            </InputGroup>
          </form>
        </div>
        {/* This custom component takes in the user entered date and the time difference to render result or and error message if the entered date is in the pase. */}
        <DateDisplayer displayDate={enteredData.userEnteredDate} displayDays={enteredData.daysLeft}/>
      </CardBody>
    </Card>
  );
};

const Test3 = () => {
  // TASK
  // 1. Click the button and fetch a random user from `https://jsonplaceholder.typicode.com/users` using async/await
  // 2. Display the user information in the <div> using your UI design skill, try to utilize the boostrap and reactstrap library and be as creative as you want here.


  // for this task, we have two options to fetch data from the given url.
  // The first is using Axios, a promise based Http client for node.js that allows us to perform http request and the second is the JavaScript in-build fetch function.
  // for this task, we will be using the in-build fetch function using async/await.
  
  const url                               = "https://jsonplaceholder.typicode.com/users";
  const [fetchedUsers, setFetchedUsers]   = useState([]);
  const [isLoading, setIsLoading]         = useState(false);

  // the user needs to know that the process is working in the background. isLoading is used to display a loading message while the data is being fetched.

  async function fetchUserHandler() {
    
    // since we are fetching data, isLoading is set to true. * It displays the "loading ..." message
    setIsLoading(true);

    // since by default it sends get request, we do not need to add in the specific method. 
    const response  = await fetch(url);
    const data      = await response.json();
    const x         = Math.floor((Math.random() * data.length))

    // fetching the data of random user using a random number generated using Javascript Math function above.
    // Once the data is received, it is added into transformUserData object to handel any empty object error when displaying user details.
    const transformUserData = {
      id:                   data[x].id,
      name:                 data[x].name,
      username:             data[x].username,
      email:                data[x].email,
      address:              `${data[x].address.suite}, ${data[x].address.street}, ${data[x].address.city}, ${data[x].address.zipcode}`,
      phone:                data[x].phone,
      website:              data[x].website,
      companyName:          data[x].company.name,
      companyCatchPhrase:   data[x].company.catchPhrase,
      companyBS:            data[x].company.bs
    }

    // once the desired data is fetched and updated in transformUserData, we update the state of fetchedUser
    // we also set isLoading to false as the data has already been received and there is no longer the need to display loading message.
    setFetchedUsers(transformUserData);
    setIsLoading(false);
  } 

  return (
    <Card className="mb-4">
      <CardHeader>Test 3 - User information</CardHeader>
      <CardBody className="m-3">
        <h5>Select the button below to fetch information of random users.</h5><br></br>
        <div>
          <Button onClick={fetchUserHandler}>Fetch User</Button>
        </div>

        <h3 className="mt-4">Result:</h3>
        {!isLoading && fetchedUsers.id > 0 && <UserFetcher userData={fetchedUsers} />}
        {!isLoading && fetchedUsers.length === 0 && <p>No users found!</p>}
        {isLoading && <p>Loading ...</p>}
      </CardBody>
    </Card>
  );
};

export default App;
