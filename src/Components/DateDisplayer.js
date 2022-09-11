import React from 'react';

const DateDisplayer = (props) => {
    if (props.displayDays < 0){
        return (
            <h6><strong>Error:</strong> The entered date cannot be in the past. Please enter new date.</h6>
        )
    } else {
        if (props.displayDate === "YYYY-MM-DD") {
            return (
                <h6>Error: the date field cannot be empty.</h6>
            )
        } else {
            return (
                <div>
                    <h3 className="mt-4">Result:</h3>
                    <p>The date entered {props.displayDate} is <strong>{props.displayDays} days from today</strong></p>
                </div>
            )
        }
    }
}

export default DateDisplayer;