import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FDFFFC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btn_main: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 350,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    btn_main_md: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 200,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    btn_sec: {
        margin: 10,
        backgroundColor: "rgba(245, 157, 86, 0.2)",
        width: 350,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        elevation:3,
    },
    whitefont: {
        color: "#fdfffc",
        fontSize: 20,
    },
    colorfont: {
        color: "#F59D56",
        fontSize: 20,
    },
    
    header: {
        fontSize: 40,
        marginBottom:5
    },
    //Forms
    form_group: {
        padding: 8,
        margin: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        
    },
    input: {
        width: 350,
        height: 60,
        borderColor: "rgba(245, 157, 86, 0.5)",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 20,
        padding:5,
    },


});
export default styles;