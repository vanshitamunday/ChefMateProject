import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/ChefMateLogo.jpg')} 
        style={styles.logo}
      />
      
      <View style={styles.rightContainer}>
        <Image
          source={require('../assets/heartIcon.png')}  
          style={styles.icon}
        />
        <Image
          source={require('../assets/menuIcon.png')}  
          style={styles.icon}
        />
        <Image
          source={require('../assets/profileImage.png')}  
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D94F30',
    height: 60,
    paddingHorizontal: 20, 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    zIndex: 1, 
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120, 
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10, 
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;