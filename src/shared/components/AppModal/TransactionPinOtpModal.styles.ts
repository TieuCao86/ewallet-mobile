import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({

    overlay:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.4)",
        justifyContent:"flex-end",
    },


    container:{
        backgroundColor:"#FFF",
        padding:20,
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
    },


    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:20,
    },


    title:{
        fontSize:18,
        fontWeight:"700",
    },


    description:{
        color:"#666",
        marginBottom:16,
    },


    input:{
        borderWidth:1,
        borderColor:"#DDD",
        borderRadius:12,
        height:50,
        paddingHorizontal:16,
        fontSize:18,
        letterSpacing:8,
        marginBottom:20,
    },


    button:{
        height:50,
        borderRadius:12,
        backgroundColor:"#005BEA",
        justifyContent:"center",
        alignItems:"center",
    },


    buttonDisabled:{
        opacity:0.5,
    },


    buttonText:{
        color:"#FFF",
        fontSize:16,
        fontWeight:"600",
    },


    resend:{
        textAlign:"center",
        marginTop:18,
        color:"#005BEA",
    },


    resendDisabled:{
        color:"#999",
    }

});