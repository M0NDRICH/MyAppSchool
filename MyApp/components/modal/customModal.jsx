//components/CustomDialog.js
import { StyleSheet, Platform } from 'react-native';
import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';

const CustomDialog = ({ visible, hideDialog, title, content, onConfirm, oneBtn }) => {
  
  // const styles = Platform.OS === 'web' ? webStyles : mobileStyles;
  const styles = webStyles;

  if (oneBtn === true){
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogTextSecondary}>{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onConfirm} style={styles.button}>
              <Text style={styles.dialogButtonText}>Ok</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } 
  else
  {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogTextSecondary}>{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              <Text  style={styles.dialogButtonText}>Cancel</Text>
            </Button>
            <Button onPress={onConfirm} >
              <Text style={styles.dialogButtonText}>Ok</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
  
};

export default CustomDialog;

const webStyles = StyleSheet.create({
  dialog: {
    backgroundColor: '#BDDDE4',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#3C2F60'
  },
  dialogTextSecondary: {
    color: '#3C2F60',
    fontWeight: 500,
    fontSize: 16,
  },
  dialogButtonText: {
    fontWeight: 'bold',
    color: '#3C2F60',
    fontSize: 16,
  },
  button: {
    borderWidth: 2,
    backgroundColor: '#FFF1D5',
    borderColor: 'rgb(42, 15, 63)',
    borderRadius: 10,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    elevation: 0,
  }
});
