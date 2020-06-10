import React from 'react';
import { View, TextInput } from 'react-native'

const SearchArea = (props) => {
    //Aggiungere qui la query e effettuare il filtro non su DB, ma dal document? 
    return (
        <View>
            <TextInput type="text" placeholder="Search your Movies" onChangeText={props.handleChange}></TextInput>
        </View>
    );
}

export default SearchArea;