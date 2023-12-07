import { Reflector } from '@nestjs/core';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const Roles = Reflector.createDecorator<string[]>();

@ValidatorConstraint({ name: 'isValidRole', async: false })
export class IsValidRoleConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // Your custom validation logic here
    return value === 'admin' || value === 'user';
  }

  defaultMessage(args: ValidationArguments) {
    // Error message if validation fails
    return `Invalid role. Role must be 'admin' or 'user'.`;
  }
}

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidRoleConstraint,
    });
  };
}
