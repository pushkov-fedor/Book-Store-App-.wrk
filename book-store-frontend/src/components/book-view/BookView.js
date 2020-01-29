import React from 'react';

function BookView(props) {
    return (
        <div className="my-5 mx-xl-3" style={{color: "rgba(0,0,0,0.8)"}}>
            <img src={props.cover} alt="..." style={{height: "100%", width: "100%", objectFit: "cover", boxShadow: "0 4px 4px rgba(0,0,0,0.25"}}/>
            <h2 style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: "1.3rem", fontWeight: "500", marginTop: "1rem"}}>{props.title}</h2>
            <h3 style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: "1.2rem", fontWeight: "300"}}>by <span style={{fontWeight: "400"}}>{props.author}</span></h3>
            <h3 style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: "1.2rem", fontWeight: "300"}}>Price: <span style={{fontWeight: "400"}}>{props.price}$</span></h3>
            <button type="button" className="btn btn-success btn-block py-2 shadow">Add to shopping cart</button>
        </div>
    );
}

export default BookView;