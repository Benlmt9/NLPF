import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

export default function LocalizedDatePicker() {
  const [locale, setLocale] = React.useState<typeof locales[number]>('ru');
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs('2022-04-07'),
  );


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <Stack spacing={3}>
        <DatePicker
          value={datePickerValue}
          onChange={(newValue) => setDatePickerValue(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}