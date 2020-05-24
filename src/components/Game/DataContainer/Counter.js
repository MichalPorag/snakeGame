import React from "react";

function DataContainer({score}) {
    return (
        <h4 className={"counter"}>
            Score: {score}
        </h4>
    );
}

export default DataContainer;