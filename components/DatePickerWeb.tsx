import React from 'react'
import { View } from 'react-native'

interface WebDatePickerProps {
  value: Date | null
  onChange: (event: { type: string }, date?: Date) => void
  theme?: {
    text?: string
    border?: string
    [key: string]: any
  };
}

export const WebDatePicker: React.FC<WebDatePickerProps> = ({ 
  value, 
  onChange, 
  theme 
}) => {
  const formattedDate = value ? new Date(value).toISOString().split('T')[0] : ''

  return (
    <View style={{
      borderWidth: 1,
      borderColor: theme?.border || '#ccc',
      borderRadius: 8,
      padding: 12,
      marginTop: 5,
      backgroundColor: 'transparent',
    }}>
      <input
        type="date"
        value={formattedDate}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value + "T12:00:00") : new Error()
          if (!(date instanceof Error)) {
            onChange({ type: 'set' }, date)
          }
        }}
        style={{
          background: 'transparent',
          color: theme?.text || '#000',
          border: 'none',
          outline: 'none',
          width: '100%',
          fontSize: '16px',
          cursor: 'pointer',
          fontFamily: 'sans-serif'
        }}
      />
    </View>
  )
}