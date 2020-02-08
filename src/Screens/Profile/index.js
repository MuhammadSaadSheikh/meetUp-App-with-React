import React from 'react'
import './style.css'

export default class Profile extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            flag: false,
            pictureArr: [],
            boolean: false,
            userName: '',
            usreNumber: '',
            beverages: [],
            timeduration : []
        }
    }
    render() {
        const { flag, boolean, pictureArr, userName, usreNumber, beverages, timeduration } = this.state
        const wrapper = this.state.flag ? {display: 'block'} : {display: 'none'}
        return (
            <div className='mainContainer'>
                <div className="neatedWrapper" style={{display:'none'}}>
                    <h1>Welcome</h1>
                    <div className='inputWrapper'>
                        <input type='text' value={userName} placeholder='Enter your nick Name' onChange={e=>this.setState({userName : e.currentTarget.value})}/>
                        <input type='number' value={usreNumber} placeholder='Enter your phone number' onChange={e => this.setState({usreNumber : e.currentTarget.value})}/>
                    </div>
                    <button className='nextButton'>Next</button>
                </div>
                <div className="optionsWrapper">
                    <div className='beverageWrapper'>
                        <h1>What do you want on meeting?</h1>
                        <div className='nestedchild'>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' checked/><label>Cocktail</label>
                            </div>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' /><label>Juice</label>
                            </div>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' /><label>Coffee</label>
                            </div>
                        </div>
                        <div className='buttonWrapper'>
                        <button className='nextBtn' onClick={this.setState({flag : true})}>NEXT</button>
                        </div> 
                    </div>                   
                </div>
                <div className="optionsWrapper" style={wrapper}>
                    <div className='beverageWrapper'>
                        <h1>What do you want on meeting?</h1>
                        <div className='nestedchild'>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' checked/><label>Cocktail</label>
                            </div>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' /><label>Juice</label>
                            </div>
                            <div className='checkBoxWrapper'>
                                <input type='checkbox' /><label>Coffee</label>
                            </div>
                        </div>
                        <div className='buttonWrapper'>
                        <button className='nextBtn'>NEXT</button>
                        </div> 
                    </div>                   
                </div>
            </div>
        )
    }
}