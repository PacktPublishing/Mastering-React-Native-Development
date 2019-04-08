import React from 'react'
import { Button, Text } from 'native-base'

export default ({ onPressFunc, text }) => (
  <Button style={{ alignSelf: 'center' }} onPress={onPressFunc}>
    <Text>{text}</Text>
  </Button>
)