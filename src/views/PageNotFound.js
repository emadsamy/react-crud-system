import React, { Component } from 'react';

class Home extends Component {
    componentDidMount() {
        document.title = "Page Not Found";
    }

    render() {
        return (
            <div className="page-not-found">
                <div style={{
                    backgroundColor: "#333",
                    color: "#FFF",
                    width: "500px",
                    borderRadius: "10px",
                    padding: "10px",
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "40px"

                }}>Page Not Found</div>
            </div>
        );
    }
}


export default Home;