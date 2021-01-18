export class User {

    constructor(
        public mail: string,
        public pass: string,
    ) {}

}

export class UserSubscribe {

    constructor(
        public firstName: string,
        public lastName: string,
        public mail: string,
        public pass: string,
        public confirmPass: string,
        public doctor: string
    ) {}

}

export class ChangeMail {

    constructor(
        public currentMail: string,
        public newMail: string,
        public confNewMail: string,
    ) {}

}

export class ChangePass {

    constructor(
        public currentPassword: string,
        public newPassword: string,
        public confNewPassword: string,
    ) {}

}
