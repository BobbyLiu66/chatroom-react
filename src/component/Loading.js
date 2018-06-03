import React from 'react';

const LoadingIcon = () => {
    return (
        <div className="text-center login-page">
        <div className="lds-css ng-scope">
            <div className="lds-ellipsis loading-size">
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div></div>
    )
};

export default LoadingIcon;
