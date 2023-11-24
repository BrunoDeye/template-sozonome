import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import Image from 'next/image';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';

export const CountrySelect = ({ value, onChange, labels, ...rest }: any) => (
  <Select
    {...rest}
    value={value}
    onValueChange={(value: any) => onChange(value || undefined)}
  >
    <SelectTrigger className="min-w-[120px]" value="">
      <SelectValue placeholder={labels['ZZ']} />
    </SelectTrigger>
    <SelectContent className="max-h-[300px]">
      <SelectGroup>
        {getCountries().filter((country) => country !== 'SJ')
          .sort(
            (countryA, countryB) =>
              +getCountryCallingCode(countryA) - +getCountryCallingCode(countryB)
          )
          .map((country) => (
            <SelectItem className="" key={country} value={country}>
              <div className="flex min-w-[70px] items-center justify-between">
                <Image
                  height={20}
                  width={30}
                  alt={country}
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                />{' '}
                +{getCountryCallingCode(country)}
              </div>
            </SelectItem>
          ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
