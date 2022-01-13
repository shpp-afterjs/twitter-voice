import {
    Length,
    IsNotEmpty,
    NotContains,
} from 'class-validator';

export class requestValidator {
    @Length(3, 20)
    @IsNotEmpty()
    text: string
}