import React, {Component} from 'react';
import SearchArea from './searchArea';
import AddAMovie from './addAMovie'

const UpperContainer = () => {
    <div className="container">
        <div className="row">
            <div className="col s3">
                <SearchArea handleChange={this.handleChange}></SearchArea>
            </div>
            <div className="col s1"></div>
            <div className="col s4"></div>
            <div className="col s4">
                <AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie>
            </div>
        </div>
    </div>
}
export default UpperContainer;