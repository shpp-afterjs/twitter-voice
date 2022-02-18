import {
    Length,
    IsNotEmpty,
    IsString, IsEmail, Contains, IsNumber,
} from 'class-validator';

export class userValidator {
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    name: string

    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @Contains('male' || 'female')
    gender: "male" | "female"

    @IsNotEmpty()
    @IsString()
    birthday: string

    @Length(1, 30)
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @Length(3, 20)
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    salt: string;

    @IsNotEmpty()
    @IsString()
    ip: string
}

export class getOneUserRequestValidator {
    @IsNotEmpty()
    @IsNumber()
    userId: number
}

export class authRequestValidator {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class signupRequestValidator {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @Contains('male' || 'female')
    gender: "male" | "female"

    @IsNotEmpty()
    @IsString()
    birthday: string
}