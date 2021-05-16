import { StyleSheet } from 'react-native';

const buttonStyles = {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15
  };

  const infoCell = {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#e4e4e4",
    fontFamily: 'Noto',
  };

 export default StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 10
    },
    userMetaContainer: {
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.36,
      shadowRadius: 2,

      elevation: 2
    },
    doctorInfo: {
      paddingHorizontal: 10,
      marginTop: 20,
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.36,
      shadowRadius: 2,
      elevation: 2
    },
    userMeta: {
      alignItems: "flex-start",
      marginLeft: 15,
    },
    userAvtar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#007bff',
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center"
    },
    userAvtarText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#fff"
    },
    logoutButton: {
      ...buttonStyles,
      backgroundColor: '#dc3545'
    },
    backButton: {
      ...buttonStyles
    },
    buttonText: {
      fontSize: 17,
    },
    infoCell: {
      ...infoCell,
    },
    lastCell: {
      ...infoCell,
      borderBottomWidth: 0,
    },
    infoTitle: {
      fontFamily: 'Noto',
    },
    infoText: {
      fontSize: 17,
      textAlign: "left",
      fontFamily: 'Noto',
    },
    userName: {
      fontFamily: 'Noto',
    },
    mapContainer: {
      height: 200, marginTop: 20
    },
    map : {
      flex: 1,
    }
  });

