import React from "react";
// import utilsFunctions from "../../../utils/utilsFunctions";

function Village({isGameOver}) {
    // const trees = new Array(utilsFunctions.getRandomInteger(1, 4))
    //     .map(tree => <div className={"tree"} style={{}}/>);

    return (
        <>
            {/*{trees}*/}
            <div className={`${isGameOver ? "" :""} house`} />
            <div className={`${isGameOver ? "" :""} house1`} />
        </>
    );
}

export default Village;
