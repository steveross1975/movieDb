import React from 'react';

const SearchArea = (props) => {
    //Aggiungere qui la query e effettuare il filtro non su DB, ma dal document? 
    return (
            <form action="">
                <div className="input-field">
                    <input type="text" placeholder="Search your Movies" onChange={props.handleChange}/>
                </div>
            </form>
    );
}

export default SearchArea;