import React from 'react'
import './style.css';


export default class Location extends React.Component{
    render() {
        return (
            <div className='mainContainer'>
                <div className='nestedWrapper'>
                    <h1>abc</h1>
                    <div className='mapWrapper'>

                    </div>
                    <button className='submitButton'>Submit</button>
                </div>
            </div>
        )
    }
}