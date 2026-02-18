import React from 'react'

interface WebDatePickerProps {
  value: Date | null
  onChange: (event: { type: string }, date?: Date) => void
  theme: {
    text?: string
    border?: string
    [key: string]: any
  }
}

export const WebDatePicker: React.FC<WebDatePickerProps> = ({ 
  value, 
  onChange, 
  theme,
}) => {
  const formattedDate = value ? new Date(value).toISOString().split('T')[0] : ''

  return (
    <input
      type='datetime-local'
      value={value ? value.toISOString().slice(0, 16) : ''}
      onChange={(e) => {
        const date = e.target.value ? new Date(e.target.value) : undefined;
        onChange({ type: 'set' }, date);
      }}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        borderColor: theme.border,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        width: '40%',
        outline: 'none'
      }}
    />
  );
}