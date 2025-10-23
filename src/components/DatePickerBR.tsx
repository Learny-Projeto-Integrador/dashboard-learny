'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useValidation, validateDate } from '@mui/x-date-pickers/validation';
import {
  useSplitFieldProps,
  useParsedFormat,
  usePickerContext,
} from '@mui/x-date-pickers/hooks';
import useForkRef from '@mui/utils/useForkRef';

function ButtonDateField(props: any) {
  // Remove props que não são válidas no DOM
  const { internalProps, forwardedProps } = useSplitFieldProps(props, 'date');
  const { slotProps, inputRef, ...safeForwarded } = forwardedProps;

  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();

  const { hasValidationError } = useValidation({
    validator: validateDate,
    value: pickerContext.value,
    timezone: pickerContext.timezone,
    //@ts-ignore
    props: internalProps,
  });

  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.format(pickerContext.fieldFormat);

  return (
    <Button
      {...safeForwarded}
      variant="outlined"
      color={hasValidationError ? 'error' : 'primary'}
      ref={handleRef}
      className={pickerContext.rootClassName}
      sx={{
        width: '80%',
        height: '100%',
        fontSize: 16,
        backgroundColor: 'rgba(100,100,100,0.1)',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'none',
        boxShadow: 'inset 1px 1px 8px rgba(0, 0, 0, 0.2)', // ← sombra interna suave
        borderRadius: '10px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
        },
        }}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.label ? `${pickerContext.label}: ${valueStr}` : valueStr}
    </Button>
  );
}

function ButtonFieldDatePicker(props: DatePickerProps<any>) {
  return (
    <DatePicker
      {...props}
      format="DD/MM/YYYY"
      slots={{ ...props.slots, field: ButtonDateField }}
    />
  );
}

export default function DatePickerBR() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
      localeText={{
        cancelButtonLabel: 'Cancelar',
        okButtonLabel: 'OK',
      }}
    >
      <ButtonFieldDatePicker
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
