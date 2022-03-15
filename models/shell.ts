export class ShellModel {
    name: string
    hostname: string
    port: number
    username?: string
    auth_type: string|null = null
    password?: string
    private_key?: string

    constructor(initializer: any) {
        if(initializer) {
        this.name     = initializer.name;
        this.host = initializer.host;
        this.port     = initializer.port ? initializer.port : 22;
        this.username = initializer.username;
        this.password = initializer.password;
        this.private_key  = initializer.private_key;
        }
        else {
            this.name = "";
            this.host = "";
            this.port = 22;
        }
        if(this.password) {
            this.auth_type = "password"
        }
        if(this.private_key) {
            this.auth_type = 'private_key';
        }
    }
}