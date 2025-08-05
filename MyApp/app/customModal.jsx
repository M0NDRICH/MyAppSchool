// components/CustomDialog.js
import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';

const CustomDialog = ({ visible, hideDialog, title, content, onConfirm }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={onConfirm}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
