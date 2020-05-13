import React from 'react';

const SearchArea = () => {
    //Aggiungere qui la query e effettuare il filtro non su DB, ma dal document? 
    return (
        <div class="container">
            <div class="row">
                <section class="col s4 offset-s4">
                    <form action="">
                        <div class="input-field">
                            <input type="text" placeholder="Search from your Movies"></input>
                        </div>
                    </form>
                </section>
            </div>
            <div className="row">
                <table className="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Format</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Maschi contro Femmine</td>
                            <td>Commedia</td>
                            <td>Blu-Ray</td>
                        </tr>
                        <tr>
                            <td>Sliding Doors</td>
                            <td>Commedia</td>
                            <td>DVD</td>
                        </tr>
                        <tr>
                            <td>Scarface</td>
                            <td>Drammatico</td>
                            <td>Blu-Ray</td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div> 
    );
}

export default SearchArea;