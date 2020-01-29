import React from 'react';

function BookView(props) {
    var bookFontColorStyle = {
        color: "rgba(0,0,0,0.8)"
    }

    var bookCoverStyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        boxShadow: "0 4px 4px rgba(0,0,0,0.25"
    }

    var bookTitleStyle = {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "1.3rem",
        fontWeight: "500",
        marginTop: "1rem"
    }

    var bookAuthorAndPriceStyle = {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "1.2rem",
        fontWeight: "300"
    }

    var boldStyle = {
        fontWeight: "400"
    }

    return (
        <div className="my-5 mx-xl-3" style={bookFontColorStyle}>
            <img src={props.cover} alt="..." style={bookCoverStyle}/>
            <h2 style={bookTitleStyle}>{props.title}</h2>
            <h3 style={bookAuthorAndPriceStyle}>by <span style={boldStyle}>{props.author}</span></h3>
            <h3 style={bookAuthorAndPriceStyle}>Price: <span style={boldStyle}>{props.price}$</span></h3>
            <button type="button" className="btn btn-success btn-block py-2 shadow">Add to shopping cart</button>
        </div>
    );
}

export default BookView;