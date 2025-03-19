export class SignInDTO {
    constructor(
        readonly username: string,
        readonly password: string
    ) {}
}

export class SignUpDTO {
    constructor(
        readonly username: string,
        readonly password: string
    ) {}
}
