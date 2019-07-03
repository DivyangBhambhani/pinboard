import React from 'react';
import Loader from 'react-loader-spinner';

export default class Loading extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="vertical-center">
                    <div className="col-md-12 text-center">
                        <Loader 
                            type="Bars"
                            color="#8a2be2"
                            height="60"	
                            width="60"
                        />
                    </div>
                </div>
            </div>
        );
    }
}