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
    btn_main_sm: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 100,
        height: 30,
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
        elevation: 3,
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
        marginBottom: 5
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
        height: 50,
        borderColor: "rgba(245, 157, 86, 0.5)",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 18,
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 70,
        width: 70,
        top: 0,
        left: '43%',
        position: 'absolute',
    },
    divider: {
        height: 1,
        backgroundColor: '#d3d3d3',
        marginVertical: 70,
    },
    //Choices
    grid:{
        flexDirection: "row",
        flexWrap:"wrap",
        justifyContent:"space-between"
    },
    option: {
        width: 110,
        textAlign:"center",
        padding: 5,
        margin: 5,
        marginBottom:15,
        borderWidth: 1,
        borderBlockColor: "black",
        borderRadius:10,
    },
    selectedOption:{
        backgroundColor: "#F59D56",
        color: "#fdfffc",
        width: 110,
        textAlign:"center",
        padding: 5,
        margin: 5,
        borderRadius:10,
    }

});
export default styles;