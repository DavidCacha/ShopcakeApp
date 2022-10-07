import React, { useContext, useState } from 'react'
import { Platform, Switch } from 'react-native'

interface Props {
    isOn: boolean;
    onChange: (value: boolean) => void;
}

export const CustomSwitch = ({isOn, onChange}:Props) => {
    const [isEnabled, setIsEnabled] = useState(isOn);
    const toggleSwitch = () => {
        console.log(isEnabled)
        setIsEnabled(!isEnabled);
        onChange(!isEnabled)
    };

  return (
    <Switch
        style={{marginTop:15, marginLeft:50}}
        trackColor={{ false: "#D9D9DB", true: '#850842'}}
        thumbColor={(Platform.OS === 'android') ? '#850842':''}
        //ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled as any}
      />
  )
}