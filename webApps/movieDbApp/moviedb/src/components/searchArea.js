import React from 'react';

const SearchArea = (props) => {
    //Aggiungere qui la query e effettuare il filtro non su DB, ma dal document? 
    return (
            <form action="" key="searchForm">
                <div className="input-field">
                    <input key="inputString" id="searchField" type="text" placeholder="Search your Movies" onChange={props.handleChange}></input>
                </div>
            </form>
    );
}

export default SearchArea;