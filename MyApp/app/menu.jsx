import { View, Text, StyleSheet, SafeAreaView, ScrollView, Appearance, Platform, FlatList, Image } from 'react-native'
import { Colors } from '@/constants/Colors';
import { MENU_ITEMS } from '@/constants/MenuItems';
import { MENU_IMAGES }  from '@/constants/MenuImages';
import React from 'react'

const MenuScreen = () => {
  const colorScheme = Appearance.getColorScheme();

  if (MENU_IMAGES === '' || MENU_IMAGES === undefined)
  {
    throw "Menu images error"
  } else if (MENU_ITEMS=== '' || MENU_ITEMS === undefined)
  {
    throw "Menu items error"
  }
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const styles = createStyles(theme, colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView; 

  const separatorComp = <View style={styles.separator} />
  //const headerComp = <Text>Top of List</Text>
  const footerComp = <Text style={{color: theme.text}}>End of Menu</Text>

  return (
    <Container style={styles.container}>
      <FlatList 
        data={MENU_ITEMS}
        keyExtractor={(item)=> item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separatorComp}
        //ListHeaderComponent={headerComp}
        ListFooterComponent={footerComp}
        ListFooterComponentStyle={styles.footerComp}
        ListEmptyComponent={<Text>No Items</Text>}
        renderItem={({item}) => (
          <View style={styles.row}>
            <View style={styles.menuTextRow}>
              <Text style={[styles.text, styles.menuItemTitle]}>{item.title}</Text>
              <Text style={[styles.text, styles.menuItemText]}>{item.description}</Text>
            </View>
            <Image
                source={MENU_IMAGES[item.id - 1]}
                style={styles.menuImage}
            />
          </View>
        )}
        />
       
    </Container>
  )
}

export default MenuScreen

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000",
      width: '50%',
      maxWidth: 300,
      marginHorizontal: 'auto',
      marginBottom: 10,
    },
    text: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    footerComp: {
      marginHorizontal: 'auto',
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: 600,
      height: 100,
      marginBottom: 10,
      borderStyle: 'solid',
      borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000',
      borderWidth: 1,
      borderRadius: 20,
      overflow: 'hidden',
      marginHorizontal: 'auto', 
    },
    menuTextRow: {
      width: '65%',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
    },
    menuItemTitle: {
      fontSize: 18,
      textDecorationLine: 'underline',
    },
    menuItemText: {
      color: theme.text,
    },
    menuImage: {
      width: 100,
      height: 100,
    }
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF1D5',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});