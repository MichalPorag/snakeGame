import React from "react";

function Portal({isGameOver}) {
    return (
        <div className={`${isGameOver ? "hide" :""} wall`} />
    );
}

export default Portal;
