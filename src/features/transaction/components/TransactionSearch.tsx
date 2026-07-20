import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

interface Props{
    value:string;
    onChange:(text:string)=>void;
}

export default function SearchBar({
    value,
    onChange
}:Props){

    return(

        <View style={styles.container}>

            <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#999"
            />

            <TextInput
                placeholder="Tìm kiếm"
                value={value}
                onChangeText={onChange}
                style={styles.input}
            />

        </View>

    );

}

const styles=StyleSheet.create({

container:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
paddingHorizontal:15,
borderRadius:25,
borderWidth:1,
borderColor:"#eee",
height:48
},

input:{
flex:1,
marginLeft:10
}

});