import React from "react";
import { ErrorBoundary } from 'react-error-boundary';

function ErrorPage() {
    const errorStyle = {
        fontSize: "4rem",
        color: "white",
        display: "block",
        margin: "45vh auto 0 auto",
        backgroundColor: "#343F71",
        width: "fit-content",
        padding: 40,
        borderRadius: 30,
        boxShadow: "2px 2px 6px black"
    }

    return (
        <ErrorBoundary>   
            <h1 style={errorStyle}>INVALID PAGE!</h1>
        </ErrorBoundary>
    )
}

export default ErrorPage