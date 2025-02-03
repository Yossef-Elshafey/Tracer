import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class isBeforeToday implements ValidatorConstraintInterface {
  validate(date: Date) {
    const today = new Date(new Date().toJSON().slice(0, 10));
    return today.getTime() < date.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} cannot be older than or equal today`;
  }
}
