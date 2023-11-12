import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Textarea,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  autoFocus?: boolean;
  control: Control<T>;
  errors: any;
  helperText?: string;
  hidden?: boolean;
  inputLeft?: any;
  inputRight?: any;
  isRequired?: boolean;
  isTextArea?: boolean;
  label: string;
  maxLength?: number;
  maxW?: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  rows?: number;
}

const FormControlledText = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    control,
    name,
    errors,
    label,
    helperText,
    type,
    inputRight,
    maxLength,
    inputLeft,
    isTextArea,
    hidden,
    autoFocus,
    isRequired,
    maxW,
    placeholder,
    rows,
  } = props;

  return (
    <FormControl
      isRequired={isRequired}
      hidden={hidden}
      isInvalid={!!errors[name]?.message}
      maxW={maxW}
    >
      <FormLabel fontSize={"md"}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputGroup>
            {inputLeft && (
              <InputLeftElement pointerEvents={"none"}>
                {inputLeft}
              </InputLeftElement>
            )}
            {!isTextArea && (
              <Input
                maxLength={maxLength}
                value={field.value}
                onChange={field.onChange}
                type={type}
                autoFocus={autoFocus}
                placeholder={placeholder}
              />
            )}
            {isTextArea && (
              <Textarea
                rows={rows}
                maxLength={maxLength}
                value={field.value}
                onChange={field.onChange}
                autoFocus={autoFocus}
                placeholder={placeholder}
              />
            )}
            {inputRight && <InputRightElement>{inputRight}</InputRightElement>}
          </InputGroup>
        )}
      />
      {!errors[name]?.message ? (
        <FormHelperText color={"gray.500"}>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errors[name].message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormControlledText;
